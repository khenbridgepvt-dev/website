# Brand visual system — implementation plan

**Status:** Implemented (October 2026)  
**Scope:** Typography (Archivo Semi-Condensed), colour token fix (Rich Violet), CTA hierarchy unification  
**Out of scope for this plan:** Hero/tagline copy changes, logo lockup changes, Kerala vs national positioning, new pages  
**Brand reference:** Noel Saju visual identity guidelines, October 2026  
**Assets:** `assets/Typography/` (18 `.ttf` files; implementation uses **3 weights only**)

---

## 1. Goals and constraints

### 1.1 Goals

| Goal | Success criterion |
|------|-------------------|
| Replace Poppins with **Archivo Semi-Condensed** | `layout.tsx` no longer imports Google Poppins; body uses self-hosted Archivo |
| Brand weights | **400** (Regular), **700** (Bold), **800** (ExtraBold) loaded and mapped in Tailwind |
| Letter-spacing tokens | CSS variables for headings, body, and eyebrow/subtext; applied without changing font sizes or layout classes |
| Rich Violet | `--color-violet` = `#621D92`; all `violet` Tailwind utilities match brand |
| CTA system | **One** primary pattern (Golden Ochre + Dark Indigo text); purple/indigo fills only as **secondary** or **ghost** |
| SEO safety | No URL, metadata, JSON-LD, or visible heading/link **text** changes unless explicitly listed |
| Layout stability | Same `text-*`, `px/py`, `gap`, `grid`, breakpoints; typography pass changes **family + tracking + weight mapping only**; colour pass changes **token values + hover colours only** |

### 1.2 Non-goals (do not mix into this work)

- Rewriting `src/lib/seo.ts` titles/descriptions/keywords  
- Changing H1/H2 copy on home, services, or intake  
- Replacing `rounded-sm` / section radii / motion  
- Adding Archivo italic or full 18-file family (unless QA blocks launch)

### 1.3 SEO and safety principles

1. **Crawlers care about text and URLs, not fonts.** Swapping `font-family` and `letter-spacing` does not affect indexing if copy and headings stay the same.  
2. **Do not rename routes** or change `metadata`, `alternates.canonical`, or `application/ld+json` in this project.  
3. **Preserve link targets:** All `href` values on CTAs stay identical; only `className` changes for CTA unification.  
4. **Preserve accessible names:** `aria-label`, button/link visible labels unchanged.  
5. **Core Web Vitals:** Use `next/font/local` with `display: "swap"`; subset to 3 files; avoid loading unused weights. Re-run Lighthouse on `/`, `/services/visit-visas/`, `/queries/intake/` after typography (watch **CLS** and **LCP**).  
6. **Contrast:** Primary CTA stays `bg-accent` (`#E3A72E`) + `text-indigo` (`#21173F`) — already brand-approved; secondary/ghost must still meet WCAG AA on `bg-background` and `bg-indigo` sections.  
7. **Regression gate:** `npm run build` and `npm run lint` must pass before merge.

---

## 2. Recommended delivery order

Work in **three isolated PRs** (or three sequential commits) to simplify review and rollback:

| Phase | Focus | Risk |
|-------|--------|------|
| **A** | Colour token (`violet` only) | Low — one hex change + 2 hover sites |
| **B** | Typography (font + tracking tokens + weight mapping) | Medium — visual QA on all breakpoints |
| **C** | CTA classes (`src/lib/contact.ts` + call sites) | Low–medium — must not change hrefs/labels |

**Rationale:** Fix colour first so hover states are correct before screenshots. Typography second (biggest visual delta). CTAs last so primary buttons already use the correct ochre token.

---

## 3. Phase A — Colour (Rich Violet)

### 3.1 Principle

**Change only colour values and hover colour classes.** Do not alter spacing, typography sizes, or component structure.

### 3.2 Token change (single source of truth)

**File:** `src/app/globals.css`

| Token | Current | Target |
|-------|---------|--------|
| `--color-violet` | `#6F249F` | `#621D92` (brand **Rich Violet**) |

