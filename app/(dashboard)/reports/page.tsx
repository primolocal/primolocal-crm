"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { Deal, Contact } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Users, Phone } from "lucide-react";

export default function ReportsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [d, c] = await Promise.all([db.deals.getAll(), db.contacts.getAll()]);
      setDeals(d);
      setContacts(c);
      setLoading(false);
    }
    load();
  }, []);

  const founders = deals.filter((d) => d.stage === "founder");
  const founderRevenue = founders.reduce((sum, d) => sum + d.value, 0);
  const liveCustomers = deals.filter((d) => d.stage === "live");
  const pipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
  const avgDealSize = deals.length > 0 ? Math.round(pipelineValue / deals.length) : 0;

  const bySource: Record<string, number> = {};
  contacts.forEach((c) => {
    bySource[c.source] = (bySource[c.source] || 0) + 1;
  });

  const byStage: Record<string, number> = {};
  deals.forEach((d) => {
    byStage[d.stage] = (byStage[d.stage] || 0) + 1;
  });

  const conversionFunnel = [
    { stage: "Lead", count: byStage["lead"] || 0 },
    { stage: "Contacted", count: byStage["contacted"] || 0 },
    { stage: "Demo Booked", count: byStage["demo_booked"] || 0 },
    { stage: "Pilot", count: byStage["pilot"] || 0 },
    { stage: "Pay What Worth", count: byStage["pay_what_worth"] || 0 },
    { stage: "Founder", count: byStage["founder"] || 0 },
    { stage: "Live", count: byStage["live"] || 0 },
  ];

  if (loading) return <div className="text-muted-foreground">Loading reports...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Founders Plan performance and pipeline metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Founder Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${founderRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{founders.length} founders locked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{deals.length} deals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Deal Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all stages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveCustomers.length}</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conversionFunnel.map((step, i) => {
              const prev = i > 0 ? conversionFunnel[i - 1].count : step.count;
              const rate = prev > 0 ? Math.round((step.count / prev) * 100) : 0;
              return (
                <div key={step.stage} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">{step.count}</div>
                    <span className="text-sm">{step.stage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${Math.max((step.count / Math.max(conversionFunnel[0].count, 1)) * 100, 4)}%` }}
                      />
                    </div>
                    {i > 0 && <Badge variant="outline" className="text-[10px]">{rate}% conversion</Badge>}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(bySource).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-sm capitalize">{source.replace(/_/g, " ")}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.max((count / contacts.length) * 100, 4)}%` }}
                    />
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Founders Plan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Phone className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Founder Spots</span>
                <span className="text-sm font-bold">{founders.length} / 10</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-muted">
                <div
                  className="h-3 rounded-full bg-primary transition-all"
                  style={{ width: `${(founders.length / 10) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {10 - founders.length} spots remaining. Next price increase: $15K annual.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
