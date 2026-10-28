import type { Article } from "@/types";
import { ArticleCard } from "@/components/article/ArticleCard";
import { cn } from "@/lib/cn";

type ArticleGridProps = {
  articles: Article[];
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Responsive article grid — fixed column layout using static class strings.
 */
export default function ArticleGrid({
  articles,
  columns = 3,
  className,
}: ArticleGridProps) {
  return (
    <div className={cn("grid gap-x-6 gap-y-10", columnClasses[columns], className)}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
