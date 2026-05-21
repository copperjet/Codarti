"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type Props = {
  q: string;
  a: string;
  index?: string;
};

export default function Accordion({ q, a, index }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rule-b">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-8 py-8 text-left group"
        aria-expanded={open}
        data-cursor="open"
      >
        <div className="flex items-start gap-6">
          {index && (
            <span className="eyebrow tnum mt-2 shrink-0">{index}</span>
          )}
          <span className="font-serif text-2xl md:text-3xl text-[var(--ink)] leading-tight">
            {q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 mt-2"
        >
          <Plus className="w-6 h-6 text-[var(--ink)]" strokeWidth={1.25} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 pr-12 sm:pl-16 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
