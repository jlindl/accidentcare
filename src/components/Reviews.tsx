import { Star } from "lucide-react";
import { reviews, reviewSummary, type Review } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";

// Layout placeholders, shown on the dev server only and labelled on screen.
// They never render in a production build.
const placeholders: (Review & { placeholder: true })[] = [
  {
    placeholder: true,
    quote: "A real customer review goes here, in their own words. Two or three sentences about getting back on the road.",
    name: "Customer name",
    detail: "Driver, town",
    rating: 5,
    source: "Google",
  },
  {
    placeholder: true,
    quote: "A second real review. Ideally from a motorcyclist or a taxi or PCO driver, so every kind of driver sees themselves here.",
    name: "Customer name",
    detail: "Motorcyclist, town",
    rating: 5,
    source: "Google",
  },
  {
    placeholder: true,
    quote: "A third real review. Short and specific works best: what happened, what Accident Care sorted, how it felt.",
    name: "Customer name",
    detail: "PCO driver, town",
    rating: 5,
    source: "Google",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-go text-go" : "fill-transparent text-ink/20"}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  const isDev = process.env.NODE_ENV === "development";
  const items: (Review & { placeholder?: true })[] = reviews.length ? reviews : isDev ? placeholders : [];
  if (!items.length) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-go-deep">Reviews</p>
            <RevealText id="reviews-title" className="mt-5 text-h2">
              Back on the road. <span className="text-muted">In their words.</span>
            </RevealText>
          </div>
          {reviewSummary && (
            <a
              href={reviewSummary.url}
              target="_blank"
              rel="noopener"
              className="group flex w-fit items-center gap-4 rounded-[20px] border border-line bg-surface px-5 py-4 transition-[border-color] hover:border-ink/30 lg:col-span-4 lg:col-start-9 lg:justify-self-end"
            >
              <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums">
                {reviewSummary.rating.toFixed(1)}
              </span>
              <span className="flex flex-col gap-1.5">
                <Stars rating={Math.round(reviewSummary.rating)} />
                <span className="text-[0.875rem] text-muted underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-current">
                  {reviewSummary.count} reviews on {reviewSummary.source}
                </span>
              </span>
            </a>
          )}
        </div>

        <Reveal as="ul" stagger={0.08} className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-20">
          {items.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              data-reveal-item
              className={`relative flex flex-col rounded-[20px] border bg-surface p-7 sm:p-8 ${
                r.placeholder ? "border-dashed border-ink/30" : "border-line"
              }`}
            >
              {r.placeholder && (
                <span className="label absolute right-4 top-4 rounded-full bg-[#ffd23f] px-2.5 py-1 text-ink">
                  Placeholder
                </span>
              )}
              {r.rating && <Stars rating={r.rating} />}
              <blockquote className="mt-6 flex-1">
                <p className="font-display text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5">
                <span>
                  <span className="block font-medium">{r.name}</span>
                  {r.detail && <span className="block text-[0.9375rem] text-muted">{r.detail}</span>}
                </span>
                <span className="label shrink-0 text-muted">
                  {r.source}
                  {r.date ? ` · ${r.date}` : ""}
                </span>
              </footer>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
