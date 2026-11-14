import Image from "next/image";
import Link from "next/link";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";
import ImageFrame from "@/components/ui/ImageFrame";
import ButtonLink from "@/components/ui/ButtonLink";

type ArticleCardProps = {
  article: Article;
  aspect?: string;
  className?: string;
  isLead?: boolean;
};

export function ArticleCard({
  article,
  aspect = "aspect-3/4",
  className = "",
  isLead = false,
}: ArticleCardProps) {
  const sectionName = sectionLabel(article.section as Section);

  return (
    <Link
      href={`/${article.section}/${article.slug}`}
      className={`group block ${className}`}
    >
      <ImageFrame className={`${aspect} bg-cream-dark border border-line/40`}>
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes={isLead ? "(max-width: 820px) 100vw, 60vw" : "(max-width: 820px) 100vw, 33vw"}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display italic text-lg text-navy/40 select-none">
              {sectionName}
            </span>
          </div>
        )}
      </ImageFrame>

      <span className="kicker block mt-4 transition-colors group-hover:text-navy">
        {sectionName}
      </span>

      <h3
        className={`font-display font-bold text-navy mt-2 mb-2 link-sweep inline-block group-hover:text-navy transition-colors ${isLead ? "text-[32px] desk:text-[40px] leading-[1.1]" : "text-[24px] desk:text-[28px] leading-[1.1]"
          }`}
      >
        {article.title}
      </h3>

      <p className="font-body text-ink text-sm leading-[1.6] line-clamp-3 mb-2">
        {article.excerpt}
      </p>

      {article.author ? (
        <span className="byline block text-muted">
          By {article.author}
        </span>
      ) : null}
    </Link>
  );
}

type SectionLayoutProps = {
  articles: Article[];
};

export default function SectionLayout({ articles }: SectionLayoutProps) {
  const count = articles.length;

  if (count === 0) {
    return (
      <p className="font-body text-sm text-muted text-center py-16">
        Articles for this section are on the way.
      </p>
    );
  }

  // 1 article: full-width cover style
  if (count === 1) {
    const article = articles[0];
    const sectionName = sectionLabel(article.section as Section);

    return (
      <div className="grid grid-cols-1 desk:grid-cols-[7fr_5fr] gap-8 desk:gap-12 items-center py-6">
        <Link
          href={`/${article.section}/${article.slug}`}
          className="block group"
        >
          <ImageFrame className="aspect-4/5 desk:aspect-16/10 bg-cream-dark border border-line/40">
            {article.heroImage ? (
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                sizes="(max-width: 820px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display italic text-2xl text-navy/40">
                  {sectionName}
                </span>
              </div>
            )}
          </ImageFrame>
        </Link>

        <div>
          <span className="kicker block mb-2">{sectionName}</span>
          <h2 className="font-display font-bold text-[36px] desk:text-[48px] leading-[1.05] text-navy my-4">
            <Link
              href={`/${article.section}/${article.slug}`}
              className="link-sweep inline-block hover:text-navy transition-colors"
            >
              {article.title}
            </Link>
          </h2>
          <p className="font-body text-ink text-base desk:text-lg leading-relaxed mb-6">
            {article.excerpt}
          </p>
          {article.author ? (
            <span className="byline block text-muted mb-6">
              By {article.author}
            </span>
          ) : null}
          <ButtonLink
            href={`/${article.section}/${article.slug}`}
            variant="outline"
            tone="light"
          >
            Read story &rarr;
          </ButtonLink>
        </div>
      </div>
    );
  }

  // 2 articles
  if (count === 2) {
    return (
      <div className="grid grid-cols-1 desk:grid-cols-[7fr_5fr] gap-8 desk:gap-12 items-end py-6">
        <ArticleCard article={articles[0]} aspect="aspect-4/5" isLead />
        <ArticleCard article={articles[1]} aspect="aspect-square" />
      </div>
    );
  }

  // 3 articles
  if (count === 3) {
    return (
      <div className="grid grid-cols-1 desk:grid-cols-[7fr_5fr] gap-8 desk:gap-12 items-start py-6">
        <ArticleCard article={articles[0]} aspect="aspect-4/5" isLead />
        <div className="flex flex-col gap-8">
          <ArticleCard article={articles[1]} aspect="aspect-video" />
          <div className="rule pt-8">
            <ArticleCard article={articles[2]} aspect="aspect-video" />
          </div>
        </div>
      </div>
    );
  }

  // 4 or more
  const lead = articles[0];
  const rest = articles.slice(1);
  const offsetClasses = ["desk:mt-0", "desk:mt-[60px]", "desk:mt-[30px]"];

  return (
    <div className="space-y-16 py-6">
      <div className="grid grid-cols-1 desk:grid-cols-[7fr_5fr] gap-8 desk:gap-12 items-center border-b border-line pb-16">
        <Link
          href={`/${lead.section}/${lead.slug}`}
          className="block group"
        >
          <ImageFrame className="aspect-4/5 bg-cream-dark border border-line/40">
            {lead.heroImage ? (
              <Image
                src={lead.heroImage}
                alt={lead.title}
                fill
                sizes="(max-width: 820px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display italic text-2xl text-navy/40">
                  {sectionLabel(lead.section as Section)}
                </span>
              </div>
            )}
          </ImageFrame>
        </Link>

        <div>
          <span className="kicker block mb-2">{sectionLabel(lead.section as Section)}</span>
          <h2 className="font-display font-bold text-[32px] desk:text-[44px] leading-[1.05] text-navy my-4">
            <Link
              href={`/${lead.section}/${lead.slug}`}
              className="link-sweep inline-block hover:text-navy transition-colors"
            >
              {lead.title}
            </Link>
          </h2>
          <p className="font-body text-ink text-base leading-relaxed mb-6">
            {lead.excerpt}
          </p>
          {lead.author ? (
            <span className="byline block text-muted mb-6">
              By {lead.author}
            </span>
          ) : null}
          <ButtonLink
            href={`/${lead.section}/${lead.slug}`}
            variant="outline"
            tone="light"
          >
            Read story &rarr;
          </ButtonLink>
        </div>
      </div>

      <div className="grid grid-cols-1 desk:grid-cols-3 gap-10">
        {rest.map((article, idx) => (
          <ArticleCard
            key={article.slug}
            article={article}
            aspect="aspect-3/4"
            className={offsetClasses[idx % 3]}
          />
        ))}
      </div>
    </div>
  );
}
