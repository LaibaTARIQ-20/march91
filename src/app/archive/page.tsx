import type { Metadata } from "next";
import { sections } from "@/content/sections";
import { getAllArticles } from "@/lib/articles";
import ArticleGrid from "@/components/article/ArticleGrid";
import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/layout/Container";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Archive",
  description: "Explore all stories published in March '91 by section.",
};

export default async function ArchivePage() {
  const articles = await getAllArticles();

  return (
    <Container className="py-12 md:py-20 space-y-16">
      <div className="text-center">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy mb-6">
          Archive
        </h1>
        <Divider />
      </div>

      {sections.map((section) => {
        const sectionArticles = articles.filter((a) => a.section === section.slug);
        if (sectionArticles.length === 0) return null;

        return (
          <section key={section.slug} className="space-y-8">
            <SectionTitle title={section.label} href={`/${section.slug}`} />
            <ArticleGrid articles={sectionArticles} columns={4} />
          </section>
        );
      })}
    </Container>
  );
}
