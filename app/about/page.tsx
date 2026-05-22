import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { stats, clientNames, process } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Codarti — A Software Studio in Lusaka, Zambia",
  description:
    "Codarti is a software development studio founded in Lusaka in 2019. Meet the team, how we work, and why Zambian businesses trust us to build their software.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Nav />

      <header className="container-x pt-40 pb-16 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">The studio</div>
        <h1 className="font-serif text-[clamp(44px,7.5vw,130px)] leading-[0.95] tracking-[-0.025em] max-w-[15ch]">
          A software studio built in Lusaka.
        </h1>
      </header>

      <section className="container-x pb-16 grid grid-cols-12 gap-x-8 gap-y-8">
        <div className="col-span-12 md:col-span-4">
          <div className="eyebrow">Our story</div>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-6 text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl">
          <p>
            Codarti was founded in Lusaka in 2019 by engineers tired of the gap
            between what software studios pitched and what they delivered. We
            set out to build a different kind of software development company —
            one measured by what ships and what lasts.
          </p>
          <p>
            We stay small on purpose. Every project is led by a founder, not a
            producer. Every line of code is written by someone whose name you
            will know.
          </p>
          <p>
            We work with founders, operators, and institutions across education,
            healthcare, finance, and government — in Zambia and across the wider
            region.
          </p>
        </div>
      </section>

      <section className="container-x section-y">
        <div className="rule-t pt-12">
          <h2 className="font-serif text-[clamp(32px,5vw,72px)] leading-[1] mb-12">
            How we work
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.title}>
                <div className="eyebrow tnum mb-4">{step.n}</div>
                <h3 className="font-serif text-[clamp(24px,2.5vw,36px)] leading-none mb-3 text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-8">
        <div className="rule-t pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[clamp(44px,5vw,80px)] leading-none text-[var(--ink)] tnum mb-3">
                {s.value}
              </div>
              <div className="text-xs text-[var(--ink-soft)] uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x section-y pt-16">
        <div className="rule-t pt-12">
          <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1] mb-8">
            Selected partners
          </h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {clientNames.map((name) => (
              <li
                key={name}
                className="font-serif text-[clamp(20px,2.2vw,32px)] text-[var(--ink-soft)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x section-y pt-0">
        <div className="rule-t pt-16 flex flex-col items-start gap-8">
          <h2 className="font-serif text-[clamp(32px,5vw,72px)] leading-[1] max-w-[16ch]">
            Based in Lusaka. Working with teams everywhere.
          </h2>
          <p className="text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
            Our studio is in Chawama, Lusaka. We work async with teams across
            time zones from UTC&minus;5 to UTC+8.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium transition-colors hover:bg-[var(--ink)]"
          >
            Work with us →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
