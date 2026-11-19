import { Plus } from "lucide-react";
import { faqs, site } from "@/content/site";
import RevealText from "./RevealText";

export default function Faq() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section-y border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-go-deep">FAQs</p>
          <RevealText id="faq-title" className="mt-5 text-h2">
            Straight answers.
          </RevealText>
          <p className="mt-6 max-w-[34ch] text-body-l text-muted">
            Anything else, just ask. Call{" "}
            <a href={site.phoneHref} className="inline-block whitespace-nowrap py-1.5 font-medium text-go-deep underline decoration-go/40 decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-go">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div className="grid content-start gap-3 lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item card group px-5 transition-[border-color,box-shadow] duration-300 hover:border-go/30 open:border-go/30 sm:px-7">
              <summary className="flex min-h-[72px] cursor-pointer items-center justify-between gap-6 rounded-[12px] py-5 text-left">
                <h3 className="text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 group-hover:text-go-deep">
                  {f.q}
                </h3>
                <span className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line bg-go-soft text-go-deep transition-colors duration-300 group-hover:border-go/40 group-open:border-go group-open:bg-go group-open:text-white">
                  <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 pr-6 text-[1rem] sm:pr-14 leading-[1.65] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
