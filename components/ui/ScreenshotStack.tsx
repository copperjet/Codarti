"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  screenshots: string[];
  swatch: string;
  alt: string;
  projectKey: string;  // changes per beat — Image src swaps but motion continues
  progress: number;    // 0..1 within current beat (from pinScene scrub)
};

/**
 * Continuous flow carousel — cards travel a parametric arc:
 *   bottom-right → top-center → bottom-left.
 * Each card has a fixed phase offset (i/N). Per-frame scroll progress
 * drives every card's position simultaneously, so multiple cards are
 * visible at different stages along the path at any instant.
 */
export default function ScreenshotStack({ screenshots, swatch, alt, progress }: Props) {
  const N = Math.max(1, screenshots.length);
  const safeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {screenshots.map((src, i) => {
        // Cyclic phase per card — ranges [0, 1)
        const t = (safeProgress + i / N) % 1;

        // Trajectory-bent path — cards stay near full-size; bend through bottom corners
        const arc = Math.sin(t * Math.PI);  // 0 → 1 → 0

        // Position: bend through bottom corners → center → bottom corner
        const x = (0.5 - t) * 130;           // ±65vw corners → 0vw center (wide gap between cards)
        const y = 30 - arc * 30;             // +30vh low corners → 0vh center

        // Rotation matches travel direction: strong tilt at corners, upright at center
        const rotate = (0.5 - t) * 36;       // +18° entering right → 0° center → -18° exiting left

        // Scale: stays large throughout (no shrinking thumbnails)
        const scale = 0.92 + arc * 0.12;     // 0.92 corner → 1.04 center

        // Opacity: wide plateau, hard fade only at extreme edges
        const opacity =
          t < 0.05 || t > 0.95
            ? 0
            : Math.min(1, arc * 2.2);
        const zIndex = Math.round(arc * 100) + 10;

        return (
          <motion.div
            key={`card-${i}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 300,
              translateX: "-50%",
              translateY: "-50%",
              x: `${x}vw`,
              y: `${y}vh`,
              rotate,
              opacity,
              scale,
              zIndex,
              willChange: "transform, opacity",
            }}
            transition={{ type: "tween", duration: 0.18, ease: "linear" }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "9/16",
                background: swatch,
                boxShadow:
                  "0 16px 40px -8px rgba(15,14,20,0.32), 0 4px 12px -4px rgba(15,14,20,0.18)",
              }}
            >
              <Image
                src={src}
                alt={`${alt} screenshot ${i + 1}`}
                fill
                sizes="260px"
                className="object-cover"
                draggable={false}
                priority={i === 0}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
