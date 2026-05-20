"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Curtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Decide whether the curtain should show, on mount only.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const force = new URLSearchParams(window.location.search).get("curtain") === "force";
    const seen = sessionStorage.getItem("codarti_seen");
    if (seen && !force) return;

    setVisible(true);
    document.documentElement.classList.add("lenis-stopped");
  }, []);

  // Run the animation only after the curtain is actually in the DOM (visible === true).
  useEffect(() => {
    if (!visible) return;
    const el = ref.current;

    const cleanup = () => {
      setVisible(false);
      document.documentElement.classList.remove("lenis-stopped");
      sessionStorage.setItem("codarti_seen", "1");
    };

    // Hard safety net: if anything in GSAP throws or the timeline never fires,
    // we still restore scroll after 4s so the user is never trapped.
    const safety = window.setTimeout(cleanup, 4000);

    if (!el) return () => window.clearTimeout(safety);

    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(safety);
        cleanup();
      },
    });

    tl.fromTo(
      el.querySelector(".curtain-word"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .to(el.querySelector(".curtain-word"), {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.5,
      })
      .to(
        el,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={ref} className="curtain" aria-hidden>
      <div className="curtain-word">
        Codarti<span className="curtain-dot">.</span>
      </div>
    </div>
  );
}
