"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import KineticBackdrop from "@/components/ui/KineticBackdrop";

const BEATS = [
  { line: "We build software the way old workshops built instruments —", word: "CRAFT" },
  { line: "slowly, precisely, and only when the work asks for it.", word: "SLOW" },
  { line: "No noise. No theatre. No filler.", word: "QUIET" },
  { line: "Just considered systems, made to last.", word: "LAST" },
  { line: "That is the only promise we make.", word: "INTENT" },
];

export default function ManifestoPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const st = pinScene({
      trigger: el,
      beats: BEATS.length,
      heightMultiplier: 0.85,
      onBeat: (b, p) => {
        setBeat(b);
        // beat-local progress (0..1 within each beat)
        setProgress((p * BEATS.length) % 1);
      },
    });
    return () => { st?.kill(); };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="studio-intro" className="section-y">
        <div className="container-x">
          <div className="col-span-12 md:col-start-4 md:col-span-9 max-w-4xl mx-auto">
            <span className="font-serif text-[var(--accent)] text-5xl block leading-none mb-4">&ldquo;</span>
            <div className="font-serif text-[clamp(28px,4.5vw,56px)] leading-[1.15]">
              {BEATS.map((b) => b.line).join(" ")}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const current = BEATS[beat];

  return (
    <section
      ref={sectionRef}
      id="studio-intro"
      className="pin-scene min-h-[100svh] bg-[var(--bone)] flex items-center"
    >
      <KineticBackdrop word={current.word} progress={progress} variant="purple" />

      <div className="container-x relative z-10 w-full">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">(02) — Manifesto</div>
            <div className="mt-8 flex flex-col gap-2">
              {BEATS.map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-px transition-all duration-500"
                  style={{
                    background: "var(--ink)",
                    opacity: i <= beat ? 1 : 0.2,
                    width: i === beat ? 24 : 12,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <span className="font-serif text-[var(--accent)] text-5xl block leading-none mb-6" aria-hidden>
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={beat}
                className="font-serif text-[clamp(32px,5vw,72px)] leading-[1.1] text-[var(--ink)] max-w-3xl"
                data-cursor="read"
                aria-label={current.line}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.012, delayChildren: 0.05 } },
                }}
              >
                {Array.from(current.line).map((ch, i) => (
                  <motion.span
                    key={`${beat}-${i}`}
                    aria-hidden
                    className="inline-block"
                    variants={{
                      hidden: { y: "100%", opacity: 0, rotate: 4 },
                      show: {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    style={{ display: ch === " " ? "inline" : "inline-block" }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 eyebrow tnum text-[var(--ink-soft)]">
              {String(beat + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
            </div>

            {/* Screen reader full text */}
            <div className="sr-only">
              {BEATS.map((b) => b.line).join(" ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
