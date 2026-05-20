"use client";

import { MouseEvent, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Media from "@/components/ui/Media";
import type { Project } from "@/lib/content";

type Props = {
  project: Project;
  className?: string;
  tilt?: number;
};

export default function WorkTile({ project, className = "", tilt = 0 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <a
      ref={ref}
      href={`https://${project.url}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      className={`work-tile block tilt-card ${className}`}
      data-cursor="view"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="work-tile-inner relative overflow-hidden" style={{ minHeight: "100%" }}>
        {/* Cover image — swatch fallback */}
        <Media
          src={project.image}
          swatch={project.swatch}
          alt={project.name}
          className="absolute inset-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Decorative blobs above imagery */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "var(--accent)", opacity: 0.18, filter: "blur(28px)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "var(--accent-3)", opacity: 0.22, filter: "blur(20px)" }}
          aria-hidden
        />

        {/* Bottom scrim so the name stays legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(15,14,20,0.6) 0%, transparent 55%)" }}
          aria-hidden
        />

        <div className="relative h-full flex items-end p-6">
          <span className="font-serif text-[clamp(24px,3vw,52px)] text-[var(--bone)] leading-none tracking-[-0.02em]">
            {project.name}
          </span>
        </div>
      </div>
      <div className="work-tile-meta">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow !text-[var(--bone)]/60 mb-1">{project.year}</div>
            <div className="font-serif text-xl text-[var(--bone)]">{project.name}</div>
            <div className="text-xs text-[var(--bone)]/70 mt-1">{project.description}</div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[var(--bone)]/70 shrink-0" strokeWidth={1.25} />
        </div>
      </div>
    </a>
  );
}
