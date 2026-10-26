# Mobile, responsiveness & SEO — Khenbridge action plan

**Site:** Khenbridge (Next.js 16, single-page home + `/queries/intake`)  
**Last reviewed:** 2026-10-26  
**Goal:** Keep strong mobile UX, fix friction points, and align with Google mobile-first indexing and local consultancy SEO.

---

## 1. Current situation (baseline)

### What is already in good shape

| Area | Status | Notes |
|------|--------|--------|
| Responsive layout | ✅ | Tailwind `sm:`, `md:`, `lg:` across hero, grids, footer |
| Mobile navigation | ✅ | Hamburger `< lg`, overlay with anchors + intake CTA |
| Viewport / language | ✅ | `lang="en"`, Next.js viewport (themeColor in `layout.tsx`) |
| Primary heading | ✅ | `<h1>` on home (`HeroSection.tsx`), intake has own `<h1>` + metadata |
| Title & description | ✅ | Root `metadata` in `src/app/layout.tsx` |
| NAP in footer | ✅ | Email, `tel:`, location copy in `Footer.tsx` |
| Logo tap targets | ✅ | `min-h-[44px]` on header/footer home links |
| Crawlable nav links | ✅ | Desktop nav in DOM (`hidden lg:flex`), not removed on mobile |
| Hero LCP hint | ✅ | Hero image `priority` |

### Known gaps (from code review)

| Area | Status | Impact |
|------|--------|--------|
| Footer `min-h-[100dvh]` | ⚠️ UX | Extra scroll / empty space on small screens when content < one viewport |
| No `tel:` in header | ⚠️ Conversion | Not an SEO penalty; hurts quick calls on mobile |
| No sticky mobile call bar | ⚠️ Conversion | Optional; same as above |
| Menu button ~40px tap | ⚠️ UX / a11y | Below 44–48px comfort target |
| No `sitemap.xml` / `robots.txt` | ❌ SEO | Crawl/discovery |
| No Open Graph / Twitter cards | ❌ SEO / sharing | Previews, polish |
| No JSON-LD (LocalBusiness) | ❌ Local SEO | Maps / local pack alignment |
| Social links `href="#"` | ⚠️ Trust | Replace with real URLs when available |
| Mostly one URL + hash sections | ⚠️ SEO strategy | Limits long-tail landing pages |
| Heavy client components + motion | ⚠️ CWV | Possible LCP/INP on mid-range phones |

**Important:** If the site looks good on your phone and passes Google’s mobile-friendly test, layout is **not** the main SEO blocker. Prioritize crawl metadata, local schema, content URLs, and Core Web Vitals.

---

## 2. Principles (what Google cares about vs what users care about)

### Mobile-first SEO (ranking & indexing)

1. Same meaningful content on mobile and desktop
2. Readable text without horizontal scroll or zoom
3. Tap targets and spacing (accessibility guidelines ≈ 44–48px)
4. Fast load and stable layout (Core Web Vitals: LCP, INP, CLS)
5. Clear site structure, crawlable links, valid HTML semantics
6. For a local consultancy: consistent NAP + LocalBusiness signals + Google Business Profile

### Conversion UX (often mistaken for SEO)

- Header phone, sticky call bar, WhatsApp — **leads**, not direct ranking factors
- Still worth doing for a Kerala visa consultancy after core SEO hygiene

---

## 3. Phased action plan

### Phase A — Quick UX wins (mobile layout, low risk)

**A1. Footer height**

- **File:** `src/components/Footer.tsx`
- **Action:** Remove `min-h-[100dvh]` or scope it (e.g. `lg:min-h-[100dvh]` only if design needs full-screen footer on desktop).
- **Acceptance:** On a 390px-wide phone, footer height ≈ content + padding; no large empty indigo block below copyright.
- **SEO:** Indirect (engagement); no indexing change.

**A2. Mobile menu tap target**

- **File:** `src/components/Header.tsx`
- **Action:** Menu button `min-h-[44px] min-w-[44px]` (or `p-3`), keep `aria-label`.
- **Acceptance:** Lighthouse accessibility / manual tap feels easy.

**A3. Optional — header phone (mobile only)**

- **File:** `src/components/Header.tsx`, `src/lib/contact.ts`
- **Action:** `tel:` link next to hamburger or inside mobile menu top; use `OFFICE_PHONE` / `OFFICE_PHONE_DISPLAY`.
- **Acceptance:** One tap to dial without scrolling to footer.
- **SEO:** Optional `aria-label="Call Khenbridge"`.

**A4. Optional — sticky mobile CTA bar**

- **New component:** e.g. `src/components/MobileCallBar.tsx`
- **Action:** Fixed bottom bar: Call + Book consultation; `pb-safe` for notched devices; hide when footer in view or when intake page open.
- **Acceptance:** No overlap with footer content; no CLS on load.
- **SEO:** Keep bar small; avoid full-screen interstitials (Google intrusive interstitial guidance).

---

### Phase B — Technical SEO foundation (all devices)

**B1. `robots.txt`**

- **File:** `src/app/robots.ts` (Next.js App Router) or `public/robots.txt`
- **Action:** Allow `/`, point to sitemap URL.
- **Acceptance:** `GET /robots.txt` returns valid rules.

**B2. `sitemap.xml`**

- **File:** `src/app/sitemap.ts`
- **URLs (minimum):** `/`, `/queries/intake`
- **Acceptance:** `GET /sitemap.xml` lists canonical production URLs.

**B3. Canonical & metadata**

