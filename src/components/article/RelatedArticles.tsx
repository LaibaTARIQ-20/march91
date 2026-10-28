import type { Article } from "@/types";
import ArticleGrid from "@/components/article/ArticleGrid";
import SectionTitle from "@/components/ui/SectionTitle";

type RelatedArticlesProps = {
  articles: Article[];
  sectionName: string;
};

export default function RelatedArticles({
  articles,
  sectionName,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  const items = articles.slice(0, 3);

  return (
    <div className="mt-16 pt-8 border-t border-line">
      <SectionTitle title={`More from ${sectionName}`} />
      <ArticleGrid articles={items} columns={3} />
    </div>
  );
}
