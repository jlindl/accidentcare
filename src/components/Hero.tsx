import { Check } from "lucide-react";
import { site } from "@/content/site";
import CallButton from "./CallButton";
import { WhatsAppIcon } from "./WhatsAppButton";

const helpWith = [
  { title: "Replacement vehicles", line: "A replacement car or motorbike while yours is off the road." },
  { title: "Vehicle repairs", line: "Repairs arranged and managed for you, start to finish." },
  { title: "Recovery", line: "Cars and motorbikes recovered from the roadside to safety." },
  { title: "Injury claims", line: "If you've been hurt, we help you start a no win, no fee claim." },
];

const chips = ["Cars, taxis and motorbikes", "Drivers, riders and passengers", "Anywhere in the UK"];

/** First screen. Entrance is pure CSS (globals.css) so the h1 paints on the first frame. */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(60%_55%_at_85%_10%,rgb(37_99_235/0.10),transparent_70%),linear-gradient(to_bottom,#fff,var(--color-bg))] pt-[72px]"
    >
      <HeroRoad />
      <div className="container-x relative grid gap-12 pb-16 pt-[clamp(28px,6svh,72px)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-[clamp(56px,9svh,112px)]">
        <div className="lg:col-span-7">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-go/20 bg-go-soft px-3.5 py-1.5 text-[0.875rem] font-semibold text-go-deep">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-go/50 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-go" />
            </span>
            Non-fault accident support <span aria-hidden="true">·</span> UK-wide
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,1.45rem+3.4vw,4.25rem)] font-[750] leading-[1.02] tracking-[-0.032em] text-ink"
          >
            <span className="hero-line">
              <span>Had an accident that wasn&apos;t your fault?</span>
            </span>
            <span className="hero-line">
              <span className="text-go">We&apos;ll take it from here.</span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-[52ch] text-body-l text-muted">
            Recovery, a replacement car or bike, repairs and your claim, all handled from one phone call. For drivers,
            motorcyclists, taxi and PCO drivers, delivery riders and passengers.
          </p>

          <div id="hero-cta" className="hero-rise mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
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

          <ul className="hero-fade mt-7 flex flex-wrap gap-2" aria-label="Who and where">
            {chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-surface/80 px-3.5 py-2 text-[0.875rem] text-ink/75 transition-[border-color,color,background-color] duration-300 hover:border-go/40 hover:bg-go-soft hover:text-go-deep"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-card lg:col-span-5">
          <div className="card p-5 sm:p-6 lg:ml-auto lg:max-w-[460px]">
            <h2 className="label px-1 text-go-deep">What we can help with</h2>
            <ul className="mt-4 grid gap-2.5">
              {helpWith.map((h) => (
                <li
                  key={h.title}
                  className="group flex gap-3.5 rounded-[14px] border border-line bg-surface p-4 transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-soft)] hover:translate-x-1 hover:border-go/30 hover:bg-go-soft/60"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-go-soft text-go-deep transition-colors duration-300 group-hover:bg-go group-hover:text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold leading-snug text-ink">{h.title}</span>
                    <span className="mt-1 block text-[0.9063rem] leading-[1.5] text-muted">{h.line}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-[14px] bg-go-soft px-4 py-3.5 text-[0.9063rem] leading-[1.55] text-ink/85">
              <strong className="font-semibold text-ink">Not sure if it was your fault?</strong> Call us and we&apos;ll talk it
              through. There&apos;s no obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The road from the logo, drawn in on load behind the help card. Decorative. */
function HeroRoad() {
  const d = "M800 -40C640 60 720 260 560 340C400 420 300 460 300 620C300 780 440 820 420 980";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 900"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-[48%] lg:block"
    >
      <defs>
        <mask id="hero-road-mask" maskUnits="userSpaceOnUse">
          <path d={d} pathLength={1} className="hero-road-draw" fill="none" stroke="#fff" strokeWidth="80" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#hero-road-mask)">
        <path d={d} fill="none" stroke="#2563eb" strokeOpacity="0.9" strokeWidth="58" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="22 22" />
      </g>
    </svg>
  );
}
