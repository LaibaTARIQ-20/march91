// Shared types — re-exported from here so components don't
// import directly from the content layer.

export type Section =
  | "samaj"
  | "karobaar"
  | "opinion"
  | "lifestyle"
  | "sports"
  | "nust-boxd";

export type GlossaryItem = {
  term: string;
  definition: string;
};

export type Article = {
  slug: string;
  section: Section;
  title: string;
  author?: string;
  excerpt: string;
  body: string[];
  heroImage: string | null;
  articleImage?: string | null;
  heroAspect?: "cover" | "landscape" | "portrait" | "tall" | "video" | "wide";
  isPlaceholderImage?: boolean;
  photoCredit?: string;
  isFeatured?: boolean;
  publishedAt?: string;
  tags?: string[];
  readTime?: string;
  pullQuote?: string;
  heroPosition?: string;
  glossary?: GlossaryItem[];
  videoId?: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  label: string;
  title: string;
  text?: string;
  href?: string;
};

export type Video = {
  id: string;
  title: string;
  label: string;
  poster: string;
  src?: string;
  youtubeId?: string;
};

export type Short = {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
};

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
  duration?: string;
  date?: string;
  category?: string;
  description?: string;
};

export type NoticeItem = {
  id: string;
  label: string;
  title: string;
  href: string;
  date?: string;
  deadline?: string;
};

export type Review = {
  id: string;
  title: string;
  poster: string;
  writer: string;
  text: string[];
  rating?: number;
  year?: string;
};
