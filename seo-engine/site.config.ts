/**
 * Everything specific to this website. The engine code reads this file and
 * never needs editing per site; topics live in data/*.json.
 *
 * Only put verifiable facts in `about`. The model is told it may state facts
 * about the business from that list and nothing else, so an empty or vague
 * list gives careful, generic articles, and an invented fact here becomes an
 * invented fact in every post.
 *
 * Accident Care helps with non-fault road traffic accidents anywhere in the UK
 * but has no local offices, so only topic ("service") posts are written, like
 * CloudKicks, PoundMart and mylife/: town-by-town posts would be doorway pages.
 *
 * Where the facts come from: src/content/site.ts (Jack's intake, 2026-11-19).
 * Check them again whenever that file changes. The client confirmed (2026-11-21)
 * that Accident Care Ltd is not a law firm and may refer legal work to regulated
 * solicitors or partner firms. TODO(client): regulatory status.
 */
export const site = {
  /** Business or brand name, as articles should write it. */
  name: "Accident Care",
  /**
   * Canonical origin, no trailing slash. SITE_URL or NEXT_PUBLIC_SITE_URL
   * override it. The engine only uses this in the prompt.
   */
  url: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /**
   * Where every article must link. Accident Care converts on a phone call, and
   * the homepage leads with the number, so every guide links back to it.
   */
  contactPath: "/",
  /** URL prefix for posts: a post lives at `${blogPath}/${slug}`. */
  blogPath: "/guides",
  /** Folder the site reads posts from, relative to the repo root. */
  contentDir: "content/guides",
  /** "mdx": posts may use `ctaComponent` and must compile as MDX. */
  format: "mdx" as "mdx" | "md",
  /** An MDX component posts may place once mid-article. Registered in src/components/guides/Mdx.tsx. */
  ctaComponent: "CallCta" as string | null,
  /** Frontmatter `author`. */
  author: "Accident Care",
  /** "Today" and post dates use this timezone. */
  timeZone: "Europe/London",
  /** Spelling and usage for every article. */
  language: "en-GB" as "en-GB" | "en-US",
  /** Which post types the daily run writes. Location posts are off (see above). */
  postTypes: { location: false, service: true },
  /** Fallback category; each topic in data/services.json sets its own (see lib/post-file.ts). */
  categories: { location: "After an accident", service: "After an accident" },

  /** Facts about the business that articles may state. Short, checkable, one per line. */
  about: [
    "Accident Care provides accident claim management for non-fault road traffic accidents, anywhere in the UK.",
    "Accident Care helps drivers, motorcyclists, taxi and PCO drivers, delivery riders and drivers, and passengers.",
    "Accident Care arranges vehicle recovery and motorbike recovery from the roadside to somewhere safe.",
    "Accident Care arranges a replacement car, or a replacement motorbike, while the customer's own vehicle is off the road.",
    "Accident Care arranges and manages repairs, so the customer isn't left chasing garages or insurers.",
    "Accident Care helps people who were hurt start an injury claim on a no win, no fee basis. If the claim isn't successful, the customer doesn't pay a fee. Any fee on a successful claim is explained before the customer goes ahead.",
    "In a non-fault claim, costs such as recovery, a replacement vehicle and repairs are claimed from the at-fault driver's insurer, not from the customer.",
    "Accident Care deals with the at-fault driver's insurer and the paperwork, and supports the claim until it is settled.",
    "Everything starts with one phone call to Accident Care on 07864 920248, and the same number takes WhatsApp messages. One number covers the whole claim, from the first conversation to the end.",
    "On the first call, Accident Care checks whether the accident wasn't the customer's fault and explains what they're entitled to. There's no obligation.",
    "For taxi, PCO and delivery drivers, Accident Care focuses on getting them back on the road and working again as part of the claim.",
    "Eligibility depends on the circumstances of each accident.",
    "Accident Care Ltd is not a law firm. Where legal services are needed, claims may be referred to regulated solicitors or partner firms.",
  ],
  /** Who reads the blog and what they care about. */
  readers:
    "UK drivers, motorcyclists, taxi and PCO drivers, delivery riders and passengers who have just been in a road accident that wasn't their fault, or are dealing with the aftermath: a car or bike off the road, an insurer on the phone, a garage to sort, maybe an injury. They're stressed and often searching on their phone straight after the accident or in the days that follow, with practical questions: what to do at the scene, who pays, whether they can get a replacement car, how long repairs take, what a non-fault claim is, whether to go through their own insurer. They want calm, plain, accurate answers they can act on today. Not sales talk and not legal jargon.",
  /** Unused: location posts are off. Kept for the engine's type. */
  locationPitch: "Explain how {name} can help {audience} after a non-fault accident in and around {location}.",
  /** Extra voice notes, added to the defaults (plain, practical, no hype). */
  voice: [
    "Calm, reassuring and practical: the steady voice on the other end of the phone after an accident. Short sentences. No drama, no scare tactics.",
    "Lead with the direct answer in the first paragraph, then explain the steps in order.",
    "Most of every article must be useful whether or not the reader ever calls Accident Care: what to do, what to keep, what to ask, what to watch out for. Then, where it genuinely fits, explain how Accident Care handles that part, using only the facts given. One or two short passages about Accident Care is plenty.",
    "UK context throughout: the Highway Code, the police and 999, the DVLA, insurers, garages, UK roads and vehicles. Use 'motorbike', 'car park', 'number plate', 'tyre', 'kerb'.",
    "The link to / is where readers find the phone number. Use anchor text such as 'call Accident Care' or 'talk to Accident Care about your accident'. The <CallCta /> component, if you use it, is a short invitation to call.",
  ],
  /** Extra hard rules. Enforced by the prompt; the patterns below are also checked by code. */
  rules: [
    "No legal advice. Explain how non-fault claims generally work in plain terms, say eligibility depends on the circumstances, and never promise an outcome, an amount of compensation or that a claim will succeed.",
    "Never state compensation amounts, fees, percentages, success rates, timescales for repairs, payouts or settlement, or how quickly a replacement vehicle arrives. Say it depends on the circumstances and that Accident Care explains it on the first call.",
    "Only describe Accident Care services that appear in the facts. Don't claim it is regulated or authorised by any body, has offices or depots, offers 24/7 cover, has its own or a named panel of solicitors, or covers fault accidents.",
    "Accident Care Ltd is not a law firm. Never call it a law firm, solicitors or legal representatives, and never say it gives legal advice or represents the reader in court. When legal help comes up, say that where legal services are needed, claims may be referred to regulated solicitors or partner firms.",
    "Safety first: whenever the scene of an accident comes up, say to make it safe and call 999 if anyone is hurt or the road is blocked. For injuries, tell readers to get medical help first (999, NHS 111 or their GP). Never give medical advice.",
    "Legal duties at the scene: only state long-established basics (stop, swap details, report to the police when required), and tell readers to check the Highway Code and GOV.UK for the current rules.",
    "Never name other claims companies, insurers, garages, hire firms or solicitors, or compare Accident Care with them. You may name public bodies such as the police, the DVLA, the NHS, GOV.UK and the Highway Code where the advice depends on them.",
    "Don't tell readers to admit fault, to accept or refuse an insurer's offer, or which insurer to use. You may say not to admit fault or agree a settlement at the scene.",
    "Examples are general situations ('a PCO driver hit at a junction', 'a car hit while parked'), never named customers, quotes, case studies or stories presented as real.",
  ],
  /** Extra banned words or phrases for this site, added to the defaults in config.ts. Plurals are caught automatically. */
  bannedPhrases: [
    "get a quote",
    "free quote",
    "guaranteed",
    "guarantee",
    "maximum compensation",
    "compensation calculator",
    "ambulance chaser",
    "24/7",
    "instant",
    "same day",
    "same-day",
    "within hours",
    "game-changer",
    "game changer",
    "look no further",
    "fast-paced world",
    "hassle-free",
  ],
  /**
   * Extra patterns no field may match, checked by code (no "g" flag). Each is
   * paired with a line in `rules` so the writer knows before the check does.
   */
  forbiddenPatterns: [
    { pattern: /£\s?\d/, name: "money amount in pounds" },
    { pattern: /\b\d+(\.\d+)?\s?(quid|pounds?|pence|grand)\b/i, name: "money amount in words" },
    { pattern: /\b\d+(\.\d+)?\s?%/, name: "percentage (no fees, rates or odds)" },
    { pattern: /!/, name: "exclamation mark (the brand voice is calm)" },
  ] as { pattern: RegExp; name: string }[],
};
