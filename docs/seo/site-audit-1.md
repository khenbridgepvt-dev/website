# Site audit 1 — production baseline (site-audit-seo)

**Site:** https://www.khenbridge.com (canonical; crawl start URL)  
**Date:** 2026-10-26  
**Tool:** [site-audit-seo](https://github.com/viasite/site-audit-seo) v6.0.1, preset `seo` + `--lighthouse`  
**Pages found:** 2 (`/` and `/queries/intake`)

## Report links and local files

| Artifact | Location |
|----------|----------|
| Public viewer (primary) | https://json-viewer.popstas.pro/?url=https://site-audit-reports.storage.yandexcloud.net/2026-10-26__15-56-37.912__www.khenbridge.com.json |
| Local JSON (source of truth for this doc) | `%USERPROFILE%\site-audit-seo\www.khenbridge.com.json` |
| Other runs (same 2 URLs) | `%USERPROFILE%\site-audit-seo\khenbridge-2026-10-26\`, `khenbridge-prod-2026-10-26\` |

**Re-scan command (after deploy):**

```powershell
site-audit-seo -u https://www.khenbridge.com --preset seo --lighthouse --upload --no-remove-json
```

**Windows note:** set `PUPPETEER_EXECUTABLE_PATH` to system Chrome if bundled Chromium is missing. Do not use `--screenshot` in CLI (web service only).

---

## Proven OK (no change required for these signals)

| Check | Home | Intake |
|-------|------|--------|
| HTTP `status` | 200 | 200 |
| `mixed_content_url` | empty | empty |
| `h1_count` | 1 | 1 |
| `redirects` (on `www`) | 0 | 0 |
| `lighthouse_scores_seo` | 100 | 100 |
| `lighthouse_scores_best-practices` | 100 | 100 |
| `title` / `description` | present | present |
| LH `meta-description`, `viewport`, `is-crawlable`, `is-on-https` | pass | pass |

**Do not use for decisions:** `lighthouse_scores_performance: 0` and `lighthouse_scores_accessibility: 0` (broken aggregate scores in this run; use per-audit flags and metrics below).

---

## TODO — 80/20 fix list (evidence from audit 1)

### Tier A — Core SEO (highest impact)

- [ ] **A1 Canonical** — Evidence: `canonical: ""`, `canonical_count: 0`, `lighthouse_canonical: null` on both URLs.  
  **Action:** `metadataBase: https://www.khenbridge.com` + `alternates.canonical` on layout and intake (`src/app/layout.tsx`, `src/app/queries/intake/page.tsx`).

- [ ] **A2 Open Graph** — Evidence: `og_title: ""`, `og_image: ""` on both.  
  **Action:** `openGraph` (+ Twitter cards) on layout and intake; use existing brand image (e.g. manifest/OG asset).

- [ ] **A3 Structured data** — Evidence: `schema_types: ""`, `lighthouse_structured-data: null` on both.  
  **Action:** JSON-LD `LocalBusiness` / `ProfessionalService` using `src/lib/contact.ts` (email, phone, Kochi/Kerala).

### Tier B — Lighthouse failures (both pages unless noted)

- [ ] **B1 Color contrast** — Evidence: `lighthouse_color-contrast: 0` on home and intake.  
  **Action:** Fix failing foreground/background pairs (hero, footer, buttons).

- [ ] **B2 Heading order** — Evidence: `lighthouse_heading-order: 0` on both; home `h3_count: 14`, `h4_count: 13`.  
  **Action:** Logical outline (H1 → H2 → H3); avoid skipped levels in section components.

- [ ] **B3 Image alt** — Evidence: `images_alt_empty: 4` on both (`images_without_alt: 0`).  
  **Action:** Descriptive `alt` or intentional `alt=""` for decorative images only.

- [ ] **B4 Intake image-alt audit** — Evidence: `lighthouse_image-alt: null` on intake only (home passed).  
  **Action:** Same as B3 on intake page components.

### Tier C — Performance (use metrics, not broken score columns)

- [ ] **C1 LCP home** — Evidence: `lighthouse_largest-contentful-paint: 3299` (> 2000 ms tool warning).  
  **Action:** Optimize home LCP element (hero image, fonts, client JS/motion).

- [ ] **C2 LCP intake** — Evidence: `lighthouse_largest-contentful-paint: 2494` (> 2000 ms).  
  **Action:** Same on intake.

- [ ] **C3 Speed Index / main thread (home)** — Evidence: `lighthouse_speed-index` up to ~4934 in repeat run; `lighthouse_mainthread-work-breakdown: 3067`, `bootup-time: 885`.  
  **Action:** Reduce JS cost on home (Framer Motion, bundle size).

- [ ] **C4 Rendered HTML size** — Evidence: home `html_size_rendered: 366444`, intake `316589` (viewer warns > 200000).  
  **Action:** Lower hydration/DOM weight where practical.

- [ ] **C5 Unsized images** — Evidence: `lighthouse_unsized-images: 1` on both.  
  **Action:** Explicit `width`/`height` on images (Next `Image`).

- [ ] **C6 Unused JavaScript** — Evidence: home `lighthouse_unused-javascript: 150`, intake `600` (ms).  
  **Action:** Trim client bundles; prioritize intake.

### Tier D — Secondary

- [ ] **D1 Text ratio** — Evidence: `text_ratio_percent: 4` (home), `3` (intake); tool warns &lt; 5.  
  **Action:** Optional more visible copy; low priority vs Tier A–C.

- [ ] **D2 Duplicate keywords meta** — Evidence: identical `keywords` string on home and intake.  
  **Action:** Intake-specific keywords or remove redundant meta on child page.

- [ ] **D3 robots.txt / sitemap** — Evidence: `lighthouse_robots-txt: null` on both; no sitemap in crawl (`--follow-xml-sitemap` was off in primary run).  
  **Action:** `src/app/robots.ts`, `src/app/sitemap.ts` listing `/` and `/queries/intake`.

---

## Core summary (audit 1)

Live site returns **200** with **title**, **description**, and **one H1** per URL, but crawled HTML lacks **canonical**, **Open Graph**, and **structured data**. Lighthouse flags **canonical**, **contrast**, **heading order**, and **image alt**; home **LCP ~3.3s** exceeds the tool’s 2s warning band.

**Minimum deploy bundle:** Tier **A1–A3**, then **B1–B3**, then **C1–C2**.

## Pass criteria (re-scan)

After deploy, same JSON fields should show:

- `canonical` non-empty; `og_title` / `og_image` non-empty; `schema_types` non-empty
- `lighthouse_canonical` not null; `images_alt_empty: 0`
- `lighthouse_color-contrast` and `lighthouse_heading-order` not `0`
- Home `lighthouse_largest-contentful-paint` ≤ 2500 (stretch ≤ 2000)

## Related

- Broader mobile/SEO plan: [mobile-responsive-seo.md](./mobile-responsive-seo.md)
