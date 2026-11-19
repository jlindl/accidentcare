# Apple design audit: Accident Care homepage

Run 2026-11-19 with the Apple design skill (dickwu/apple-design-skill, cloned to `~/.claude/skills/apple-design`). It covers screenshots at 1440, 1366x657, 1024, 768, 390 and 375x667, plus a source review.
Scope: web. Only the principles and foundations apply (accessibility, colour, type, layout, motion, writing, interaction). App-only conventions (tab bars, toolbars, sheets, safe areas, menu bar, Apple Pay, widgets, iPhone Duo, Liquid Glass) are skipped because none apply to a one-page marketing site.

## Summary
**Rating: Good, now Excellent after fixes.** The page's one job is to get a stressed driver to make a call. Its signature is the road from the client's logo, which draws itself through the four steps of the claim. There were no blocking accessibility failures after the fixes below. The craft findings were about honesty of structure (numbering, hover states), not about look.

## Measured values
| Pair | Ratio |
|---|---|
| ink `#0b1a30` on paper `#f5f4ef` | 15.83:1 |
| muted `#5a6475` on paper / white | 5.43:1 / 5.98:1 |
| go-deep `#1d7a33` on paper / white | 4.91:1 / 5.41:1 |
| ink on go `#3fd15a` (all call buttons) | 8.70:1 |
| on-dark-muted `#a9b3c4` on ink | 8.24:1 |
| scene numerals (ink at 50%) on paper, large bold | 3.30:1 (was 1.70:1) |

axe-core 4.11 (WCAG 2.0, 2.1 and 2.2 A/AA plus best practice): **0 violations at 1440 and at 390** (there was 1 before the fixes). Every tap target is at least 24px; buttons are at least 44px.

## Findings and changes

### Critical (accessibility, blocking): all fixed
1. **Call bar outside a landmark (axe `region`, mobile).** `accessibility.md`: content must be reachable and understandable by assistive tech. **Fix:** `MobileCallBar` is now an `<aside aria-label="Call Accident Care">`.
2. **Accessible name didn't contain the visible label.** The buttons read "Call 07864 920248" but were named "Call Accident Care on 07864 920248" (WCAG 2.5.3 Label in Name). **Fix:** visible text is now the name. The icon-only "Call" button on mobile is named "Call 07864 920248".
3. **Small inline targets.** The FAQ phone link was 23px tall and the "Integrate" credit 18px. `accessibility.md › Offer sufficiently sized controls`. **Fix:** both are `inline-block` with vertical padding, now 39px and 34px.
4. **Reduced transparency had no answer.** The nav and mobile call bar use blur. `accessibility.md`: support Reduce Transparency. **Fix:** `prefers-reduced-transparency: reduce` gives solid surfaces.
5. **Increased contrast had no answer.** `accessibility.md`: "ensure it at least provides a higher contrast color scheme when the system setting Increase Contrast is turned on." **Fix:** `prefers-contrast: more` darkens muted text (`#3d4655`) and firms up the hairlines.

### High
6. **Numbering on content that isn't a sequence.** Services (01 to 07) and the cost points (01 to 03) used index markers, but neither list is ordered. Skill craft lens: "01 / 02 / 03 markers on content that isn't a sequence" reads as template. **Fix:** service numbers removed (the editorial hairline list carries it). Cost points now carry meaning icons (scale, shield-check, file-check). Numbering stays only where order is real: The road back (4 steps) and At the scene (6 steps).

### Medium
7. **Hover states on non-interactive cards.** The audience cards lifted, shadowed and turned their icon green on hover, which signals a click that does nothing. `color.md`: "Avoid using the same color to mean different things… if you use your brand color to indicate that a borderless button is interactive, using the same or similar color to stylize noninteractive text is confusing." **Fix:** hover treatments removed from the audience cards. Bright green is reserved for things you can press, plus the road.
8. **Low-contrast decorative numerals** in At the scene (1.70:1 at 32 to 40px bold). **Fix:** raised to 3.30:1.
9. **One fact, three phrasings** ("Whole of the UK", "Anywhere in the UK", "UK-wide"). `writing.md`: "Create a list of common terms… to keep your language consistent." **Fix:** "Anywhere in the UK" everywhere, with "UK-wide" only in the compact hero pill.

### Kept on purpose (judgement, flagged for Jack)
- **Green text accents** ("cost." in the hero, "Care" in the wordmark, eyebrow labels in go-deep). These use the darker text green, never the bright button green, so the interactive colour stays distinct. They're part of the approved hero direction, so I've kept them. Say the word and the eyebrows go to muted.
- **"We" in copy.** `writing.md` warns against "we" in UI messages. On a service business's site "we" is the company and reads warmly, so it's kept.

## What works (keep it)
- The road motif is drawn from the client's own logo, and the signature section uses it to explain the process, so it carries information and isn't just decoration.
- The call action is in the nav, the hero, after services, in the signature section, the checklist, the final CTA and a sticky mobile bar. It is never more than one tap away.
- The hero headline animates in CSS only, so it paints on the first frame. Motion is off under reduced motion (no Lenis, finished states, the full road drawn).
- Facts only. Nothing on the page is invented, and no number counts up.
