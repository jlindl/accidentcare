import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FactStrip from "@/components/FactStrip";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import RoadBack from "@/components/RoadBack";
import Reviews from "@/components/Reviews";
import CostExplainer from "@/components/CostExplainer";
import AtTheScene from "@/components/AtTheScene";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { faqs, services, site } from "@/content/site";
import { ORG_ID } from "@/lib/schema";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      description:
        "Accident claim management for non-fault road traffic accidents: vehicle and motorbike recovery, replacement vehicles, repairs and injury claims.",
      telephone: "+447864920248",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Accident support services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.line },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FactStrip />
        <WhoWeHelp />
        <Services />
        <div className="pt-2 sm:pt-4">
          <RoadBack />
        </div>
        <Reviews />
        <CostExplainer />
        <AtTheScene />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
