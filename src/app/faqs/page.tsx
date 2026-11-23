import Link from "next/link";
import { ArrowRight, Phone, Plus } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FactStrip from "@/components/FactStrip";
import NextPages from "@/components/NextPages";
import RevealText from "@/components/RevealText";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { faqGroups } from "@/content/pages";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/faqs",
  "FAQs",
  "Straight answers about non-fault accident claims: what counts as non-fault, what it costs, who we help and what to have ready when you call.",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  ),
};

export default function FaqsPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <PageHero
        label="FAQs"
        path="/faqs"
        title={
          <>
            Straight answers. <span className="text-go">No small print.</span>
          </>
        }
        intro="The questions people ask us most, about claims, costs and who we help. Anything else, just ask."
        photo="consult"
        badge={{ title: "Anything else?", line: `Call ${site.phoneDisplay}, or message us on WhatsApp on the same number.` }}
      />
      <FactStrip />

      <section aria-label="Questions and answers" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          {/* Topic index */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="label text-go-deep">Topics</p>
              <ul className="mt-5 grid gap-1.5">
                {faqGroups.map((g) => (
                  <li key={g.key}>
                    <a
                      href={`#${g.key}`}
                      className="group flex min-h-12 items-center justify-between rounded-[14px] border border-transparent px-4 text-[1.0625rem] font-medium text-ink/80 transition-[background-color,border-color,color] duration-300 hover:border-go/25 hover:bg-go-soft hover:text-go-deep"
                    >
                      {g.title}
                      <span className="font-mono text-[0.8125rem] tabular-nums text-muted group-hover:text-go-deep">
                        {String(g.items.length).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 hidden rounded-[20px] bg-go-soft p-6 lg:block">
                <p className="font-display text-[1.3125rem] font-bold leading-tight tracking-[-0.025em]">Just had an accident?</p>
                <p className="mt-2 text-[0.9688rem] leading-[1.55] text-ink/80">Work through our calm, practical checklist first.</p>
                <Link href="/at-the-scene" className="link-underline mt-4 inline-flex items-center gap-2 py-1 font-medium text-go-deep">
                  At the scene <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:col-span-7 lg:col-start-6 lg:gap-20">
            {faqGroups.map((g) => (
              <section key={g.key} id={g.key} aria-labelledby={`${g.key}-title`}>
                <RevealText id={`${g.key}-title`} className="text-h2">
                  {g.title}
                </RevealText>
                <div className="mt-8 grid gap-3">
                  {g.items.map((f) => (
                    <details
                      key={f.q}
                      className="faq-item card group px-5 transition-[border-color,box-shadow] duration-300 hover:border-go/30 open:border-go/30 sm:px-7"
                    >
                      <summary className="flex min-h-[72px] cursor-pointer items-center justify-between gap-6 rounded-[12px] py-5 text-left">
                        <h3 className="text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 group-hover:text-go-deep">
                          {f.q}
                        </h3>
                        <span className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line bg-go-soft text-go-deep transition-colors duration-300 group-hover:border-go/40 group-open:border-go group-open:bg-go group-open:text-white">
                          <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
                        </span>
                      </summary>
                      <p className="max-w-[60ch] pb-7 pr-6 text-[1rem] leading-[1.65] text-muted sm:pr-14">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section aria-labelledby="ask-title" className="pb-[clamp(80px,10vw,136px)]">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2">
            <a href={site.phoneHref} className="card card-hover group flex flex-col p-7 sm:p-9">
              <span className="icon-well size-12">
                <Phone className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 id="ask-title" className="mt-10 text-h3">Still got a question? Call us.</h2>
              <p className="mt-3 font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-bold tracking-[-0.035em] tabular-nums text-go-deep">
                {site.phoneDisplay}
              </p>
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener" className="card card-hover group flex flex-col p-7 sm:p-9">
              <span className="icon-well size-12">
                <WhatsAppIcon className="size-[22px]" />
              </span>
              <p className="mt-10 text-h3 font-display font-bold tracking-[-0.025em]">Prefer to message?</p>
              <p className="mt-3 max-w-[40ch] text-[1rem] leading-[1.6] text-muted">
                Send us a WhatsApp on the same number and we&apos;ll get back to you.
              </p>
              <span className="link-underline mt-6 inline-flex w-fit items-center gap-2 py-1 font-medium text-go-deep">
                Open WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <NextPages current="/faqs" />
    </PageShell>
  );
}
