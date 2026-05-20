"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  word: string;
  progress?: number;
  variant?: "default" | "lime" | "purple" | "pink";
};

export default function KineticBackdrop({ word, progress = 0, variant = "default" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevWord = useRef(word);

  // Word change: enter animation
  useEffect(() => {
    const el = ref.current;
    if (!el || prevWord.current === word) return;
    prevWord.current = word;

    gsap.fromTo(
      el,
      { opacity: 0, y: 80, scale: 0.86, rotate: -2 },
      { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.2)" }
    );
  }, [word]);

  // Parallax: scrub-translate horizontally + scale per progress (0..1)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Translate -120vw -> 120vw across beat (looks like word drifts past)
    const x = (progress - 0.5) * 24; // -12% to +12% of viewport width
    const scale = 1 + progress * 0.12;
    gsap.to(el, {
      xPercent: x,
      scale,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [progress]);

  const variantClass = variant !== "default" ? variant : "";

  return (
    <div className="kinetic-backdrop" aria-hidden>
      <span ref={ref} className={`kinetic-backdrop-text ${variantClass}`}>
        {word}
      </span>
    </div>
  );
}
