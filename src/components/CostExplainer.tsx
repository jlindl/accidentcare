import { FileCheck, Scale, ShieldCheck } from "lucide-react";
import { costPoints } from "@/content/site";
import RevealText from "./RevealText";
import Reveal from "./Reveal";

const icons = [Scale, ShieldCheck, FileCheck];

export default function CostExplainer() {
  return (
    <section id="cost" aria-labelledby="cost-title" className="section-y">
      <div className="container-x">
        <p className="label text-go-deep">What it costs</p>
        <RevealText id="cost-title" className="mt-5 max-w-[16ch] text-display-l">
          Their mistake. <span className="text-muted">Their insurer&apos;s bill.</span>
        </RevealText>
        <p className="mt-8 max-w-[46ch] text-body-l text-muted">
          If the accident wasn&apos;t your fault, the costs of putting it right are claimed from the driver who caused it. Here is how that works.
        </p>

        <Reveal as="ul" stagger={0.08} className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-3 lg:mt-24">
          {costPoints.map((p, i) => {
            const Icon = icons[i];
            return (
            <li key={p.title} data-reveal-item className="flex flex-col bg-bg p-7 sm:p-9">
              <span className="grid size-12 place-items-center rounded-full bg-surface text-ink">
                <Icon className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-10 text-h3">{p.title}</h3>
              <p className="mt-3 text-[1rem] leading-[1.6] text-muted">{p.line}</p>
            </li>
            );
          })}
        </Reveal>

        <p className="mt-8 max-w-[70ch] text-[0.9375rem] leading-[1.6] text-muted">
          Eligibility depends on the circumstances of your accident. We&apos;ll talk you through it on the first call.
        </p>
      </div>
    </section>
  );
}
