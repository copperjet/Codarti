"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  beat: number;
  progress: number;
};

const beats = [
  { x: "0vw", y: "0vh", rotate: -4, scale: 1 },
  { x: "-22vw", y: "-2vh", rotate: -14, scale: 0.78 },
  { x: "22vw", y: "2vh", rotate: 10, scale: 0.78 },
  { x: "0vw", y: "-2vh", rotate: 0, scale: 1.6 },
];

const parseVw = (s: string) => parseFloat(s);
const fmtVw = (n: number, unit: string) => `${n}${unit}`;

export default function FloatingGlyph({ progress }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const segments = beats.length - 1;
    const t = Math.min(1, Math.max(0, progress)) * segments;
    const i = Math.min(segments - 1, Math.floor(t));
    const f = t - i;
    const a = beats[i];
    const b = beats[i + 1];
    const ax = parseVw(a.x), bx = parseVw(b.x);
    const ay = parseVw(a.y), by = parseVw(b.y);
    gsap.to(el, {
      x: fmtVw(ax + (bx - ax) * f, "vw"),
      y: fmtVw(ay + (by - ay) * f, "vh"),
      rotate: a.rotate + (b.rotate - a.rotate) * f,
      scale: a.scale + (b.scale - a.scale) * f,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [progress]);

  return (
    <svg
      ref={ref}
      className="floating-glyph"
      viewBox="0 0 340 340"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Stylised "C" monogram with serif terminals */}
      <path
        d="M270 108
           C270 108 240 52 170 52
           C100 52 60 108 60 170
           C60 232 100 288 170 288
           C240 288 270 232 270 232"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner accent stroke */}
      <path
        d="M252 132
           C252 132 224 82 170 82
           C116 82 90 124 90 170
           C90 216 116 258 170 258
           C224 258 252 208 252 208"
        stroke="var(--accent-2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Top serif terminal */}
      <line x1="248" y1="95" x2="270" y2="108" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <line x1="270" y1="108" x2="285" y2="92" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom serif terminal */}
      <line x1="248" y1="245" x2="270" y2="232" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <line x1="270" y1="232" x2="285" y2="248" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
