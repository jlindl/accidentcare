# Direction: Accident Care homepage (prospect demo)

## Concept
**The calm voice on the other end of the phone.** After a crash everything is loud. This site is the opposite: quiet, certain and practical. It tells you in one screen that it wasn't your fault, it won't be your cost, and the number to call. Then it shows the road back, step by step.

## Facts we can state (from intake and the client's logo)
- Accident Care, accident claim management. Whole of the UK. Non-fault road traffic accidents.
- For drivers, motorcyclists, taxi and PCO drivers, delivery riders and passengers.
- No win, no fee. Vehicle recovery. Motorbike recovery. Replacement vehicles. Motorbike replacement. Repairs. Injury claims. Full support.
- Line: "Get back on the road, stress free."
- Phone: 07864 920248 (tel:+447864920248).
- **Not verified, so not stated:** reviews, ratings, case numbers, response times, FCA status, company number, address, hours, email, WhatsApp. These are flagged in the final report.

## Brand system
Derived from the logo's navy and green, refined for a premium screen palette.

| Role | Hex | Use |
|---|---|---|
| `bg` | `#F5F4EF` | Warm paper background |
| `surface` | `#FFFFFF` | Cards, panels |
| `ink` | `#0B1A30` | Text, dark sections (logo navy, deepened) |
| `ink-2` | `#13284A` | Dark surfaces, hover on dark |
| `muted` | `#5A6475` | Secondary text (AA on bg and surface) |
| `line` | `#0B1A30` at 12% | Hairlines |
| `go` | `#3FD15A` | Accent fill: call button, road line, active states. Always carries ink text (AA). Never used as text on light. |
| `go-deep` | `#1D7A33` | Green text on light backgrounds (AA) |

- **Type:** Display is **Bricolage Grotesque** (600 to 800, tight tracking of -0.035em, optical size on). Text is **Geist** (400 to 500). Mono is **Geist Mono**, earned for the phone number readout, step indices and the fact strip. All self-hosted via `next/font`.
- **Scale (fluid clamp):** display-xl 56 to 132px; display-l 40 to 84px; h2 32 to 56px; h3 22 to 28px; body-l 18 to 21px; body 16 to 17px; label 12 to 13px mono uppercase with +0.08em tracking. Body measure is at most 64ch.
- **Spacing:** an 8-point scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160). Section padding is clamp(96px, 14vw, 176px). A 12-column grid, 1280px max, with 24px gutters (16px on mobile).
- **Radius:** 10px controls, 20px cards, 32px for the large signature panel. Borders are 1px hairlines.
- **Icons:** one set (Lucide), 1.5px stroke, ink coloured. No emoji.
- **Motion:** custom easing `cubic-bezier(0.22, 1, 0.36, 1)` (out-quint-ish) for reveals and `cubic-bezier(0.65, 0, 0.35, 1)` for scrubs. Reveals run 0.9s with a 0.06s line stagger. Lenis smooth scroll. Call buttons never fade in from invisible. No count-ups. Reduced motion gives the finished state, no Lenis and no pinning.

## Decision (Jack, 2026-11-19)
- Hero: **A, type-led calm.** Warm paper, the two-beat headline "Not your fault. Not your cost.", the green call button with the number, and the road line sweeping behind the type.
- Logo: **refined wordmark.** "Accident Care" in the display font with "Care" in green, plus an SVG shield-and-road mark. The original logo file is kept in `/brand`.

## Storyboard
1. **Nav (sticky, hairline on scroll):** wordmark, a few anchors (How it works, Services, Who we help, FAQs), and a green call pill with the number visible. On mobile a persistent bottom call bar keeps the call one tap away.
2. **Hero:** see the chosen direction. Two-beat headline, one line of support copy, a primary call button with the number, and a secondary "How it works". A calm fact pill reads "Non-fault accidents · Anywhere in the UK".
3. **Fact strip (mono):** No win, no fee / Whole of the UK / Cars, motorbikes, taxis and PCO / Recovery to repair, one number.
4. **Who we help:** five audiences (drivers, motorcyclists, taxi and PCO drivers, delivery riders, passengers). Each has a short, specific line about what matters to them, for example "Off the road means off the clock" for taxi, PCO and delivery.
5. **Services:** an editorial index, not a card grid. The six services are numbered rows with hairlines; hover reveals a short line and an arrow.
6. **Signature: The road back.** A green road line (echoing the logo's road swoosh) draws itself down the page as you scroll, joining the steps: *You call us → We recover your vehicle → We keep you moving → Repaired, claimed, settled.* Each step lights as the line reaches it. Short pin, at most about 1.5 screens.
7. **Why it costs you nothing:** a plain-English explainer. In a non-fault claim the costs are claimed from the at-fault driver's insurer, and the service is no win, no fee. A large two-tone statement plus three short points.
8. **At the scene:** a calm, practical checklist (safe first, 999 if anyone's hurt, swap details, photos, don't admit fault, call us). This is the useful content the competitor lacks.
9. **FAQs:** an accordion of six questions.
10. **Final CTA:** the phone number as the hero of the section, set huge in display type, plus "Get back on the road, stress free."
11. **Footer:** wordmark, number, services, a disclaimer (eligibility depends on circumstances; non-fault only; injury claims handled through specialist partners, wording to be confirmed with the client), and "Website by Integrate".

## Conversion path
The call button is in the nav, the hero, the bottom bar on mobile, after the signature section and in the final CTA. Every one is a `tel:` link. No forms, no friction.

## Images
No client photography exists. The logo's raster artwork is too busy for small sizes. Plan: a type-led design plus up to three art-directed Higgsfield images (one consistent style), only after a credit estimate and Jack's approval.

## Revision, 2026-11-19: white and blue

At the client's request the palette moved from paper and green to white and blue, and the hero now follows a two-column layout (headline, call and WhatsApp, chips on the left; a "What we can help with" card on the right over the drawn road). Roads, motion and the crash mark are unchanged apart from colour.

| Token | Hex | Role |
|---|---|---|
| bg | #f5f8fe | Page background (light blue-white) |
| surface | #ffffff | Cards, nav, fact strip |
| ink | #0f1f3d | Text, How it works panel, footer |
| muted | #55657f | Secondary text |
| go | #2563eb | Primary blue: buttons, roads, accents (white text on it) |
| go-deep | #1d4ed8 | Blue text on light backgrounds |
| go-bright | #7cb2ff | Blue text on navy |
| go-soft | #e8f0fe | Tints: chips, icon wells, note panels |

Hover system: `.card-hover` lifts cards 6px with a blue-tinted shadow and border, `.icon-well` fills blue, list rows and chips tint blue, buttons lift. All of it is off under reduced motion and on touch screens.