Optional documentation alias (no extra token required if Tailwind `violet` maps to `--color-violet`):

```css
/* Brand: Rich Violet — secondary accent, hovers */
--color-violet: #621D92;
```

Confirm `@theme` still exposes `violet` for utilities: `text-violet`, `bg-violet`, `hover:bg-violet`, `hover:text-violet`.

### 3.3 Audit inventory (grep-driven)

Run before and after:

```bash
rg "6F249F|color-violet|hover:(text|bg)-violet|\\bviolet\\b" src app public
```

| Location | Usage | Action |
|----------|--------|--------|
| `src/app/globals.css` | `--color-violet` | Update hex |
| `src/components/ConceptSection.tsx` | `hover:bg-violet` on purple CTA | **Phase C** — button may become ochre primary; if link stays secondary purple, hover becomes `hover:bg-violet` with **correct** `#621D92` |
| `src/components/IntakeForm.tsx` | `hover:text-violet` on text link | Token fix only; verify contrast on white card |

**No hardcoded `#6F249F`** elsewhere in repo (verified). Gradients use `#4D1B7A`, `#9860C6`, etc. — **do not change** in this phase.

### 3.4 QA (colour)

- [ ] ConceptSection CTA hover (if still purple in Phase C) reads slightly less magenta than before  
- [ ] Intake form “submit again” / success link hover uses Rich Violet  
- [ ] No unintended change to `primary`, `lavender`, `accent`, `indigo`

---

## 4. Phase B — Typography (Archivo Semi-Condensed)

### 4.1 Principle

**Change only:**

- Font loading (`layout.tsx`, font files)
- `globals.css` font stack and tracking variables
- Optional utility classes for tracking (e.g. `.tracking-heading`)
- **Weight class mapping** where needed (`font-semibold` → `font-bold`) so hierarchy stays similar with only 400/700/800 files

**Do not change:**

- `text-3xl`, `text-sm`, `leading-*`, `mb-*`, `px-*`, `py-*`, flex/grid structure  
- Copy strings  
- `uppercase` / `tracking-widest` on hero eyebrow (tune via tokens only if replacing Tailwind tracking)

### 4.2 Font files (from `assets/Typography/`)

Copy or reference these three files (exact filenames in repo):

| Weight | File | CSS `font-weight` |
|--------|------|-------------------|
| Regular | `Archivo_SemiCondensed-Regular.ttf` | 400 |
| Bold | `Archivo_SemiCondensed-Bold.ttf` | 700 |
| ExtraBold | `Archivo_SemiCondensed-ExtraBold.ttf` | 800 |

**Recommended layout for Next.js:**

```
public/fonts/archivo-semi-condensed/
  Archivo_SemiCondensed-Regular.ttf
  Archivo_SemiCondensed-Bold.ttf
  Archivo_SemiCondensed-ExtraBold.ttf
```

Copy from `assets/Typography/` via a one-time script or manual copy; keep `assets/Typography/` as design source of truth.  
**Alternative:** `localFont` paths pointing at `../../assets/Typography/...` — works but couples build to assets path; `public/fonts/` is clearer for caching and CDN.

### 4.3 `next/font/local` setup

**File:** `src/app/layout.tsx`

1. Remove `import { Poppins } from "next/font/google"`.  
2. Add `localFont` from `next/font/local` with three `src` entries (or three separate `localFont` merges — prefer **one** family with multiple weights).

Example shape (implementer fills paths):

```ts
const archivo = localFont({
  src: [
    { path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});
```

3. Apply `className={`${archivo.variable} ...`}` on `<html>` (same pattern as today).  
4. Remove `--font-poppins` entirely.

**File:** `src/app/globals.css`

