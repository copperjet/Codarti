"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_LABELS: Record<string, string> = {
  view: "VIEW",
  drag: "DRAG",
  open: "OPEN",
  write: "WRITE",
  read: "READ",
  play: "PLAY",
  next: "NEXT",
};

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let x = 0, y = 0, tx = 0, ty = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const handleEnter = (e: Event) => {
      const t = e.target as HTMLElement;
      const el = t.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const val = el.dataset.cursor ?? "";
        const mapped = CURSOR_LABELS[val] ?? null;
        setLabel(mapped);
        if (mapped) {
          dot.classList.remove("grow");
          dot.classList.add("labeled");
        } else {
          dot.classList.remove("labeled");
          dot.classList.add("grow");
        }
      } else if (t.closest("a, button")) {
        setLabel(null);
        dot.classList.remove("labeled");
        dot.classList.add("grow");
      }
    };

    const handleLeave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("[data-cursor], a, button")
      ) {
        setLabel(null);
        dot.classList.remove("grow", "labeled");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" aria-hidden>
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}
