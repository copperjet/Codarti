"use client";

import { faqs } from "@/lib/content";
import Accordion from "@/components/ui/Accordion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FAQ() {
  return (
    <section id="faq" className="section-y">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-12 gap-x-8 mb-16 items-end">
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow">(08) — Questions</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-serif text-[clamp(40px,6vw,96px)] leading-[0.95]">
                Frequently <br />
                asked.
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        <div className="rule-t">
          {faqs.map((f, i) => (
            <Accordion
              key={f.q}
              q={f.q}
              a={f.a}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
