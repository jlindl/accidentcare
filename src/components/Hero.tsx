import { ArrowDown } from "lucide-react";
import CallButton from "./CallButton";

/** First screen. Entrance is pure CSS (globals.css) so the h1 paints on the first frame. */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[72px]">
      <HeroRoad />
      <div className="container-x relative pb-14 pt-[clamp(24px,6svh,48px)] sm:pb-[clamp(40px,8svh,80px)] sm:pt-[clamp(28px,7svh,96px)]">
        <p className="label hero-fade inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-2 text-ink/80">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-go" />
          </span>
          Non-fault accidents <span aria-hidden="true">·</span> UK-wide
        </p>

        <h1
          id="hero-title"
          className="mt-[clamp(20px,4svh,36px)] text-display-xl font-[750] tracking-[-0.045em] text-ink"
        >
          <span className="hero-line">
            <span>Not your fault.</span>
          </span>
          <span className="hero-line">
            <span>
              Not your <span className="text-go-deep">cost.</span>
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-[clamp(20px,4svh,36px)] max-w-[46ch] text-body-l text-muted">
          Recovery, a replacement car or bike, repairs and your claim, all handled from one phone call. For drivers,
          motorcyclists, taxi and PCO drivers, delivery riders and passengers.
        </p>

        <div id="hero-cta" className="hero-rise mt-[clamp(24px,5svh,44px)] flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <CallButton size="lg" />
          <a
            href="#how-it-works"
            className="group inline-flex h-12 items-center gap-2 rounded-full px-1 text-[1.0625rem] font-medium text-ink"
          >
            How it works
            <ArrowDown
              className="size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/** The road from the logo, drawn in on load. Decorative. */
function HeroRoad() {
  const d = "M760 -40C620 40 700 240 560 320C420 400 330 420 320 580C310 740 430 800 400 960";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 900"
      preserveAspectRatio="xMaxYMin slice"
      className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-[34%] lg:block xl:w-[54%]"
    >
      <defs>
        <mask id="hero-road-mask" maskUnits="userSpaceOnUse">
          <path d={d} pathLength={1} className="hero-road-draw" fill="none" stroke="#fff" strokeWidth="64" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#hero-road-mask)">
        <path d={d} fill="none" stroke="#3fd15a" strokeWidth="46" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#f5f4ef" strokeWidth="2.5" strokeDasharray="22 22" />
      </g>
    </svg>
  );
}
