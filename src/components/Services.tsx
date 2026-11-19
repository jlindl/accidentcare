import { services } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";
import CallButton from "./CallButton";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y border-y border-line bg-surface">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="label text-go-deep">Services</p>
            <RevealText id="services-title" className="mt-5 text-h2">
              Everything after the accident, arranged for you.
            </RevealText>
            <p className="mt-6 max-w-[38ch] text-body-l text-muted">
              One call starts all of it. You tell us what you need, and we arrange the rest.
            </p>
            <CallButton size="md" className="mt-9" />
          </div>
        </div>

        <Reveal as="ol" stagger={0.06} className="border-t border-line lg:col-span-6 lg:col-start-7">
          {services.map((s) => (
            <li
              key={s.title}
              data-reveal-item
              className="grid gap-y-2 border-b border-line py-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-x-8 sm:py-9"
            >
              <h3 className="text-h3">{s.title}</h3>
              <p className="text-[1rem] leading-[1.55] text-muted">{s.line}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
