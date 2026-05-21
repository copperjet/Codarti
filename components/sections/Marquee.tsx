"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  "Engineering",
  "Design",
  "Strategy",
  "Advisory",
  "Engineering",
  "Design",
  "Strategy",
  "Advisory",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    // Velocity-reactive: timeScale bends with scroll direction.
    // Negative velocity (scrolling up) reverses the marquee, positive accelerates it.
    const clamp = gsap.utils.clamp(-3, 3);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const ts = clamp(1 + v / 1500);
        gsap.to(tween, {
          timeScale: ts,
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
  }, []);

  return (
    <section className="rule-t rule-b py-10 md:py-14 overflow-hidden">
      <div ref={trackRef} className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-serif text-[clamp(48px,9vw,140px)] leading-none px-4 md:px-8 flex items-center text-[var(--ink)]"
          >
            <span>{t}</span>
            <span className="mx-5 md:mx-10 text-[var(--accent)]">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
