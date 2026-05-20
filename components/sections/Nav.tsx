"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function LocalClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lusaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden md:inline-flex items-center gap-2 text-[var(--ink-soft)] text-xs tnum">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      Lusaka — {time || "—:—"}
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (progressRef.current) {
        const totalH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = totalH > 0 ? window.scrollY / totalH : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div ref={progressRef} className="scroll-progress w-full" style={{ transform: "scaleX(0)" }} />

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-[var(--bone)]/85 backdrop-blur-md rule-b" : ""
        }`}
      >
        <div className="container-x flex items-center justify-between h-20">
          <a
            href="#"
            aria-label="Codarti — back to top"
            className="font-serif text-2xl tracking-tight text-[var(--ink)]"
          >
            Codarti
            <span className="text-[var(--accent)]">.</span>
          </a>

          <LocalClock />

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <Button href="#contact" variant="primary" withArrow>
            Start a project
          </Button>
        </div>
      </header>
    </>
  );
}
