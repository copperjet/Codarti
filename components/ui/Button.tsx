"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  withArrow?: boolean;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
  withArrow = true,
}: Props) {
  const base =
    "group inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-[var(--bone)] font-medium shadow-[0_4px_14px_-2px_rgba(255,90,31,0.45)] hover:bg-[var(--ink)] hover:text-[var(--bone)] hover:shadow-[0_6px_18px_-2px_rgba(15,14,20,0.4)]"
      : "border border-[var(--rule)] text-[var(--ink)] hover:border-[var(--ink)]";

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      )}
    </motion.a>
  );
}
