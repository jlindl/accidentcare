import { Car, Headset, HeartPulse, Truck, Wrench, type LucideIcon } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import FeatureSplit from "@/components/FeatureSplit";
import CostExplainer from "@/components/CostExplainer";
import NextPages from "@/components/NextPages";
import CallButton from "@/components/CallButton";
import RevealText from "@/components/RevealText";
import { serviceDetails } from "@/content/pages";
import { services, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { ORG_ID } from "@/lib/schema";

export const metadata = pageMeta(
  "/services",
  "Services",
  "Vehicle and motorbike recovery, replacement cars and bikes, managed repairs and no win, no fee injury claims after a non-fault accident. One number: 07864 920248.",
);

const icons: LucideIcon[] = [Truck, Car, Wrench, HeartPulse, Headset];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.name,
  telephone: "+447864920248",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Accident support services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.line },
    })),
  },
};

export default function ServicesPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <PageHero
        label="Services"
        path="/services"
        title={
          <>
            Everything after the accident, <span className="text-go">arranged for you.</span>
          </>
        }
        intro="Recovery, a replacement car or bike, repairs and your claim. One call starts all of it: you tell us what you need, and we arrange the rest."
        photo="recovery"
        badge={{ title: "Cars and motorbikes", line: "Recovery and replacements for riders as well as drivers." }}
      />
      <FactStrip />

      {/* Index */}
      <section aria-labelledby="index-title" className="pt-[clamp(72px,9vw,128px)]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-go-deep">What we arrange</p>
              <RevealText id="index-title" className="mt-5 text-h2">
                Five ways we get you back on the road.
              </RevealText>
            </div>
            <p className="max-w-[40ch] text-body-l text-muted lg:col-span-4 lg:col-start-9">
              Jump to a service, or call and we&apos;ll work out what you need together.
            </p>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {serviceDetails.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="card card-hover group flex h-full items-center gap-4 p-4 sm:p-5">
                    <span className="icon-well size-11">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-semibold leading-snug text-ink transition-colors group-hover:text-go-deep">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="container-x grid gap-[clamp(96px,12vw,160px)] py-[clamp(96px,12vw,160px)]">
        {serviceDetails.map((s, i) => (
          <FeatureSplit
            key={s.slug}
            id={s.slug}
            index={i}
            label={s.label}
            title={s.title}
            intro={s.intro}
            points={s.points}
            photo={s.photo}
            flip={i % 2 === 1}
          >
            {i === serviceDetails.length - 1 && <CallButton size="md" className="mt-8" />}
          </FeatureSplit>
        ))}
      </div>

      <div className="border-t border-line">
        <CostExplainer />
      </div>

      <NextPages current="/services" />
    </PageShell>
  );
}
