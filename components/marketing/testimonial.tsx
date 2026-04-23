"use client";

import { Shield, Check, Lock, Users, Calendar, DollarSign } from "lucide-react";

const stats = [
  { value: "10", label: "Founding Partner spots max", icon: Users },
  { value: "30 days", label: "to prove value before you commit", icon: Calendar },
  { value: "$10K/yr", label: "locked forever, payment plan available", icon: DollarSign },
];

export function Testimonial() {
  return (
    <section className="py-24 bg-gray-50" id="results">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange-500 mb-4">
            Proof
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight mb-4">
            The First Cohort Is Being Built Right Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re brand new. That&apos;s exactly why Founding Partner pricing exists.
          </p>
        </div>

        {/* Cohort Card */}
        <div className="bg-white rounded-xl border border-navy/10 p-8 md:p-12 mb-12">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            The 10 contractors who come in first get the lowest price this system will ever be offered at — locked forever — in exchange for working closely with us through the build-out and letting us learn from their business.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            First-cohort results and testimonials will live here as partners hit the 30-day mark and beyond. <strong className="text-navy">You could be one of them.</strong>
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10">
                  <stat.icon className="h-6 w-6 text-navy" />
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-extrabold text-navy mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Backed by Real Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>30-Day Prove-It Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-green-500" />
            <span>Locked Forever Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
