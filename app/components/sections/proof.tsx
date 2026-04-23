"use client";

const STATS = [
  { value: "5", label: "spots max. Then the door closes." },
  { value: "14 days", label: "to prove value before you commit" },
  { value: "$10K/yr", label: "locked forever, payment plan available" },
];

export function Proof() {
  return (
    <section id="proof" className="section-padding bg-bg-alt">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">Proof</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary mb-4 leading-tight">
            The First 5 Are Being Built Right Now
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We're brand new. That's why the rate is locked.
          </p>
        </div>

        <div className="bg-white border border-border-light rounded-xl p-8 lg:p-10 shadow-sm mb-12">
          <p className="text-text-secondary leading-relaxed mb-6">
            The 5 Houston HVAC contractors who lock in first get the lowest price this system will ever be offered at —{" "}
            <strong className="text-text-primary">$10,000/year, locked forever.</strong>
          </p>
          <p className="text-text-secondary leading-relaxed mb-6">
            Tommy builds Novo personally, reviews every call, tunes every prompt.
          </p>
          <p className="text-text-secondary leading-relaxed">
            <strong className="text-text-primary">You could be one of them.</strong>
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {STATS.map((s) => (
            <div key={s.value} className="text-center">
              <p className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">{s.value}</p>
              <p className="text-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Revenue Proven on YOUR Line
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            14-Day Prove-It Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Locked Forever Pricing
          </span>
        </div>
      </div>
    </section>
  );
}
