"use client";

import { stats, clientNames } from "@/lib/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MarqueeRow from "@/components/ui/MarqueeRow";

export default function Studio() {
  return (
    <section id="studio" className="section-y">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">(06) — Studio</div>
          </div>

          <RevealOnScroll className="col-span-12 md:col-span-9">
            <h2 className="font-serif text-[clamp(40px,5.5vw,80px)] leading-[0.98] mb-10 text-[var(--ink)] max-w-3xl">
              A small team that ships what it promises.
            </h2>
            <div className="space-y-6 text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl">
              <p>
                Codarti was founded in Lusaka in 2019 by engineers tired of the
                gap between what software studios pitched and what they
                delivered.
              </p>
              <p>
                We stay small on purpose. Every project is led by a founder, not
                a producer. Every line of code is written by someone whose name
                you&apos;ll know.
              </p>
              <p>
                We work with founders, operators, and institutions across
                education, healthcare, finance, and government.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Clients marquee */}
        <div className="mt-20 rule-t pt-8">
          <div className="eyebrow mb-4">Selected partners</div>
          <MarqueeRow
            items={clientNames}
            duration={50}
            itemClassName="font-serif text-[clamp(28px,3.2vw,56px)] text-[var(--ink)] leading-none"
          />
        </div>

        <div className="mt-24 md:mt-32 rule-t pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[clamp(48px,5vw,80px)] leading-none text-[var(--ink)] tnum mb-3">
                {s.value}
              </div>
              <div className="text-xs text-[var(--ink-soft)] uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
