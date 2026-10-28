import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { sections } from "@/content/sections";
import { siteConfig } from "@/content/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/archive`, lastModified: new Date() },
    { url: `${baseUrl}/send-your-word`, lastModified: new Date() },
    { url: `${baseUrl}/noticeboard`, lastModified: new Date() },
    { url: `${baseUrl}/videos`, lastModified: new Date() },
  ];

  const sectionPages: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: new Date(),
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/${a.section}/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
  }));

  return [...staticPages, ...sectionPages, ...articlePages];
}
