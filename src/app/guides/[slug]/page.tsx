import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import CallButton from "@/components/CallButton";
import Mdx from "@/components/guides/Mdx";
import GuideCard from "@/components/guides/GuideCard";
import TableOfContents from "@/components/guides/TableOfContents";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { FAQ_HEADING, formatDate, getAllGuides, getGuide, relatedGuides } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import { breadcrumbLd, ORG_ID, WEBSITE_ID } from "@/lib/schema";
import { absolute } from "@/lib/site-url";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const base = pageMeta(`/guides/${g.slug}`, g.title, g.description);
  return {
    ...base,
    // Guide titles are already search-shaped; skip the " | Accident Care" suffix when it would push past 60 characters.
    title: g.title.length + 16 <= 60 ? `${g.title} | Accident Care` : g.title,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: g.date,
      modifiedTime: g.updated ?? g.date,
      section: g.category.name,
      images: [{ url: photos[g.photo].src.src, width: photos[g.photo].src.width, height: photos[g.photo].src.height, alt: photos[g.photo].alt }],
    },
    twitter: { ...base.twitter, images: [photos[g.photo].src.src] },
  };
}

/**
 * params are read inside Suspense, as Next recommends with Partial Prefetching: every guide is
 * prerendered, and an unknown slug gets the 404 page with a noindex tag (the status stays 200
 * because the shell has already streamed; see node_modules/next/dist/docs streaming guide).
 */
export default function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <GuidePageContent params={params} />
    </Suspense>
  );
}

async function GuidePageContent({ params }: { params: PageProps<"/guides/[slug]">["params"] }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = relatedGuides(guide);
  const url = absolute(`/guides/${guide.slug}`);
  const photo = photos[guide.photo];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.description,
        url,
        mainEntityOfPage: url,
        datePublished: guide.date,
        dateModified: guide.updated ?? guide.date,
        inLanguage: "en-GB",
        wordCount: guide.wordCount,
        articleSection: guide.category.name,
        ...(guide.targetKeyword ? { keywords: guide.targetKeyword } : {}),
        image: { "@type": "ImageObject", url: absolute(photo.src.src), width: photo.src.width, height: photo.src.height },
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbLd([
        { name: "Guides", path: "/guides" },
        { name: guide.category.name, path: `/guides/category/${guide.category.slug}` },
        { name: guide.title, path: `/guides/${guide.slug}` },
      ]),
      ...(guide.faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ]
        : []),
    ],
  };

  const toc = guide.headings.filter((h) => h.depth === 2 && h.text !== FAQ_HEADING);

  return (
    <PageShell jsonLd={jsonLd}>
      <article aria-labelledby="page-title">
        <header className="relative isolate overflow-hidden bg-[radial-gradient(60%_55%_at_85%_10%,rgb(37_99_235/0.10),transparent_70%),linear-gradient(to_bottom,#fff,var(--color-bg))] pt-[72px]">
          <div className="container-x pb-10 pt-[clamp(28px,6svh,64px)]">
            <nav aria-label="Breadcrumb" className="hero-fade">
              <ol className="flex flex-wrap items-center gap-2 text-[0.875rem] text-muted">
                <li>
                  <Link href="/" className="link-underline py-1 transition-colors hover:text-go-deep">Home</Link>
                </li>
                <li aria-hidden="true" className="text-ink/30">/</li>
                <li>
                  <Link href="/guides" className="link-underline py-1 transition-colors hover:text-go-deep">Guides</Link>
                </li>
                <li aria-hidden="true" className="text-ink/30">/</li>
                <li>
                  <Link href={`/guides/category/${guide.category.slug}`} className="link-underline py-1 font-semibold text-go-deep">
                    {guide.category.name}
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="mt-6 max-w-[920px]">
              <h1 id="page-title" className="text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] font-[750] leading-[1.04] tracking-[-0.032em] text-ink">
                <span className="hero-line">
                  <span>{guide.title}</span>
                </span>
              </h1>
              <p className="hero-fade mt-6 max-w-[62ch] text-body-l text-muted">{guide.excerpt}</p>
              <p className="hero-fade mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9063rem] text-muted">
                <span className="font-medium text-ink">By {guide.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={guide.date}>{formatDate(guide.date)}</time>
                {guide.updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  {guide.readMinutes} min read
                </span>
              </p>
            </div>
          </div>
          <div className="container-x hero-card pb-4">
            <Photo
              name={guide.photo}
              priority
              parallax={false}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="aspect-[16/9] rounded-[32px] shadow-[0_40px_80px_-40px_rgb(15_31_61/0.45)] sm:aspect-[21/9]"
            />
          </div>
        </header>

        <div className="container-x grid gap-12 py-[clamp(56px,7vw,96px)] lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-8 xl:col-span-7">
            <Mdx source={guide.body} />
            <p className="mt-14 rounded-[16px] border border-line bg-surface px-5 py-4 text-[0.875rem] leading-[1.6] text-muted">
              This guide is general information about non-fault road accidents in the UK, not legal or medical advice. Eligibility
              depends on the circumstances of each accident. If anyone is hurt, get medical help first.
            </p>
          </div>

          <aside className="lg:col-span-4 xl:col-span-4 xl:col-start-9" aria-label="On this page">
            <div className="grid gap-4 lg:sticky lg:top-28">
              {toc.length > 1 && <TableOfContents headings={toc} />}
              <div className="rounded-[20px] bg-ink p-6 text-white on-dark">
                <p className="label text-go-bright">Had an accident?</p>
                <p className="mt-3 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.025em]">
                  If it wasn&apos;t your fault, one call starts everything.
                </p>
                <CallButton size="md" className="mt-6 w-full" />
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 text-[0.9688rem] font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  <WhatsAppIcon className="size-5" />
                  WhatsApp us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y border-t border-line">
          <div className="container-x">
            <p className="label text-go-deep">Keep reading</p>
            <h2 id="related-title" className="mt-5 text-h2">
              Related guides.
            </h2>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <GuideCard guide={g} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
