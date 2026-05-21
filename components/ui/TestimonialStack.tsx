"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Testimonial } from "@/lib/content";

type Props = {
  items: Testimonial[];
  progress: number;
  beatKey: string;
};

/**
 * Continuous flow carousel — quote polaroid cards travel a parametric arc:
 *   bottom-right → top-center (upright) → bottom-left.
 * Same motion model as ScreenshotStack, but renders blockquote polaroids.
 */
export default function TestimonialStack({ items, progress, beatKey }: Props) {
  const N = Math.max(1, items.length);
  const safe = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((t, i) => {
        const tPhase = (safe + i / N) % 1;
        const arc = Math.sin(tPhase * Math.PI);

        const x = (0.5 - tPhase) * 130;            // ±65vw corners → 0 center
        const y = 30 - arc * 30;                   // +30vh corners → 0 center
        const rotate = (0.5 - tPhase) * 36;        // ±18° corners → 0° center
        const scale = 0.92 + arc * 0.12;           // 0.92 → 1.04
        const opacity =
          tPhase < 0.05 || tPhase > 0.95
            ? 0
            : Math.min(1, arc * 2.2);
        const z = Math.round(arc * 100) + 10;

        const initials = t.author
          .split(/\s+/)
          .map((s) => s[0])
          .slice(0, 2)
          .join("");

        return (
          <motion.div
            key={`${beatKey}-${i}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 340,
              translateX: "-50%",
              translateY: "-50%",
              x: `${x}vw`,
              y: `${y}vh`,
              rotate,
              opacity,
              scale,
              zIndex: z,
              willChange: "transform, opacity",
              pointerEvents: opacity > 0.5 ? "auto" : "none",
            }}
            transition={{ type: "tween", duration: 0.18, ease: "linear" }}
          >
            <blockquote className="polaroid" data-cursor="read">
              <p className="polaroid-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="polaroid-meta">
                {t.image ? (
                  <span className="polaroid-avatar avatar-img">
                    <Image src={t.image} alt={t.author} width={44} height={44} />
                  </span>
                ) : (
                  <span className="polaroid-avatar">{initials}</span>
                )}
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">
                    {t.role}
                  </div>
                </div>
              </div>
            </blockquote>
          </motion.div>
        );
      })}
    </div>
  );
}
