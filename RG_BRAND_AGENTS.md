# RaidGuild Agent (Design & Brand)

Single-file brief for AI assistants. Keep this in your context when generating UI, styles, or assets.

Quick links: [live site](https://www.brand.raidguild.org/) | [repo](https://github.com/raid-guild/brand)

## Durable Identity & Versioning
- RaidGuild is intentionally mutable. The election of a new brand steward can introduce a new visual reign; this evolution is a feature, not a defect. A reign names stewardship and timeframe, never sole authorship: brand work is always a group effort with multiple contributors.
- The black crossed-swords logomark is the canonical master mark and the only currently durable brand element.
- The mark may use color variations for different tracks or programs. Even its geometry may evolve, but alterations must preserve recognition and be documented as a new mark version.
- Wordmarks, lockups, palettes, typography, illustration, motion, and voice treatments belong to a named steward reign. Do not present one reign's expression as timeless RaidGuild canon.
- The guide defaults to the latest available reign and stores the user's selection under `raidguild-brand-reign`. Canonical reign definitions live in `src/brand/system.ts`; `src/lib/brand-reigns.ts` is a compatibility adapter over generated data. CSS is selected with `data-brand-reign` on `<html>`.
- Reigns: **Louchi** (latest, Venture Beyond), **Suede** (archived current-repo system), **TW** (archived at `https://www.raidguild.org/witch`), and **Ven** (archived, partially reconstructed from a surviving RG UI one-sheet).

## Brand Architecture
- RaidGuild is the center of gravity: the builder-owned collective, shared talent pool, community, reputation, and source of new applied-edge practices.
- Specialized practices are called **spears** internally. They may own their positioning, specialization, and visual expression while drawing on the shared builder pool.
- RaidGuild LLC is the common legal and operating entity, registered through MiDAO. Contracts, treasury, and delivery workflows can run through the LLC.
- Keep the two axes separate: a **reign** answers “when?” and versions the Guild identity through time; a **practice** answers “where and for what?” and differentiates simultaneous areas of expertise.
- A practice may deliberately look different. Preserve provenance with the crossed-swords mark or an approved variant, the phrase “A RaidGuild practice,” the operating disclosure “Operating through RaidGuild LLC” where trust matters, and a route back to RaidGuild.org.
- Do not present a practice's specialty or visual system as the whole Guild. Do not call a distinct practice a separate organization.
- Canonical guidance: `docs/brand-architecture.md`; public guide: `/architecture`.

## Using This in Another Project
- Copy this file into the consuming repo (root recommended) or fetch it from the GitHub URL into your agent’s context.
- If the repo already has an `AGENTS.md`, merge this content into their file (or add as `RG_BRAND_AGENTS.md`) and include both in your agent context.
- Install the package contract when consuming the system outside this repository. Use local `@/components/ui/*` paths only while developing this source repository.
- Apply setup: install the listed deps, add the fonts, include `globals.css`, and wire `fonts.ts` + `ThemeProvider` so tokens/utilities/components exist in your codebase.
- Development builds expose a commit-specific `@raidguild/brand-system` tarball through `/packages/brand-system.json`; pin the manifest's versioned URL for reproducible downstream installs.
- Keep in sync: when you change tokens, component APIs, or asset locations in your fork, update this file so agents stay accurate.

## How to Use With an Agent
- In downstream projects, import components from `@raidguild/brand-system/components` instead of hand-rolling UI. Inside this source repository, use `@/components/ui/*` while authoring individual components.
- Follow canonical brand data from `src/brand/system.ts`, generated tokens from `src/generated/brand-tokens.css`, handwritten utilities from `src/app/globals.css`, and fonts from `src/lib/fonts.ts`.
- Honor semantic colors (primary, background, foreground, etc.) rather than hardcoding hex unless specifying brand palette values.
- If you need something not listed, propose a combination of existing components first.

## Quick Start (Dev Setup)
- Install deps: `npm install class-variance-authority clsx lucide-react tailwind-merge` and `npm install -D @tailwindcss/postcss tw-animate-css`.
- Fonts: package consumers import `@raidguild/brand-system/fonts.css`. Source-vendored setups place `MAZIUSREVIEW20.09-Regular.woff`, `MaziusDisplay-Bold.otf`, `EBGaramond-VariableFont_wght.ttf`, `EBGaramond-Italic-VariableFont_wght.ttf`, `UbuntuMono-Regular.ttf`, and `UbuntuMono-Bold.ttf` under `public/fonts/`.
- Layout: set `data-brand-reign="louchi"` on `<html>`, wrap `<body>` with font variables `maziusDisplay`, `ebGaramond`, `ubuntuMono` from `src/lib/fonts.ts`, and use `<ThemeProvider>` from `src/lib/theme-context.tsx` for reign selection plus light/dark appearance.
- Copy `src/app/globals.css` and `src/generated/brand-tokens.css` together to get generated tokens, handwritten utilities, and Tailwind `@theme inline` mappings.

## Brand Tokens & Semantics (from `src/brand/system.ts`)
- **Louchi / latest / in development anchors**: ink `#102d2c`, deep teal `#0a292b`, cyan `#b8e0df`, parchment `#efe9d7`, coral `#ee3c78`, acid lime `#d7e34d`. Its night appearance adds night sky `#191e4e`, night depth `#191e4e`, moon cyan `#8fe3ef`, and moon parchment `#efe9d7`. Direction: Moebius-influenced speculative worlds, expansive editorial typography, spatial composition, and cinematic motion. Day/night is an appearance choice within Louchi, not a separate reign. Louchi has no data version until the steward declares a stable baseline; package SemVer is independent.
- **Ven / archived reconstruction**: black `#000000`, Raid pink `#ff3864`, white `#ffffff`, graphite `#2b2c34`, violet `#b66ad6`, signal yellow `#fcfb75`. Direction: high-contrast RG UI system, ornate display typography, technical mono annotation, fantasy line icons, and violet-to-pink framing. A recovered neon sword-and-skull illustration lives at `public/images/reigns/ven/skull-sword.png`. Mark the overall system as partially reconstructed from surviving artifacts.
- **Suede / archived palettes (hex)**:
  - Moloch: 100 `#f1efee`, 200 `#efc5bb`, 300 `#e39b8b`, 400 `#d25c41`, 500 `#bd482d` (primary), 600 `#8b3521`, 700 `#5c2316`, 800 `#29100a`.  
  - Scroll: 100 `#f9f7e7`, 200 `#ece5ac`, 300 `#dccd6a`, 400 `#d2c141`, 500 `#b5a22c`, 600 `#837820`, 700 `#534a13`, 800 `#211e07`.  
  - Neutral: 100 `#f1efee`, 200 `#d5cecd`, 300 `#b9aeac`, 400 `#9e8e8a`, 500 `#806f6b`, 600 `#645754`, 700 `#433937`, 800 `#221d1c`, white `#fafafa`, black `#0d0d0d`.
- **Semantic map**: compatibility token names are remapped per reign. For Louchi day, background is parchment, foreground is ink, primary is coral, and accent is acid lime. Louchi night remaps the full surface system: background `#191e4e`, foreground `#efe9d7`, card `#242953`, popover `#191e4e`, secondary `#173c4d`, muted `#163949`, and accent/focus `#8fe3ef`. Honor `ThemeProvider` and consume semantic variables rather than these hex values directly.
- **Radius**: base `--radius: 0.625rem`; derived `radius-sm/md/lg/xl`.
- **Grid**: `container-custom` (max 1280px, responsive padding), `grid-custom` (4 cols mobile → 8 tablet → 12 desktop, 92px columns, 16px gaps).

## Typography
- Families are reign-specific: Louchi uses Grinder / Ubuntu / Ubuntu Mono; archived defaults use Mazius Display / EB Garamond / Ubuntu Mono.
- Ubuntu Mono is the utility/data voice for dates, metadata, status labels, kickers, ranks, statistics, step numbers, graph labels, technical identifiers, and compact controls. Do not use it for headings or normal paragraphs.
- Louchi uses **Grinder Refined** Regular/Italic and native **Grinder Refined Retalic** at weight 400, exposed through the `Grinder` and `Grinder Retalic` CSS families, with **Ubuntu** body and **Ubuntu Mono** utility. Do not add synthetic bold or skew to the native cuts. Licensed webfont files supplied by Louchi (rights reported by the project owner) live in `public/brand-fonts/louchi`, outside the reusable package font directory. Package consumers retain Afacad Flux fallback unless they supply independently licensed Grinder faces. Mazius/EB Garamond remain archived-reign defaults. TW remaps display/body to Alchemion and Fratelli using the archived `/witch/fonts` files.
- Utility classes (preferred): `type-display-lg/md/sm`, `type-heading-lg/md/sm`, `type-body-lg/md/sm`, `type-label`, `type-label-md`, `type-label-sm`, `type-code-lg/md/sm`. Uses weights, letter spacing, and line heights defined in globals.

## Copy & capitalization
- Titles and headings: follow standard English title casing used in the design (for example, `Guide Overview`, `Core Encounters`, `Cohort DM Guide`).
- Avoid CSS small caps for body copy and navigation (for example, do not set `font-variant: small-caps` or force pseudo-all-caps via letterspacing/size tricks).
- Avoid visual bolding in running copy. Keep `strong`/`b` for semantic emphasis only, and style them with the same weight as surrounding text.
- Use ALL CAPS sparingly and only for short badges or labels where explicitly called for in the design system.

### Nextra docs theme note
- If the repo uses `nextra-theme-docs`, its defaults (and some fonts) can enable small-caps or uppercase styling for nav and body text.
- In this repo we fix that at the font level by resetting OpenType caps features on `body` (for example: `font-variant: normal; font-variant-caps: normal; font-feature-settings: 'smcp' 0, 'c2sc' 0, 'pcap' 0, 'c2pc' 0;`).
- Optional: if a future theme or utility class forces `text-transform: uppercase` on specific elements (like breadcrumbs), add a scoped override (for example, `text-transform: none` on those selectors) to keep casing consistent with authored copy.

## Components (must-use)
- Source of truth: `docs/ui-components.md`. Downstream import path: `@raidguild/brand-system/components`; source-repository path: `@/components/ui/<component>`.
- Highlights: Button (variants: primary, secondary, ghost, moloch), Form system (Form, FormField, FormLabel, FormControl, FormMessage, RequiredFieldIndicator) with React Hook Form, Card/Tabs/Accordion for structure, Dialog/Sheet/Drawer for overlays, Table/DataTable, Select/Combobox/Multiselect, Badge variants (default, secondary, destructive, outline, moloch, scroll), Tooltip/Popover/HoverCard, Wizard, Sidebar, Command palette, Progress, Slider, DatePicker/Calendar, Carousel, Breadcrumb/Pagination/NavigationMenu.
- Patterns: prefer composition over custom styling; keep accessibility (Radix primitives, focus-visible rings). Use `cn` from `src/lib/utils.ts` for class merging.

## Assets & References (pages under `src/app/`)
- Logos: `logos/page.tsx` + SVGs under `public/assets/logos`. `symbol-black.svg` is the canonical master mark. Full Moloch/Scroll logotypes and variants are preserved as Suede-era archive assets.
- Colors: `colors/page.tsx` shows palettes and hexes; developer guidance points to `src/brand/system.ts` and `src/generated/brand-tokens.css`.
- Typography: `typography/page.tsx` shows specimens, usage guidance; font downloads link.
- Iconography: `iconography/page.tsx` references SVG sets in `public/assets/icon` (8bit roles, D&D service icons, magic set).
- Cohort guide icon assets: this repo also exposes a subset of brand icons under `/dd` (D&D-style line icons for roles, tools, and encounters) and `public/assets/icon/magic` (magic UI glyphs like stars, crystals, lanterns, flasks). the /8bit folder has special 8bit style icons for the different roles in RaidGuild
- In documentation and MDX content, prefer these SVG icons over raw emojis. Use them via `<img src="/icon/dd/swords.svg" />` or `<img src="/icon/magic/star.svg" />` with semantic `alt` text, and avoid relying on emoji-only headings.
- Illustrations: `illustrations/page.tsx` is reign-aware. Louchi references the `public/images/neo` set pinned to Venture Beyond commit `4ffb591`, including the day and night panoramas, landmark overlay, and character art-direction sheet at `public/images/reigns/louchi/character-style-guide.png`. The hero discovery contract lives in `docs/louchi-hero-discovery.md`; hover, focus, and tap reveal the same routes, and reduced motion reveals the final state immediately. TW references the `/witch/images/witchcraft-*` archive; Suede uses `public/assets/webp` in color (`-c`) and B&W (`-bw`) across multiple aspect ratios; Ven presents a clearly labeled directional reconstruction from its surviving one-sheet.
- Home (`page.tsx`): quick links to PDF, Figma, GitHub; “For Archers” (design) and “For Warriors” (dev) navigation.
- Machine API: `GET /api/machine/brand-guidelines` returns the complete versioned brand package after an x402 payment; `GET /.well-known/agents.json` publicly advertises its payment and response contract. Structured facts come from generated brand data; narrative payload guidance remains in `src/lib/machine-api/brand-guidelines.ts`.

## Accessibility & UX Checklist
- Every input needs a label + `FormMessage` for errors; preserve focus-visible rings (`ring-2 ring-moloch-500 ring-offset-2` via tokens).
- Keep keyboard navigation; use Radix components’ ARIA defaults.
- Maintain contrast through the generated semantic pairs. In Louchi night, use moon parchment on night sky/depth surfaces and moon cyan with night-sky foreground; do not assume dark appearance only flips background and text.
- Use responsive layouts (`container-custom`, `grid-custom`) and test mobile/desktop.

## Suggested Prompt Snippet (for agents)
```text
You are building UI for RaidGuild. Use the official design system.
- Import components from @raidguild/brand-system/components (see docs/ui-components.md).
- Use generated brand tokens from src/generated/brand-tokens.css and utilities from src/app/globals.css.
- Font variables: maziusDisplay (display), ebGaramond (body), ubuntuMono (mono) from src/lib/fonts.ts.
- Honor ThemeProvider light/dark and focus-visible rings.
- Prefer composition of existing components; no bespoke UI unless necessary.
- When styling, use semantic classes (primary, background, foreground) and utilities (type-*, container-custom, grid-custom).
```

## If You Need More Detail
- Deep component guidance: `docs/ui-components.md`.
- Consolidation and Storybook implementation handoff: `docs/brand-system-implementation-handoff.md`.
- Setup and quick reference: `README.md`.
- Canonical data: `src/brand/system.ts`; generated tokens: `src/generated/brand-tokens.css`; utilities: `src/app/globals.css`.
- Fonts: `src/lib/fonts.ts`; theme toggling: `src/lib/theme-context.tsx`.

## Maintenance
- September 2026 Louchi layout and interaction workshop baseline: website commit `a00dd80`. The guide's active Grinder Refined fonts follow website revision `a6418ea` (September 30 font update `877ba22`); this font refresh does not change the older layout snapshot. Navy `#191e4e` is the current night canvas; raised cards use `#242953`, text parchment `#efe9d7`. See `docs/louchi-venture-sync.md` for provenance, current coverage and pending parity work. Open fallback fonts are shipped through package `fonts.css`; commercial Grinder files are guide-only; source app font faces are in `globals.css`.
- Storybook `Brand/Venture Beyond` covers current accent headings, standalone CTA spacing (24px), pill geometry, four-column desktop Spears, mobile card rails and motion/routing rules. `Brand/Elastic Gallery` covers adaptive columns, fixed-height captions, stable hover slots, categories and a right-hand detail panel with local fixtures. `Brand/Hero Discovery` uses current foliage and video exports. Keep old reigns independent; do not globally replace archival fonts.
- `Brand/Venture Interactions` covers the portal renderer, illustrated interiors on magenta with a smaller bottom title, member drift/pause/drag, counter-moving tickers, foliage entrance, creed crossfade, and three-step form validation/success/error. Form snapshots must never submit to a real API or emit analytics. See `src/stories/brand/website-snapshot/README.md` before resyncing.
- Update the appropriate module under `src/brand/`, run `npm run generate:brand`, and update this file when brand tokens, component APIs, asset paths, or setup steps change. `npm run check:brand` verifies generated output freshness; `npm run test:brand` validates the canonical source, public manifest, machine payload, and content hash.
