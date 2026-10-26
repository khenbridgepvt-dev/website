# Site audit 2 — after Audit 1 fixes

**Site:** https://www.khenbridge.com  
**Date:** 2026-10-26 (re-scan)  
**Tool:** site-audit-seo v6.0.1, `--preset seo --lighthouse`  
**Baseline:** [site-audit-1.md](./site-audit-1.md)

## Report

| Artifact | Location |
|----------|----------|
| Public viewer | https://json-viewer.popstas.pro/?url=https://site-audit-reports.storage.yandexcloud.net/2026-10-26__17-00-26.747__khenbridge-audit-2.json |
| Local JSON | `%USERPROFILE%\site-audit-seo\khenbridge-audit-2\khenbridge-audit-2.json` |

**Pages crawled:** 2 (unchanged)

---

## Audit 1 → Audit 2 comparison

### Tier A — Core SEO (crawl fields)

| Metric | Home (audit 1 → 2) | Intake (audit 1 → 2) |
|--------|-------------------|----------------------|
| `canonical` | empty → `https://www.khenbridge.com` | empty → `https://www.khenbridge.com/queries/intake` |
| `canonical_count` | 0 → 1 | 0 → 1 |
| `is_canonical` | null → 0 (home) | null → 1 (intake) |
| `og_title` | empty → filled | empty → filled |
| `og_image` | empty → `https://www.khenbridge.com/og/og-image.png` | same |
| `schema_types` | empty → **empty** | empty → **empty** |
| `keywords` | same as home → **intake-specific** | duplicate → unique intake keywords |
| LH `lighthouse_canonical` | null → **1** (pass) | null → **1** |
| LH `lighthouse_robots-txt` | null → **0** (fail home) | null → **1** (pass) |

### Tier B — Accessibility (LH audit flags: 0 = fail, 1 = pass)

| Metric | Home (1 → 2) | Intake (1 → 2) |
|--------|--------------|----------------|
| `lighthouse_color-contrast` | 0 → **1** | 0 → **1** |
| `lighthouse_heading-order` | 0 → **1** | 0 → **1** |
| `lighthouse_image-alt` | 1 → 1 | null → **1** |
| `images_alt_empty` | 4 → **0** | 4 → **0** |
| `lighthouse_scores_accessibility` | 0* → **100** | 0* → **100** |

\*Aggregate score broken in audit 1; per-audit flags are authoritative.

### Tier C — Performance (ms unless noted)

| Metric | Home (1 → 2) | Intake (1 → 2) | Notes |
|--------|--------------|----------------|-------|
| LCP | 3299 → **2584** | 2494 → **2190** | Both improved; home still > 2000 ms warning |
| Speed Index | 3386 → **2770** | 2404 → **4415** | Home better; intake worse (run variance) |
| TBT | 75 → **354** | 37 → **123** | Worse on both |
| FCP | 1124 → 1284 | 994 → 1000 | Roughly flat |
| `lighthouse_unused-javascript` | 150 → **0** | 600 → **0** | Improved |
| `html_size_rendered` | 366444 → 385042 | 316589 → 335632 | Slightly larger (metadata/JSON-LD in HTML) |
| `lighthouse_render-blocking-resources` | 0 → **1** (home) | 0 → 0 | New home flag |
| `lighthouse_mainthread-work-breakdown` | 3067 → **5131** (home) | 636 → 1682 | Home worse |

### Lighthouse SEO score (aggregate)

| Page | Audit 1 | Audit 2 |
|------|---------|---------|
| Home | 100 | **0** (likely `lighthouse_robots-txt: 0` on home in this run) |
| Intake | 100 | 100 |

---

## Still open after audit 2

- [ ] **Structured data in crawl** — `schema_types` still empty; `lighthouse_structured-data` still null. Verify JSON-LD is in initial HTML and valid (Rich Results Test).
- [ ] **Home robots.txt LH** — `lighthouse_robots-txt: 0` on home only; intake passes. Confirm `robots.txt` when fetched from home document context (same origin).
- [ ] **Home `is_canonical: 0`** — Canonical URL present but tool marks not canonical; check trailing slash vs `https://www.khenbridge.com/`.
- [ ] **Home LCP** — 2584 ms (down from 3299 but still above 2000 ms target).
- [ ] **Home TBT / main-thread** — Regressed vs audit 1; investigate render-blocking + JS on home.

---

## Summary

Audit 1 fixes **clearly landed** for canonical, Open Graph, image alts, contrast, heading order, intake keywords, robots (intake), unused JS, and **LCP on both URLs**. Remaining gaps are mainly **structured data detection**, **home robots.txt Lighthouse check**, and **home performance/TBT** (mixed vs audit 1 on some metrics).
