import Link from "next/link";
import type { Article } from "@/types";
import { sectionLabel } from "@/content/sections";
import { cn } from "@/lib/cn";
import Rubric from "@/components/ui/Rubric";
import Byline from "@/components/ui/Byline";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

type ArticleCardFeaturedProps = {
  article: Article;
  className?: string;
};

/**
 * Featured article card — side-by-side on desktop (image left, text right),
 * larger title, excerpt, and byline.
 */
export default function ArticleCardFeatured({
  article,
  className,
}: ArticleCardFeaturedProps) {
  const href = `/${article.section}/${article.slug}`;
  const label = sectionLabel(article.section);

  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {article.heroImage ? (
          <ResponsiveImage
            src={article.heroImage}
            alt={article.title}
            aspect="landscape"
            isPlaceholder={article.isPlaceholderImage}
          />
        ) : (
          <div className="w-full aspect-4/3 bg-cream-dark" />
        )}

        <div className="space-y-3">
          <Rubric label={label} />
          <h3 className="font-display font-bold text-2xl md:text-3xl text-navy group-hover:underline underline-offset-4 leading-tight">
            {article.title}
          </h3>
          <p className="font-body text-base text-ink leading-relaxed">
            {article.excerpt}
          </p>
          {article.author && <Byline author={article.author} />}
        </div>
      </div>
    </Link>
  );
}
