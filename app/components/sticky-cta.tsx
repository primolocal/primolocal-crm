"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-light shadow-lg transform transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-text-primary">
            5 spots only. $10K/year locked forever.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="tel:8327370525"
            className="btn-secondary text-sm px-4 py-2.5"
          >
            Call
          </a>
          <Link
            href="#calculator"
            className="btn-primary text-sm px-4 py-2.5 flex-1 sm:flex-none text-center"
          >
            Calculate Your Loss →
          </Link>
        </div>
      </div>
    </div>
  );
}
