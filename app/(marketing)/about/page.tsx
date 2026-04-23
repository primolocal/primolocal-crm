import { Navigation } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, MapPin, Mail, Target, Heart, Handshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-[72px] bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
          <Badge className="mb-6 px-4 py-2 text-sm bg-navy/10 text-navy border-navy/20">
            Our Story
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight mb-6">
            Most Contractors Don&apos;t Have a Lead Problem
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            They have a capture problem. And it&apos;s costing them more than they think.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Avatar / Info */}
            <div className="text-center md:text-left">
              <img
                src="/images/headshot.png"
                alt="Tommy Premeaux"
                className="h-32 w-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-bold text-navy mb-1">Tommy Premeaux</h2>
              <p className="text-muted-foreground mb-6">Founder &amp; CEO, PrimoLocal</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Houston, Texas
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  (832) 743-2900
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  tommy@primolocal.com
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6 text-lg leading-relaxed text-foreground">
              <p className="font-semibold text-navy">
                Most contractors don&apos;t have a lead problem.
              </p>
              <p className="font-semibold text-navy">
                They have a capture problem.
              </p>
              <p>
                I didn&apos;t come from contracting. I came from watching the same thing happen, over and over, to businesses that were doing everything right.
              </p>
              <p>
                Good companies. Solid work. Plenty of demand.
              </p>
              <p>
                Ads running. Google rankings. Phone ringing.
              </p>
              <p>
                And still bleeding money in one place — missed calls.
              </p>
              <p>
                I&apos;d watch it happen in real time. A lead comes in at 2:47 PM. Goes to voicemail. Someone calls back at 6:15. By then the homeowner already booked the guy who picked up on the second ring.
              </p>
              <p className="font-semibold text-navy">
                Not because that other guy was better. Because he was available.
              </p>
              <p>
                So I went looking for the fix.
              </p>
              <p>
                Answering services? Too expensive, too robotic, and they don&apos;t know your business.
              </p>
              <p>
                Virtual receptionists? Limited hours, high turnover, inconsistent.
              </p>
              <p>
                AI phone bots? I&apos;ll be honest — most of them are terrible. I&apos;ve talked to the ones on the market. They mishear addresses. They loop. They make your business sound cheap. If you&apos;ve tried one and canceled, I get it. I would&apos;ve canceled too.
              </p>
              <p className="font-semibold text-navy">
                So I built a better one.
              </p>
              <p>
                Piper is an AI receptionist built specifically for service businesses. She answers on the first ring, 24/7. She qualifies the lead and drops it on your calendar before the caller hangs up.
              </p>
              <p>
                She knows your service area, your pricing windows, and your booking rules because we build her onboarding around your existing intake — your zip codes, your CRM fields, the way you answer the phone — not a generic template.
              </p>
              <p className="font-semibold text-navy">
                No voicemail. No callback gap. No &quot;we&apos;ll get back to you.&quot;
              </p>
              <p>
                Here&apos;s what becomes obvious the moment you see her work:
              </p>
              <p className="font-semibold text-navy">
                This isn&apos;t a tool. It&apos;s infrastructure.
              </p>
              <p>
                It&apos;s the thing that sits underneath everything else you&apos;re already paying for — the ads, the SEO, the trucks, the techs — and makes sure none of it leaks out the bottom.
              </p>
              <p>
                I&apos;m rolling Piper out to contractors in Houston first, five at a time, because every install gets white-glove setup — her voice, her script, your intake logic, your CRM. I&apos;d rather do five right than fifty sloppy.
              </p>
              <p className="font-semibold text-navy">
                Once Piper&apos;s in place, you stop chasing the calls you missed.
              </p>
              <p className="font-semibold text-navy">
                You start capturing the ones everyone else is still losing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-[2px] text-[#FF6B35] mb-4">
              Why We Exist
            </p>
            <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
              Partnership Over Profit
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 mb-4">
                <Target className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Skin in the Game</h3>
              <p className="text-muted-foreground">
                We only win if you win. The 30-day Prove-It period is free because we&apos;re confident
                the results will speak for themselves.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 mb-4">
                <Handshake className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Real Partnership</h3>
              <p className="text-muted-foreground">
                Weekly check-ins. Direct access to me. Your feedback shapes the product.
                This is what co-founding actually means.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 mb-4">
                <Heart className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Houston First</h3>
              <p className="text-muted-foreground">
                We&apos;re starting with Houston HVAC, plumbing, electrical, and roofing because
                we know this market. We&apos;ll expand when we&apos;ve proven it works here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-slate text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Have Questions? Let&apos;s Talk.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            No sales pitch. Just a real conversation about whether this is a fit for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:832-737-0525">
              <Button size="lg" className="bg-white text-navy hover:bg-gray-100 h-14 px-8 text-lg">
                Call Demo Line
              </Button>
            </a>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white text-white hover:bg-white/10"
              >
                Apply to Partner &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
