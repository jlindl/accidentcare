# Accident Care: website

Multi-page site for Accident Care, accident claim management for non-fault road traffic accidents across the UK. It's a prospect demo built by Integrate, and noindex is on until the client goes live (`site.noindex` in `src/content/site.ts`).

## Run it
```bash
npm install
npm run dev -- -p 3217   # http://localhost:3217
npm run build && npm start
```

## Where things live
- `src/content/site.ts` holds every fact and line of copy on the page. Lines marked `TODO(client)` need confirming before go-live.
- Pages: `/` (homepage), `/how-it-works`, `/services`, `/who-we-help`, `/at-the-scene`, `/faqs`. Inner-page copy is in `src/content/pages.ts`, photos in `src/content/photos.ts` and `src/images/`.
- `src/components/` has the page sections. The signature section is `RoadBack.tsx` (the scroll-drawn road).
- `src/lib/gsap.ts` registers GSAP once. `src/components/SmoothScroll.tsx` runs Lenis driven by GSAP's ticker.
- `direction.md` is the brand system and storyboard, `references.md` the design references, `APPLE-AUDIT.md` the audit, and `CREDITS.md` the component and font licences.

Stack: Next.js 16 (App Router), TypeScript, Tailwind 4, GSAP with ScrollTrigger and SplitText, Lenis.

## SEO

Same system as the other brands (see `C:\Users\jackl\Code\jlindl\SEOSYSTEM`).

- **Guides engine:** `seo-engine/` writes one guide a day with Claude and runs it through a code-based quality gate (word count, keyword placement, FAQ, internal links, banned phrases, no money amounts, percentages or promises). It runs in GitHub Actions (`.github/workflows/seo-generate.yml`, daily at 05:00 UTC) and, by default, adds new guides to one pull request, "SEO engine: new blog posts to review". Nothing goes live until it's merged. Details in [seo-engine/README.md](seo-engine/README.md).
  - Needs the `ANTHROPIC_API_KEY` Actions secret. Optional Actions variables: `SITE_URL`, `PUBLISH_MODE` (`pr` or `auto`).
  - `npm run seo:generate -- --plan` shows what it would write next (free). `npm run seo:check` re-checks every guide.
- **Guides on the site:** `content/guides/*.mdx`, rendered at `/guides`, `/guides/<slug>` and `/guides/category/<slug>`, with an RSS feed at `/guides/rss.xml`.
- **Technical:** canonical URLs from `NEXT_PUBLIC_SITE_URL` (`src/lib/site-url.ts`), `sitemap.xml` including every guide, `robots.txt`, `llms.txt`, per-page metadata and share images, and schema.org (Organization, WebSite, BreadcrumbList, ProfessionalService, HowTo, FAQPage, BlogPosting).
- **Weekly tracking:** registered in `SEOSYSTEM/repos.json` but switched off until launch.

### Going live checklist

1. Set `noindex: false` in `src/content/site.ts`.
2. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.example.co.uk`) in Vercel and as the `SITE_URL` Actions variable.
3. Add the `ANTHROPIC_API_KEY` Actions secret so the daily guides start.
4. Verify the domain in Search Console, submit `/sitemap.xml`, and give the claude-seo service account access.
5. In SEOSYSTEM: add the domain to `sites.json` and `~/.config/claude-seo/google-api.json`, rename the `repos.json` entry to the domain and set `enabled: true`.
