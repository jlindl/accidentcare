import { Check } from "lucide-react";

const facts = ["No win, no fee", "Anywhere in the UK", "Drivers, riders, passengers", "One number, start to finish"];

export default function FactStrip() {
  return (
    <div className="border-y border-line bg-bg/80">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4" aria-label="At a glance">
        {facts.map((f, i) => (
          <li
            key={f}
            className={`label flex min-h-[76px] items-center gap-3 py-4 pr-3 text-[0.71875rem] tracking-[0.05em] text-ink/80 sm:text-label sm:tracking-[0.08em] ${
              i % 2 === 1 ? "border-l border-line pl-4 lg:pl-6" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <Check className="size-4 shrink-0 text-go-deep" strokeWidth={2.25} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
