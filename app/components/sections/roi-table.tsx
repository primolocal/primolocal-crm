"use client";

export function ROITable() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
            What You Get
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-text-primary mb-4 leading-tight">
            One $3K Job Pays for the Year
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate">
                <th className="py-4 pr-4 text-sm font-semibold text-text-muted uppercase tracking-wider">Feature</th>
                <th className="py-4 px-4 text-sm font-semibold text-text-muted uppercase tracking-wider text-center">Voicemail</th>
                <th className="py-4 px-4 text-sm font-semibold text-action uppercase tracking-wider text-center">Novo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {[
                ["After-hours answering", "❌", "✅ 24/7 live voice"],
                ["Appointment booking", "❌", "✅ Direct to calendar"],
                ["Emergency forwarding", "❌", "✅ Instant dispatch"],
                ["Lead qualification", "❌", "✅ Pre-screens callers"],
                ["Confirmation texts", "❌", "✅ Automated"],
                ["Revenue tracking", "❌", "✅ Day 14 report"],
                ["Annual cost", "$0", "$10K locked"],
              ].map(([feature, vm, novo]) => (
                <tr key={feature} className="hover:bg-bg-alt transition-colors">
                  <td className="py-4 pr-4 text-text-primary font-medium">{feature}</td>
                  <td className="py-4 px-4 text-center text-text-muted">{vm}</td>
                  <td className="py-4 px-4 text-center text-success font-semibold">{novo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
