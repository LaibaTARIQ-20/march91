# March '91

The official student magazine of MARCOMS, NUST Islamabad.

---

## Overview

March '91 is an editorial publication website built as a modern, high-performance frontend application. The platform features an editorial layout with section categorization, rich typography, responsive article grids, and accessible component architecture.

---

## Stack

- **Framework**: Next.js 16.3.4 (App Router with React 19)
- **Styling**: Tailwind CSS v4 (Design tokens defined in `@theme`)
- **Typography**: `@fontsource/playfair-display` (Headlines & body) & `@fontsource/lexend` (UI, labels, navigation)
- **Language**: TypeScript (strict mode)
- **Asset Optimization**: `next/image` with responsive `sizes` and WebP/AVIF generation

---

## Run Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Run ESLint validation
npm run lint
```

---

## Folder Map

```
march91/
├── public/                  # Static assets and media files
│   └── images/              # Brand and article image directories
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [section]/       # Section listing and article pages (/[section], /[section]/[slug])
│   │   ├── about/           # About page
│   │   ├── archive/         # Complete issue archive grouped by section
│   │   ├── noticeboard/     # Notices and announcements
│   │   ├── send-your-word/  # Editorial submission page
│   │   ├── videos/          # Video features page
│   │   ├── globals.css      # Tailwind v4 theme tokens and base styles
│   │   ├── layout.tsx       # Root layout, metadataBase, fonts, header/footer
│   │   ├── not-found.tsx    # Accessible 404 page
│   │   ├── page.tsx         # Homepage composition
│   │   ├── robots.ts        # Dynamic robots.txt
│   │   └── sitemap.ts       # Dynamic sitemap.xml
│   ├── components/
│   │   ├── article/         # ArticleCard, ArticleCardFeatured, ArticleGrid, ArticleBody, etc.
│   │   ├── home/            # CoverStoryHero, FeaturedStrip, SectionBlock, VideoRow, NoticeStrip, EditorNote
│   │   ├── layout/          # SiteHeader, SiteFooter, CategoryNav, MobileMenu, Container
│   │   └── ui/              # Button, Byline, Divider, ResponsiveImage, Rubric, SectionTitle
│   ├── content/             # Static content files (ready for CMS migration)
│   ├── lib/                 # Data access layer (getAllArticles, getHomeData, cn, flags)
│   └── types/               # Shared TypeScript models (Article, Section, VideoItem, NoticeItem)
├── .env.example             # Environment variable specifications
└── next.config.ts           # Next.js build and image optimization configuration
```

---

## Content Model

The core article data structure is defined in `src/types/index.ts`:

```typescript
export type Section =
  | "samaj"
  | "karobaar"
  | "opinion"
  | "lifestyle"
  | "sports"
  | "nust-boxd";

export type Article = {
  slug: string;
  section: Section;
  title: string;
  author?: string;
  excerpt: string;
  body: string[];
  heroImage: string | null;
  articleImage?: string | null;
  isPlaceholderImage?: boolean;
  photoCredit?: string;
  isCoverStory?: boolean;
  isFeatured?: boolean;
  publishedAt?: string;
  tags?: string[];
};
```

---

## Replacing Static Content with a CMS

The application was architected specifically for handoff to a backend/CMS development team. The UI components and pages do not read static files directly; they consume asynchronous data fetching functions.

To integrate a headless CMS (e.g., Sanity, Strapi, Contentful, WordPress REST/GraphQL):

1. **Update `src/lib/articles.ts`**:
   Replace the local array reads in `getAllArticles()`, `getArticle()`, `getArticlesBySection()`, `getCoverStory()`, and `getFeatured()` with API client queries.

2. **Update `src/lib/home.ts`**:
   Update `getHomeData()` to fetch the cover story, featured strip, section block, and latest stories directly from your CMS queries.

3. **Update `src/types/index.ts`**:
   Adjust the `Article`, `VideoItem`, and `NoticeItem` types if your CMS schema introduces new fields.

4. **Update `next.config.ts`**:
   Add your media hosting domain to `images.remotePatterns` to enable Next.js image optimization:
   ```typescript
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "cdn.yourcms.com",
       },
     ],
   },
   ```

No modifications to React components or page routes are necessary when swapping the data layer.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

In production, set `NEXT_PUBLIC_SITE_URL` to the live domain (e.g., `https://march91.nust.edu.pk`).

---

## Image Guidelines

For optimal performance and layout fidelity:
- **Hero & Cover Images**: Landscape format (16:9 or 21:9), maximum width 1600px.
- **Card Images**: 4:5 or 4:3 aspect ratio, maximum width 800px.
- **File Format & Weight**: Use WebP or compressed JPG; keep file sizes under 200KB.

---

## Deployment Notes

- **Vercel / Next.js Hosting**: Deploy directly by connecting the repository. Next.js App Router and static generation are automatically configured.
- **Node.js Production Server**: Run `npm run build` followed by `npm run start`.
- **Static Export**: If static export is required in the future, configure `output: 'export'` in `next.config.ts`.
