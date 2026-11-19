"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE_OUT, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Stagger direct children marked with data-reveal-item instead of the wrapper. */
  stagger?: number;
  y?: number;
};

/** Scroll-linked rise for content blocks. Never used on call buttons. */
export default function Reveal({ as: Tag = "div", children, className = "", stagger, y = 28 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const items = stagger ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", el) : [el];
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 1,
        ease: EASE_OUT,
        stagger: stagger ?? 0,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
