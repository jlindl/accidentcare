import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absolute, siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Demo build: blocked from indexing until the client goes live (site.noindex in src/content/site.ts).
  if (site.noindex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absolute("/sitemap.xml"),
    host: siteUrl,
  };
}
