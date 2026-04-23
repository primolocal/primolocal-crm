"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Check, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-[72px]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 px-4 py-2 text-sm border-orange-400 text-orange-600 bg-orange-50 animate-pulse"
        >
          🏗️ Founding Partner cohort: now accepting applications
        </Badge>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-navy leading-[1.1] tracking-tight mb-6">
          Never Miss a Call. Wake Up to Booked Appointments.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          I&apos;m not a contractor. I&apos;m the guy who watched too many of them lose jobs to a ringing phone — and built the system that fixes it.
        </p>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          I&apos;m selecting 10 Houston contractors to be Founding Partners in a complete client acquisition system. Real partnership, real accountability, real skin in the game on both sides.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/apply">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-navy hover:bg-navy-light text-white hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
            >
              Apply to Partner &rarr;
            </Button>
          </Link>
          <a href="tel:832-737-0525">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-navy text-navy hover:bg-navy/5"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Demo Line
            </Button>
          </a>
        </div>

        {/* Trust Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>30-Day Prove-It Period</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>$10K/Year Locked Forever</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Houston Contractors Only</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See how it works
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
