import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PhotoKey } from "@/content/pages";
import Photo from "./Photo";

type Props = {
  label: string;
  title: string;
  line: string;
  href: string;
  cta: string;
  photo: PhotoKey;
};

/** Full-bleed photo panel with a navy veil and one link. Used to hand off between pages. */
export default function SceneCallout({ label, title, line, href, cta, photo }: Props) {
  return (
    <section aria-label={label} className="px-2 sm:px-4">
      <div className="on-dark relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[32px] text-white">
        <Photo name={photo} sizes="100vw" className="!absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(15_31_61/0.94)_0%,rgb(15_31_61/0.78)_45%,rgb(15_31_61/0.25)_100%)]" />
        <div className="container-x py-24 sm:py-32 lg:py-36">
          <p className="label text-go-bright">{label}</p>
          <h2 className="mt-5 max-w-[18ch] text-h2 text-white">{title}</h2>
          <p className="mt-6 max-w-[44ch] text-body-l text-white/80">{line}</p>
          <Link
            href={href}
            className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-white px-6 text-[1.0625rem] font-medium text-ink transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgb(0_0_0/0.5)]"
          >
            {cta}
            <span className="grid size-8 place-items-center rounded-full bg-go text-white transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1">
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
