/**
 * Turns a generated article into a post file in the site's format.
 *
 * This is the adapter between the engine and the site. Accident Care's guides
 * group by category and show a stock photo per guide, so both come from the
 * topic's entry in data/services.json (as PoundMart's categories and mylife/'s
 * art do); the rest are the engine's keys. The site's loader
 * (src/lib/guides.ts) checks both.
 *
 * Site-owned: an engine upgrade replaces this file, so copy these changes back
 * after an upgrade.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { GUIDE_CATEGORIES } from "../../src/content/guide-categories";
import { config } from "../config";
import type { Article } from "./claude";
import type { Topic } from "./topics";

type SiteTopicFields = { category?: string; photo?: string };

const photoExists = (name: string) => fs.existsSync(path.join(process.cwd(), "src", "images", `${name}.jpg`));

export function buildPostFile(article: Article, topic: Topic, date: string): string {
  const extra: SiteTopicFields = topic.type === "service" ? (topic.service as SiteTopicFields) : {};
  const names = GUIDE_CATEGORIES.map((c) => c.name) as string[];
  const category = extra.category && names.includes(extra.category) ? extra.category : config.site.categories[topic.type];
  const photo = extra.photo && photoExists(extra.photo) ? extra.photo : undefined;

  const data: Record<string, unknown> = {
    title: article.title,
    slug: article.slug,
    description: article.metaDescription,
    excerpt: article.excerpt,
    date,
    type: topic.type,
    category,
    ...(photo ? { photo } : {}),
    targetKeyword: article.targetKeyword,
    ...(topic.type === "location"
      ? { location: topic.location.name, region: topic.location.region }
      : { service: topic.service.name }),
    audience: topic.audience.name,
    author: config.site.author,
    topicKey: topic.key,
  };

  return matter.stringify(`\n${article.body.trim()}\n`, data);
}
