"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import KineticBackdrop from "@/components/ui/KineticBackdrop";
import Media from "@/components/ui/Media";
import { projects } from "@/lib/content";

const CINEMA_PROJECTS = projects.slice(0, 3);

const tilts = [-6, 4, -3];
const backdropVariants: Array<"lime" | "purple" | "pink"> = ["purple", "lime", "pink"];

export default function WorkCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();

  const goNext = () => setBeat((b) => Math.min(CINEMA_PROJECTS.length - 1, b + 1));
  const goPrev = () => setBeat((b) => Math.max(0, b - 1));
  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -80) goNext();
    else if (info.offset.x > 80) goPrev();
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const st = pinScene({
      trigger: el,
      beats: CINEMA_PROJECTS.length,
      heightMultiplier: 1.1,
      onBeat: (b, p) => {
        setBeat(b);
        setProgress((p * CINEMA_PROJECTS.length) % 1);
      },
    });
    return () => { st?.kill(); };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="section-y">
        <div className="container-x">
          {CINEMA_PROJECTS.map((p) => (
            <a
              key={p.name}
              href={`https://${p.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rule-t py-16"
            >
              <h3 className="font-serif text-[clamp(40px,7vw,100px)] leading-none">{p.name}</h3>
              <p className="text-[var(--ink-soft)] mt-4">{p.description}</p>
            </a>
          ))}
        </div>
      </section>
    );
  }

  const p = CINEMA_PROJECTS[beat];
  const tilt = tilts[beat % tilts.length];
  const next = CINEMA_PROJECTS[(beat + 1) % CINEMA_PROJECTS.length];

  return (
    <section
      ref={sectionRef}
      className="pin-scene min-h-[100svh] bg-[var(--bone)] overflow-hidden"
    >
      {/* Kinetic backdrop — project name huge */}
      <KineticBackdrop word={p.name} progress={progress} variant={backdropVariants[beat % backdropVariants.length]} />

      {/* Left beat rail */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20 hidden md:flex">
        {CINEMA_PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: i === beat ? 1 : 0.3 }}
          >
            <span className="tnum eyebrow text-[var(--ink)]">{proj.index}</span>
            <div
              className="h-px transition-all duration-500"
              style={{
                background: i === beat ? "var(--accent-2)" : "var(--ink)",
                width: i === beat ? 48 : 12,
              }}
            />
          </div>
        ))}
      </div>

      {/* Next-card peek sliver — hints the upcoming project on the right edge */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[10vw] max-w-[120px] aspect-[4/5] z-5 hidden md:block pointer-events-none"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`peek-${next.name}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 0.7, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-l-md overflow-hidden tilt-card"
            style={{ transform: "rotate(-3deg) translateX(35%)" }}
          >
            <Media src={next.image} swatch={next.swatch} alt={next.name} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main tilted card frame — draggable to scrub beats */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6 md:px-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.88, rotate: tilt - 6, y: 60 }}
            animate={{ opacity: 1, scale: 1, rotate: tilt, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: tilt + 6, y: -50 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            data-cursor="drag"
            className="tilt-card relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-md cursor-grab active:cursor-grabbing"
            style={{
              background: `linear-gradient(135deg, ${p.swatch} 0%, ${p.swatch}dd 100%)`,
            }}
          >
            {/* Cover image — falls back to swatch if asset missing */}
            <Media
              src={p.image}
              swatch={p.swatch}
              alt={p.name}
              className="absolute inset-0"
              sizes="(max-width: 768px) 90vw, 480px"
            />

            {/* Decorative overlay geometry */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div
                className="absolute -top-12 -right-12 w-56 h-56 rounded-full"
                style={{ background: "var(--accent)", opacity: 0.2, filter: "blur(30px)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full"
                style={{ background: "var(--accent-3)", opacity: 0.25, filter: "blur(24px)" }}
              />
              <svg className="absolute top-6 right-6 w-10 h-10 opacity-70" viewBox="0 0 56 56" fill="none" aria-hidden>
                <path d="M28 4 L34 22 L52 28 L34 34 L28 52 L22 34 L4 28 L22 22 Z" fill="var(--bone)" opacity="0.9" />
              </svg>
            </div>

            {/* Dark scrim so title stays legible over imagery */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(15,14,20,0.55) 0%, transparent 55%)" }}
              aria-hidden
            />

            {/* Title + visit pill */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex items-start justify-between">
                <span className="eyebrow tnum text-[var(--bone)]/80">{p.index}</span>
                <a
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  onPointerDown={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--bone)]/15 text-[var(--bone)] hover:bg-[var(--bone)] hover:text-[var(--ink)] transition-colors backdrop-blur-sm border border-[var(--bone)]/20"
                >
                  Visit <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              </div>
              <div>
                <h3 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--bone)] leading-[0.9] tracking-[-0.02em]">
                  {p.name}
                </h3>
                <p className="text-[var(--bone)]/85 text-sm mt-3 max-w-[26ch]">{p.outcome}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-xs uppercase tracking-widest text-[var(--ink-soft)] hidden md:block">
        Drag ↔ to browse · {beat + 1} / {CINEMA_PROJECTS.length}
      </div>

      {/* Right meta panel */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 max-w-xs hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 32, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -32, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="eyebrow tnum text-[var(--ink-soft)]">{p.index} / 03</div>
            <h3 className="font-serif text-[clamp(28px,3vw,48px)] leading-[1] text-[var(--ink)]">
              {p.name}
            </h3>
            <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{p.description}</p>
            <p className="font-serif italic text-[var(--ink)] text-sm">— {p.outcome}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs border border-[var(--rule)] px-2.5 py-1 rounded-full text-[var(--ink-soft)] bg-[var(--bone)]/60 backdrop-blur-sm">{t}</span>
              ))}
            </div>
            <a
              href={`https://${p.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--ink)] pt-2 group hover:text-[var(--accent-2)] transition-colors"
              data-cursor="view"
            >
              Visit {p.url}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
