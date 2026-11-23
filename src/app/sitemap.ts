import type { MetadataRoute } from "next";
import { GUIDE_CATEGORIES } from "@/content/guide-categories";
import { photos } from "@/content/photos";
import { getAllGuides, guidesInCategory } from "@/lib/guides";
import { absolute } from "@/lib/site-url";

/** When the core pages' copy last changed. Bump it when you edit them. */
const PAGES_UPDATED = "2026-11-19";

const day = (iso: string) => new Date(`${iso}T00:00:00.000Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const latest = guides.reduce((max, g) => ((g.updated ?? g.date) > max ? (g.updated ?? g.date) : max), PAGES_UPDATED);

  const pages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/who-we-help", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/at-the-scene", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" as const },
  ].map((p) => ({ url: absolute(p.path), lastModified: day(PAGES_UPDATED), changeFrequency: p.changeFrequency, priority: p.priority }));

  const index: MetadataRoute.Sitemap = [{ url: absolute("/guides"), lastModified: day(latest), changeFrequency: "daily", priority: 0.8 }];

  const categories: MetadataRoute.Sitemap = GUIDE_CATEGORIES.map((c) => {
    const newest = guidesInCategory(c.slug)[0];
    return {
      url: absolute(`/guides/category/${c.slug}`),
      lastModified: day(newest ? (newest.updated ?? newest.date) : PAGES_UPDATED),
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  const posts: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absolute(`/guides/${g.slug}`),
    lastModified: day(g.updated ?? g.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absolute(photos[g.photo].src.src)],
  }));

  return [...pages, ...index, ...categories, ...posts];
}
