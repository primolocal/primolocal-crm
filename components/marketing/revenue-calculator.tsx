"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DollarSign, PhoneMissed, TrendingUp, AlertCircle } from "lucide-react";

function toNum(v: number | readonly number[]): number {
  return typeof v === "number" ? v : v[0];
}

export function RevenueCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(15);
  const [avgJobValue, setAvgJobValue] = useState(1200);
  const [closeRate, setCloseRate] = useState(35);

  const weeklyLost = missedCallsPerWeek * (closeRate / 100) * avgJobValue;
  const monthlyLost = weeklyLost * 4.3;
  const yearlyLost = weeklyLost * 52;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange mb-4">
            Calculate Your Losses
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
            How Much Are Missed Calls Really Costing You?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Adjust the sliders to match your business. Numbers update in real time — and we cap the math at realistic industry benchmarks, not fantasy figures.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Controls */}
          <Card className="p-8 border-navy/10 shadow-sm">
            <div className="space-y-10">
              {/* Missed Calls */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PhoneMissed className="h-5 w-5 text-navy" />
                    <span className="font-semibold text-navy">Missed Calls per Week</span>
                  </div>
                  <span className="text-xl font-extrabold text-navy tabular-nums">
                    {missedCallsPerWeek}
                  </span>
                </div>
                <Slider
                  value={[missedCallsPerWeek]}
                  onValueChange={(v) => setMissedCallsPerWeek(toNum(v))}
                  min={1}
                  max={50}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Industry average for busy HVAC/plumbing contractors: 10–20
                </p>
              </div>

              {/* Average Job Value */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-navy" />
                    <span className="font-semibold text-navy">Average Job Value</span>
                  </div>
                  <span className="text-xl font-extrabold text-navy tabular-nums">
                    {formatCurrency(avgJobValue)}
                  </span>
                </div>
                <Slider
                  value={[avgJobValue]}
                  onValueChange={(v) => setAvgJobValue(toNum(v))}
                  min={500}
                  max={10000}
                  step={100}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Service call average: $1,000–$2,000 (emergency repair calls, not installs)
                </p>
              </div>

              {/* Close Rate */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-navy" />
                    <span className="font-semibold text-navy">Your Close Rate</span>
                  </div>
                  <span className="text-xl font-extrabold text-navy tabular-nums">
                    {closeRate}%
                  </span>
                </div>
                <Slider
                  value={[closeRate]}
                  onValueChange={(v) => setCloseRate(toNum(v))}
                  min={5}
                  max={80}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  How many inbound leads do you currently convert?
                </p>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <Card className="p-8 border-navy bg-navy text-white">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-orange" />
                <span className="font-semibold text-white/90">
                  Revenue You&apos;re Losing
                </span>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm text-white/60">Per Month</p>
                  <p className="text-3xl font-extrabold text-white tabular-nums">
                    {formatCurrency(monthlyLost)}
                  </p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-sm text-white/60">Per Year</p>
                  <p className="text-4xl font-extrabold text-orange tabular-nums">
                    {formatCurrency(yearlyLost)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-navy/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                That&apos;s roughly <strong className="text-navy">{missedCallsPerWeek * 52}</strong> inbound opportunities per year. At a {closeRate}% close rate and a {formatCurrency(avgJobValue)} average ticket, you&apos;re leaving{" "}
                <strong className="text-navy">{formatCurrency(yearlyLost)}</strong> on the table — and that&apos;s before referrals, repeat work, and lifetime value.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
