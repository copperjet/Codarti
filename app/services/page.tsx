import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { capabilities } from "@/lib/content";
import { pageMetadata, breadcrumbSchema, servicesSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Software Development Services in Lusaka, Zambia",
  description:
    "Codarti's software development services in Lusaka — custom web and mobile app development, product design, technical strategy, and engineering advisory for Zambian teams.",
  path: "/services",
});

const includes: Record<string, string[]> = {
  Engineering: [
    "Web applications — Next.js, React, TypeScript",
    "Mobile apps for Android and iOS — React Native",
    "APIs, databases, and edge infrastructure",
    "Performance, security, and reliability work",
  ],
  Design: [
    "Product and interface design",
    "Design systems and component libraries",
    "Brand identity and visual systems",
    "Usability and accessibility reviews",
  ],
  Strategy: [
    "Product strategy and roadmap shaping",
    "Technical due diligence and architecture review",
    "Scoping and discovery workshops",
    "Build-versus-buy decisions",
  ],
  Advisory: [
    "Fractional CTO and engineering leadership",
    "Hiring loops and technical interviews",
    "Vendor and tooling selection",
    "Unblocking stalled projects",
  ],
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...servicesSchema(capabilities),
        ]}
      />
      <Nav />

      <header className="container-x pt-40 pb-16 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">What we do</div>
        <h1 className="font-serif text-[clamp(44px,7vw,120px)] leading-[0.95] tracking-[-0.025em] max-w-[16ch]">
          Software development services in Lusaka, Zambia
        </h1>
        <p className="mt-10 text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
          Codarti is a software development company in Lusaka building custom
          web and mobile applications for Zambian businesses, institutions, and
          founders. We work across four practices — engineering, design,
          strategy, and advisory — and most engagements draw on more than one.
        </p>
      </header>

      <div className="container-x">
        {capabilities.map((c) => (
          <section
            key={c.title}
            id={c.title.toLowerCase()}
            className="rule-t py-16 md:py-24 grid grid-cols-12 gap-x-8 gap-y-8"
          >
            <div className="col-span-12 md:col-span-4">
              <div className="eyebrow tnum mb-4">{c.n}</div>
              <div className="cap-glyph mb-6" aria-hidden>
                {c.glyph}
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,56px)] leading-[1] text-[var(--ink)]">
                {c.title}
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl">
                {c.body}
              </p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {(includes[c.title] ?? []).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--ink)] text-sm"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="container-x section-y">
        <div className="rule-t pt-16 flex flex-col items-start gap-8">
          <h2 className="font-serif text-[clamp(32px,5vw,72px)] leading-[1] max-w-[18ch]">
            Have a project in mind? Let&apos;s scope it together.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium transition-colors hover:bg-[var(--ink)]"
          >
            Start a project →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
