"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/seo";

// Text links shown in the header — Contact is surfaced as the CTA instead.
const links = NAV_LINKS.filter((l) => l.href !== "/contact");

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Portal target only available after mount (SSR safety).
  useEffect(() => setMounted(true), []);

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

  // Lock body scroll while drawer open + close on Escape
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
          <Link
            href="/"
            aria-label="Codarti — home"
            className="font-serif text-2xl tracking-tight text-[var(--ink)]"
          >
            Codarti
            <span className="text-[var(--accent)]">.</span>
          </Link>

          <LocalClock />

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA pill */}
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" withArrow>
              Start a project
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="md:hidden w-11 h-11 inline-flex items-center justify-center text-[var(--ink)]"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer — portaled to body so ScrollTrigger pin-spacers
          (which reparent sibling DOM nodes) cannot break React's
          insertBefore reference. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-drawer md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl text-[var(--bone)]">
                Codarti
                <span className="text-[var(--accent)]">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 inline-flex items-center justify-center text-[var(--bone)]"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-6" aria-label="Mobile primary">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mobile-drawer-link transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group inline-flex items-center justify-between gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </motion.a>

            <p className="mt-8 text-xs text-[var(--bone)]/40 uppercase tracking-widest">
              Lusaka · support@codarti.com
            </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
