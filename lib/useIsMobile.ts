"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is narrower than the given breakpoint.
 * Default breakpoint: 768px (Tailwind `md`).
 * SSR-safe — returns `false` on the server, hydrates correctly client-side.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
