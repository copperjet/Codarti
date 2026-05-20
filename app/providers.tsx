"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import Cursor from "@/components/ui/Cursor";
import Curtain from "@/components/ui/Curtain";
import Grain from "@/components/ui/Grain";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      <Curtain />
      <Cursor />
      <Grain />
      {children}
    </>
  );
}
