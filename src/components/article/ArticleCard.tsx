import Link from "next/link";
import type { Article } from "@/types";
import { sectionLabel } from "@/content/sections";
import { cn } from "@/lib/cn";
import Rubric from "@/components/ui/Rubric";
import Byline from "@/components/ui/Byline";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

type ArticleCardProps = {
  article: Article;
  className?: string;
};

/**
 * Standard article grid card — 4:5 image, rubric, title, byline.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  const href = `/${article.section}/${article.slug}`;
  const label = sectionLabel(article.section);

  return (
    <Link href={href} className={cn("group block space-y-3", className)}>
      {article.heroImage ? (
        <ResponsiveImage
          src={article.heroImage}
          alt={article.title}
          aspect="tall"
          isPlaceholder={article.isPlaceholderImage}
        />
      ) : (
        <div className="w-full aspect-4/5 bg-cream-dark" />
      )}

      <Rubric label={label} />

      <h3 className="font-display font-bold text-lg leading-snug text-navy group-hover:underline underline-offset-4">
        {article.title}
      </h3>

      {article.author && <Byline author={article.author} />}
    </Link>
  );
}

export default ArticleCard;
