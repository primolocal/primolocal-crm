import { Navigation } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Privacy Policy — PrimoLocal",
  description: "Privacy policy for PrimoLocal partnership revenue systems.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-[72px] bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: April 21, 2026
          </p>

          <div className="space-y-10 text-foreground">
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">1. What We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect business information you provide during application and partnership: company name, contact details, service area, and call data. We do not sell your data. Ever.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">2. How We Use It</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information is used solely to deliver and optimize your client acquisition system: configuring Piper, optimizing your Google Business Profile, and running review automation. Nothing else.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">3. Call Recordings</h2>
              <p className="text-muted-foreground leading-relaxed">
                Piper records calls for quality assurance and training purposes. Recordings are stored securely and never shared with third parties. You can request deletion at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use industry-standard encryption and access controls. Your data is stored in secure, SOC 2 compliant infrastructure. We treat your business data like it was our own.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We integrate with Google Business Profile, GoHighLevel, and Retell AI for core functionality. Each partner maintains their own privacy policies. We only share the minimum data required for these services to function.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can request access, correction, or deletion of your data at any time by emailing tommy@primolocal.com or calling (832) 743-2900.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">7. Changes</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we update this policy, we&apos;ll notify active partners directly. We don&apos;t bury changes in fine print.
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
