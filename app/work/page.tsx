import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { projects } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — Software Projects & Case Studies",
  description:
    "Software projects built by Codarti in Lusaka, Zambia — case studies across education, healthcare, finance, fintech, and property management.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <Nav />

      <header className="container-x pt-40 pb-16 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">Selected work</div>
        <h1 className="font-serif text-[clamp(44px,8vw,140px)] leading-[0.92] tracking-[-0.025em]">
          Software we&apos;ve
          <br />
          built.
        </h1>
        <p className="mt-10 text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
          A selection of products Codarti has designed and engineered for teams
          across Zambia and the wider region — from queue systems and school
          platforms to payments and predictive analytics.
        </p>
      </header>

      <div className="container-x section-y pt-8">
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-md"
                  style={{ background: p.swatch }}
                >
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-[clamp(26px,3vw,40px)] leading-none text-[var(--ink)]">
                    {p.name}
                  </h2>
                  <span className="eyebrow tnum shrink-0">{p.year}</span>
                </div>
                <p className="mt-3 text-[var(--ink-soft)] text-sm leading-relaxed max-w-[42ch]">
                  {p.description}
                </p>
                <p className="mt-2 font-serif italic text-[var(--ink)] text-sm">
                  — {p.outcome}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  Read case study →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
