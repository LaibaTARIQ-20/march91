import { articles } from "@/content/articles";
import type { Article, Section } from "@/types";

export async function getAllArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticle(
  section: string,
  slug: string
): Promise<Article | undefined> {
  return articles.find((a) => a.section === section && a.slug === slug);
}

export async function getArticlesBySection(
  section: Section
): Promise<Article[]> {
  return articles.filter((a) => a.section === section);
}

export async function getFeatured(): Promise<Article[]> {
  return articles.filter((a) => a.isFeatured);
}

