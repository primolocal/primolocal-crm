"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/sections/footer";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call (832) 737-0525.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-bg-alt pt-[72px]">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/" className="text-sm text-text-muted hover:text-text-primary">
              ← Back to home
            </Link>
          </div>

          {submitted ? (
            <div className="bg-white border border-border-light rounded-xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-4">Application Received</h1>
              <p className="text-text-secondary mb-6">
                We review every application within 24 hours. If you're a fit, Tommy will reach out to schedule your 14-Day Prove-It setup.
              </p>
              <p className="text-sm text-text-muted">Questions? Call{" "}
                <a href="tel:8327370525" className="text-primary hover:underline">(832) 737-0525</a>
              </p>
            </div>
          ) : (
            <div className="bg-white border border-border-light rounded-xl p-8 lg:p-10 shadow-sm">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-3">
                  Lock Your Spot
                </p>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  5-Minute Application
                </h1>
                <p className="text-text-secondary">
                  Not everyone qualifies. We review every submission personally.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-1">Company name</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Smith HVAC"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="john@smithhvac.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="(713) 555-1234"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="trucks" className="block text-sm font-medium text-text-primary mb-1">How many trucks do you run?</label>
                  <select
                    id="trucks"
                    name="trucks"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="1-2">1–2 trucks</option>
                    <option value="3-5">3–5 trucks</option>
                    <option value="6-10">6–10 trucks</option>
                    <option value="10+">10+ trucks</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="revenue" className="block text-sm font-medium text-text-primary mb-1">Approximate annual revenue</label>
                  <select
                    id="revenue"
                    name="revenue"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="under-300k">Under $300K</option>
                    <option value="300k-500k">$300K – $500K</option>
                    <option value="500k-1m">$500K – $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="missed" className="block text-sm font-medium text-text-primary mb-1">How many after-hours calls do you think you miss per week?</label>
                  <select
                    id="missed"
                    name="missed"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="0-5">0–5</option>
                    <option value="5-15">5–15</option>
                    <option value="15-25">15–25</option>
                    <option value="25+">25+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pain" className="block text-sm font-medium text-text-primary mb-1">What is the biggest pain point in your business right now?</label>
                  <textarea
                    id="pain"
                    name="pain"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                    placeholder="e.g. We miss calls every night and don't even know how many..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application →"}
                </button>

                <p className="text-xs text-text-muted text-center">
                  By submitting, you agree to be contacted about the Revenue Recovery program.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
