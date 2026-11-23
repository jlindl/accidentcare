import Link from "next/link";
import { disclaimer, services, site } from "@/content/site";
import { pages } from "@/content/pages";
import Wordmark from "./Wordmark";
import { WhatsAppIcon } from "./WhatsAppButton";

const pageLinks = pages.footer;

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pb-28 text-white sm:pb-0">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12 lg:py-24">
        <div className="md:col-span-5">
          <Wordmark tone="dark" />
          <p className="mt-6 max-w-[36ch] text-[0.9688rem] leading-[1.6] text-on-dark-muted">
            Accident claim management for non-fault road traffic accidents, anywhere in the UK.
          </p>
          <a
            href={site.phoneHref}
            className="mt-8 inline-block py-1 font-display text-[1.75rem] font-bold tracking-[-0.03em] tabular-nums text-white transition-colors hover:text-go-bright"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener"
            className="mt-2 flex w-fit items-center gap-2.5 py-2 text-[0.9688rem] text-white/85 transition-colors hover:text-go-bright"
          >
            <WhatsAppIcon className="size-[18px]" />
            Message us on WhatsApp
          </a>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h2 className="label text-on-dark-muted">Services</h2>
          <ul className="mt-3 text-[0.9688rem] text-white/85">
            {services.map((s) => (
              <li key={s.title}>
                <Link href="/services" className="inline-flex min-h-10 items-center transition-[color] hover:text-go-bright">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="label text-on-dark-muted">Explore</h2>
          <ul className="mt-3 text-[0.9688rem]">
            {pageLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center text-white/85 transition-[color] hover:text-go-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-x">
        <div className="border-t border-line-dark py-8">
        <p className="max-w-[90ch] text-[0.8438rem] leading-[1.6] text-on-dark-muted">{disclaimer}</p>
        <div className="mt-6 flex flex-col gap-3 text-[0.8438rem] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {site.name}</p>
          <p>
            Website by{" "}
            <a
              href="https://integrate-tech.co.uk"
              target="_blank"
              rel="noopener"
              className="inline-block py-1.5 text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-go-bright hover:decoration-go-bright"
            >
              Integrate
            </a>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
