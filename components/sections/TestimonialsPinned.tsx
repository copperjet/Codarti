"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import { testimonials } from "@/lib/content";
import KineticBackdrop from "@/components/ui/KineticBackdrop";
import Media from "@/components/ui/Media";

export default function TestimonialsPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const st = pinScene({
      trigger: el,
      beats: testimonials.length,
      heightMultiplier: 0.85,
      onBeat: (b, p) => {
        setBeat(b);
        setProgress((p * testimonials.length) % 1);
      },
    });
    return () => { st?.kill(); };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="section-y bg-[var(--paper)]">
        <div className="container-x">
          <div className="eyebrow mb-12">(07) — In their words</div>
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rule-b py-10">
              <p className="font-serif text-[clamp(24px,3.5vw,48px)] leading-[1.2]">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 text-sm text-[var(--ink-soft)]">— {t.author}, {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    );
  }

  const t = testimonials[beat];
  const backdropWord = t.hashtag.replace("#", "").toUpperCase();
  const initials = t.author
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      ref={sectionRef}
      className="pin-scene min-h-[100svh] bg-[var(--paper)] flex items-center"
    >
      <KineticBackdrop word={backdropWord} progress={progress} variant="pink" />

      <div className="container-x relative z-10 w-full">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">(07) — In their words</div>
            <div className="mt-8 flex items-center gap-4 tnum text-xs text-[var(--ink-soft)]">
              <span>{String(beat + 1).padStart(2, "0")}</span>
              <div className="h-px w-8 bg-[var(--rule)]" />
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="flex items-center gap-3 mb-10">
              <span className="eyebrow tnum text-[var(--ink-soft)]">{t.hashtag}</span>
              {t.location && (
                <span className="eyebrow text-[var(--ink-soft)] opacity-70">— {t.location}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              {/* Video / portrait card (left) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`v-${beat}`}
                  initial={{ opacity: 0, x: -50, rotate: -3, y: 30 }}
                  animate={{ opacity: 1, x: 0, rotate: -2, y: 0 }}
                  exit={{ opacity: 0, x: -30, rotate: -6 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-7 video-card aspect-[4/5] md:aspect-[5/6]"
                  data-cursor="play"
                >
                  <Media
                    src={t.image}
                    video={t.video}
                    poster={t.poster}
                    swatch="#3D3A45"
                    alt={t.author}
                    className="absolute inset-0"
                  />
                  {t.video && (
                    <button
                      type="button"
                      aria-label="Play video"
                      className="absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--bone)]/90 text-[var(--ink)] flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
                    >
                      <Play className="w-4 h-4 translate-x-px" strokeWidth={1.5} fill="currentColor" />
                    </button>
                  )}
                  <div className="video-card-meta">
                    <span className="video-card-meta-avatar">{initials}</span>
                    <div>
                      <div className="text-sm font-medium leading-tight">{t.author}</div>
                      <div className="text-[10px] uppercase tracking-widest opacity-70 leading-tight">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Polaroid quote card (right) */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`q-${beat}`}
                  initial={{ opacity: 0, x: 50, rotate: 6, y: 30 }}
                  animate={{ opacity: 1, x: 0, rotate: 4, y: 0 }}
                  exit={{ opacity: 0, x: 40, rotate: 10 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-5 polaroid"
                  data-cursor="read"
                >
                  <p className="polaroid-quote">“{t.quote}”</p>
                  <div className="polaroid-meta">
                    <span className="polaroid-avatar">{initials}</span>
                    <div>
                      <div className="text-sm font-medium">{t.author}</div>
                      <div className="text-[10px] uppercase tracking-widest opacity-70">{t.role}</div>
                    </div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="sr-only">
              {testimonials.map((t) => `"${t.quote}" — ${t.author}, ${t.role}`).join(". ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
