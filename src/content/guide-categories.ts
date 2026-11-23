// Guide categories. Shared by the site (src/lib/guides.ts) and the SEO engine
// (seo-engine/lib/post-file.ts), so keep this file free of React and Next imports.

export const GUIDE_CATEGORIES = [
  {
    name: "After an accident",
    slug: "after-an-accident",
    description: "What to do at the scene and in the days after a road accident that wasn't your fault.",
  },
  {
    name: "Claims and costs",
    slug: "claims-and-costs",
    description: "How non-fault claims work, who pays, and what no win, no fee means.",
  },
  {
    name: "Getting back on the road",
    slug: "getting-back-on-the-road",
    description: "Recovery, replacement cars and bikes, and repairs after a non-fault accident.",
  },
  {
    name: "Injury claims",
    slug: "injury-claims",
    description: "Hurt in a road accident as a driver, rider or passenger? How injury claims work.",
  },
] as const;

export type GuideCategoryName = (typeof GUIDE_CATEGORIES)[number]["name"];
