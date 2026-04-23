import { Navigation } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/footer";
import { Features } from "@/components/marketing/features";
import { Criteria } from "@/components/marketing/criteria";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Clock, FileCheck } from "lucide-react";

const phases = [
  {
    icon: Users,
    title: "Apply & Qualify",
    description: "5-minute application. We review within 24 hours. If you're a fit, we schedule a 15-minute discovery call.",
    step: "1",
  },
  {
    icon: FileCheck,
    title: "Sign the LOI",
    description: "Letter of Intent defines success metrics together. Bilateral commitment — you're in, we're in.",
    step: "2",
  },
  {
    icon: Clock,
    title: "30-Day Prove-It",
    description: "Piper goes live. GBP gets optimized. Review automation starts. Weekly check-ins with Tommy.",
    step: "3",
  },
];

export default function PartnershipPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-[72px] bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-sm border-orange-400 text-orange-600 bg-orange-50"
          >
            🔥 7 of 10 Co-Founder spots remaining
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight mb-6">
            Partnership, Not Vendorship
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            We&apos;re selecting 10 Houston contractors to co-found a complete client acquisition system.
            Not a tool you buy. A system we build together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-navy hover:bg-navy-light text-white"
              >
                Apply Now →
              </Button>
            </Link>
            <a href="tel:832-737-0525">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-navy text-navy"
              >
                Call Demo Line
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <Features />

      {/* The 3 Phases */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-[2px] text-orange-500 mb-4">
              How Partnership Works
            </p>
            <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
              Three Phases. One Goal. Your Growth.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase) => (
              <div
                key={phase.title}
                className="relative rounded-xl border bg-white p-8 hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white text-sm font-bold">
                  {phase.step}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 mb-4">
                  <phase.icon className="h-6 w-6 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Day 30: Hit metrics → Commit $10K/year (locked forever). Miss → Walk away, no charge.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-navy hover:bg-navy-light text-white">
                Start Your Application →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Criteria */}
      <Criteria />

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
              Partnership FAQ
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
