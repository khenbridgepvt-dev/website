# Service pages plan — Visit visas & UK immigration

**Status:** Visit visas (`/services/visit-visas/`) and UK immigration (`/services/uk-immigration/`) implemented.  
**Site:** https://www.khenbridge.com  
**Goal:** Add two high-value, indexable service URLs with full SEO coverage and on-brand UI that matches the existing site (simple, calm, conversion-focused).

---

## 1. Pages to ship

| Page | URL (with `trailingSlash: true`) | Primary search intent |
|------|----------------------------------|------------------------|
| Visit & Short Stay visas | `/services/visit-visas/` | Tourist, visit, family visit, religious/pilgrimage travel from Kochi/Kerala to multiple countries |
| UK immigration | `/services/uk-immigration/` | UK student, Skilled Worker, spouse/partner, extensions, ILR/citizenship guidance; refusals and in-UK cases |

**Scope for v1:** One deep page per theme (no child URLs yet). Cross-link between the two pages and to `/queries/intake/`.

---

## 2. Technical implementation

### 2.1 Routing & files

```
src/app/services/visit-visas/page.tsx
src/app/services/uk-immigration/page.tsx
```

Optional shared presentation (recommended to avoid duplication):

```
src/components/services/ServicePageShell.tsx   # layout wrapper + CTA band
src/content/services/visit-visas.mdx           # OR inline in page / separate .ts copy module
src/content/services/uk-immigration.mdx
```

Prefer **server components** for page shells and static copy (same pattern as `IntakePage` — no unnecessary client JS).

### 2.2 SEO module (`src/lib/seo.ts`)

Per page, add constants:

- `VISIT_VISAS_TITLE`, `VISIT_VISAS_DESCRIPTION`, `VISIT_VISAS_KEYWORDS`
- `UK_IMMIGRATION_TITLE`, `UK_IMMIGRATION_DESCRIPTION`, `UK_IMMIGRATION_KEYWORDS`

Extend `buildOpenGraph` / `buildTwitter` `path` type to include:

- `/services/visit-visas`
- `/services/uk-immigration`

(Resolved URLs will use trailing slash via `metadataBase` + `trailingSlash: true`.)

Each `page.tsx` exports `metadata: Metadata` like `src/app/queries/intake/page.tsx`:

- `title`, `description`, `keywords`
- `alternates.canonical` — path or full URL consistent with home (`HOME_CANONICAL_URL` pattern)
- `openGraph` + `twitter` via helpers

### 2.3 Sitemap (`src/app/sitemap.ts`)

Add two entries after home and intake:

| URL | priority | changeFrequency |
|-----|----------|-----------------|
| `https://www.khenbridge.com/services/visit-visas/` | 0.9 | monthly |
| `https://www.khenbridge.com/services/uk-immigration/` | 0.9 | monthly |

### 2.4 Structured data

- Keep **one** org graph in root `layout.tsx` (`LocalBusiness` + `ProfessionalService`).
- Per service page (optional v1, recommended): small JSON-LD in page or shared helper:
  - `@type`: `WebPage` with `name`, `description`, `url`
  - `isPartOf` / `about` referencing `https://www.khenbridge.com/#organization`
  - Optional `@type`: `Service` with `serviceType`, `areaServed` (Kerala, India)

