"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import KineticBackdrop from "@/components/ui/KineticBackdrop";
import ScreenshotStack from "@/components/ui/ScreenshotStack";
import Media from "@/components/ui/Media";
import { projects } from "@/lib/content";

const CINEMA_PROJECTS = projects; // all 5

const tilts = [-6, 4, -3, 5, -4, 3];
const backdropVariants: Array<"lime" | "purple" | "pink"> = [
  "lime", "purple", "pink", "lime", "purple", "pink",
];

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

  // ── Reduced-motion fallback ──────────────────────────────────────────────
  if (reduced) {
    return (
      <section className="section-y">
        <div className="container-x">
          {CINEMA_PROJECTS.map((p) => (
            <a
              key={p.slug}
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

  return (
    <section
      ref={sectionRef}
      className="pin-scene min-h-[100svh] bg-[var(--bone)] overflow-hidden"
    >
      {/* Kinetic backdrop */}
      <KineticBackdrop
        word={p.name}
        progress={progress}
        variant={backdropVariants[beat % backdropVariants.length]}
      />

      {/* Screenshot stack — full-section absolute flow layer (desktop only) */}
      {p.screenshots && p.screenshots.length > 0 && (
        <div className="absolute inset-0 hidden lg:block z-[5]">
          <ScreenshotStack
            screenshots={p.screenshots}
            swatch={p.swatch}
            alt={p.name}
            projectKey={p.slug}
            progress={progress}
          />
        </div>
      )}

      {/* Left beat rail */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
        {CINEMA_PROJECTS.map((proj, i) => (
          <div
            key={proj.slug}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: i === beat ? 1 : 0.3 }}
          >
            <span className="tnum eyebrow text-[var(--ink)]">{proj.index}</span>
            <div
              className="h-px transition-all duration-500"
              style={{
                background: i === beat ? "var(--accent-2)" : "var(--rule)",
                width: i === beat ? 40 : 10,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Desktop layout: info left + stack right ──────────────────────── */}
      <div className="absolute inset-0 hidden lg:flex items-center z-10 px-24 gap-16">

        {/* LEFT: project info */}
        <div className="flex-1 max-w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.slug + "-info"}
              initial={{ opacity: 0, x: -24, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 24, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="eyebrow tnum text-[var(--ink-soft)]">
                {p.index} / 0{CINEMA_PROJECTS.length}
              </div>
              <h3 className="font-serif text-[clamp(40px,4vw,72px)] leading-[0.95] text-[var(--ink)] tracking-[-0.02em]">
                {p.name}
              </h3>
              <p className="text-[var(--ink-soft)] text-sm leading-relaxed max-w-[32ch]">
                {p.description}
              </p>
              <p className="font-serif italic text-[var(--ink)] text-sm">
                — {p.outcome}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs border border-[var(--rule)] px-2.5 py-1 rounded-full text-[var(--ink-soft)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-2 text-sm text-[var(--ink)] group hover:text-[var(--accent-2)] transition-colors"
              >
                {p.url}
                <ArrowUpRight
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: empty — ScreenshotStack flows full-width as sibling absolute layer */}
        <div className="flex-1" aria-hidden />
      </div>

      {/* ── Mobile layout: centered draggable card ───────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6 lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug + "-mobile"}
            initial={{ opacity: 0, scale: 0.88, rotate: tilt - 6, y: 60 }}
            animate={{ opacity: 1, scale: 1, rotate: tilt, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: tilt + 6, y: -50 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            data-cursor="drag"
            className="tilt-card relative w-full max-w-[320px] aspect-[4/5] overflow-hidden rounded-md cursor-grab active:cursor-grabbing"
            style={{ background: p.swatch }}
          >
            <Media
              src={p.screenshots?.[2] ?? p.image}
              swatch={p.swatch}
              alt={p.name}
              className="absolute inset-0"
              sizes="90vw"
            />
            {/* Dark scrim */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(15,14,20,0.55) 0%, transparent 55%)" }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="eyebrow tnum text-[var(--bone)]/80">{p.index}</span>
              <div>
                <h3 className="font-serif text-[clamp(32px,8vw,56px)] text-[var(--bone)] leading-[0.9]">
                  {p.name}
                </h3>
                <p className="text-[var(--bone)]/70 text-xs mt-2">{p.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SR-only full content for accessibility */}
      <div className="sr-only">
        {CINEMA_PROJECTS.map((proj) => (
          <div key={proj.slug}>
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            <p>{proj.outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
