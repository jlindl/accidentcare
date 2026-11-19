"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import CallButton from "./CallButton";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#who-we-help", label: "Who we help" },
  { href: "#faqs", label: "FAQs" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] ${
        scrolled
          ? "border-b border-line bg-white/95 shadow-[0_10px_30px_-22px_rgb(15_31_61/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="-m-2 rounded-[10px] p-2" aria-label="Accident Care, back to top">
          <Wordmark animate />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2.5 text-[0.9375rem] text-ink/75 transition-[color,background-color] duration-300 hover:bg-go-soft hover:text-go-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="hidden sm:block">
          <CallButton size="sm" label="Call" />
        </span>
        <span className="nav-call-mobile sm:hidden">
          <CallButton size="sm" label="Call" showNumber={false} />
        </span>
      </nav>
    </header>
  );
}
