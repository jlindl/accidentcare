import { Phone } from "lucide-react";
import { site } from "@/content/site";

export default function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="bg-[linear-gradient(to_bottom,var(--color-bg)_50%,var(--color-ink)_50%)] px-2 sm:px-4">
      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-go text-ink">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 640"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 -z-10 hidden h-full w-full sm:block"
        >
          <path
            d="M-40 560C260 520 380 300 640 300S1060 470 1480 120"
            fill="none"
            stroke="rgb(11 26 48 / 0.08)"
            strokeWidth="70"
          />
          <path
            d="M-40 560C260 520 380 300 640 300S1060 470 1480 120"
            fill="none"
            stroke="rgb(11 26 48 / 0.14)"
            strokeWidth="2.5"
            strokeDasharray="26 26"
          />
        </svg>
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <h2 id="final-title" className="label text-ink/80">
            Had an accident that wasn&apos;t your fault?
          </h2>
          <a
            href={site.phoneHref}
            className="group mt-8 inline-flex items-center gap-4 rounded-[12px] sm:gap-6"
            aria-label={`Call Accident Care on ${site.phoneDisplay}`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-go transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-12 sm:size-20">
              <Phone className="size-5 sm:size-7" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-display whitespace-nowrap text-[clamp(2.125rem,0.6rem+7.4vw,7.5rem)] font-bold leading-none tracking-[-0.045em] tabular-nums underline decoration-transparent decoration-[3px] underline-offset-[0.12em] transition-[text-decoration-color] duration-500 group-hover:decoration-ink">
              {site.phoneDisplay}
            </span>
          </a>
          <p className="mt-10 max-w-[40ch] text-body-l text-ink/80">
            {site.tagline} Non-fault accidents, anywhere in the UK.
          </p>
        </div>
      </div>
    </section>
  );
}
