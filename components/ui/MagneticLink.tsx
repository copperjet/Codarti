"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { prefersHoverPointer } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "a" | "button";
};

export default function MagneticLink({
  children,
  href,
  className = "",
  onClick,
  strength = 18,
  as = "a",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  useEffect(() => {
    setHover(prefersHoverPointer());
  }, []);

  const handleMove = (e: MouseEvent) => {
    if (!hover) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * strength;
    const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * strength;
    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    if (!hover) return;
    x.set(0);
    y.set(0);
  };

  const motionStyle = hover ? { x: tx, y: ty } : undefined;

  if (as === "button") {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={motionStyle}
        className={className}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.a>
  );
}
