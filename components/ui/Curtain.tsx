"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Curtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const force = new URLSearchParams(window.location.search).get("curtain") === "force";
    const seen = sessionStorage.getItem("codarti_seen");
    if (seen && !force) return;

    setVisible(true);
    document.documentElement.classList.add("lenis-stopped");

    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        document.documentElement.classList.remove("lenis-stopped");
        sessionStorage.setItem("codarti_seen", "1");
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
  }, []);

  if (!visible) return null;

  return (
    <div ref={ref} className="curtain" aria-hidden>
      <div className="curtain-word">
        Codarti<span className="curtain-dot">.</span>
      </div>
    </div>
  );
}
