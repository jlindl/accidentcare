import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import AtTheScene from "@/components/AtTheScene";
import NextPages from "@/components/NextPages";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import { steps } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/at-the-scene",
  "At the scene",
  "Just had a road accident? A calm checklist: make it safe, call 999 if needed, swap details, take photos, don't admit fault, then call Accident Care.",
);

export default function AtTheScenePage() {
  return (
    <PageShell>
      <PageHero
        label="At the scene"
        path="/at-the-scene"
        title={
          <>
            The first few minutes, <span className="text-go">made simple.</span>
          </>
        }
        intro="Straight after an accident it's hard to think clearly. Here's what to do, step by step, and when to call us."
        photo="damage"
        badge={{ title: "Safety first", line: "If anyone is hurt or the road is blocked, call 999 before anything else." }}
      />
      <FactStrip />

      <div className="pt-[clamp(24px,4vw,48px)] [&>section]:border-t-0">
        <AtTheScene />
      </div>

      {/* Photos tip */}
      <section aria-labelledby="photos-title" className="pb-[clamp(80px,10vw,136px)]">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Photo name="scene" sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[4/3] rounded-[28px] shadow-[0_30px_60px_-36px_rgb(15_31_61/0.45)]" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label text-go-deep">Your phone is your best tool</p>
            <RevealText id="photos-title" className="mt-5 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-[1.04]">
              Photos now save questions later.
            </RevealText>
            <p className="mt-5 max-w-[46ch] text-body-l text-muted">
              Photograph the vehicles, the damage, the road and the scene. Note any witnesses and their numbers. Whatever you
              capture helps when we deal with the at-fault insurer.
            </p>
          </div>
        </div>
      </section>

      {/* After the call */}
      <section aria-labelledby="after-title" className="on-dark px-2 sm:px-4">
        <div className="mx-auto max-w-[1440px] rounded-[32px] bg-[linear-gradient(165deg,#0f1f3d,#122c62)] text-white">
          <div className="container-x py-24 sm:py-32">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="label text-go-bright">After you call</p>
                <RevealText id="after-title" className="mt-5 text-h2 text-white">
                  Then we take it from there.
                </RevealText>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Link
                  href="/how-it-works"
                  className="link-underline inline-flex items-center gap-2 py-1 text-[1.0625rem] font-medium text-go-bright"
                >
                  See how it works <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <Reveal as="ol" stagger={0.08} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  data-reveal-item
                  className="group rounded-[20px] border border-line-dark bg-white/[0.04] p-6 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-go/60 hover:bg-white/[0.08] sm:p-7"
                >
                  <span className="grid size-11 place-items-center rounded-full border-2 border-white/20 font-mono text-sm tabular-nums text-on-dark-muted transition-colors duration-500 group-hover:border-go group-hover:bg-go group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 text-h3 text-white">{s.title}</h3>
                  <p className="mt-3 text-[0.9688rem] leading-[1.6] text-on-dark-muted">{s.line}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <NextPages current="/at-the-scene" />
    </PageShell>
  );
}
