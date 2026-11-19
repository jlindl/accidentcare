import type { Metadata } from "next";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import CallButton from "@/components/CallButton";

export const metadata: Metadata = {
  title: "Page not found | Accident Care",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-y-0 right-0 -z-10 h-full w-[70%] opacity-25 md:opacity-100"
      >
        <path d="M820 80C560 120 640 380 420 420C230 455 300 640 120 700" fill="none" stroke="#3fd15a" strokeWidth="46" strokeLinecap="round" />
        <path d="M820 80C560 120 640 380 420 420C230 455 300 640 120 700" fill="none" stroke="#f5f4ef" strokeWidth="2.5" strokeDasharray="22 22" />
      </svg>
      <div className="container-x flex h-[72px] items-center">
        <Link href="/" className="-m-2 rounded-[10px] p-2" aria-label="Accident Care home">
          <Wordmark />
        </Link>
      </div>
      <div className="container-x flex flex-1 flex-col justify-center py-24">
        <p className="label text-go-deep">Error 404</p>
        <h1 className="mt-6 text-display-l">Wrong turn.</h1>
        <p className="mt-6 max-w-[40ch] text-body-l text-muted">
          This page doesn&apos;t exist. If you need help after an accident, the quickest route is a phone call.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <CallButton size="lg" />
          <Link href="/" className="inline-flex h-12 items-center rounded-full px-1 font-medium underline decoration-go decoration-2 underline-offset-4">
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
