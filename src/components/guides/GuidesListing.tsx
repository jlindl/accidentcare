import Link from "next/link";
import { GUIDE_CATEGORIES } from "@/content/guide-categories";
import type { Guide } from "@/lib/guides";
import Reveal from "@/components/Reveal";
import CallButton from "@/components/CallButton";
import GuideCard from "./GuideCard";

/** Category pills plus the guide grid, shared by /guides and /guides/category/[slug]. */
export default function GuidesListing({ guides, activeCategory }: { guides: Guide[]; activeCategory?: string }) {
  const [lead, ...rest] = guides;
  const pill = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-300 ${
      active ? "border-go bg-go text-white" : "border-line bg-surface text-ink/80 hover:border-go/40 hover:bg-go-soft hover:text-go-deep"
    }`;

  return (
    <section aria-label="Guides" className="section-y">
      <div className="container-x">
        <nav aria-label="Guide categories">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href="/guides" className={pill(!activeCategory)} aria-current={!activeCategory ? "page" : undefined}>
                All guides
              </Link>
            </li>
            {GUIDE_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/guides/category/${c.slug}`}
                  className={pill(activeCategory === c.slug)}
                  aria-current={activeCategory === c.slug ? "page" : undefined}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {guides.length === 0 ? (
          <div className="mt-12 flex flex-col items-start gap-6 rounded-[24px] bg-go-soft p-8 sm:p-10">
            <p className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.025em]">
              New guides for this topic are on the way.
            </p>
            <p className="max-w-[52ch] text-[1rem] leading-[1.6] text-ink/80">
              In the meantime, if you&apos;ve had an accident that wasn&apos;t your fault, call us and we&apos;ll talk it through.
            </p>
            <CallButton size="md" />
          </div>
        ) : (
          <>
            {lead && (
              <div className="mt-12">
                <GuideCard guide={lead} large />
              </div>
            )}
            {rest.length > 0 && (
              <Reveal as="ul" stagger={0.06} className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((g) => (
                  <li key={g.slug} data-reveal-item>
                    <GuideCard guide={g} />
                  </li>
                ))}
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
