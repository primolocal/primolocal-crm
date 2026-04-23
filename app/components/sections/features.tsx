"use client";

import { Phone, Target, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Phone,
    title: "Novo Answers 24/7",
    description:
      "A live voice books appointments while your team is off the clock.",
    bullets: [
      "Answers every call in under 30 seconds",
      "Books directly into your calendar",
      "Forwards emergencies to on-call tech",
      "Sends confirmation texts instantly",
    ],
    note: "Built specifically for your business — your zip codes, your pricing, your calendar.",
  },
  {
    icon: Target,
    title: "Revenue Recovery, Not Answering",
    description:
      "Novo recovers jobs you would have lost — she doesn't just take messages.",
    bullets: [
      "Identifies emergency vs quote vs maintenance",
      "Qualifies leads before booking",
      "Routes to correct technician by zip code",
      "Captures customer data for follow-up",
    ],
  },
  {
    icon: BarChart3,
    title: "Day 14 Revenue Assessment",
    description:
      "You see your exact number before paying. No case studies. No testimonials from strangers.",
    bullets: [
      "Total calls answered in 14 days",
      "Appointments booked",
      "Estimated revenue recovered",
      "Comparison: before vs after",
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
            Revenue Recovery
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary mb-4 leading-tight">
            Revenue Recovery. Not Answering Services.
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Every piece of value is built to recover revenue you are currently losing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-border-light rounded-xl p-8 lg:p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <f.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {f.title}
              </h3>
              <p className="text-text-secondary mb-5 leading-relaxed">
                {f.description}
              </p>
              <ul className="space-y-3 mb-5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg
                      className="w-5 h-5 text-success shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              {f.note && (
                <p className="text-xs text-text-muted italic">{f.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