- **File:** `src/app/layout.tsx`, per-route `metadata`
- **Action:** Set `metadataBase` to production domain; add `alternates.canonical` for home and intake.
- **Acceptance:** View source / SEO tools show one canonical per page.

**B4. Open Graph & Twitter**

- **Files:** `layout.tsx`, `queries/intake/page.tsx`
- **Action:** `openGraph` (title, description, url, images), `twitter.card`.
- **Acceptance:** Sharing link shows title, description, image (use `/web-app-manifest-512x512.png` or dedicated OG image).

**B5. Fix placeholder social links**

- **File:** `Footer.tsx`
- **Action:** Replace `href="#"` with real Facebook/Instagram/LinkedIn URLs or remove until ready.
- **Acceptance:** No empty `#` social links in production.

---

### Phase C — Local & structured SEO

**C1. JSON-LD LocalBusiness (or ProfessionalService)**

- **File:** `src/app/layout.tsx` or server component on home
- **Fields:** `@type`, `name`, `url`, `telephone`, `email`, `address` (Kochi/Kerala as accurate as possible), `areaServed`, `description`, `sameAs` (social URLs).
- **Acceptance:** [Google Rich Results Test](https://search.google.com/test/rich-results) parses without errors.

**C2. NAP consistency**

- **Action:** Match footer phone/email/location exactly to Google Business Profile and any directories.
- **Document:** Keep single source in `src/lib/contact.ts`.

**C3. Google Business Profile (off-site)**

- **Action:** Claim/verify listing, categories (immigration consultant / visa service), service areas (Kerala), link to website, same phone as `tel:`.

---

### Phase D — Content & URL strategy (medium term)

**D1. Service / location pages**

- **Examples:** `/services/uk-immigration`, `/services/student-visa`, `/locations/kochi`
- **Why:** Rank for queries beyond one homepage; each page gets unique `title`, `description`, `h1`, internal links from footer.
- **Acceptance:** At least 3–5 indexable pages with 400+ words of useful copy each.

**D2. Internal linking**

- **Action:** Footer service links currently point to `/#services`; after D1, point to real URLs.
- **Keep:** Hash links for in-page UX on home if desired.

**D3. Intake page**

- **Already:** Dedicated URL + metadata — good.
- **Enhance:** Add FAQ block or short trust copy for “free consultation Kerala” keywords.

---

### Phase E — Performance (mobile Core Web Vitals)

**E1. Measure production**

- **Tools:** PageSpeed Insights (mobile), Chrome DevTools throttling, Vercel Analytics if deployed.
- **Targets (guidance):** LCP < 2.5s, INP < 200ms, CLS < 0.1 (field data matters most).

**E2. Framer Motion**

- **Action:** Prefer `viewport={{ once: true }}` (already used in places); reduce animating large layers on first paint; consider static hero on mobile if LCP is poor.

**E3. Fonts**

- **File:** `layout.tsx` — Poppins multiple weights
- **Action:** Audit used weights; drop unused weights to shrink CSS.

**E4. Images**

- **Action:** Ensure `sizes` on all `fill` images; WebP/optimized assets in `public/`.

---

## 4. Verification checklist (before/after each release)

### Mobile UX

- [ ] No horizontal scroll on 320px–430px widths
- [ ] Header does not cover hero `h1`
- [ ] Mobile menu opens/closes; focus trap / escape (nice-to-have)
- [ ] Footer scroll feels natural (Phase A1)
- [ ] Phone and email tappable in footer

### SEO technical

- [ ] `/robots.txt` and `/sitemap.xml` live
- [ ] Canonical URLs correct on prod domain
- [ ] OG tags on share test
- [ ] JSON-LD validates
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) — pass
- [ ] Google Search Console: mobile usability, indexing, CWV report

### Local

- [ ] NAP matches GBP
- [ ] `tel:` E.164 format consistent (`+91…` in `contact.ts`)

---

## 5. Suggested priority order

| Priority | Item | Effort | SEO impact |
|----------|------|--------|------------|
| P0 | B1–B2 robots + sitemap | Small | High |
| P0 | B3–B4 metadata + OG + canonical | Small | High |
| P1 | C1 JSON-LD + C2 NAP | Medium | High (local) |
| P1 | A1 footer `min-h` | Tiny | Low (UX) |
| P2 | A2 tap targets, A3 header phone | Small | UX / local leads |
| P2 | B5 real social URLs | Tiny | Medium |
| P3 | D1 service pages | Large | High (long-tail) |
| P3 | E1–E4 CWV tuning | Medium | Medium |

---

## 6. Files reference (this codebase)

| File | Role |
|------|------|
| `src/components/Header.tsx` | Mobile nav, fixed header, CTA |
| `src/components/Footer.tsx` | NAP, `tel:`, `min-h-[100dvh]` |
| `src/lib/contact.ts` | Phone/email constants |
| `src/app/layout.tsx` | Global metadata, viewport, fonts |
| `src/app/page.tsx` | Home composition |
| `src/app/queries/intake/page.tsx` | Intake metadata |
| `src/components/HeroSection.tsx` | `h1`, hero CTA |

---

## 7. Out of scope (unless product asks)

- Paid ads landing pages
- Multilingual (`hreflang`) — mention Malayalam/Hindi on intake only today
- Blog / content hub
- A/B testing sticky bar

---

## 8. Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Owner | | | |
| Dev | | | Phases A–E |
| SEO / marketing | | | GBP, NAP, copy for D1 |

*Update this doc when phases complete or production URL changes.*
