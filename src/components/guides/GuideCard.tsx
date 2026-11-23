import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { formatDate } from "@/lib/guides";
import Photo from "@/components/Photo";

/** A guide in a grid: photo, category, title, excerpt, date and read time. */
export default function GuideCard({ guide, large = false }: { guide: Guide; large?: boolean }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`card card-hover group flex h-full overflow-hidden ${large ? "flex-col lg:grid lg:grid-cols-2" : "flex-col"}`}
    >
      <Photo
        name={guide.photo}
        parallax={false}
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"}
        className={large ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]"}
      />
      <span className={`flex flex-1 flex-col ${large ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}>
        <span className="flex items-center justify-between gap-4">
          <span className="label text-go-deep">{guide.category.name}</span>
          <span className="icon-well size-9">
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </span>
        </span>
        <span
          className={`mt-4 font-display font-bold leading-[1.12] tracking-[-0.025em] transition-colors duration-300 group-hover:text-go-deep ${
            large ? "text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]" : "text-[1.375rem]"
          }`}
        >
          {guide.title}
        </span>
        <span className={`mt-3 text-muted ${large ? "text-body-l" : "text-[0.9688rem] leading-[1.55]"}`}>{guide.excerpt}</span>
        <span className="mt-auto flex items-center gap-2 pt-6 text-[0.8438rem] text-muted">
          <time dateTime={guide.updated ?? guide.date}>{formatDate(guide.updated ?? guide.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{guide.readMinutes} min read</span>
        </span>
      </span>
    </Link>
  );
}
