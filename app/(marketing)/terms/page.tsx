import { Navigation } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Terms of Service — PrimoLocal",
  description: "Terms of service for PrimoLocal partnership revenue systems.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-[72px] bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: April 21, 2026
          </p>

          <div className="space-y-10 text-foreground">
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">1. Partnership Model</h2>
              <p className="text-muted-foreground leading-relaxed">
                PrimoLocal operates on a partnership model, not a vendor-client relationship. We select partners through an application process. Acceptance is at our sole discretion. By applying, you agree to be evaluated for partnership fit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">2. The Prove-It Period</h2>
              <p className="text-muted-foreground leading-relaxed">
                The 30-day Prove-It period is completely free. No charges, no obligations. We install Piper, optimize your Google Business Profile, and activate review automation. Success metrics are defined in the Letter of Intent (LOI) signed before installation begins.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">3. Annual Partnership Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we hit the agreed-upon metrics by Day 30, the annual partnership commitment is $10,000/year, locked forever at that rate for as long as you remain a partner. This is a bilateral commitment: you commit to the partnership, we commit to your results.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">4. What We Deliver</h2>
              <p className="text-muted-foreground leading-relaxed">
                We deliver a complete client acquisition system: AI receptionist (Piper), Google Business Profile optimization, and review automation. Each partner receives white-glove setup customized to their business. We reserve the right to decline or terminate partnerships where the system cannot be effectively deployed.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">5. Your Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                Partners must provide accurate business information, grant necessary access to Google Business Profile and CRM systems, participate in weekly check-ins during the Prove-It period, and provide feedback that helps us improve the system for all partners.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">6. Data &amp; Access</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of your business data. We require access to your Google Business Profile, CRM, and call forwarding systems to deliver the service. We will never use your data to compete with you or sell it to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                PrimoLocal&apos;s liability is limited to the annual partnership fee paid. We are not liable for business decisions you make, market conditions, or results outside our direct control. We guarantee effort and system deployment, not specific revenue outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Either party may terminate the partnership with 30 days written notice. If you terminate, your locked pricing is forfeited. If we terminate for cause (non-payment, abuse, or refusal to participate), no refund is owed. If we terminate without cause, we will refund any unused portion of the annual fee on a prorated basis.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of the State of Texas. Any disputes will be resolved in Harris County, Texas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these terms from time to time. Active partners will be notified of material changes. Continued partnership constitutes acceptance of updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                PrimoLocal LLC
                <br />
                Houston, Texas
                <br />
                <a href="mailto:tommy@primolocal.com" className="text-navy hover:underline">
                  tommy@primolocal.com
                </a>
                <br />
                <a href="tel:832-743-2900" className="text-navy hover:underline">
                  (832) 743-2900
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
