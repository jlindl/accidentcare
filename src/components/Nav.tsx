"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";
import { Phone } from "lucide-react";
import CallButton from "./CallButton";
import { pages } from "@/content/pages";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // The menu belongs to the page it was opened on, so it closes itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] ${
        solid
          ? "border-b border-line bg-white/95 shadow-[0_10px_30px_-22px_rgb(15_31_61/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        {isHome ? (
          <a href="#top" className="-m-2 rounded-[10px] p-2" aria-label="Accident Care, back to top">
            <Wordmark animate />
          </a>
        ) : (
          <Link href="/" className="-m-2 rounded-[10px] p-2" aria-label="Accident Care home">
            <Wordmark animate />
          </Link>
        )}
        <ul className="hidden items-center gap-1 lg:flex">
          {pages.nav.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2.5 text-[0.9375rem] transition-[color,background-color] duration-300 hover:bg-go-soft hover:text-go-deep ${
                    active ? "bg-go-soft font-medium text-go-deep" : "text-ink/75"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <CallButton size="sm" label="Call" />
          </span>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="nav-call-mobile grid size-11 place-items-center rounded-full bg-go text-white shadow-[0_10px_24px_-12px_rgb(37_99_235/0.7)] transition-colors hover:bg-go-deep sm:hidden"
          >
            <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="relative grid size-11 place-items-center rounded-full border border-line bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-[18px]">
              <span
                className={`absolute left-0 h-[2px] w-full rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-out-soft)] ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-out-soft)] ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className="mobile-menu lg:hidden"
        data-open={open}
        inert={!open}
      >
        <div className="container-x pb-6 pt-2">
          <ul className="grid gap-1 border-t border-line pt-4">
            {pages.nav.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }} className="mobile-menu-item">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-between rounded-[14px] px-4 font-display text-[1.5rem] font-bold tracking-[-0.025em] transition-colors ${
                      active ? "bg-go-soft text-go-deep" : "text-ink hover:bg-go-soft"
                    }`}
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-go">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
