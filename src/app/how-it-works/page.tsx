import { CalendarClock, Camera, IdCard, UserRound, type LucideIcon } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import RoadBack from "@/components/RoadBack";
import CostExplainer from "@/components/CostExplainer";
import SceneCallout from "@/components/SceneCallout";
import NextPages from "@/components/NextPages";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import Photo from "@/components/Photo";
import { haveReady } from "@/content/pages";
import { steps } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/how-it-works",
  "How it works",
  "From one phone call to a settled claim: how Accident Care arranges recovery, a replacement vehicle, repairs and your non-fault claim, anywhere in the UK.",
);

const readyIcons: LucideIcon[] = [CalendarClock, IdCard, Camera, UserRound];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How a non-fault accident claim works with Accident Care",
  step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.line })),
};

export default function HowItWorksPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <PageHero
        label="How it works"
        path="/how-it-works"
        title={
          <>
            One phone call. <span className="text-go">We take it from there.</span>
          </>
        }
        intro="Tell us what happened and we arrange the rest: recovery, a replacement car or bike, repairs and your claim, until it's settled."
        photo="phone"
        badge={{ title: "Not sure if it was your fault?", line: "Call us and we'll talk it through. There's no obligation." }}
      />
      <FactStrip />

      <div className="pt-[clamp(56px,8vw,112px)]">
        <RoadBack />
      </div>

      {/* Before you call */}
      <section aria-labelledby="ready-title" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="label text-go-deep">Before you call</p>
              <RevealText id="ready-title" className="mt-5 text-h2">
                Have these to hand. <span className="text-muted">If you can.</span>
              </RevealText>
              <p className="mt-6 max-w-[40ch] text-body-l text-muted">
                Whatever you have helps. Don&apos;t worry if you don&apos;t have everything: call anyway and we&apos;ll work through it together.
              </p>
              <Photo
                name="scene"
                sizes="(min-width: 1024px) 38vw, 100vw"
                position="50% 45%"
                className="mt-10 hidden aspect-[4/3] rounded-[24px] lg:block"
              />
            </div>
          </div>
          <Reveal as="ul" stagger={0.07} className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {haveReady.map((h, i) => {
              const Icon = readyIcons[i];
              return (
                <li key={h.title} data-reveal-item className="card card-hover flex flex-col p-6 sm:p-7 sm:min-h-[240px]">
                  <span className="icon-well size-12">
                    <Icon className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-auto pt-10 text-h3">{h.title}</h3>
                  <p className="mt-2.5 text-[0.9688rem] leading-[1.55] text-muted">{h.line}</p>
                </li>
              );
            })}
            <li data-reveal-item className="rounded-[20px] bg-go-soft p-6 sm:col-span-2 sm:p-7">
              <p className="font-display text-[1.3125rem] font-bold leading-tight tracking-[-0.025em] text-ink">
                What happens on the call?
              </p>
              <p className="mt-2.5 max-w-[60ch] text-[1rem] leading-[1.6] text-ink/80">
                You tell us what happened. We check the accident wasn&apos;t your fault and explain what you&apos;re entitled to, then
                start arranging what you need.
              </p>
            </li>
          </Reveal>
        </div>
      </section>

      <div className="border-t border-line">
        <CostExplainer />
      </div>

      <SceneCallout
        label="At the scene"
        title="Still at the roadside? Start with safety."
        line="A calm, practical checklist for the first few minutes after an accident, then one call to us."
        href="/at-the-scene"
        cta="Read the checklist"
        photo="road"
      />

      <NextPages current="/how-it-works" />
    </PageShell>
  );
}
