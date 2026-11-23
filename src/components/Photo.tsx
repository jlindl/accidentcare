"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { photos } from "@/content/photos";
import type { PhotoKey } from "@/content/pages";

type Props = {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Scroll-linked drift inside the frame. Off under reduced motion. */
  parallax?: boolean;
  /** Override the object-position from photos.ts. */
  position?: string;
};

/** A stock photo in a rounded frame, with a soft scroll drift and a slow zoom on hover. */
export default function Photo({ name, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, parallax = true, position }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const p = photos[name];

  useGSAP(
    () => {
      const el = frame.current;
      if (!el || !parallax || prefersReducedMotion()) return;
      const inner = el.querySelector<HTMLElement>("[data-photo-inner]");
      if (!inner) return;
      gsap.fromTo(
        inner,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`photo-frame group/photo relative isolate overflow-hidden bg-go-soft ${className}`}>
      <div data-photo-inner className="absolute inset-[-6%_0]">
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="photo-img object-cover"
          style={{ objectPosition: position ?? p.position ?? "center" }}
        />
      </div>
      {/* Soft brand tint so stock photography sits inside the blue system */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(15_31_61/0.28))] mix-blend-multiply" />
    </div>
  );
}