Validate with [Rich Results Test](https://search.google.com/test/rich-results) after deploy.

### 2.5 Navigation & internal linking

- **Header:** Add links under Services (or replace `/#services` with a dropdown later). Minimum v1: add two nav items or footer-only links to avoid crowding mobile nav.
- **Footer:** Add under “Services” list: Visit visas, UK immigration (real URLs).
- **Home:** Link from Services grid / UK section copy to new URLs (one line + “Learn more”).
- **Cross-link:** Visit page ↔ UK page where relevant (UK visitor vs UK immigration).

### 2.6 Analytics & crawl

- No extra tags: Ahrefs + GA4 already on root layout.
- After deploy: Google Search Console → inspect each URL → request indexing.

### 2.7 QA checklist (pre-merge)

- [ ] `npm run build`
- [ ] Unique `<title>`, meta description, canonical per page
- [ ] Single H1; logical H2/H3 order (Lighthouse a11y)
- [ ] All CTAs point to `/queries/intake/`
- [ ] `site-audit-seo` or manual crawl shows 4 URLs in sitemap
- [ ] No duplicate canonical tags

---

## 3. UI / UX guidelines (match existing site)

**Principle:** Same brand, same components feel, **no new design system**. Service pages should read like a natural extension of the intake page and home sections—not a blog template or a separate microsite.

### 3.1 Layout shell

Mirror `IntakePage` / inner pages:

- `Header` + `main` + `Footer` (same as `queries/intake/page.tsx`)
- Top spacing: `pt-28 sm:pt-32` (fixed header clearance)
- Container: `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`
- Content column: `max-w-3xl` for long-form prose (readable line length); optional narrow hero full width

### 3.2 Visual theme (use existing tokens only)

| Element | Classes / tokens |
|---------|------------------|
| Page background | `bg-background` |
| Headings | `text-indigo`, `font-bold` / `font-semibold` |
| Eyebrow / label | `text-primary`, uppercase tracking, `text-sm` (like intake “Khenbridge”) |
| Body | `text-indigo/70` or `text-indigo/80`, `leading-relaxed` |
| Primary CTA | `PRIMARY_CTA_BUTTON_CLASS` from `@/lib/contact` |
| Secondary links | `text-primary hover:text-accent` or existing footer link styles |
| Dividers / cards | `border-lavender/30`, soft `rounded-sm`, **no** heavy new shadows |
| Accent | Use `accent` / `primary` sparingly for CTAs and icons only |

**Do not introduce:** new fonts, new color palette, gradients on service pages (hero on home is enough), carousels, tabs, or animation libraries beyond what the site already uses.

### 3.3 Components to reuse / lightly extend

- `Header` / `Footer` — unchanged API
- Lucide icons for section bullets (optional, same size as intake `Mail`)
- FAQ: reuse accordion pattern from `AboutSection` if needed (client island only for FAQ block)
- CTA block at bottom: short band with one button → intake (same as “Book Free Consultation”)

### 3.4 Imagery

- Prefer **one** optional hero image per page (`next/image`, lazy, descriptive `alt`) from `public/images/` if it fits (e.g. airport, london)—or **text-only hero** for faster LCP and simplicity.
- No stock-photo overload; match home’s restrained image use.

### 3.5 Mobile & accessibility

- Same breakpoints as home (`sm:`, `md:`, `lg:`)
- Tap targets ≥ 44px on CTAs
- Focus rings: `focus-visible:ring-accent` (match header links)
- Contrast: keep body text at `indigo/70` minimum on `background` (audit 2 contrast fixes)

### 3.6 UX flow

1. Land → clear H1 + one-sentence promise  
2. Scan H2 sections (who it’s for, how we work, FAQ)  
3. Persistent mental model: **assess → recommend → document → apply**  
4. Single primary action repeated 2× max: **Book free consultation**

Keep page length scrollable but **scannable** (short paragraphs, some lists, FAQ at end).

---

## 4. On-page SEO & E-E-A-T (content rules)

- **Unique** title and meta description per page (see section 5).
- **900–1,400 words** per page after human edit.
- Mention **Kochi, Kerala, Chammany Tower** naturally; NAP matches `src/lib/contact.ts`.
- **Disclaimer** on both pages: consultancy and application support; not a law firm; no guaranteed approvals; embassy/Home Office decides.
- **UK page:** “Last updated: [Month Year]”; point to gov.uk for figures; lawyer involvement for complex cases.
- Avoid unverifiable claims (“#1”, “100% success”). Prefer process, assessment, and experience wording.

---

## 5. Meta & keywords (starter strings for `seo.ts`)

### Visit visas

- **Title:** `Visit & Tourist Visa Consultants Kochi | Khenbridge Kerala`
- **Description:** `Planning a trip abroad? Khenbridge in Kochi helps Kerala families with tourist, visit, and religious travel visas — assessment, documents, and clear next steps. Book a free consultation.`
- **Keywords:** `visit visa consultants Kochi, tourist visa Kerala, religious visit visa, family visit visa India, Schengen tourist visa Kerala, UAE visit visa Kochi, visa assessment Kerala, Khenbridge`

### UK immigration

- **Title:** `UK Visa & Immigration Consultants Kochi | Student, Work, Spouse | Khenbridge`
- **Description:** `From student and Skilled Worker visas to spouse applications, extensions, and ILR pathways — Khenbridge in Kochi stays current on UK Home Office rules. Free consultation.`
- **Keywords:** `UK immigration consultants Kerala, UK visa consultants Kochi, UK spouse visa Kerala, Skilled Worker visa India, UK student visa Kochi, UK visa refusal Kerala, ILR guidance India, Khenbridge`

---

## 6. Content outline — Visit & short-stay visas

**H1:** Visit, tourist, and short-stay visas from Kochi — guidance for travel worldwide

| H2 | Purpose |
|----|---------|
| Who this is for | Leisure, family visits, pilgrimage/religious travel, short business visits |
| Countries and visa types we help with | UK visitor, Schengen, USA/Canada/Australia visitor, UAE/GCC, etc. |
| How our assessment works | Free initial review → realistic advice → checklist → application support |
| What stronger applications have in common | Best practices (honest forms, finances, travel history)—not guarantees |
| Tourist, visit, and religious travel explained | Plain definitions |
| Why work with a Kochi-based team | Local office, languages, Kerala-wide clients |
| FAQ | 6 questions |
| Next step | CTA → intake |

---

## 7. Content outline — UK immigration

**H1:** UK visa and immigration support from Kerala — routes, rules, and clear guidance

| H2 | Purpose |
|----|---------|
| UK pathways we support | Student, Skilled Worker, spouse/partner, visitor (link visit page) |
| Already in the UK or faced a refusal? | Extensions, switching, review/appeal pathways (general) |
| Staying current with UK immigration law | Home Office changes; verify rules at assessment |
| How we work with you (and when lawyers step in) | Guidance vs immigration lawyers for complex cases |
| What to prepare before you apply | General checklist; refer to gov.uk for amounts |
| Serving Kochi and all of Kerala | Office + remote clients |
| FAQ | 7 questions |
| Important information & disclaimer | Not legal advice; outcomes not guaranteed |
| Book a free consultation | CTA |

---

## 8. High-value content prompts

Use after a human supplies facts (destinations handled, languages, refusal experience). **Edit every draft** for accuracy and legal safety before publishing.

### Prompt A — Visit / tourist / religious visas (body copy)

```text
You are writing a single service page for Khenbridge, a visa consultancy based at Chammany Tower, Kochi, Kerala, India. Phone: +91 8848100293. Email: info@khenbridge.com. They serve clients across Kerala and speak English, Malayalam, and Hindi.

Audience: Kerala residents planning short trips abroad—holiday, visiting family, pilgrimage/religious travel, or short business visits—not long-term work permits on this page.

Write 1,000–1,300 words in clear British/Indian English. Sound like an experienced consultant speaking to a family: warm, direct, no hype, no clichés (“unlock your dreams”, “seamless journey”, “in today’s fast-paced world”). Vary sentence length. Use “we” and “you”. No em dashes every line. No bullet-only sections—use short paragraphs plus some lists where helpful.

Structure with one H1 and H2/H3 headings as specified:
[H1] Visit, tourist, and short-stay visas from Kochi — guidance for travel worldwide
Then H2s: Who this is for | Countries and visa types we help with | How our assessment works | What makes applications stronger (best practices, not guarantees) | Tourist, visit, and religious travel explained simply | Why work with a Kochi-based team | FAQ (6 questions with concise answers) | Next step

Must include:
- Mention tourist, visit, family visit, and religious/pilgrimage travel as separate use cases in plain language.
- Name Kochi and Kerala naturally 3–5 times total, not stuffed.
- List example destinations (UK visitor, Schengen/Europe, USA visitor, Canada visitor, Australia visitor, UAE/GCC) as “commonly handled”—do not invent embassy processing times; say timelines vary.
- Explain assess → recommend best route → document checklist → application support.
- One short disclaimer: we provide consultancy and application support; embassy/consulate decisions are theirs; we do not guarantee approval.
- End with invitation to book a free consultation (link placeholder: /queries/intake/).

Do not claim specific success percentages or “#1 in India”. Do not say Khenbridge is a law firm.

Deliver: full page copy with markdown headings only (##, ###). No meta tags in this output—body only.
```

### Prompt B — UK immigration (body copy)

```text
You are writing a single service page for Khenbridge, visa and immigration consultants in Kochi, Kerala (Chammany Tower). They specialise in UK immigration alongside other visas. They stay updated on UK Home Office rule changes and can guide clients through applications; for complex legal matters they work with immigration lawyers. Not a law firm.

Audience: People in Kerala (and Indians generally) who want to reach or stay in the UK—as students, skilled workers, spouses/partners, or those already in the UK needing extensions or settlement advice.

Write 1,100–1,400 words. Tone: authoritative but approachable, human, not robotic. Avoid AI tells: no “comprehensive”, “robust”, “leverage”, “navigate the complexities” unless once at most. Use concrete verbs. Include one “last updated: [MONTH YEAR]” line near the disclaimer.

Structure:
[H1] UK visa and immigration support from Kerala — routes, rules, and clear guidance
H2s: UK pathways we support (student, Skilled Worker, spouse/partner, visitor—cross-link visit page conceptually) | Help if you are already in the UK or faced a refusal | Staying current with UK immigration law | How we work with you (and when lawyers step in) | What to prepare before you apply (general—point readers to gov.uk for exact figures) | Serving Kochi and all of Kerala | FAQ (7 questions) | Important information & disclaimer | Book a free consultation

Must include:
- Spouse/partner, student, skilled worker routes in separate short subsections.
- Brief mention of ILR and British citizenship as longer-term goals requiring correct route from the start; legal advice for citizenship where needed.
- Refusal/administrative review: we assess options honestly, no false hope.
- Emphasise up-to-date knowledge of Home Office changes without citing specific thresholds unless writer verifies from gov.uk—prefer “requirements change; we verify current rules when we assess your case.”
- Phone, email, Kochi office address once in footer section text.
- Disclaimer: general information not legal advice; outcomes not guaranteed.

Do not invent visa fees, salary thresholds, or processing times. Do not guarantee visa approval.

Deliver: markdown body with ## and ### only.
```

---

## 9. Rollout order

1. Human runs Prompt A → team review → approve copy.  
2. Implement `/services/visit-visas/` (metadata, UI shell, sitemap, footer links).  
3. Human runs Prompt B → UK-knowledgeable review → approve copy.  
4. Implement `/services/uk-immigration/`.  
5. Cross-links + home tweaks + Search Console indexing.  
6. Optional: `site-audit-seo` on 4 URLs; document in `site-audit-4.md`.

---

## 10. Future (out of v1 scope)

- Child pages: `/services/uk-spouse-visa/`, `/services/uk-student-visa/`, etc.
- Service-specific OG images
- `BreadcrumbList` JSON-LD
- Malayalam/Hindi summary blocks (accessibility + local trust, not separate URLs unless strategy changes)

---

## Related docs

- [site-audit-2.md](./site-audit-2.md) — baseline gaps  
- [site-audit-3.md](./site-audit-3.md) — remediation verification  
- [mobile-responsive-seo.md](./mobile-responsive-seo.md) — responsive SEO notes
