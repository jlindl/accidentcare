import { Car, Headset, HeartPulse, Motorbike, Truck, Wrench, type LucideIcon } from "lucide-react";
import { services } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";
import CallButton from "./CallButton";

/** One icon per service, in the same order as `services` in site.ts. */
const icons: LucideIcon[] = [Truck, Truck, Car, Motorbike, Wrench, HeartPulse, Headset];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-go-deep">Services</p>
            <RevealText id="services-title" className="mt-5 text-h2">
              Everything after the accident, arranged for you.
            </RevealText>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-body-l text-muted">
              One call starts all of it. You tell us what you need, and we arrange the rest.
            </p>
          </div>
        </div>

        <Reveal as="ul" stagger={0.06} className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[i] ?? Headset;
            return (
              <li key={s.title} data-reveal-item className="card card-hover flex flex-col p-6 sm:p-7">
                <span className="icon-well size-12">
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-[1.3125rem] font-bold leading-tight tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-2.5 text-[0.9688rem] leading-[1.55] text-muted">{s.line}</p>
              </li>
            );
          })}
          <li className="flex flex-col justify-between gap-6 rounded-[20px] bg-go-soft p-6 sm:p-7">
            <p className="font-display text-[1.3125rem] font-bold leading-tight tracking-[-0.025em] text-ink">
              Not sure what you need? Call and we&apos;ll work it out together.
            </p>
            <CallButton size="md" label="Call us" showNumber={false} className="self-start" />
          </li>
        </Reveal>
      </div>
    </section>
  );
}
