"use client";

import { useEffect, useRef, useState } from "react";
import { pinScene } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/motion";
import { testimonials } from "@/lib/content";
import KineticBackdrop from "@/components/ui/KineticBackdrop";
import TestimonialStack from "@/components/ui/TestimonialStack";

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
      heightMultiplier: 0.95,
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
              <p className="font-serif text-[clamp(24px,3.5vw,48px)] leading-[1.2]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-[var(--ink-soft)]">
                — {t.author}, {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    );
  }

  const t = testimonials[beat];
  const backdropWord = t.hashtag.replace("#", "").toUpperCase();

  return (
    <section
      ref={sectionRef}
      className="pin-scene min-h-[100svh] bg-[var(--paper)] overflow-hidden flex items-center"
    >
      <KineticBackdrop word={backdropWord} progress={progress} variant="pink" />

      {/* Flow carousel of quote polaroids */}
      <TestimonialStack
        items={testimonials}
        progress={progress}
        beatKey={t.authorSlug}
      />

      {/* Header rail above stack */}
      <div className="container-x relative z-20 w-full pointer-events-none">
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
            <div className="flex items-center gap-3">
              <span className="eyebrow tnum text-[var(--ink-soft)]">{t.hashtag}</span>
              {t.location && (
                <span className="eyebrow text-[var(--ink-soft)] opacity-70">
                  — {t.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="sr-only">
          {testimonials
            .map((tt) => `"${tt.quote}" — ${tt.author}, ${tt.role}`)
            .join(". ")}
        </div>
      </div>
    </section>
  );
}
