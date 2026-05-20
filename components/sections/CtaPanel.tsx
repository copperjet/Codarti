"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CtaPanel() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 14, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 14, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 60;
    const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 60;
    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-[var(--ink)] py-32 md:py-48">
      {/* Dot-grid backdrop */}
      <div className="dot-grid dark" aria-hidden />

      {/* Lime halo glow */}
      <div
        className="hero-halo"
        aria-hidden
        style={{
          width: 600,
          height: 600,
          right: "-10%",
          top: "10%",
          background: "var(--accent)",
          opacity: 0.18,
        }}
      />
      {/* Purple halo glow */}
      <div
        className="hero-halo"
        aria-hidden
        style={{
          width: 480,
          height: 480,
          left: "-8%",
          bottom: "5%",
          background: "var(--accent-2)",
          opacity: 0.32,
        }}
      />

      {/* Giant faint wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="font-serif text-[clamp(120px,24vw,400px)] leading-none tracking-[-0.04em] whitespace-nowrap"
          style={{ color: "rgba(250, 250, 245, 0.06)" }}
        >
          Codarti<span style={{ color: "rgba(200, 255, 61, 0.55)" }}>.</span>
        </span>
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center gap-12">
        <div className="eyebrow !text-[var(--bone)]/50">Ready to build?</div>

        <div className="relative inline-block">
          <span className="cta-idle-pulse" aria-hidden />
          <motion.a
            ref={ref}
            href="#contact"
            data-cursor="view"
            style={{ x: tx, y: ty }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="cta-magnetic-wrap group font-serif text-[clamp(56px,10vw,180px)] leading-[0.92] text-[var(--bone)] tracking-[-0.03em] inline-flex items-center gap-6 hover:text-[var(--accent)] transition-colors duration-500"
          >
            Start a project
            <ArrowUpRight
              className="w-[0.6em] h-[0.6em] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
              strokeWidth={1}
            />
          </motion.a>
        </div>

        <a
          href="mailto:support@codarti.com"
          className="text-sm text-[var(--bone)]/55 hover:text-[var(--accent)] transition-colors underline underline-offset-[6px] decoration-[var(--bone)]/20 hover:decoration-[var(--accent)]"
        >
          or email support@codarti.com
        </a>

        <p className="text-xs text-[var(--bone)]/40 uppercase tracking-widest">
          Lusaka · support@codarti.com · +260 970 627 630
        </p>
      </div>
    </section>
  );
}
