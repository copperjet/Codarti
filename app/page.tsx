import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, reviewsSchema } from "@/lib/seo";
import { faqs, testimonials } from "@/lib/content";
import Nav from "@/components/sections/Nav";
import HeroCinema from "@/components/sections/HeroCinema";
import Marquee from "@/components/sections/Marquee";
import ManifestoPinned from "@/components/sections/ManifestoPinned";
import WorkCinema from "@/components/sections/WorkCinema";
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
      <JsonLd data={[faqSchema(faqs), ...reviewsSchema(testimonials)]} />
      <Nav />
      <HeroCinema />
      <Marquee />
      <ManifestoPinned />
      <section id="work">
        <WorkCinema />
      </section>
      <div className="container-x">
        <Link
          href="/work"
          className="group flex items-center justify-between gap-6 rule-t py-10 text-[var(--ink)]"
        >
          <span className="font-serif text-[clamp(24px,3.2vw,48px)] leading-none">
            See all case studies
          </span>
          <span className="eyebrow shrink-0 group-hover:text-[var(--accent)] transition-colors">
            View work →
          </span>
        </Link>
      </div>
      <CapabilitiesPinned />
      <div className="container-x">
        <Link
          href="/services"
          className="group flex items-center justify-between gap-6 rule-t py-10 text-[var(--ink)]"
        >
          <span className="font-serif text-[clamp(24px,3.2vw,48px)] leading-none">
            Explore our services
          </span>
          <span className="eyebrow shrink-0 group-hover:text-[var(--accent)] transition-colors">
            View services →
          </span>
        </Link>
      </div>
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
