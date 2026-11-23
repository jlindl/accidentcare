/**
 * Shared schema.org builders. The Organization and WebSite nodes are emitted
 * once, in the root layout; pages reference them by @id.
 */
import { site } from "@/content/site";
import { absolute } from "./site-url";

export const ORG_ID = `${absolute("/")}#organization`;
export const WEBSITE_ID = `${absolute("/")}#website`;

export function organizationLd() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    url: absolute("/"),
    logo: absolute("/apple-icon"),
    description: "Accident claim management for non-fault road traffic accidents, anywhere in the UK.",
    telephone: "+447864920248",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    slogan: site.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+447864920248",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absolute("/"),
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

/** BreadcrumbList from Home through the given trail. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(c.path) })),
  };
}