```css
@theme {
  --font-sans: var(--font-archivo), Arial, Helvetica, sans-serif;
}

:root {
  /* Brand guidelines: headings −20 to −30; body 0 to −10 (Figma-style units → em) */
  --tracking-heading: -0.025em;   /* mid of −20..−30 at ~16px equivalent */
  --tracking-body: -0.005em;      /* mid of 0..−10 */
  --tracking-eyebrow: 0.2em;      /* specimen “letter spacing 200” for uppercase subtext */
}
```

Apply defaults without touching every component:

```css
body {
  letter-spacing: var(--tracking-body);
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: var(--tracking-heading);
}
```

**Interaction with existing Tailwind tracking classes:**  
Hero H1 uses `tracking-tight`; eyebrow uses `tracking-widest`. After global `h1` rule, **keep** component classes — they override element defaults. Document in PR: only remove redundant `tracking-tight` on headings if it fights the token (optional cleanup, not required).

### 4.4 Weight mapping (400 / 700 / 800 only)

Today the UI uses `font-medium` (500) and `font-semibold` (600), which Poppins loaded from Google. Archivo will **not** load 500/600 unless you add more files (out of scope).

| Tailwind class | Target with 3 weights | Files touched (replace class) |
|----------------|----------------------|-------------------------------|
| `font-extrabold` (800) | Keep | `HeroSection`, `HeroDecorations` |
| `font-bold` (700) | Keep | Many headings |
| `font-semibold` (600) | → `font-bold` (700) | See table below |
| `font-medium` (500) | → `font-normal` (400) **or** `font-bold` (700) for emphasis | Case-by-case: nav links → 400; step titles in accordion → 700 |

**Component-level mapping checklist** (class swaps only; no size changes):

| File | Current weight usage | Planned mapping |
|------|----------------------|-----------------|
| `Header.tsx` | `font-medium` nav | `font-normal` + keep `tracking-wide` |
| `HeroSection.tsx` | `font-extrabold` H1, `font-bold` eyebrow | Keep |
| `ServicesGrid.tsx` | `font-bold` h2, `font-semibold` h3, `font-medium` link | h3: `font-bold`; link: `font-normal` |
| `ConceptSection.tsx` | `font-semibold` h2, `font-medium` accordion | h2: `font-bold`; accordion title: `font-bold` when open/closed |
| `AboutSection.tsx` | `font-bold` h2, `font-medium` tags | tags: `font-normal` |
| `LovedByPeople.tsx` | `font-bold` | Keep |
| `ProjectsPreview.tsx` | `font-semibold` | → `font-bold` |
| `TrustedByMarquee.tsx` | `font-semibold` | → `font-bold` |
| `Footer.tsx` | `font-semibold` h3 | → `font-bold` |
| `IntakePage.tsx` | `font-semibold` / `font-medium` | semibold → bold; medium labels → normal |
| `IntakeForm.tsx` | `font-medium` labels | → `font-normal` |
| `ServiceArticle.tsx` | mixed semibold/medium | semibold → bold; medium → normal (or bold for h3) |

**Eyebrow rows** (`uppercase tracking-wide`): optionally add utility `.tracking-eyebrow { letter-spacing: var(--tracking-eyebrow); }` in `globals.css` and replace `tracking-wide` only on:

- `ServiceArticle.tsx` eyebrow  
- `IntakePage.tsx` eyebrow  
- (Optional) hero — currently `tracking-widest`; brand specimen uses wide subtext — align to `--tracking-eyebrow` if visual QA matches

### 4.5 README / dead references

- Update `README.md` if it still mentions Geist/Poppins.  
- No SEO file updates required.

### 4.6 Typography QA matrix

| Viewport | Pages |
|----------|--------|
| 320px | `/`, intake form |
| 768px | `/`, services grid |
| 1280px | `/`, `/services/uk-immigration/` |

Checks:

- [ ] No new heading wraps that push CTAs or cards taller than before (if wraps increase, adjust **tracking only**, not `text-*`)  
- [ ] Header nav still one row at `xl` (logo width unchanged)  
- [ ] Marquee / “DREAMS” watermark still clipped correctly  
- [ ] Service article TOC/FAQ spacing unchanged  
- [ ] Lighthouse CLS ≤ previous baseline  

