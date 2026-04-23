"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white to-gray-50 pt-[72px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-32">
        {/* Badge */}
        <div className="mb-6">
          <span className="badge-orange animate-pulse">
            🏗️ 5 spots only. Houston HVAC. $10K locked.
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-primary mb-6">
          Your voicemail is funding your competition.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Novo is Revenue Recovery for Houston HVAC contractors. She answers
          after-hours calls, books appointments, and forwards emergencies — 24/7.
          You see the number before you pay.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="#calculator"
            className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
          >
            Calculate Your Loss →
          </Link>
          <a
            href="tel:8327370525"
            className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
          >
            <Phone className="w-5 h-5 mr-2 inline" />
            Call (832) 737-0525
          </a>
        </div>

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            14-Day Prove-It (Zero Cost)
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            $10K/Year Locked Forever
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Houston HVAC Only
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16">
          <a
            href="#problem"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex flex-col items-center gap-2"
          >
            <span>See how it works</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
