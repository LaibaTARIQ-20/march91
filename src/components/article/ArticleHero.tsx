import Image from "next/image";
import Link from "next/link";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";

type ArticleHeroProps = {
  article: Article;
  displayImage: string | null;
  readingTime: string;
};

export default function ArticleHero({ article, displayImage, readingTime }: ArticleHeroProps) {
  const label = sectionLabel(article.section as Section);
  const isPortraitHero = article.heroAspect === "portrait" || article.heroAspect === "tall";

  if (isPortraitHero && displayImage) {
    return (
      <div className="grid grid-cols-1 desk:grid-cols-[5fr_7fr] gap-10 desk:gap-14 items-center border-b border-line pb-12 mb-12">
        <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden w-full border border-line/40">
          <Image
            src={displayImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 820px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/${article.section}`}
              className="kicker hover:opacity-80 transition-opacity"
            >
              {label}
            </Link>
            {article.author ? (
              <>
                <span className="text-muted text-xs">&middot;</span>
                <span className="byline">By {article.author}</span>
              </>
            ) : null}
            <span className="text-muted text-xs">&middot;</span>
            <span className="byline">{readingTime}</span>
          </div>

          <h1 className="font-display font-[900] text-[36px] desk:text-[52px] leading-[1.05] text-navy mb-6">
            {article.title}
          </h1>

          <p className="font-display italic text-lg desk:text-xl text-ink leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto border-b border-line pb-12 mb-12 text-center">
      <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
        <Link
          href={`/${article.section}`}
          className="kicker hover:opacity-80 transition-opacity"
        >
          {label}
        </Link>
        {article.author ? (
          <>
            <span className="text-muted text-xs">&middot;</span>
            <span className="byline">By {article.author}</span>
          </>
        ) : null}
        <span className="text-muted text-xs">&middot;</span>
        <span className="byline">{readingTime}</span>
      </div>

      <h1 className="font-display font-[900] text-[36px] desk:text-[56px] leading-[1.05] text-navy mb-6">
        {article.title}
      </h1>

      <p className="font-display italic text-lg desk:text-xl text-ink max-w-2xl mx-auto leading-relaxed mb-8">
        {article.excerpt}
      </p>

      {displayImage ? (
        <div className="relative aspect-[16/9] bg-cream-dark overflow-hidden w-full border border-line/40 my-8">
          <Image
            src={displayImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
