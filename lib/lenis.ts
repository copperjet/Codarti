import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;
// Keep a stable reference to the ticker callback so destroyLenis can remove it.
// Without removal, the callback keeps firing after lenis is nulled → null.raf() crash.
let tickerCallback: ((time: number) => void) | null = null;

export function initLenis() {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  // Wire Lenis to GSAP ticker so ScrollTrigger stays in sync with smooth scroll.
  // Without this, pinned scenes desync by ~1.2s of Lenis easing.
  lenis.on("scroll", ScrollTrigger.update);
  tickerCallback = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  lenis?.destroy();
  lenis = null;
}
