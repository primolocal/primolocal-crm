"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function AnimatedNumber({ value, prefix = "$", duration = 1500 }: { value: number; prefix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromRef.current + (value - fromRef.current) * eased);
      setDisplay(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

export function Calculator() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [closeRate, setCloseRate] = useState(30);
  const [avgTicket, setAvgTicket] = useState(1200);
  const [showResults, setShowResults] = useState(false);

  const weeklyRevenue = missedCalls * (closeRate / 100) * avgTicket;
  const monthlyRevenue = weeklyRevenue * 4.3;
  const annualRevenue = monthlyRevenue * 12;
  const competitorJobs = Math.round(missedCalls * 4.3 * 0.62);

  const handleCalculate = () => setShowResults(true);

  return (
    <section id="calculator" className="section-padding bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border-2 border-border-light rounded-xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-2">
            Calculate Your Missed Revenue
          </h2>
          <p className="text-text-secondary text-center mb-10">
            3 inputs. 15 seconds. Most owners are shocked by the number.
          </p>

          {/* Sliders */}
          <div className="space-y-8 mb-10">
            {/* Missed Calls */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-text-primary">
                  Missed calls per week
                </label>
                <span className="text-lg font-bold text-primary">{missedCalls}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            {/* Close Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-text-primary">
                  Close rate when you answer (%)
                </label>
                <span className="text-lg font-bold text-primary">{closeRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Average Ticket */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-text-primary">
                  Average ticket value ($)
                </label>
                <span className="text-lg font-bold text-primary">
                  ${avgTicket.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>$200</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="btn-primary w-full text-lg py-4 mb-8"
          >
            Show Me My Number
          </button>

          {/* Results */}
          {showResults && (
            <div className="bg-bg-warm border border-border-orange rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-sm text-text-muted mb-2">
                You are losing approximately:
              </p>
              <p className="text-5xl font-extrabold text-action mb-1">
                <AnimatedNumber value={Math.round(monthlyRevenue)} />
                /month
              </p>
              <p className="text-2xl font-bold text-primary mb-4">
                <AnimatedNumber value={Math.round(annualRevenue)} />
                /year
              </p>
              <p className="text-text-secondary mb-6">
                That is <strong>{competitorJobs}</strong> jobs per month going to
                your competition. One ${avgTicket.toLocaleString()} repair pays
                Novo for the entire month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:8327370525"
                  className="btn-primary text-base px-6 py-3"
                >
                  Call Novo Demo (832) 737-0525
                </Link>
                <Link
                  href="/apply"
                  target="_blank"
                  className="btn-secondary text-base px-6 py-3"
                >
                  Apply for 14-Day Prove-It
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
