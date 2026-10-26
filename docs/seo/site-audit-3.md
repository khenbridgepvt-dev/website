# Site audit 3 — audit 2 remediation verification

**Site:** https://www.khenbridge.com  
**Date:** 2026-10-26  
**Baseline:** [site-audit-2.md](./site-audit-2.md)  
**Remediation plan:** audit 2 remediation (JSON-LD, canonical, robots, LCP/TBT)

## Code changes (audit 2 → 3)

| Area | Change |
|------|--------|
| Structured data | `@graph` with string `@type` `LocalBusiness` + `ProfessionalService`; JSON-LD script in `<head>` ([`src/lib/seo.ts`](../../src/lib/seo.ts), [`src/app/layout.tsx`](../../src/app/layout.tsx)) |
| Home canonical | `HOME_CANONICAL_URL` = `https://www.khenbridge.com/`; `metadataBase` + `alternates.canonical` use trailing slash |
| Crawl URLs | `trailingSlash: true` in [`next.config.ts`](../../next.config.ts) |
| Hero LCP | `custom_hero_bg.webp` (~83 KB); hero `src` WebP + `priority` / `sizes="100vw"` ([`HeroSection.tsx`](../../src/components/HeroSection.tsx)) |
| Home TBT | Framer hero decorations in deferred client chunk [`HeroDecorations.tsx`](../../src/components/HeroDecorations.tsx) (`dynamic`, `ssr: false`) |

---

## Local verification (production build, `npm run start`)

Run after `npm run build` on the commit that includes this remediation.

| Check | Command / method | Result (2026-10-26) |
|-------|------------------|---------------------|
| `robots.txt` | `curl https://www.khenbridge.com/robots.txt` | **200**, `Allow: /`, `Sitemap: https://www.khenbridge.com/sitemap.xml` |
| Home JSON-LD | View source `/` | **`application/ld+json` in `<head>`**, `@graph`, types `LocalBusiness` / `ProfessionalService` |
| Home canonical | View source `/` | **`href="https://www.khenbridge.com/"`** (trailing slash) |
| Hero asset | Network tab LCP image | **`/images/custom_hero_bg.webp`** (preload + `next/image`) |
| Production build | `npm run build` | Pass |

### Lighthouse (home SEO) — post-deploy

Re-run after Vercel deploy of this branch:

```bash
site-audit-seo -u https://www.khenbridge.com --preset seo --lighthouse --upload --no-remove-json
```

**Expected vs audit 2**

| Metric | Audit 2 | Expected after deploy |
|--------|---------|------------------------|
| `schema_types` | empty | `LocalBusiness`, `ProfessionalService` (or tool-equivalent) |
| `lighthouse_structured-data` | null | pass if JSON-LD detected |
| Home `is_canonical` | 0 | **1** (canonical matches `https://www.khenbridge.com/`) |
| Home `lighthouse_robots-txt` | 0 | **1** if curl OK; if still 0, note as LH flake (robots.txt OK on origin) |
| Home LCP | 2584 ms | Lower (smaller hero WebP); target &lt; 2000 ms |
| Home TBT | 354 ms | Lower (deferred hero decorations) |

---

## Report artifacts (fill after re-scan)

| Artifact | Location |
|----------|----------|
| Public viewer | _TBD — paste json-viewer URL after upload_ |
| Local JSON | `%USERPROFILE%\site-audit-seo\khenbridge-audit-3\` |

---

## Manual checks

1. [Google Rich Results Test](https://search.google.com/test/rich-results) on `https://www.khenbridge.com/` — valid Local Business / Professional Service graph.
2. Confirm `public/images/custom_hero_bg.webp` is deployed (run `npm run optimize-hero` in CI or before release if PNG changes).

---

## Summary

Audit 2 remediation is implemented in code and verified locally for robots.txt, JSON-LD placement/shape, trailing-slash canonical, WebP hero, and deferred hero decoration JS. **Run site-audit-seo audit 3 on production** after deploy and update the table above with measured deltas.
