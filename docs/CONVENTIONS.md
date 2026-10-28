# March '91 Developer Conventions

## Folder Structure
- `src/app/` — Next.js App Router pages and route definitions only.
- `src/components/` — UI components (`layout/`, `home/`, `article/`, `ui/`).
- `src/content/` — All static site content, metadata, articles, and navigation data.
- `src/lib/` — Helper functions, data getters, and utilities.
- `src/types/` — TypeScript interfaces and shared type declarations.
- `docs/` — Specifications, developer guides, and references.
- `scripts/` — Project guard-rails and content validation scripts.

## Rules & Standards
1. **Content**: All text and editorial data must live strictly in `src/content/`.
2. **CMS Boundary**: `src/lib/articles.ts` is the only file replaced by the CMS.
3. **Colours**: Use only design tokens in `globals.css` (`navy`, `cream`, `cream-dark`, `gold`, `gold-text`, `ink`, `muted`, `line`). No hard-coded hex or external Tailwind palettes.
4. **Print Aesthetic**: Square corners only (`rounded-full` allowed exclusively on circular/pill buttons). No shadows (`shadow-*`); use hairline rules (`border-line`).
5. **Server Components**: All pages and layouts must remain React Server Components by default. Use `"use client"` only for interaction (observers, carousels, mobile drawer).
6. **Images**: Every image must render through `next/image` with proper alt text and aspect ratios.
7. **Verification**: Always run `npm run check` (`typecheck`, `lint`, `check:content`, `build`) before committing code.

