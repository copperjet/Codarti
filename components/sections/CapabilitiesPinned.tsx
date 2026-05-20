"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import { capabilities } from "@/lib/content";
import KineticBackdrop from "@/components/ui/KineticBackdrop";

export default function CapabilitiesPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const st = pinScene({
      trigger: el,
      beats: capabilities.length,
      heightMultiplier: 0.9,
      onBeat: (b, p) => {
        setBeat(b);
        setProgress((p * capabilities.length) % 1);
      },
    });
    return () => { st?.kill(); };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="capabilities" className="section-y bg-[var(--paper)]">
        <div className="container-x">
          <div className="eyebrow mb-12">(04) — Capabilities</div>
          <div className="rule-t">
            {capabilities.map((c) => (
              <div key={c.n} className="rule-b py-10">
                <div className="flex items-start gap-8">
                  <span className="eyebrow tnum w-12 shrink-0">{c.n}</span>
                  <div>
                    <h3 className="font-serif text-[clamp(32px,4vw,56px)] mb-4">{c.title}</h3>
                    <p className="text-[var(--ink-soft)] text-lg max-w-2xl">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = capabilities[beat];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="pin-scene min-h-[100svh] bg-[var(--paper)] flex items-center"
    >
      <KineticBackdrop word={current.title.toUpperCase()} progress={progress} variant="lime" />

      <div className="container-x relative z-10 w-full">
        <div className="grid grid-cols-12 gap-x-8 items-end mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">(04) — Capabilities</div>
            <div className="mt-8 flex flex-col gap-2.5">
              {capabilities.map((c, i) => (
                <div key={c.n} className="flex items-center gap-3 transition-all duration-500"
                  style={{ opacity: i === beat ? 1 : 0.3 }}>
                  <span className="eyebrow tnum">{c.n}</span>
                  <div className="h-px flex-1 bg-[var(--rule)]" />
                  <span className="text-xs text-[var(--ink-soft)] hidden md:block">{c.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={beat}
                initial={{ opacity: 0, y: 60, x: -30, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -40, x: 30, rotate: 1.5 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-6 mb-8">
                  <span className="cap-glyph" aria-hidden>{current.glyph}</span>
                  <h2 className="font-serif text-[clamp(64px,10vw,160px)] leading-[0.9] text-[var(--ink)]">
                    {current.title}
                  </h2>
                </div>
                <p className="text-[var(--ink-soft)] text-xl leading-relaxed max-w-2xl">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="sr-only">
              {capabilities.map((c) => `${c.title}: ${c.body}`).join(". ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
