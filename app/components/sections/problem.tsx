"use client";

import { PhoneOff, TrendingDown } from "lucide-react";

export function Problem() {
  return (
    <section id="problem" className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="text-sm font-semibold uppercase tracking-[2px] text-action text-center mb-4">
          The Tuesday Night Test
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary text-center mb-4 leading-tight">
          We Called 50 Houston HVAC Companies at 7:30 PM.{" "}
          <span className="text-action">42 Went Straight to Voicemail.</span>
        </h2>

        <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-16">
          Those 42 lost an estimated $50K+ to their competition — in one evening.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-border-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <PhoneOff className="w-7 h-7 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary mb-2">
              15-25/week
            </p>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Missed Calls Hit Voicemail
            </h3>
            <p className="text-text-secondary leading-relaxed">
              80% hang up. 62% call your competitor within 5 minutes. Your
              voicemail is a referral service — for the other guy.
            </p>
          </div>

          <div className="bg-white border border-border-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-6">
              <TrendingDown className="w-7 h-7 text-action" />
            </div>
            <p className="text-3xl font-bold text-action mb-2">$47K/year</p>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Revenue Bleed You Can&apos;t See
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Most owners estimate 5-10 missed calls. The real number is 15-25.
              And every single one is a job you never knew you had.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
