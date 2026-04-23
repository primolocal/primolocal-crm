"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import {
  CalendarDays,
  Phone,
  TrendingUp,
  MessageSquare,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function PartnersPage() {
  const { user } = useAuth();

  const partnerName = user?.email?.split("@")[0] || "Partner";

  const metrics = [
    { label: "Calls Answered", value: "1,247", change: "+12%", icon: Phone },
    { label: "Appointments Booked", value: "86", change: "+8%", icon: CalendarDays },
    { label: "New Reviews", value: "24", change: "+15%", icon: TrendingUp },
    { label: "Avg Response Time", value: "3.2s", change: "-0.4s", icon: Clock },
  ];

  const checkIns = [
    { date: "Apr 21, 2026", status: "completed", notes: "Piper live, 4 bookings first week" },
    { date: "Apr 14, 2026", status: "completed", notes: "GBP optimization complete, 12 new photos" },
    { date: "Apr 7, 2026", status: "completed", notes: "Review automation active, 3 requests sent" },
    { date: "Apr 28, 2026", status: "upcoming", notes: "Scheduled" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Partner Portal</h1>
        <p className="text-muted-foreground">
          Welcome back, <span className="font-medium capitalize">{partnerName}</span>
        </p>
      </div>

      {/* Status Banner */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex items-center gap-4 py-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Partnership Active — Day 14 of Prove-It</p>
            <p className="text-sm text-green-700">16 days remaining until commitment decision.</p>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-green-600 mt-1">{m.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Check-Ins */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Check-Ins</CardTitle>
            <CardDescription>Your partnership progress with Tommy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {checkIns.map((check) => (
              <div key={check.date} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="mt-0.5">
                  {check.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{check.date}</p>
                    <Badge
                      variant={check.status === "completed" ? "secondary" : "outline"}
                      className="text-[10px]"
                    >
                      {check.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{check.notes}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Tools and resources for active partners</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <CalendarDays className="h-4 w-4" />
              Schedule Check-In
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Phone className="h-4 w-4" />
              View Call Logs
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="h-4 w-4" />
              Success Metrics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Support Chat
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Share2 className="h-4 w-4" />
              Referral Link
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alert Card */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="flex items-center gap-4 py-4">
          <AlertCircle className="h-6 w-6 text-orange-600" />
          <div className="flex-1">
            <p className="font-semibold text-orange-800">Day 30 Commitment Coming Up</p>
            <p className="text-sm text-orange-700">
              In 16 days, we&apos;ll review your Prove-It metrics together and make the commitment decision.
            </p>
          </div>
          <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
            View Metrics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
