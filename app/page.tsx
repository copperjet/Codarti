import Nav from "@/components/sections/Nav";
import HeroCinema from "@/components/sections/HeroCinema";
import Marquee from "@/components/sections/Marquee";
import ManifestoPinned from "@/components/sections/ManifestoPinned";
import WorkCinema from "@/components/sections/WorkCinema";
import WorkBento from "@/components/sections/WorkBento";
import CapabilitiesPinned from "@/components/sections/CapabilitiesPinned";
import Process from "@/components/sections/Process";
import Studio from "@/components/sections/Studio";
import TestimonialsPinned from "@/components/sections/TestimonialsPinned";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CtaPanel from "@/components/sections/CtaPanel";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <Nav />
      <HeroCinema />
      <Marquee />
      <ManifestoPinned />
      <section id="work">
        <WorkCinema />
        <WorkBento />
      </section>
      <CapabilitiesPinned />
      <Process />
      <Studio />
      <TestimonialsPinned />
      <FAQ />
      <Contact />
      <CtaPanel />
      <Footer />
    </main>
  );
}
