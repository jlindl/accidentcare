import type { ReactNode } from "react";
import Nav from "./Nav";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";
import WhatsAppButton from "./WhatsAppButton";

/** Shared frame for the inner pages: the homepage's nav, closing call panel and footer. */
export default function PageShell({ children, jsonLd }: { children: ReactNode; jsonLd?: object }) {
  return (
    <>
      <Nav />
      <main id="main">
        {children}
        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar />
      <WhatsAppButton />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}
