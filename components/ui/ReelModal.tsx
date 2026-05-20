"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src?: string;
  poster?: string;
};

export default function ReelModal({ open, onClose, src, poster }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
        >
          <div className="absolute inset-0 bg-[var(--ink)]/85 backdrop-blur-sm" />

          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-[var(--bone)] text-[var(--ink)] flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
            aria-label="Close showreel"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>

          <motion.div
            className="relative w-full max-w-5xl aspect-video bg-[var(--ink)] rounded-md overflow-hidden shadow-2xl"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {src ? (
              <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[var(--bone)]/70 gap-3 p-8">
                <div className="eyebrow !text-[var(--bone)]/50">Reel</div>
                <div className="font-serif text-2xl md:text-3xl text-[var(--bone)] max-w-md">
                  Drop a reel at{" "}
                  <code className="text-[var(--accent)]">/public/hero/reel.mp4</code> and it
                  will play here.
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
