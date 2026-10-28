import { articles } from "@/content/articles";
import { homepage } from "@/content/homepage";
import { heroSlides } from "@/content/hero-slides";
import { videos } from "@/content/videos";
import { shorts } from "@/content/shorts";
import { showMediaPlaceholders } from "@/lib/flags";
import type { Article, HeroSlide, Video, Short } from "@/types";

export function requireArticle(slug: string): Article {
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    throw new Error(`Homepage configuration error: article with slug "${slug}" not found in src/content/articles.ts`);
  }
  return article;
}

export type HomeData = {
  slides: HeroSlide[];
  coverLines: Article[];
  tickerArticles: Article[];
  contents: Article[];
  feature: Article;
  edit: Article[];
  lifestyle: {
    lead: Article;
    list: Article[];
  };
  shelf: Article[];
  copy: typeof homepage.copy;
  videos: Video[];
  shorts: Short[];
  showMediaPlaceholders: boolean;
};

export async function getHomeData(): Promise<HomeData> {
  const coverLines = homepage.coverLines.map(requireArticle);
  const contents = homepage.contents.map(requireArticle);
  const feature = requireArticle(homepage.feature);
  const edit = homepage.edit.map(requireArticle);
  const lifestyle = {
    lead: requireArticle(homepage.lifestyle.lead),
    list: homepage.lifestyle.list.map(requireArticle),
  };
  const shelf = homepage.shelf.map(requireArticle);

  return {
    slides: heroSlides,
    coverLines,
    tickerArticles: articles,
    contents,
    feature,
    edit,
    lifestyle,
    shelf,
    copy: homepage.copy,
    videos,
    shorts,
    showMediaPlaceholders,
  };
}
