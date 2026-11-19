# Accident Care: homepage

One-page site for Accident Care, accident claim management for non-fault road traffic accidents across the UK. It's a prospect demo built by Integrate, and noindex is on until the client goes live (`site.noindex` in `src/content/site.ts`).

## Run it
```bash
npm install
npm run dev -- -p 3217   # http://localhost:3217
npm run build && npm start
```

## Where things live
- `src/content/site.ts` holds every fact and line of copy on the page. Lines marked `TODO(client)` need confirming before go-live.
- `src/components/` has the page sections. The signature section is `RoadBack.tsx` (the scroll-drawn road).
- `src/lib/gsap.ts` registers GSAP once. `src/components/SmoothScroll.tsx` runs Lenis driven by GSAP's ticker.
- `direction.md` is the brand system and storyboard, `references.md` the design references, `APPLE-AUDIT.md` the audit, and `CREDITS.md` the component and font licences.

Stack: Next.js 16 (App Router), TypeScript, Tailwind 4, GSAP with ScrollTrigger and SplitText, Lenis.
