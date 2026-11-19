import { Phone } from "lucide-react";
import { site } from "@/content/site";

type Props = {
  size?: "sm" | "md" | "lg";
  label?: string;
  showNumber?: boolean;
  className?: string;
  variant?: "go" | "ink";
};

/** The primary action everywhere on the site: a tel: link. */
export default function CallButton({
  size = "md",
  label = "Call",
  showNumber = true,
  className = "",
  variant = "go",
}: Props) {
  const sizes = {
    sm: "h-11 gap-2 px-4 text-[0.9375rem]",
    md: "h-14 gap-3 px-6 text-[1.0625rem]",
    lg: "h-16 gap-3 px-7 text-[1.1875rem]",
  }[size];
  const colours =
    variant === "go"
      ? "bg-go text-ink hover:bg-[#52dc6b] shadow-[inset_0_-2px_0_rgb(11_26_48/0.12)]"
      : "bg-ink text-white hover:bg-ink-2";
  const iconWrap =
    variant === "go" ? "bg-ink text-go" : "bg-go text-ink";

  return (
    <a
      href={site.phoneHref}
      className={`group inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98] ${sizes} ${colours} ${className}`}
      aria-label={showNumber ? undefined : `${label} ${site.phoneDisplay}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-12 ${iconWrap} ${
          size === "sm" ? "size-7" : "size-8"
        }`}
        aria-hidden="true"
      >
        <Phone className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2} />
      </span>
      <span className="whitespace-nowrap">
        {label}
        {showNumber && <span className="font-mono tabular-nums tracking-[-0.02em]"> {site.phoneDisplay}</span>}
      </span>
    </a>
  );
}
