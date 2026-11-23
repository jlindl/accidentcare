import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import GuidesListing from "@/components/guides/GuidesListing";
import { GUIDE_CATEGORIES } from "@/content/guide-categories";
import type { PhotoKey } from "@/content/pages";
import { getCategory, guidesInCategory } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import { breadcrumbLd } from "@/lib/schema";
import { absolute } from "@/lib/site-url";

const PHOTO: Record<string, PhotoKey> = {
  "after-an-accident": "scene",
  "claims-and-costs": "consult",
  "getting-back-on-the-road": "recovery",
  "injury-claims": "phone",
};

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/category/[slug]">) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return pageMeta(`/guides/category/${c.slug}`, `${c.name} guides`, `${c.description} Plain-English guides from Accident Care, for non-fault accidents anywhere in the UK.`);
}

/**
 * params are read inside Suspense, as Next recommends with Partial Prefetching: every guide is
 * prerendered, and an unknown slug gets the 404 page with a noindex tag (the status stays 200
 * because the shell has already streamed; see node_modules/next/dist/docs streaming guide).
 */
export default function GuideCategoryPage({ params }: PageProps<"/guides/category/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <GuideCategoryPageContent params={params} />
    </Suspense>
  );
}

async function GuideCategoryPageContent({ params }: { params: PageProps<"/guides/category/[slug]">["params"] }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const guides = guidesInCategory(category.slug);
  const path = `/guides/category/${category.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absolute(path),
        name: `${category.name} guides`,
        url: absolute(path),
        description: category.description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(`/guides/${g.slug}`), name: g.title })),
        },
      },
      breadcrumbLd([
        { name: "Guides", path: "/guides" },
        { name: category.name, path },
      ]),
    ],
  };

  return (
    <PageShell jsonLd={jsonLd}>
      <PageHero
        label="Guides"
        title={<>{category.name}</>}
        intro={category.description}
        photo={PHOTO[category.slug] ?? "road"}
        badge={{ title: `${guides.length} ${guides.length === 1 ? "guide" : "guides"}`, line: "Plain English, for non-fault accidents anywhere in the UK." }}
      />
      <GuidesListing guides={guides} activeCategory={category.slug} />
    </PageShell>
  );
}
