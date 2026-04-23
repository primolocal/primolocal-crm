"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const goodFit = [
  "$500K+ annual revenue",
  "Currently missing calls",
  "Owner makes decisions",
  "Has/had receptionist",
  "Invested in growth",
  "Commits to weekly check-ins",
];

const notFit = [
  "Under $500K revenue",
  "Gatekeepers only",
  "No call tracking",
  "\"Just curious\" energy",
  "Can't commit to feedback",
  "Survival mode",
];

export function Criteria() {
  return (
    <section className="py-24 bg-slate text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange-400 mb-4">
            Who This Is For
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold leading-tight mb-4">
            We're Not Taking Clients. We're Selecting Partners.
          </h2>
          <p className="text-lg text-gray-300">
            Application required. Not everyone qualifies.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Good Fit */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-400">Good Fit</h3>
            <ul className="space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 mt-0.5">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not a Fit */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-red-400">Not a Fit</h3>
            <ul className="space-y-4">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 mt-0.5">
                    <X className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-white text-navy hover:bg-gray-100 h-14 px-8 text-lg font-semibold"
            >
              See If You Qualify →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
