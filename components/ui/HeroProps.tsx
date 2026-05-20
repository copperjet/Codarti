"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = { beat: number };

// 4 beats × props with x/y/rotate/scale offsets per beat. Index 0 = base position.
const propBeats = {
  haloLime: [
    { x: 0, y: 0, scale: 1, opacity: 0.55 },
    { x: -180, y: -40, scale: 0.85, opacity: 0.4 },
    { x: 180, y: 40, scale: 0.85, opacity: 0.4 },
    { x: 0, y: -20, scale: 1.4, opacity: 0.7 },
  ],
  haloPurple: [
    { x: 0, y: 0, scale: 0.9, opacity: 0.35 },
    { x: 220, y: 60, scale: 1.1, opacity: 0.5 },
    { x: -220, y: -60, scale: 1.1, opacity: 0.5 },
    { x: 0, y: 30, scale: 1.3, opacity: 0.45 },
  ],
  starA: [
    { x: 0, y: 0, rotate: 12, scale: 1 },
    { x: -120, y: 80, rotate: -24, scale: 1.1 },
    { x: 140, y: -90, rotate: 36, scale: 0.9 },
    { x: 0, y: -120, rotate: 60, scale: 1.3 },
  ],
  starB: [
    { x: 0, y: 0, rotate: -8, scale: 0.9 },
    { x: 100, y: -60, rotate: 24, scale: 1.05 },
    { x: -90, y: 100, rotate: -36, scale: 1.15 },
    { x: 60, y: 100, rotate: 48, scale: 1 },
  ],
  ring: [
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: -60, y: 0, rotate: -90, scale: 0.85 },
    { x: 60, y: 0, rotate: 90, scale: 0.85 },
    { x: 0, y: 0, rotate: 180, scale: 1.2 },
  ],
};

function useBeatTween(
  ref: React.RefObject<HTMLElement | SVGElement | null>,
  steps: { x?: number; y?: number; rotate?: number; scale?: number; opacity?: number }[],
  beat: number
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const s = steps[Math.min(beat, steps.length - 1)];
    gsap.to(el, {
      x: s.x ?? 0,
      y: s.y ?? 0,
      rotate: s.rotate ?? 0,
      scale: s.scale ?? 1,
      opacity: s.opacity,
      duration: 1.6,
      ease: "back.out(1.4)",
    });
  }, [beat, ref, steps]);
}

export default function HeroProps({ beat }: Props) {
  const haloLimeRef = useRef<HTMLDivElement>(null);
  const haloPurpleRef = useRef<HTMLDivElement>(null);
  const starARef = useRef<SVGSVGElement>(null);
  const starBRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useBeatTween(haloLimeRef, propBeats.haloLime, beat);
  useBeatTween(haloPurpleRef, propBeats.haloPurple, beat);
  useBeatTween(starARef, propBeats.starA, beat);
  useBeatTween(starBRef, propBeats.starB, beat);
  useBeatTween(ringRef, propBeats.ring, beat);

  return (
    <>
      {/* Lime halo glow — center-right */}
      <div
        ref={haloLimeRef}
        className="hero-halo"
        style={{
          width: 520,
          height: 520,
          right: "8%",
          top: "20%",
          background: "var(--accent)",
        }}
      />
      {/* Purple halo glow — left */}
      <div
        ref={haloPurpleRef}
        className="hero-halo"
        style={{
          width: 380,
          height: 380,
          left: "4%",
          bottom: "12%",
          background: "var(--accent-2)",
        }}
      />

      {/* Star A — upper right */}
      <svg
        ref={starARef}
        className="hero-prop"
        style={{ right: "14%", top: "18%", width: 56, height: 56, zIndex: 2 }}
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path
          d="M28 4 L34 22 L52 28 L34 34 L28 52 L22 34 L4 28 L22 22 Z"
          fill="var(--accent-2)"
          opacity="0.9"
        />
      </svg>

      {/* Star B — lower left */}
      <svg
        ref={starBRef}
        className="hero-prop"
        style={{ left: "20%", bottom: "22%", width: 38, height: 38, zIndex: 2 }}
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path
          d="M28 4 L34 22 L52 28 L34 34 L28 52 L22 34 L4 28 L22 22 Z"
          fill="var(--accent-3)"
        />
      </svg>

      {/* Ring — mid right */}
      <svg
        ref={ringRef}
        className="hero-prop"
        style={{ right: "22%", bottom: "30%", width: 120, height: 120, zIndex: 2 }}
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden
      >
        <circle cx="60" cy="60" r="56" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 8" />
        <circle cx="60" cy="60" r="36" stroke="var(--accent-2)" strokeWidth="2" opacity="0.6" />
      </svg>
    </>
  );
}
