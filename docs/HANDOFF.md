# Optimile Website — Engineering & Design Handoff

Last updated: 2026-08-31

This is the single source of context for the Optimile marketing-site rebuild: what it is, how it's built, every meaningful decision and why, what's done, and what's next. Read this before touching the code.

---

## 1. TL;DR — where things stand

- **What exists:** A working **homepage** built in Next.js, plus a full **design system** and the **complete site copy** (Home + all Platform + all Solutions pages) written in `docs/website-content.md`.
- **What does NOT exist yet:** The Platform and Solutions **pages** themselves. The nav links to `/platform/*`, `/solutions/*`, `/industries`, `/customers`, `/blog` etc., but **those routes are not built — they 404 today.** Only `/` (home) is implemented.
- **Repo:** `adityar-web/optimile-website` (private), branch `main`.
- **Run:** `cd web && npm install && npm run dev` → http://localhost:3000
- **Design north star:** [doss.com](https://doss.com) (dimensional, dark animated sections + light static sections). Compositional discipline modelled on the team's own **CloudVerse** site (`/Users/apple/cloudverse_website`).
- **Positioning:** Optimile is the **system of record for freight** — the intelligence layer on top of your ERP that runs the whole movement on one auditable record, PO → POD.

---

## 2. Product context (what we're selling)

Optimile is an **intelligent freight operating system for India**. It sits on top of an existing ERP (SAP, Oracle, Dynamics) — no rip-and-replace — and runs the whole movement:

- **Control Tower** — GPS + SIM + FASTag visibility, stage-wise SLAs, live exceptions.
- **Bookings & LR (TMS)** — Lorry Receipt as a first-class record (gapless statutory series, sub-hire two-leg LRs, freight terms Paid/To-Pay/TBB, chargeable weight = greater of actual/volumetric/contracted minimum), automated indenting.
- **Reverse Auctions** — rank-only blind bidding, anti-sniping, ranked L1/L2/L3 fallback, penalties, GST treatment configurable.
- **Freight Audit & Settlement** — invoices validated vs contract + route + POD; recover 5–8% of spend.
- **Fleet (FMS)** — eDVIR, compliance wallet, hard-block dispatch logic.
- **Yard & Railyard** — Rail OCR, truck ANPR, weighbridge, gate-in/out, inventory (70–90% less manual effort).
- **Documentation & Compliance** — auto E-way bills, ePOD per drop.
- **The AI Layer** — cognitive routing, anomaly detection, predictive exceptions, conversational control (the "7 pillars": Vision, Orchestrator, Navigator, Sentinel, Optimizer, Collaborator, Insights).

**Audience:** India, both **shippers** and **carriers/3PLs**. **Backing:** Turbostart ($50M fund, 50+ portfolio startups, 140+ team). **Motion:** enterprise, demo-led — **no public pricing page.**

**Grounding sources** (on the user's machine, outside the repo):
- `/Users/apple/Desktop/Optimile/Product Technical Documentation/` — BRDs (Bookings-LR, Auction/AMS are readable markdown; Financial, Contract, Optimile 2.0 are PDFs). This is where product depth comes from.
- `/Users/apple/Desktop/Optimile/Brand Context/` — GTM decks (Main, Pharma, LSPs, FMS, ERPs, Railyard), product screenshots, demo videos.
- `Sales Deck Product Screens/` — the six screenshots used in `public/product/`.

---

## 3. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3** (App Router, `src/`, TS) | ⚠️ Next 16 has breaking changes — see §9. Static-prerendered (SSG) for SEO. Turbopack build. |
| UI | **React 19.2** | |
| Styling | **Tailwind v4** | CSS-first config via `@theme` in `globals.css` (no `tailwind.config.js`). PostCSS plugin `@tailwindcss/postcss`. |
| Fonts | **PP Neue Montreal** | Self-hosted OTF via `next/font/local` (`--font-ppnm`). Used everywhere (headings + body). |
| Class utils | `clsx` + `tailwind-merge` (`cn`), `class-variance-authority` | `cn` in `src/lib/utils.ts`; cva for `Button` variants. |
| Icons | `lucide-react` | |
| Animation | **`gsap`** (+ `ScrollTrigger`) and **`motion`** | GSAP drives the flowchart + (unused) iso/journey. `motion` installed, not yet used. Plus CSS keyframes/utilities in `globals.css`. |

Install/run:
```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static prerender)
npm run lint
```

---

## 4. Repo layout

```
web/
├─ docs/
│  ├─ HANDOFF.md            ← this file
│  └─ website-content.md    ← FULL site copy (Home, Platform, Solutions)
├─ public/
│  ├─ brand/                ← optimile-wordmark(.png / -white.png), optimile-icon.png
│  └─ product/              ← 6 real product screenshots (control-tower, live-auctions,
│                             vendor-insights, customer-ledger, new-booking, revenue-report)
├─ src/
│  ├─ app/
│  │  ├─ globals.css        ← DESIGN TOKENS + @theme + base + animation utilities
│  │  ├─ layout.tsx         ← fonts (PP Neue Montreal) + metadata (provisional)
│  │  └─ page.tsx           ← homepage composition (imports all sections)
│  ├─ components/
│  │  ├─ ui/                ← button, container, section-heading, reveal, product-frame
│  │  ├─ site/              ← nav (mega-menus), footer
│  │  ├─ sections/          ← the homepage sections (see §6)
│  │  ├─ mock/              ← hand-built product mockups + lifecycle-workflow (+ unused iso-board, shipment-journey)
│  │  └─ visual/            ← intelligence-motif (UNUSED, old orb)
│  ├─ fonts/                ← PP Neue Montreal OTFs (+ superseded fonts, unused — see §8)
│  └─ lib/utils.ts          ← cn()
```

---

## 5. Design system

All tokens live in **`src/app/globals.css`**. Style components through tokens (`bg-surface`, `text-ink`, `border-line`, `text-accent`, `font-sans`), never raw hex.

### Palette (DOSS-derived)
- **Light (default):** warm off-white ground `#f6f4ef`, white surfaces, warm-grey text (`--ink #1a1611`, `--ink-soft #78736e`), **blue accent** (`--accent-solid #2a6bf5`, `--accent #1b54db`).
- **Dark sections:** wrap any `<section>` in **`.section-dark`** — it re-scopes the role tokens to a slate-navy palette (`--ground #0b1322`, bright blue accent `#6ba0ff`). Mocks inside adapt automatically because they read from tokens. Currently only the **CTA** is dark.
- The brand scale is named `--color-iris-*` for historical reasons but holds a **blue** ramp (renamed in place so all refs updated). Iris/violet is gone.

### Type
- **PP Neue Montreal** for everything. `h1/h2` = weight 500, tracking `-0.03em`. (History of superseded picks in §8.)

### Tokens also defined
- Radius (`--radius-sm..2xl`), motion easings (`--ease-out-expo` etc.), shadows (`--shadow-sm/card`), `--glow`, `--hero-wash`, `--grid-line`.
- Animation utilities/keyframes: `.rise`, `.mock-in`, `.stagger`, `.reveal`/`.reveal-item` (scroll-triggered), `.wf-*` (flowchart: spin, pulse-across, run-glow, check-pop, path draw), `.drift`. All reduced-motion safe.

### Compositional rules (the anti-"slop" playbook, from CloudVerse)
These are **hard rules** — the first homepage was rejected as "slop" for breaking them:
1. **No generic card-grid sections.** Embed content in product mocks, not repeated bordered cards.
2. **No hard dividers between sections.** Flow on subtle surface tints + glows.
3. **Every H2 section (except hero) uses a 2-column header** — title left, body right — with visuals below (`SectionHeading`).
4. **Product is shown via hand-built mockups**, not raw screenshots.
5. **Typography-first, restrained motion, calm/specific copy.** No buzzwords.
6. **Visuals must be large and meaningful** — no abstract filler (numbered boxes were rejected).

Reference artifact (design system v0.2, pre-DOSS-repaint): `Optimile-Design-System` — https://claude.ai/code/artifact/829da154-ef3e-4bbf-a43e-8863f558fdc9 (source `../optimile-design-system.html`). Note: palette/fonts there are superseded by the DOSS direction.

---

## 6. Homepage sections (`src/components/sections/`)

Order in `page.tsx`: Nav → Hero → Logos → OperatorReality → Platform → Depth → Intelligence → Outcomes → Integrations → Testimonial → Faq → Cta → Footer.

| Section | What it is |
|---|---|
| `hero` | Centered serif-era headline (now PP Neue Montreal), grid+glow ground, real Control Tower screenshot bleeding in. Background still a **placeholder** (to revisit). |
| `logos` | Muted "trusted by" row — **skeleton placeholders**, awaiting real logos. |
| `operator-reality` | The problem. **Slanted product shot** (Control Tower at a 3D perspective) + 3 failure points. Light, static. |
| `platform` | Interactive module list (Control Tower / Bookings & LR / Reverse Auctions / Finance & Settlement) + a **swapping product mock** on the right. Client component. |
| `depth` | "Built the way freight actually works" + the **lifecycle flowchart** (`mock/lifecycle-workflow.tsx`): Booking→…→Settlement with Start/Running/Completed badges + routed connectors, plays on scroll-in. |
| `intelligence` | **Bento** (2×2 hairline-divided grid) of 4 AI capabilities, each with its own mockup (Routing/Anomaly/Predictive/Navigator). |
| `outcomes` | Big-number stat tiles (5–8%, 60%, 70–90%, 4–8 wks). |
| `integrations` | **Hub-and-spoke graphic** (`IntegrationsHub`): ERP nodes → Optimile core → telematics/compliance nodes. |
| `testimonial` | Quote + metric badges — **placeholder** until a real approved quote exists. |
| `cta` | **Dark** full-bleed closing band (`.section-dark`). |

Mockups (`src/components/mock/domain-mocks.tsx`): `ControlTowerMock`, `BookingLRMock`, `AuctionMock`, `SettlementMock`, `MovementRecordMock`, `NavigatorMock`, `RoutingMock`, `AnomalyMock`, `PredictiveMock`. Hand-built from real freight data, token-driven (adapt to light/dark).

---

## 7. Key decisions & history (the "why")

Presented newest-relevant first. Several visuals were built, shown, and reverted — that iteration is intentional context.

1. **IA / SEO foundation.** Site is a client-rendered SPA today (bad SEO); the rebuild uses **SSG/SSR** with per-module Platform pages, role + industry Solutions pages, unique metadata, JSON-LD (planned). Approved IA is in `../memory` / reflected in `nav.tsx`.
2. **Positioning:** **keep an AI-forward headline, but back every claim with real BRD depth.** Write depth generally true regardless of exact shipped-vs-roadmap status; tighten precise claims before launch. Product is "mostly shipped."
3. **Design direction:** evolved through Attio (light, refined) → settled on **DOSS as north star** (dimensional, two-tone). **Full DOSS palette adopted** (warm off-white + slate-navy + blue), replacing an earlier iris/violet system.
4. **Fonts:** long iteration — Fraunces → Sentient → Rowan → Erode + Bespoke Sans → **PP Neue Montreal** (final, matches DOSS). Superseded font files remain on disk (§8).
5. **Anti-slop composition:** first homepage rejected; rebuilt against the CloudVerse compositional rules (§5).
6. **Product representation:** raw screenshots → **hand-built mockups** (more appealing, on-brand, token-driven).
7. **Two-tone (light static / dark animated):** explored per DOSS. Built a **dark animated Depth** (shipment journey) and a **fully isometric Platform board** to a high bar — then the user **reverted** both to the lighter **flowchart** + **list/mock** versions. Only the CTA remains dark. The iso board and shipment journey are **kept on disk but unused** in case we return to them.
8. **Copy:** full site content written with the **copywriting** + **humanizer** skills, grounded in the BRDs. Lives in `docs/website-content.md`.
9. **Source control:** created private repo `adityar-web/optimile-website` and pushed.

---

## 8. Unused / archived (don't delete without checking)

- **Superseded fonts still in `src/fonts/`:** Bespoke Sans, Erode, Fira Sans, Rowan, Sentient. Only PP Neue Montreal (`ppneuemontreal-*.otf`) is wired. Safe to prune once type is final.
- **`src/components/mock/iso-board.tsx`** and **`shipment-journey.tsx`** — the isometric platform board and scroll-scrubbed journey. High-quality, currently not imported. Retained as options.
- **`src/components/visual/intelligence-motif.tsx`** — the old glassy "orb" (dropped). Unused.
- **`../_section-drafts-archive/`** (outside repo) — the first homepage's section drafts.
- Default create-next-app SVGs in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) — unused, safe to remove.

---

## 9. Constraints & gotchas (read before coding)

- **Next 16 breaking changes.** `web/AGENTS.md` (auto-added by `next dev`) says: read the relevant guide in `node_modules/next/dist/docs/` before writing Next code. Heed it — APIs differ from older Next.
- **SEO copy must go through the `technical-seo-audit` skill** before launch. All page titles/meta in `website-content.md` are marked **provisional** for this reason. Not yet run.
- **Fonts are licensed** (PP Neue Montreal = Pangram Pangram). That's a reason the repo is **private**; keep it private or replace fonts before any public/OSS release.
- **Two MCP connectors need auth** and were unavailable this session: **Figma** and **Zoho CRM** (authorize via claude.ai connector settings or `/mcp` in an interactive session).
- **`.section-dark`** is the mechanism for dark sections — don't hardcode dark hex; wrap and let tokens flip.
- Git identity for pushes: `Aditya (Claude Code) <256746523+adityar-web@users.noreply.github.com>`; active `gh` account `adityar-web`.

---

## 10. What's done vs. not

**Done**
- Design system (tokens, fonts, palette, animation utilities).
- Homepage: all sections, responsive-ish, builds clean (static prerender), no console errors.
- Nav (mega-menus) + footer with real wordmark.
- Full site copy (`docs/website-content.md`).
- Private GitHub repo + push.

**Not done**
- **Platform pages, Solutions pages, Industries pages** — copy exists, routes/pages do **not** (nav links currently 404).
- Wiring `website-content.md` copy into the built home (home copy is close but not the finalized version from the doc).
- Real **customer logos** and a real **testimonial/case study** (placeholders in place).
- **SEO:** technical-seo-audit pass, final metadata, JSON-LD (FAQPage/Organization), `sitemap.xml`, `robots`.
- **Hero background** (still placeholder grid).
- Accessibility / responsive / performance audit; analytics; deploy pipeline.

---

## 11. Next stages (suggested order)

1. **Build the routes.** Create `app/platform/*`, `app/solutions/{shippers,carriers}`, `app/industries` (+ 13), wiring `website-content.md` copy. Reuse `SectionHeading`, `Container`, `Button`, the mocks, and the section patterns. Until these exist the nav is broken.
2. **SEO layer.** Run `technical-seo-audit` on titles/meta; add per-route `generateMetadata`, JSON-LD (`FAQPage`, `Organization`), `app/sitemap.ts`, `app/robots.ts`.
3. **Finalize home copy** from `website-content.md`; swap in real logos + a real testimonial when available.
4. **Hero background** rework (the last placeholder).
5. **Motion pass.** Decide how far to push two-tone/animation (iso board + shipment journey are available); consider `motion` for spring/scroll polish.
6. **Ship it.** A11y + responsive + Core Web Vitals pass; wire a deploy host (Vercel or Netlify) — confirm which; analytics; form endpoints for demo/pilot CTAs.
7. Optional: adopt shadcn/ui primitives where useful (Tailwind v4 compatible); connect Figma/Zoho once authorized.

---

## 12. Handy references

- Live (old) site to replace: https://optimile.co
- North star: https://doss.com · Compositional reference: the team's CloudVerse site (`/Users/apple/cloudverse_website`, and cloudverse.ai)
- Full copy: `docs/website-content.md`
- Repo: https://github.com/adityar-web/optimile-website (private, `main`)
