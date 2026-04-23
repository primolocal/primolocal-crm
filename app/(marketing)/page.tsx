import { Navigation } from "@/components/marketing/navigation";
import { Hero } from "@/components/marketing/hero";
import { Problem } from "@/components/marketing/problem";
import { RevenueCalculator } from "@/components/marketing/revenue-calculator";
import { Features } from "@/components/marketing/features";
import { Process } from "@/components/marketing/process";
import { Criteria } from "@/components/marketing/criteria";
import { Testimonial } from "@/components/marketing/testimonial";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <RevenueCalculator />
      <Features />
      <Process />
      <Criteria />
      <Testimonial />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