---

## 5. Phase C — CTA system unification

### 5.1 One-page rules (source of truth)

Add to **`src/lib/contact.ts`** (or new `src/lib/cta.ts` re-exported from contact — prefer extending `contact.ts` to avoid import churn):

| Role | Visual | When to use |
|------|--------|-------------|
| **Primary** | `PRIMARY_CTA_BUTTON_CLASS` — `bg-accent text-indigo font-bold`, ochre hover lift/shadow | Main conversion: Book consultation, form submit, service page CTA, hero action |
| **Secondary** | New `SECONDARY_CTA_BUTTON_CLASS` — e.g. `bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white` (or `border-indigo` on ivory sections) | Alternate actions on same band: “Learn more”, in-card links that look like buttons |
| **Ghost** | New `GHOST_LINK_CLASS` — `text-primary hover:text-accent` (existing inline link pattern) | Text links in prose, footer nav, service inline links |

**Rules:**

1. Only **one** primary button per visible section band (hero, CTA strip, form footer).  
2. **No** `bg-primary` / `bg-indigo` filled buttons for primary conversion — ochre only.  
3. Purple/indigo **fills** allowed for: non-CTA UI (cards, overlays, tags), **secondary** buttons, footer structure — not for main “book/submit” actions.  
4. Decorative elements (About **“Let’s Talk”** circle, ochre) remain primary-coloured — shape is decorative; already ochre.  
5. **Do not change** button labels or `href` for SEO/UX continuity.

### 5.2 Suggested class definitions

```ts
/** Primary — Golden Ochre (brand GET STARTED) */
export const PRIMARY_CTA_BUTTON_CLASS = "..."; // existing

/** Secondary — outline on light backgrounds */
export const SECONDARY_CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold rounded-sm bg-transparent hover:bg-primary hover:text-white transition-all duration-300";

/** Secondary on dark sections (e.g. if needed later) */
export const SECONDARY_CTA_ON_DARK_CLASS =
  "inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-bold rounded-sm bg-transparent hover:bg-white hover:text-indigo transition-all duration-300";

/** Ghost text CTA */
export const GHOST_LINK_CLASS =
  "font-normal text-primary hover:text-accent transition-colors duration-300";
```

Tune borders after visual QA; keep `rounded-sm` consistent with existing UI.

### 5.3 Call-site inventory

| File | Element | Current | Target |
|------|---------|---------|--------|
| `Header.tsx` | Book Free Consultation | Primary | **Primary** (no change) |
| `HeroSection.tsx` | Learn More | Inline ochre classes | **Primary** — use `PRIMARY_CTA_BUTTON_CLASS` (same look, DRY) |
| `ConceptSection.tsx` | Bottom arrow CTA | `bg-primary hover:bg-violet` white text | **Primary** ochre **or** **Secondary** outline if section already has ochre nearby — **recommend Primary** for parity with header |
| `ProjectsPreview.tsx` | Learn More per card | `bg-indigo hover:bg-primary` | **Secondary** outline (card already visual-heavy) |
| `IntakeForm.tsx` | Submit | Primary | **Primary** (no change) |
| `IntakePage.tsx` | Email CTA | Primary | **Primary** (no change) |
| `ServiceArticle.tsx` | CTA link | Primary | **Primary** (no change) |
| `AboutSection.tsx` | Let’s Talk circle | Ochre custom | **Primary** colours (keep shape) |
| `ServicesGrid.tsx` | “View all” text link | `font-medium text-primary hover:text-accent` | **Ghost** — use `GHOST_LINK_CLASS` |

**Not CTAs (no change in Phase C):**

- `ServicesGrid` image overlay `group-hover:bg-primary/70`  
- `LovedByPeople` indigo stat cards  
- `AboutSection` tag chips `bg-indigo/40`  
- `SocialIconLinks` hover ochre icons  

### 5.4 CTA QA

