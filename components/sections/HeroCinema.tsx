"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion, prefersHoverPointer } from "@/lib/motion";
import { useIsMobile } from "@/lib/useIsMobile";
import FloatingGlyph from "@/components/ui/FloatingGlyph";
import DotField from "@/components/ui/DotField";
import SplitText from "@/components/ui/SplitText";
import ReelModal from "@/components/ui/ReelModal";

const BEATS = [
  {
    headline: "Software,\nmade with intent.",
    sub: "A software craft studio. Lusaka.",
  },
  {
    headline: "We design\nwhat survives\nthe brief.",
    sub: "Interface systems built around clarity.",
  },
  {
    headline: "We engineer\nwhat survives\nthe load.",
    sub: "Architecture that ships and scales.",
  },
  {
    headline: "We ship\nwhat survives\nthe user.",
    sub: "Available — booking Q3 2026.",
  },
];

export default function HeroCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [, setProgress] = useState(0);
  const [reelOpen, setReelOpen] = useState(false);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const reduced = prefersReducedMotion();
  const isMobile = useIsMobile();
  const stacked = reduced || isMobile;

  // Mouse parallax for the prop stage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.5 });
  const propX = useTransform(smx, (v) => `${v * 18}px`);
  const propY = useTransform(smy, (v) => `${v * 12}px`);
  const glyphX = useTransform(smx, (v) => `${v * 8}px`);
  const glyphY = useTransform(smy, (v) => `${v * 6}px`);

  useEffect(() => {
    setParallaxEnabled(prefersHoverPointer());
  }, []);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!parallaxEnabled) return;
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 2);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 2);
  };
  const handleLeave = () => {
    if (!parallaxEnabled) return;
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || stacked) return;

    const st = pinScene({
      trigger: el,
      beats: BEATS.length,
      heightMultiplier: 0.95,
      onBeat: (b, p) => {
        setBeat(b);
        setProgress(p);
      },
    });
    return () => { st?.kill(); };
  }, [stacked]);

  // ── Stacked fallback (mobile + reduced-motion) ─────────────────────────
  if (stacked) {
    return (
      <section className="section-y pt-32 relative overflow-hidden">
        <DotField density={16} accentRatio={0.08} className="opacity-90" />
        <div className="container-x relative z-10">
          <div className="eyebrow mb-10">A software craft studio · Est. Lusaka</div>
          {BEATS.map((b, i) => (
            <div key={i} className="mb-20">
              <h2 className="font-serif text-[clamp(40px,11vw,96px)] leading-[0.95] whitespace-pre-line text-[var(--ink)]">
                {b.headline}
              </h2>
              <p className="text-[var(--ink-soft)] text-base mt-6">{b.sub}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setReelOpen(true)}
            data-cursor="play"
            className="mt-4 group inline-flex items-center gap-3 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            aria-label="Watch showreel"
          >
            <span className="w-11 h-11 rounded-full border border-[var(--ink)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
              <Play className="w-4 h-4 translate-x-px" strokeWidth={1.5} fill="currentColor" />
            </span>
            <span className="eyebrow !text-current">Watch reel — 90s</span>
          </button>
        </div>
        <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} src="/hero/reel.mp4" />
      </section>
    );
  }

  const current = BEATS[beat];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="pin-scene min-h-[100svh] flex flex-col justify-between pt-32 pb-16 bg-[var(--bone)]"
    >
      {/* Dot-grid backdrop (static, low opacity) */}
      <div className="dot-grid" aria-hidden />

      {/* Animated dot field — twinkling background with orange accent dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={parallaxEnabled ? { x: propX, y: propY } : undefined}
        aria-hidden
      >
        <DotField density={22} accentRatio={0.08} />
      </motion.div>

      {/* Floating C glyph — centered anchor with subtle parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={parallaxEnabled ? { x: glyphX, y: glyphY } : undefined}
      >
        <FloatingGlyph beat={beat} progress={0} />
      </motion.div>

      {/* Beat counter rail */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden md:flex">
        {BEATS.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: i === beat ? 1 : 0.35 }}
          >
            <span className="eyebrow tnum text-[var(--ink)]">
              0{i + 1}
            </span>
            <div
              className="h-px transition-all duration-500"
              style={{
                width: i === beat ? 40 : 12,
                background: i === beat ? "var(--accent)" : "var(--ink)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="container-x flex-1 flex flex-col justify-center relative z-20">
        <div className="eyebrow mb-10">
          A software craft studio · Est. Lusaka
        </div>

        {beat === 0 ? (
          <SplitText
            as="h1"
            mode="char"
            trigger="load"
            stagger={0.025}
            className="font-serif text-[clamp(56px,9.5vw,180px)] leading-[0.9] tracking-[-0.025em] text-[var(--ink)] max-w-[14ch] whitespace-pre-line"
          >
            {current.headline}
          </SplitText>
        ) : (
          <AnimatePresence mode="wait">
            <motion.h1
              key={beat}
              initial={{ opacity: 0, y: 40, rotate: 1.5, x: 30 }}
              animate={{ opacity: 1, y: 0, rotate: 0, x: 0 }}
              exit={{ opacity: 0, y: -40, rotate: -1.5, x: -30 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(56px,9.5vw,180px)] leading-[0.9] tracking-[-0.025em] text-[var(--ink)] max-w-[14ch] whitespace-pre-line"
            >
              {current.headline}
            </motion.h1>
          </AnimatePresence>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${beat}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-[var(--ink-soft)] text-lg max-w-md"
          >
            {current.sub}
          </motion.p>
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setReelOpen(true)}
          data-cursor="play"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 group inline-flex items-center gap-3 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          aria-label="Watch showreel"
        >
          <span className="w-11 h-11 rounded-full border border-[var(--ink)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
            <Play className="w-4 h-4 translate-x-px" strokeWidth={1.5} fill="currentColor" />
          </span>
          <span className="eyebrow !text-current">Watch reel — 90s</span>
        </motion.button>
      </div>

      {/* Bottom bar */}
      <div className="container-x flex items-end justify-between relative z-20">
        <div className="flex items-center gap-3 text-[var(--ink-soft)] text-xs tracking-widest uppercase">
          <span className="block w-px h-12 bg-[var(--ink)]" />
          Scroll
        </div>
        <div className="font-serif text-xs text-[var(--ink-soft)] tnum hidden sm:block">
          ({String(beat + 1).padStart(2, "0")}) — {BEATS.length} beats
        </div>
      </div>

      <ReelModal
        open={reelOpen}
        onClose={() => setReelOpen(false)}
        src="/hero/reel.mp4"
      />
    </section>
  );
}
