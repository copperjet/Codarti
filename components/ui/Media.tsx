"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  src?: string;
  video?: string;
  poster?: string;
  alt?: string;
  swatch?: string;
  className?: string;
  parallax?: number; // 0 = off, e.g. 12 = -12% yPercent across viewport
  clipReveal?: boolean;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  children?: React.ReactNode;
};

// Renders a next/image, looping video, or styled swatch fallback.
// Gracefully handles missing assets — Image onError falls back to swatch.
export default function Media({
  src,
  video,
  poster,
  alt = "",
  swatch = "#16140F",
  className = "",
  parallax = 0,
  clipReveal = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = false,
  children,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!src && !imgFailed;
  const showVideo = !!video;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = innerRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    const triggers: ScrollTrigger[] = [];

    if (parallax) {
      const tween = gsap.fromTo(
        el,
        { yPercent: parallax / 2 },
        {
          yPercent: -parallax / 2,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    if (clipReveal) {
      gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "power4.out",
          });
        },
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [parallax, clipReveal]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${rounded ? "rounded-md" : ""} ${className}`}
      style={{ background: swatch }}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        {showVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        {!showVideo && showImage && (
          <Image
            src={src!}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setImgFailed(true)}
            className="object-cover"
          />
        )}
        {!showVideo && !showImage && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${swatch} 0%, ${swatch}cc 100%)`,
            }}
            aria-hidden
          />
        )}
      </div>
      {children}
    </div>
  );
}
