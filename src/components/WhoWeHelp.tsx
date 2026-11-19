import { Car, CarTaxiFront, Motorbike, Package, Users, type LucideIcon } from "lucide-react";
import { audiences } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";

const icons: Record<(typeof audiences)[number]["key"], LucideIcon> = {
  drivers: Car,
  motorcyclists: Motorbike,
  taxi: CarTaxiFront,
  delivery: Package,
  passengers: Users,
};

export default function WhoWeHelp() {
  return (
    <section id="who-we-help" aria-labelledby="who-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-go-deep">Who we help</p>
            <RevealText id="who-title" className="mt-5 text-h2">
              Whatever you drive or ride. <span className="text-muted">Even if you were the passenger.</span>
            </RevealText>
          </div>
          <p className="max-w-[44ch] text-body-l text-muted lg:col-span-4 lg:col-start-9">
            If someone else caused the accident, we help you get moving again, wherever in the UK it happened.
          </p>
        </div>

        <Reveal as="ul" stagger={0.07} className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 xl:grid-cols-5">
          {audiences.map((a) => {
            const Icon = icons[a.key];
            return (
              <li
                key={a.key}
                data-reveal-item
                className="flex flex-col rounded-[20px] border border-line bg-surface p-6 sm:last:col-span-2 lg:col-span-2 lg:min-h-[260px] lg:last:col-span-3 lg:[&:nth-child(4)]:col-span-3 xl:col-span-1 xl:min-h-[300px] xl:last:col-span-1 xl:[&:nth-child(4)]:col-span-1"
              >
                <span className="grid size-12 place-items-center rounded-full bg-bg text-ink">
                  <Icon className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="pt-8 text-h3 sm:pt-12 xl:pt-20">{a.title}</h3>
                <p className="mt-3 text-[0.9688rem] leading-[1.55] text-muted">{a.line}</p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
