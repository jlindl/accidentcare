import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PhotoKey } from "@/content/pages";
import Photo from "./Photo";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

const all: { href: string; title: string; line: string; photo: PhotoKey }[] = [
  { href: "/how-it-works", title: "How it works", line: "The road back, from the first call to a settled claim.", photo: "phone" },
  { href: "/services", title: "Services", line: "Recovery, replacement vehicles, repairs and injury claims.", photo: "recovery" },
  { href: "/who-we-help", title: "Who we help", line: "Drivers, riders, taxi, PCO and delivery drivers, and passengers.", photo: "taxi" },
  { href: "/at-the-scene", title: "At the scene", line: "Just had an accident? A calm checklist to work through.", photo: "scene" },
  { href: "/faqs", title: "FAQs", line: "Straight answers about costs, claims and who we help.", photo: "consult" },
];

/** "Keep exploring" cards at the foot of each inner page. */
export default function NextPages({ current }: { current: string }) {
  const items = all.filter((p) => p.href !== current).slice(0, 3);
  return (
    <section aria-labelledby="next-title" className="section-y border-t border-line">
      <div className="container-x">
        <p className="label text-go-deep">Keep exploring</p>
        <RevealText id="next-title" className="mt-5 text-h2">
          More from Accident Care.
        </RevealText>
        <Reveal as="ul" stagger={0.08} className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
          {items.map((p) => (
            <li key={p.href} data-reveal-item>
              <Link href={p.href} className="card card-hover group flex h-full flex-col overflow-hidden">
                <Photo name={p.photo} parallax={false} sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[16/10]" />
                <span className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.025em] transition-colors duration-300 group-hover:text-go-deep">
                      {p.title}
                    </span>
                    <span className="icon-well size-10">
                      <ArrowUpRight className="size-[18px]" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="mt-3 text-[0.9688rem] leading-[1.55] text-muted">{p.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
