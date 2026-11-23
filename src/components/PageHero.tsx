import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { PhotoKey } from "@/content/pages";
import { breadcrumbLd } from "@/lib/schema";
import CallButton from "./CallButton";
import Photo from "./Photo";
import { WhatsAppIcon } from "./WhatsAppButton";

type Props = {
  label: string;
  title: ReactNode;
  intro: string;
  photo: PhotoKey;
  photoPosition?: string;
  /** Small glass card over the photo. */
  badge?: { title: string; line: string };
  /** The page's path. When set, the visible breadcrumb is also emitted as BreadcrumbList schema. */
  path?: string;
  children?: ReactNode;
};

/**
 * Inner-page hero: the homepage hero's type, gradient and road, with a large photo
 * in place of the help card. Entrance is pure CSS so the h1 paints on the first frame.
 */
export default function PageHero({ label, title, intro, photo, photoPosition, badge, path, children }: Props) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(60%_55%_at_85%_10%,rgb(37_99_235/0.10),transparent_70%),linear-gradient(to_bottom,#fff,var(--color-bg))] pt-[72px]"
    >
      <PageRoad />
      {path && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbLd([{ name: label, path }]) }).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <div className="container-x relative grid gap-12 pb-16 pt-[clamp(28px,6svh,72px)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-[clamp(56px,9svh,112px)]">
        <div className="lg:col-span-6">
          <nav aria-label="Breadcrumb" className="hero-fade">
            <ol className="flex items-center gap-2 text-[0.875rem] text-muted">
              <li>
                <Link href="/" className="link-underline py-1 transition-colors hover:text-go-deep">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink/30">/</li>
              <li aria-current="page" className="font-semibold text-go-deep">
                {label}
              </li>
            </ol>
          </nav>

          <h1
            id="page-title"
            className="mt-6 text-[clamp(2.5rem,1.45rem+3.4vw,4.25rem)] font-[750] leading-[1.02] tracking-[-0.032em] text-ink"
          >
            <span className="hero-line">
              <span>{title}</span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-[50ch] text-body-l text-muted">{intro}</p>

          <div className="hero-rise mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <CallButton size="lg" />
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener"
              className="group inline-flex h-16 items-center justify-center gap-3 rounded-full border border-line bg-surface px-7 text-[1.0625rem] font-medium text-ink shadow-[0_1px_2px_rgb(15_31_61/0.05)] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-[#25d366]/60 hover:shadow-[0_14px_30px_-16px_rgb(37_211_102/0.6)] active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-6 text-[#1faa53] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-12 group-hover:scale-110" />
              WhatsApp us
            </a>
          </div>
          {children}
        </div>

        <div className="hero-card relative lg:col-span-6">
          <Photo
            name={photo}
            position={photoPosition}
            priority
            parallax={false}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="aspect-[4/3] rounded-[32px] shadow-[0_40px_80px_-40px_rgb(15_31_61/0.45)] lg:aspect-[5/6] xl:aspect-[1/1]"
          />
          {badge && (
            <div className="glass-badge absolute bottom-4 left-4 right-4 rounded-[20px] p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px] sm:p-5">
              <p className="flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-go-deep">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping rounded-full bg-go/50 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-go" />
                </span>
                {badge.title}
              </p>
              <p className="mt-1.5 text-[0.9688rem] leading-[1.5] text-ink">{badge.line}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** The logo's road, drawn in on load behind the photo. Decorative. */
function PageRoad() {
  const d = "M820 -40C700 120 760 300 600 380C440 460 380 560 420 720C450 840 380 900 360 980";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 900"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-[52%] opacity-60 lg:block"
    >
      <defs>
        <mask id="page-road-mask" maskUnits="userSpaceOnUse">
          <path d={d} pathLength={1} className="hero-road-draw" fill="none" stroke="#fff" strokeWidth="80" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#page-road-mask)">
        <path d={d} fill="none" stroke="#2563eb" strokeOpacity="0.9" strokeWidth="58" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="22 22" />
      </g>
    </svg>
  );
}
