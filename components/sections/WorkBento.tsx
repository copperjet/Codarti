"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import WorkTile from "./WorkTile";
import { projects } from "@/lib/content";

export default function WorkBento() {
  return (
    <section className="section-y bg-[var(--paper)]">
      <div className="container-x">
        <RevealOnScroll>
          <div className="grid grid-cols-12 gap-x-8 mb-12 items-end">
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow">(03) — All Work</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[0.95] text-[var(--ink)]">
                Every project, at a glance.
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        <div className="bento-grid" style={{ gridAutoRows: "240px" }}>
          {/* Row 1: wide + narrow */}
          <div className="col-span-12 md:col-span-8" style={{ gridRow: "span 2", height: 480 }}>
            <WorkTile project={projects[0]} className="h-full" tilt={-1.5} priority />
          </div>
          <div className="col-span-12 md:col-span-4" style={{ height: 240 }}>
            <WorkTile project={projects[1]} className="h-full" tilt={1.5} />
          </div>
          {/* Row 2 */}
          <div className="col-span-12 md:col-span-4" style={{ height: 240 }}>
            <WorkTile project={projects[2]} className="h-full" tilt={-1} />
          </div>
          {/* Row 3: remaining projects */}
          {projects.slice(3).map((p, i) => (
            <div key={p.name} className="col-span-12 md:col-span-4" style={{ height: 240 }}>
              <WorkTile project={p} className="h-full" tilt={i % 2 === 0 ? 1.2 : -1.2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
