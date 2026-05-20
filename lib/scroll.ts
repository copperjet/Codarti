"use client";

import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./motion";

export type PinSceneOptions = {
  trigger: HTMLElement;
  beats: number;
  onBeat: (beat: number, progress: number) => void;
  heightMultiplier?: number;
  mobileBreakpoint?: number;
};

export function pinScene({
  trigger,
  beats,
  onBeat,
  heightMultiplier = 1,
  mobileBreakpoint = 768,
}: PinSceneOptions): ScrollTrigger | null {
  if (prefersReducedMotion()) return null;
  if (typeof window !== "undefined" && window.innerWidth < mobileBreakpoint) return null;

  const st = ScrollTrigger.create({
    trigger,
    start: "top top",
    end: () => `+=${beats * window.innerHeight * heightMultiplier}`,
    pin: true,
    scrub: 1.2,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const beat = Math.min(beats - 1, Math.floor(self.progress * beats));
      onBeat(beat, self.progress);
    },
  });

  return st;
}

export function buildBeatTimeline(
  elements: HTMLElement[],
  beats: number,
  duration = 1
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  elements.forEach((el, i) => {
    tl.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, ease: "power3.out" },
      i * duration
    );
  });
  return tl;
}
