"use client";

import Link from "next/link";

const GOOD_FIT = [
  "Houston metro HVAC contractor",
  "$400K+ annual revenue",
  "Owner makes decisions",
  "Currently missing after-hours calls",
  "3+ trucks, actively growing",
  "Serious about growth, not tire-kicking",
];

const NOT_FIT = [
  "Under $300K revenue",
  "Already have 24/7 live answering",
  "One-truck operations",
  "Absentee owner, not involved",
  "Looking for a 'quick fix'",
  "Not Houston metro",
];

export function Criteria() {
  return (
    <section id="criteria" className="section-padding bg-slate">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
            Who This Is For
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white mb-4 leading-tight">
            5 Spots. 5 Houston HVAC Shops. That's It.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Not everyone qualifies. We filter hard so the 5 who get in see real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-success mb-6">Good Fit</h3>
            <ul className="space-y-4">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-red-400 mb-6">Not a Fit</h3>
            <ul className="space-y-4">
              {NOT_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="#calculator"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-slate bg-white hover:bg-gray-100 transition-all duration-150"
          >
            Calculate Your Loss →
          </Link>
        </div>
      </div>
    </section>
  );
}
