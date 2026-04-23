import { Navigation } from "./components/navigation";
import { StickyCTA } from "./components/sticky-cta";
import { ExitModal } from "./components/exit-modal";
import { Hero } from "./components/sections/hero";
import { Problem } from "./components/sections/problem";
import { Calculator } from "./components/sections/calculator";
import { Features } from "./components/sections/features";
import { Process } from "./components/sections/process";
import { Criteria } from "./components/sections/criteria";
import { Proof } from "./components/sections/proof";
import { ROITable } from "./components/sections/roi-table";
import { FAQ } from "./components/sections/faq";
import { FinalCTA } from "./components/sections/final-cta";
import { Footer } from "./components/sections/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Calculator />
        <Features />
        <Process />
        <Criteria />
        <Proof />
        <ROITable />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ExitModal />
    </>
  );
}
