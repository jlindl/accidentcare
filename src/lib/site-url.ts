/**
 * The site's canonical origin, no trailing slash. NEXT_PUBLIC_SITE_URL wins
 * (set it in Vercel once the domain is live), then Vercel's production URL,
 * then localhost for local development.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3217")
).replace(/\/$/, "");

/** Absolute URL for a site path. */
export const absolute = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;
