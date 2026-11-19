"use client";

import { useEffect, useState } from "react";
import CallButton from "./CallButton";

/**
 * Keeps the call one tap away on phones, without stacking duplicates:
 * the bar shows only when no other call link on the page is in view,
 * and the nav's own call pill steps aside while the bar is up.
 */
export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('main a[href^="tel:"], footer a[href^="tel:"]'));
    if (!links.length) return;
    const inView = new Set<Element>();

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      }
      setVisible(inView.size === 0 && window.scrollY > 120);
    });
    links.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.callbar = String(visible);
  }, [visible]);

  return (
    <aside
      aria-label="Call Accident Care"
      className="call-bar fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:hidden"
      data-visible={visible}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="call-bar-shell rounded-full bg-ink p-1.5 shadow-[0_18px_40px_-18px_rgb(11_26_48/0.6)]">
        <CallButton size="md" className="w-full" />
      </div>
    </aside>
  );
}
