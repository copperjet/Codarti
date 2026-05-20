"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { process } from "@/lib/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const distance = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Resize-safe: refresh on viewport change so pin positions don't drift.
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="process" className="section-y overflow-hidden">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-12 gap-x-8 mb-16 items-end">
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow">(05) — Process</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-serif text-[clamp(40px,6vw,96px)] leading-[0.95]">
                Four steps. <br />
                No surprises.
              </h2>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div ref={sectionRef} className="relative">
        {/* Track progress bar (desktop) */}
        <div className="hidden md:block container-x mb-6">
          <div className="h-px bg-[var(--rule)] relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-[var(--accent-2)] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex md:flex-nowrap flex-wrap gap-6 md:gap-0 md:pl-[var(--gutter)] md:pr-[50vw] will-change-transform"
        >
          {process.map((p) => (
            <div
              key={p.n}
              className="md:w-[42vw] w-full shrink-0 md:mr-8 p-10 md:p-14 rule-t rule-b border-r border-l border-[var(--rule)] bg-[var(--bone)]"
            >
              <div className="eyebrow tnum mb-12">{p.n}</div>
              <h3 className="font-serif text-[clamp(48px,7vw,120px)] leading-none mb-10 text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="text-[var(--ink-soft)] text-lg leading-relaxed max-w-sm">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
