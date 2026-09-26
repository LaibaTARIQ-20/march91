# March '91 — Setup & Deploy

## Run it locally

1. Unzip this folder and open a terminal inside `march91/`
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

## What's built so far

- Homepage — matches Sarah's mockup structure, now with a real desktop layout (split hero, 4-column grid on large screens) instead of a stretched mobile view
- All 6 section pages: /samaj, /karobaar, /opinion, /lifestyle, /sports, /nust-boxd
- Article template — any article shows at /[section]/[slug]
- Header with nav (sticky, underline-on-hover), Footer with MARCOMS credit / Instagram / email / Sir Raza's contact
- "Send in your word" banner on the Opinion page (mailto link)
- Fonts: Playfair Display (body/headlines) + Lexend (nav/labels/headings), self-hosted — no Google Fonts dependency, so it works offline and loads fast
- Placeholder photography — every article that doesn't have a real photo yet uses a seeded stock image with a navy duotone filter and a "PLACEHOLDER" tag in the corner, so nothing looks broken or empty. Swap `heroImage` in articles.ts for a real photo path and remove `isPlaceholderImage: true` when the real one arrives — the tag disappears automatically.
- Hover states on nav links, article cards (image zoom + lift), and CTAs
- One deliberate entrance animation on the homepage hero (fade + rise on load)

## Where to edit content (no CMS yet — this is the fast path for launch)

- **All articles**: `src/content/articles.ts` — copy an existing article object to add a new one. Set `heroImage` to a real image path once you have photos (drop images in `public/` and reference like `/photo.jpg`).
- **Footer/contact info**: `src/content/site-config.ts` — update `instagramUrl`, `magazineEmail`, `sirRazaContact` once Sarah sends them.
- **Cover story**: whichever article has `isCoverStory: true` becomes the homepage hero — move that flag to the real Rector interview once it's ready.

## What's still placeholder

- Cover story text (currently the mockup's "new class rewriting NUST's social scene" — swap for the real Rector interview)
- All photos (every `heroImage: null` renders a "photo pending" placeholder box)
- Samaj, Karobaar, Lifestyle, NUST Box'd articles (currently placeholder text)
- Team/About page (not built yet — waiting on confirmation the org chart didn't change)
- Noticeboard page (not built yet)
- Domain/Instagram/email (waiting on Sarah)

## Deploying

Easiest path: push this to a GitHub repo, then import it at vercel.com — it auto-detects Next.js and deploys with zero config. Once the domain is registered, connect it in Vercel's project settings.
