"use client";

import { Check, RefreshCw, DoorOpen } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Apply to Partner",
    description: "5-minute qualification form",
    detail: "We review within 24 hours",
  },
  {
    number: "2",
    title: "15-Minute Qualification Call",
    description: "Not a sales pitch — a mutual fit assessment",
    detail: "We qualify or decline together",
  },
  {
    number: "3",
    title: "Sign the Letter of Intent",
    description: "Define success metrics together",
    detail: "Bilateral commitment established",
  },
  {
    number: "4",
    title: "30 Days to Prove Value",
    description: "Piper live, GBP optimized, reviews automated",
    detail: "Weekly check-ins with Tommy",
  },
  {
    number: "5",
    title: "Choose Your Path on Day 30",
    description: "Three ways this ends",
    detail: null,
    paths: [
      {
        icon: Check,
        title: "Commit $10K/Year",
        description: "Best price, locked forever as a Founding Partner. Payment plan available: $5,000 down, $5,000 due in 90 days. This gives you 6 months at the locked rate before the second payment, during which you'll see the full value of the system in your business.",
        highlight: true,
      },
      {
        icon: RefreshCw,
        title: "Month-to-Month at $1,000/month",
        description: "Stay flexible, cancel anytime, no founding-partner lock-in.",
        highlight: false,
      },
      {
        icon: DoorOpen,
        title: "Walk Away",
        description: "Miss the metrics, or just not a fit? No charge, no hard feelings.",
        highlight: false,
      },
    ],
  },
];

export function Process() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange-500 mb-4">
            The Partnership Process
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight mb-4">
            Application → Prove-It → Partnership
          </h2>
          <p className="text-lg text-muted-foreground">
            30 days to prove it works. Then commit, scale down to month-to-month, or walk away.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Number badge */}
              <div className="absolute left-5 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white font-bold text-sm md:left-1/2 md:-translate-x-1/2">
                {step.number}
              </div>

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <h3 className="text-xl font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground mb-1">{step.description}</p>
                {step.detail && (
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                )}

                {/* Step 5 paths */}
                {step.paths && (
                  <div className="mt-4 space-y-3">
                    {step.paths.map((path) => (
                      <div
                        key={path.title}
                        className={`rounded-lg border p-4 text-left ${
                          path.highlight
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <path.icon
                            className={`h-5 w-5 mt-0.5 shrink-0 ${
                              path.highlight
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div>
                            <p className="font-semibold text-foreground">
                              {path.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {path.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
