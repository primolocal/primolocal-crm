"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function ExitModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let triggered = false;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !triggered) {
        triggered = true;
        setOpen(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
          Wait — Before You Go
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
          Your Voicemail Is Costing You $3,900+/mo
        </h3>

        <p className="text-text-secondary mb-8">
          Most HVAC contractors don't know their real missed-call number. Find yours in 15 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#calculator"
            onClick={() => setOpen(false)}
            className="btn-primary text-base px-6 py-3"
          >
            Show Me My Number →
          </Link>
          <a
            href="tel:8327370525"
            className="btn-secondary text-base px-6 py-3"
          >
            Call (832) 737-0525
          </a>
        </div>
      </div>
    </div>
  );
}
