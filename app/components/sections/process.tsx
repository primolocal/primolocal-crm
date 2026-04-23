"use client";

const STEPS = [
  {
    number: "1",
    title: "Run the Calculator",
    description: "See your missed-revenue number",
    detail: "Takes 60 seconds. No email required.",
  },
  {
    number: "2",
    title: "Lock Your Spot",
    description: "5-minute application. We review within 24 hours.",
    detail: "Not everyone qualifies.",
  },
  {
    number: "3",
    title: "14-Day Prove-It",
    description: "Novo goes live on your line. Real calls. Real bookings. Real numbers.",
    detail: "Zero cost. Zero commitment.",
  },
  {
    number: "4",
    title: "$10K/Year. Locked Forever.",
    description: "Day 14 Revenue Assessment. You see your number.",
    detail: "Like the results? Lock in at $10K/year — never increases. Not a fit? Walk away clean.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
            The Revenue Recovery Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary mb-4 leading-tight">
            Calculate → Apply → Prove-It → Lock
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            14 days to prove it works. Then lock or walk away.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-light md:-translate-x-px" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number badge */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="bg-bg-alt rounded-xl p-6 border border-border-light">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary mb-1">{step.description}</p>
                    <p className="text-sm text-text-muted">{step.detail}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
