import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import GuidesListing from "@/components/guides/GuidesListing";
import { getAllGuides } from "@/lib/guides";
import { absolute } from "@/lib/site-url";
import { pageMeta } from "@/lib/meta";
import { breadcrumbLd } from "@/lib/schema";

export const metadata = {
  ...pageMeta(
    "/guides",
    "Guides",
    "Plain-English guides for drivers, riders and passengers after a non-fault road accident: what to do, who pays, replacement cars, repairs and injury claims.",
  ),
  alternates: { canonical: "/guides", types: { "application/rss+xml": "/guides/rss.xml" } },
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absolute("/guides"),
        name: "Accident Care guides",
        url: absolute("/guides"),
        isPartOf: { "@id": `${absolute("/")}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(`/guides/${g.slug}`), name: g.title })),
        },
      },
      breadcrumbLd([{ name: "Guides", path: "/guides" }]),
    ],
  };

  return (
    <PageShell jsonLd={jsonLd}>
      <PageHero
        label="Guides"
        title={
          <>
            After an accident, <span className="text-go">the answers you need.</span>
          </>
        }
        intro="Calm, practical guides for drivers, riders and passengers: what to do at the scene, who pays, getting a replacement vehicle, repairs and injury claims."
        photo="road"
        badge={{ title: "Straight answers", line: "No jargon. Just what to do next, and who to call." }}
      />
      <FactStrip />
      <GuidesListing guides={guides} />
    </PageShell>
  );
}
