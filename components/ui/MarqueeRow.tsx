"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  items: string[];
  separator?: string;
  duration?: number;
  className?: string;
  itemClassName?: string;
  reactive?: boolean;
};

export default function MarqueeRow({
  items,
  separator = "·",
  duration = 40,
  className = "",
  itemClassName = "",
  reactive = true,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration,
      repeat: -1,
    });

    if (!reactive) return () => tween.kill();

    const clamp = gsap.utils.clamp(-3, 3);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        gsap.to(tween, {
          timeScale: clamp(1 + v / 1500),
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [duration, reactive]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className={`inline-flex items-center ${itemClassName}`}>
            <span>{t}</span>
            <span className="mx-6 text-[var(--accent-2)] opacity-70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