- [ ] Every primary CTA still points to same URL as before  
- [ ] Focus rings (`focus-visible:ring-accent`) still visible on header logo and form fields  
- [ ] No second ochre button competing in same viewport section (hero: one primary)  
- [ ] Keyboard tab order unchanged  

---

## 6. Code practices and file checklist

### 6.1 Files to modify (summary)

| File | Phase A | B | C |
|------|---------|---|---|
| `src/app/globals.css` | ✓ | ✓ | |
| `src/app/layout.tsx` | | ✓ | |
| `public/fonts/archivo-semi-condensed/*` | | ✓ (add) | |
| `src/lib/contact.ts` | | | ✓ |
| `src/components/HeroSection.tsx` | | | ✓ |
| `src/components/ConceptSection.tsx` | ✓ | ✓ (weights) | ✓ |
| `src/components/ProjectsPreview.tsx` | | ✓ | ✓ |
| `src/components/IntakeForm.tsx` | ✓ | ✓ | |
| `src/components/Header.tsx` | | ✓ | |
| `src/components/ServicesGrid.tsx` | | ✓ | ✓ |
| `src/components/Footer.tsx` | | ✓ | |
| `src/components/AboutSection.tsx` | | ✓ | |
| `src/components/LovedByPeople.tsx` | | ✓ | |
| `src/components/TrustedByMarquee.tsx` | | ✓ | |
| `src/components/IntakePage.tsx` | | ✓ | |
| `src/components/services/ServiceArticle.tsx` | | ✓ | |
| `README.md` | | ✓ (fonts) | |

### 6.2 Optional follow-ups (separate tickets)

- `site.webmanifest` `background_color`: `#FBF9E5` vs `#21173F` (brand ivory vs dark) — not in this scope  
- Hero/tagline alignment with brand book  
- ESLint rule or grep in CI for `#6F249F` and `next/font/google` Poppins  

### 6.3 Scripts (optional)

`scripts/copy-brand-fonts.mjs` — copies 3 TTFs from `assets/Typography/` to `public/fonts/archivo-semi-condensed/`; run in `postinstall` or document in README.

---

## 7. Testing and sign-off

### 7.1 Automated

```bash
npm run lint
npm run build
```

### 7.2 Manual routes

| URL | Why |
|-----|-----|
| `/` | Hero, header CTA, all home sections |
| `/queries/intake/` | Form primary + success state link |
| `/services/visit-visas/` | Service template + CTA + FAQ |
| `/services/uk-immigration/` | Long content + internal links |

### 7.3 SEO regression checklist

- [x] View source: `<title>`, meta description, canonical unchanged (`src/lib/seo.ts` untouched)  
- [x] JSON-LD `LocalBusiness` still valid (no font-related fields)  
- [x] Single H1 per page; heading levels unchanged  
- [x] Internal links (`/services/*`, `/#services`, intake) unchanged  
- [x] OG/Twitter image URLs unchanged  

### 7.4 Rollback

| Phase | Rollback |
|-------|----------|
| A | Revert `--color-violet` hex |
| B | Restore Poppins in `layout.tsx` + `--font-poppins` |
| C | Revert `contact.ts` and component `className` only |

---

## 8. Implementation time estimate

| Phase | Engineering | QA |
|-------|-------------|-----|
| A Colour | 15 min | 10 min |
| B Typography | 1–2 h | 45 min |
| C CTAs | 45 min | 20 min |

**Total:** ~half day with careful visual pass.

---

## 9. Acceptance criteria (done means)

1. No Poppins / Google font import for body text.  
2. `--color-violet` is `#621D92`; no `#6F249F` in repo.  
3. `PRIMARY_CTA_BUTTON_CLASS` used for all primary conversion buttons; purple/indigo filled **button** CTAs removed or demoted to secondary.  
4. Layout metrics and copy unchanged; only font, tracking, colour token, and CTA surface styles differ.  
5. `npm run build` passes; SEO checklist in §7.3 signed off.

---

*Document owner: engineering. Update **Status** at top when phases complete.*
