"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  trigger?: "load" | "scroll";
  stagger?: number;
  mode?: "word" | "char";
};

export default function SplitText({
  children,
  className = "",
  as = "h2",
  delay = 0,
  trigger = "scroll",
  stagger = 0.04,
  mode = "word",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const selector = mode === "char" ? ".split-char" : ".split-word";
    const items = el.querySelectorAll<HTMLElement>(selector);
    gsap.set(items, { yPercent: 110, rotate: mode === "char" ? 6 : 0, opacity: 0 });

    const animateIn = () =>
      gsap.to(items, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: mode === "char" ? 0.9 : 1.1,
        ease: "power4.out",
        stagger: mode === "char" ? stagger * 0.7 : stagger,
        delay,
      });

    if (trigger === "load") {
      animateIn();
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: animateIn,
    });
    return () => st.kill();
  }, [delay, stagger, trigger, mode]);

  const Tag = as as React.ElementType;

  if (mode === "char") {
    const lines = children.split("\n");
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={children}>
        {lines.map((line, li) => (
          <span key={li} className="split-line block">
            {Array.from(line).map((ch, ci) => (
              <span key={`${li}-${ci}`} className="split-char" aria-hidden>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    );
  }

  const words = children.split(/(\s+)/);
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((w, i) =>
        w.trim() === "" ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="split-line">
            <span className="split-word">{w}</span>
          </span>
        )
      )}
    </Tag>
  );
}
