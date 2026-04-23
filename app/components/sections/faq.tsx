"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Why do I need to apply?",
    a: "We're not taking clients — we're selecting 5 Houston HVAC contractors who are the right fit. We review every application within 24 hours.",
  },
  {
    q: "What happens during the 14-Day Prove-It?",
    a: "Novo goes live on your line. Real calls. Real bookings. Real numbers. You see exactly how much revenue she recovers before paying a cent.",
  },
  {
    q: "What if I don't see results?",
    a: "No charge, no hard feelings. The Prove-It is designed to fail clean — if it doesn't work for your business, you walk away with zero obligation.",
  },
  {
    q: "Why $10K/year?",
    a: "One $3K commercial job pays for the entire year. Most of our HVAC contractors recover that in the first 30 days. The price is locked forever for Founders.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes — $5,000 down, then $1,041/month for 6 months. Or pay in full and save. Either way, the $10K/year rate is locked forever.",
  },
  {
    q: "Do I get a refund if I cancel?",
    a: "No refunds on annual Revenue Recovery. The 14-Day Prove-It is your trial — that's when you decide. After you lock in, you're committed for the year.",
  },
  {
    q: "Can I try for a month instead?",
    a: "No month-to-month. This is annual-only because Novo is built specifically for your business — your zip codes, your pricing, your calendar. That setup investment only makes sense annually.",
  },
  {
    q: "What's included in the $10K?",
    a: "Novo AI agent, after-hours coverage, CRM integration, Day 14 report, and ongoing prompt tuning. Everything needed to recover revenue you're currently losing.",
  },
  {
    q: "Why Houston HVAC only?",
    a: "White-glove setup requires local knowledge — zip codes, emergency protocols, industry terms. We prove the model here first, then expand. Houston HVAC is our Founders cohort.",
  },
  {
    q: "What's the referral reward?",
    a: "Refer another Houston HVAC shop that commits to Revenue Recovery, you both get $1,000 credit. Simple as that.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-border-light border border-border-light rounded-xl overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-alt transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-lg font-medium text-text-primary pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
