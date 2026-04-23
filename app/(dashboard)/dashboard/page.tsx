"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { Contact, Deal, Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, DollarSign, Users, TrendingUp, CheckCircle, Clock } from "lucide-react";

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [c, d, t] = await Promise.all([db.contacts.getAll(), db.deals.getAll(), db.tasks.getAll()]);
      setContacts(c);
      setDeals(d);
      setTasks(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  const openDeals = deals.filter((d) => d.stage !== "live" && d.stage !== "founder").length;
  const pipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
  const founders = deals.filter((d) => d.stage === "founder").length;
  const liveCustomers = deals.filter((d) => d.stage === "live").length;
  const newContactsLast7 = contacts.filter((c) => {
    const created = new Date(c.createdAt);
    const now = new Date();
    return (now.getTime() - created.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;
  const overdueTasks = tasks.filter((t) => {
    if (t.status === "done") return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const stats = [
    { label: "Open Deals", value: openDeals, icon: Phone, suffix: "" },
    { label: "Pipeline Value", value: pipelineValue, icon: DollarSign, suffix: "$", format: true },
    { label: "Founders", value: founders, icon: Users, suffix: "/10" },
    { label: "Live Customers", value: liveCustomers, icon: CheckCircle, suffix: "" },
    { label: "New Contacts (7d)", value: newContactsLast7, icon: TrendingUp, suffix: "" },
    { label: "Overdue Tasks", value: overdueTasks, icon: Clock, suffix: "" },
  ];

  const stageCounts: Record<string, number> = {};
  deals.forEach((d) => {
    stageCounts[d.stage] = (stageCounts[d.stage] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Founders Plan pipeline.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.suffix === "$" ? `$${stat.value.toLocaleString()}` : `${stat.value}${stat.suffix}`}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["lead", "contacted", "demo_booked", "pilot", "pay_what_worth", "founder", "live"].map((stage) => {
              const count = stageCounts[stage] || 0;
              const labels: Record<string, string> = {
                lead: "Lead",
                contacted: "Contacted",
                demo_booked: "Demo Booked",
                pilot: "Pilot (Free Month)",
                pay_what_worth: "Pay What It's Worth",
                founder: "Founder ($10K)",
                live: "Live Customer",
              };
              return (
                <div key={stage} className="flex items-center justify-between">
                  <span className="text-sm">{labels[stage]}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${Math.max((count / Math.max(deals.length, 1)) * 100, 4)}%` }}
                      />
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <Badge variant={task.status === "done" ? "default" : "outline"}>{task.status}</Badge>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-sm text-muted-foreground">No tasks yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
