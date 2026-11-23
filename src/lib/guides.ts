/**
 * Guides loader. Every guide is an MDX file in content/guides/<slug>.mdx with
 * YAML frontmatter. The keys are a superset of what the SEO engine writes
 * (seo-engine/lib/post-file.ts), so automated posts drop in with no mapping.
 * Server-only (reads the filesystem).
 *
 * Frontmatter is validated at build time: a malformed guide fails the build
 * rather than shipping a broken page.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { GUIDE_CATEGORIES } from "@/content/guide-categories";
import type { PhotoKey } from "@/content/pages";
import { photos } from "@/content/photos";

export const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
export const FAQ_HEADING = "Frequently asked questions";

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];
export type Heading = { depth: 2 | 3; text: string; id: string };
export type FaqItem = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string;
  /** Meta description (140 to 160 characters). */
  description: string;
  /** Short summary for cards. */
  excerpt: string;
  /** YYYY-MM-DD */
  date: string;
  updated?: string;
  category: GuideCategory;
  photo: PhotoKey;
  targetKeyword?: string;
  audience?: string;
  service?: string;
  type?: "location" | "service";
  author: string;
  readMinutes: number;
  wordCount: number;
  headings: Heading[];
  faqs: FaqItem[];
  body: string;
};

const POST_FILE = /\.(mdx|md)$/;
const WORDS_PER_MINUTE = 230;
const DEFAULT_PHOTO: Record<string, PhotoKey> = {
  "after-an-accident": "scene",
  "claims-and-costs": "consult",
  "getting-back-on-the-road": "recovery",
  "injury-claims": "phone",
};

function fail(file: string, msg: string): never {
  throw new Error(`[guides] ${file}: ${msg}`);
}

function str(data: Record<string, unknown>, key: string, file: string, required = true): string | undefined {
  const v = data[key];
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (v === undefined || v === null || v === "") {
    if (required) fail(file, `missing "${key}"`);
    return undefined;
  }
  if (typeof v !== "string") fail(file, `"${key}" must be a string`);
  return v;
}

/** Plain text of a Markdown fragment: links, emphasis and code marks removed. */
export function plain(md: string): string {
  return md
    .replace(/<[^>]+\/>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(src: string): number {
  return plain(src.replace(/^#+\s.*$/gm, " ")).split(/\s+/).filter(Boolean).length;
}

/** h2/h3 headings with the same ids rehype-slug generates. */
function extractHeadings(src: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  for (const line of src.split(/\r?\n/)) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = plain(m[2]);
    out.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return out;
}

/** Questions (### headings) and answers under the "Frequently asked questions" section, for FAQPage schema. */
function extractFaqs(src: string): FaqItem[] {
  const lines = src.split(/\r?\n/);
  const start = lines.findIndex((l) => /^##\s+/.test(l) && plain(l.replace(/^##\s+/, "")).toLowerCase() === FAQ_HEADING.toLowerCase());
  if (start < 0) return [];
  const out: FaqItem[] = [];
  let current: { q: string; a: string[] } | null = null;
  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line)) break;
    const q = line.match(/^###\s+(.+)$/);
    if (q) {
      if (current) out.push({ q: current.q, a: plain(current.a.join(" ")) });
      current = { q: plain(q[1]), a: [] };
    } else if (current && line.trim()) {
      current.a.push(line);
    }
  }
  if (current) out.push({ q: current.q, a: plain(current.a.join(" ")) });
  return out.filter((f) => f.q && f.a);
}

function parse(file: string): Guide {
  const { data, content } = matter(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8"));
  const fileSlug = file.replace(POST_FILE, "");
  const slug = str(data, "slug", file, false) ?? fileSlug;
  if (slug !== fileSlug) fail(file, `slug "${slug}" must match the filename`);

  const date = str(data, "date", file)!;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"date" must be YYYY-MM-DD`);
  const updated = str(data, "updated", file, false);

  const categoryName = str(data, "category", file, false) ?? GUIDE_CATEGORIES[0].name;
  const category = GUIDE_CATEGORIES.find((c) => c.name === categoryName);
  if (!category) fail(file, `unknown category "${categoryName}". Use one of: ${GUIDE_CATEGORIES.map((c) => c.name).join(", ")}`);

  const photoName = str(data, "photo", file, false);
  if (photoName && !(photoName in photos)) fail(file, `unknown photo "${photoName}". Use one of: ${Object.keys(photos).join(", ")}`);
  const photo = (photoName as PhotoKey | undefined) ?? DEFAULT_PHOTO[category.slug] ?? "road";

  const type = str(data, "type", file, false);
  if (type !== undefined && type !== "location" && type !== "service") fail(file, `"type" must be "location" or "service"`);

  const description = str(data, "description", file)!;
  const wordCount = countWords(content);

  return {
    slug,
    title: str(data, "title", file)!,
    description,
    excerpt: str(data, "excerpt", file, false) ?? description,
    date,
    ...(updated ? { updated } : {}),
    category,
    photo,
    targetKeyword: str(data, "targetKeyword", file, false),
    audience: str(data, "audience", file, false),
    service: str(data, "service", file, false),
    type: type as Guide["type"],
    author: str(data, "author", file, false) ?? "Accident Care",
    readMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    wordCount,
    headings: extractHeadings(content),
    faqs: extractFaqs(content),
    body: content,
  };
}

let cache: Guide[] | null = null;

/** Every guide, newest first. */
export function getAllGuides(): Guide[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(GUIDES_DIR) ? fs.readdirSync(GUIDES_DIR).filter((f) => POST_FILE.test(f)) : [];
  const guides = files.map(parse).sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
  cache = guides;
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function guidesInCategory(slug: string): Guide[] {
  return getAllGuides().filter((g) => g.category.slug === slug);
}

export function getCategory(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find((c) => c.slug === slug);
}

/** Related guides: same category first, then shared audience or service, then newest. */
export function relatedGuides(guide: Guide, n = 3): Guide[] {
  const score = (g: Guide) =>
    (g.category.slug === guide.category.slug ? 4 : 0) +
    (g.audience && g.audience === guide.audience ? 2 : 0) +
    (g.service && g.service === guide.service ? 2 : 0);
  return getAllGuides()
    .filter((g) => g.slug !== guide.slug)
    .map((g) => ({ g, s: score(g) }))
    .sort((a, b) => b.s - a.s || b.g.date.localeCompare(a.g.date))
    .slice(0, n)
    .map((x) => x.g);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
