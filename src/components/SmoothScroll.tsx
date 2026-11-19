"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis from GSAP's ticker. It lives inside <ReactLenis> and uses useLenis(),
 * so it only wires up once the Lenis instance actually exists. Wiring it up earlier
 * left the wheel captured with nothing driving the scroll.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // Fonts can change layout after first paint.
    document.fonts?.ready.then(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Reduced motion (and first render): native scrolling only.
  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.11, smoothWheel: true, anchors: { offset: -80 } }}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
