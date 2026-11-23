"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/guides";

/** Sticky "In this guide" list that highlights the section being read. */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [headings]);

  return (
    <nav aria-label="In this guide" className="card hidden p-6 lg:block">
      <p className="label text-ink/70">In this guide</p>
      <ol className="mt-4 grid gap-1">
        {headings.map((h) => {
          const on = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                className={`block rounded-[10px] border-l-2 px-3 py-2 text-[0.9375rem] leading-snug transition-[color,border-color,background-color] duration-300 ${
                  on ? "border-go bg-go-soft font-medium text-go-deep" : "border-transparent text-muted hover:bg-go-soft/60 hover:text-ink"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
