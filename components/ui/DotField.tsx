"use client";

import { useMemo } from "react";

type Props = {
  density?: number;       // dots per axis (default 28 → 784 dots)
  className?: string;
  accent?: string;        // accent dot color (CSS var or hex)
  base?: string;          // base dot color
  accentRatio?: number;   // % dots that get the accent color (0..1)
  seed?: number;
};

// Deterministic PRNG so layout is stable across hydration
function mulberry32(seed: number) {
  let s = seed;
  return function () {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Animated dot field — grid of dots that twinkle in/out at staggered intervals.
 * Replaces gradient halos in hero backgrounds. CSS-driven, cheap, no canvas.
 */
export default function DotField({
  density = 28,
  className = "",
  accent = "var(--accent)",
  base = "var(--ink)",
  accentRatio = 0.06,
  seed = 42,
}: Props) {
  const dots = useMemo(() => {
    const rand = mulberry32(seed);
    const result: Array<{
      x: number;
      y: number;
      delay: number;
      duration: number;
      isAccent: boolean;
      size: number;
    }> = [];
    for (let yi = 0; yi < density; yi++) {
      for (let xi = 0; xi < density; xi++) {
        const jx = (rand() - 0.5) * 0.6;
        const jy = (rand() - 0.5) * 0.6;
        result.push({
          x: ((xi + jx) / (density - 1)) * 100,
          y: ((yi + jy) / (density - 1)) * 100,
          delay: rand() * 6,
          duration: 2.4 + rand() * 3.6,
          isAccent: rand() < accentRatio,
          size: 1.5 + rand() * 1.5,
        });
      }
    }
    return result;
  }, [density, accentRatio, seed]);

  return (
    <div className={`dot-field ${className}`} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className={`dot-field-dot${d.isAccent ? " is-accent" : ""}`}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: d.isAccent ? accent : base,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
