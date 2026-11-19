"use client";

// Adapted from React Bits SplitText (https://reactbits.dev/text-animations/split-text, MIT + Commons Clause).
// Trimmed to a masked line rise: fonts-loaded guard, reduced-motion bail-out, once-only ScrollTrigger.

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, EASE_OUT, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

export default function RevealText({ as: Tag = "h2", children, className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let split: SplitText | undefined;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 108,
              duration: 1.05,
              ease: EASE_OUT,
              stagger: 0.075,
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
