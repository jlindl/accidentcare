/**
 * MDX rendering for guides. Guides are trusted repo content (hand-written or
 * from the SEO engine). Only the components registered below may be used in a
 * guide; keep this list in sync with seo-engine/site.config.ts (ctaComponent).
 */
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/WhatsAppButton";

function A({ href = "", children }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "font-medium text-go-deep underline decoration-go/35 decoration-2 underline-offset-4 transition-[text-decoration-color,color] hover:decoration-go";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

const H2 = (p: ComponentPropsWithoutRef<"h2">) => (
  <h2 {...p} className="mt-16 mb-5 scroll-mt-28 text-[clamp(1.625rem,1.2rem+1.6vw,2.25rem)] leading-[1.1] text-ink first:mt-0" />
);
const H3 = (p: ComponentPropsWithoutRef<"h3">) => (
  <h3 {...p} className="mt-10 mb-3 scroll-mt-28 text-[1.3125rem] leading-snug tracking-[-0.02em] text-ink" />
);
const H4 = (p: ComponentPropsWithoutRef<"h4">) => <h4 {...p} className="mt-8 mb-2 font-display text-lg font-bold text-ink" />;
const P = (p: ComponentPropsWithoutRef<"p">) => <p {...p} className="my-5 text-[1.0625rem] leading-[1.75] text-ink/85" />;
const UL = (p: ComponentPropsWithoutRef<"ul">) => (
  <ul
    {...p}
    className="my-6 flex flex-col gap-3 pl-0 [&>li]:relative [&>li]:pl-8 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-[0.62em] [&>li]:before:size-2.5 [&>li]:before:rounded-full [&>li]:before:bg-go [&>li]:before:ring-4 [&>li]:before:ring-go-soft"
  />
);
const OL = (p: ComponentPropsWithoutRef<"ol">) => (
  <ol
    {...p}
    className="my-6 flex list-none flex-col gap-3 pl-0 [counter-reset:li] [&>li]:relative [&>li]:pl-11 [&>li]:[counter-increment:li] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0.5 [&>li]:before:grid [&>li]:before:size-7 [&>li]:before:place-items-center [&>li]:before:rounded-full [&>li]:before:bg-go-soft [&>li]:before:font-mono [&>li]:before:text-xs [&>li]:before:font-semibold [&>li]:before:text-go-deep [&>li]:before:content-[counter(li)]"
  />
);
const LI = (p: ComponentPropsWithoutRef<"li">) => <li {...p} className="text-[1.0625rem] leading-[1.7] text-ink/85 [&>p]:my-0" />;
const Blockquote = (p: ComponentPropsWithoutRef<"blockquote">) => (
  <blockquote {...p} className="my-8 rounded-[20px] border border-go/20 bg-go-soft px-6 py-5 text-ink [&>p]:my-0 [&>p]:text-ink/90" />
);
const HR = () => <hr className="my-12 border-line" />;
const Strong = (p: ComponentPropsWithoutRef<"strong">) => <strong {...p} className="font-semibold text-ink" />;
const Table = (p: ComponentPropsWithoutRef<"table">) => (
  <div className="card my-8 overflow-x-auto" data-lenis-prevent-wheel>
    <table {...p} className="w-full min-w-[480px] border-collapse text-left text-[0.9688rem]" />
  </div>
);
const TH = (p: ComponentPropsWithoutRef<"th">) => <th {...p} className="border-b border-line bg-go-soft px-4 py-3 font-semibold text-ink" />;
const TD = (p: ComponentPropsWithoutRef<"td">) => <td {...p} className="border-b border-line px-4 py-3 align-top text-ink/85" />;

/** The one call to action a guide may place mid-article: <CallCta />. */
export function CallCta() {
  return (
    <aside aria-label="Call Accident Care" className="not-prose my-10 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#2563eb,#1d4ed8_60%,#1e40af)] p-6 text-white sm:p-8">
      <p className="label text-white/80">Had an accident that wasn&apos;t your fault?</p>
      <p className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold leading-tight tracking-[-0.03em]">
        One call and we&apos;ll take it from there.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={site.phoneHref}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-6 font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="grid size-8 place-items-center rounded-full bg-go text-white transition-transform duration-500 group-hover:-rotate-12">
            <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
          </span>
          Call <span className="font-mono tabular-nums">{site.phoneDisplay}</span>
        </a>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/35 px-6 font-medium text-white transition-colors hover:bg-white/10"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp us
        </a>
      </div>
    </aside>
  );
}

const components = {
  a: A,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: Blockquote,
  hr: HR,
  strong: Strong,
  table: Table,
  th: TH,
  td: TD,
  CallCta,
};

export default async function Mdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    development: false,
  });
  return <Content components={components} />;
}
