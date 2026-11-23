import type { Metadata } from "next";

const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Accident Care: Not your fault. Not your cost. Call 07864 920248." };

/** Per-page metadata that overrides the homepage's canonical and Open Graph URL. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  const full = `${title} | Accident Care`;
  return {
    title: full,
    description,
    alternates: { canonical: path },
    // Setting openGraph here replaces the root's, so point back at the site-wide share image (app/opengraph-image.tsx).
    openGraph: { type: "website", locale: "en_GB", url: path, siteName: "Accident Care", title: full, description, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [SHARE_IMAGE.url] },
  };
}
