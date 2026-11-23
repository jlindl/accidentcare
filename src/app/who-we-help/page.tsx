import { Car, CarTaxiFront, Motorbike, Package, Users, type LucideIcon } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import FeatureSplit from "@/components/FeatureSplit";
import Reviews from "@/components/Reviews";
import SceneCallout from "@/components/SceneCallout";
import NextPages from "@/components/NextPages";
import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";
import { audienceDetails } from "@/content/pages";
import { audiences } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/who-we-help",
  "Who we help",
  "Non-fault accident support for drivers, motorcyclists, taxi and PCO drivers, delivery riders and passengers, anywhere in the UK.",
);

const icons: Record<(typeof audienceDetails)[number]["key"], LucideIcon> = {
  drivers: Car,
  motorcyclists: Motorbike,
  taxi: CarTaxiFront,
  delivery: Package,
  passengers: Users,
};

export default function WhoWeHelpPage() {
  return (
    <PageShell>
      <PageHero
        label="Who we help"
        path="/who-we-help"
        title={
          <>
            Whatever you drive or ride. <span className="text-go">Even if you were the passenger.</span>
          </>
        }
        intro="If someone else caused the accident, we help you get moving again, wherever in the UK it happened."
        photo="driver"
        badge={{ title: "Anywhere in the UK", line: "Non-fault accidents for drivers, riders and passengers." }}
      />
      <FactStrip />

      <section aria-labelledby="audiences-title" className="pt-[clamp(72px,9vw,128px)]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-go-deep">Find your situation</p>
              <RevealText id="audiences-title" className="mt-5 text-h2">
                Five kinds of road user. <span className="text-muted">One number.</span>
              </RevealText>
            </div>
          </div>
          <Reveal as="ul" stagger={0.06} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a) => {
              const Icon = icons[a.key];
              return (
                <li key={a.key} data-reveal-item>
                  <a href={`#${a.key}`} className="card card-hover group flex h-full flex-col p-5 sm:p-6">
                    <span className="icon-well size-11">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="mt-8 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.025em] transition-colors group-hover:text-go-deep">
                      {a.title}
                    </span>
                    <span className="mt-2 text-[0.9063rem] leading-[1.5] text-muted">{a.line}</span>
                  </a>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      <div className="container-x grid gap-[clamp(96px,12vw,160px)] py-[clamp(96px,12vw,160px)]">
        {audienceDetails.map((a, i) => (
          <FeatureSplit
            key={a.key}
            id={a.key}
            index={i}
            label={a.title}
            title={a.headline}
            intro={a.intro}
            points={a.helps}
            pointsLabel="How we help"
            photo={a.photo}
            flip={i % 2 === 1}
          />
        ))}
      </div>

      <Reviews />

      <SceneCallout
        label="How it works"
        title="The road back, in four steps."
        line="You call us. We get you moving, sort the repairs and handle the claim until it's settled."
        href="/how-it-works"
        cta="See how it works"
        photo="road"
      />

      <NextPages current="/who-we-help" />
    </PageShell>
  );
}
