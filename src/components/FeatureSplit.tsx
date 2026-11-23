import { Check } from "lucide-react";
import type { ReactNode } from "react";
import type { PhotoKey } from "@/content/pages";
import Photo from "./Photo";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

type Props = {
  id?: string;
  index?: number;
  label: string;
  title: string;
  intro: string;
  points: readonly string[];
  pointsLabel?: string;
  photo: PhotoKey;
  flip?: boolean;
  children?: ReactNode;
};

/** Editorial image-and-text row used on the inner pages. Alternates sides with `flip`. */
export default function FeatureSplit({ id, index, label, title, intro, points, pointsLabel = "What's included", photo, flip, children }: Props) {
  const titleId = id ? `${id}-title` : undefined;
  return (
    <article id={id} aria-labelledby={titleId} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <Photo
          name={photo}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="aspect-[4/3] rounded-[28px] shadow-[0_30px_60px_-36px_rgb(15_31_61/0.45)] lg:aspect-[5/4]"
        />
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
        <p className="label flex items-center gap-3 text-go-deep">
          {typeof index === "number" && (
            <span className="font-mono text-[0.8125rem] tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
          )}
          {label}
        </p>
        <RevealText id={titleId} className="mt-5 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-[1.04]">
          {title}
        </RevealText>
        <p className="mt-5 max-w-[48ch] text-body-l text-muted">{intro}</p>
        <Reveal className="mt-8 rounded-[20px] border border-line bg-surface p-5 sm:p-6">
          <h3 className="label text-ink/70">{pointsLabel}</h3>
          <ul className="mt-4 grid gap-3">
            {points.map((p) => (
              <li key={p} className="group flex gap-3 text-[1rem] leading-[1.5] text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-go-soft text-go-deep transition-colors duration-300 group-hover:bg-go group-hover:text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        {children}
      </div>
    </article>
  );
}
