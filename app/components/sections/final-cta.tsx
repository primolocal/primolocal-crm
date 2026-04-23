"use client";

import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-100 to-slate">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <span className="badge-orange">
            5 spots only
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white mb-6 leading-tight">
          Ready to Stop Losing Revenue You Can't See?
        </h2>

        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
          Calculate your loss. Apply. See the number in 14 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="#calculator"
            className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
          >
            Calculate Your Loss →
          </Link>
          <a
            href="tel:8327370525"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-150 w-full sm:w-auto"
          >
            Call (832) 737-0525
          </a>
        </div>

        <p className="text-sm text-gray-400">
          5 spots only. $10K/year locked forever.
        </p>
      </div>
    </section>
  );
}
