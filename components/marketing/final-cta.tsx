"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ClipboardCheck } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-slate">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <Badge
          variant="outline"
          className="mb-6 px-4 py-2 text-sm border-orange-400 text-orange-400 bg-transparent"
        >
          <ClipboardCheck className="mr-2 h-4 w-4" />
          Next application review: Friday
        </Badge>

        <h2 className="text-3xl sm:text-[40px] font-bold text-white leading-tight mb-4">
          Ready to Stop Losing Money to Missed Calls?
        </h2>

        <p className="text-lg text-gray-300 mb-8">
          Applications reviewed within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/apply">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-white text-navy hover:bg-gray-100 font-semibold hover:scale-[1.02] transition-all"
            >
              Apply Now →
            </Button>
          </Link>
          <a href="tel:832-737-0525">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-white text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Demo Line
            </Button>
          </a>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          <p>10 Founding Partner spots total.</p>
          <p>$10K/year locked forever — or month-to-month at $1,000/month after the pilot.</p>
        </div>
      </div>
    </section>
  );
}
