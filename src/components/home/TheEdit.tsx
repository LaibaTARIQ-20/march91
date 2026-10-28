import Image from "next/image";
import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";

type TheEditProps = {
  articles: Article[];
  tagline: string;
};

export default function TheEdit({ articles, tagline }: TheEditProps) {
  const offsetClasses = ["desk:mt-0", "desk:mt-[80px]", "desk:mt-[30px]"];
  const aspectClasses = ["aspect-3/4", "aspect-4/5", "aspect-3/4"];

  return (
    <section className="py-12 desk:pb-[120px]" aria-label="The Edit">
      <Wrap>
        {/* Header: hairline on top, padding-top 28px, margin-bottom 48px */}
        <div className="rule pt-7 mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <Reveal variant="mask">
            <h2 className="h2 font-display font-black text-[clamp(32px,3.6vw,52px)] text-navy leading-none">
              The Edit
            </h2>
          </Reveal>
          <span className="byline text-muted">
            {tagline}
          </span>
        </div>

        {/* 3 columns grid, gap 40px with 100ms staggered up reveals */}
        <div className="grid grid-cols-1 desk:grid-cols-3 gap-10">
          {articles.map((article, idx) => {
            const sectionName = sectionLabel(article.section as Section);
            const offset = offsetClasses[idx] || "desk:mt-0";
            const aspect = aspectClasses[idx] || "aspect-3/4";

            return (
              <Reveal key={article.slug} variant="up" delay={idx * 100} className={offset}>
                <Link
                  href={`/${article.section}/${article.slug}`}
                  className="group block"
                >
                  <ImageFrame className={`${aspect} bg-cream-dark border border-line/40`}>
                    {article.heroImage ? (
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 820px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                  </ImageFrame>

                  <span className="kicker block mt-4 transition-colors group-hover:text-navy">
                    {sectionName}
                  </span>

                  <h3 className="font-display text-[28px] leading-[1.1] text-navy my-2 link-sweep inline-block group-hover:text-navy transition-colors">
                    {article.title}
                  </h3>

                  {article.author ? (
                    <span className="byline block text-muted">
                      By {article.author}
                    </span>
                  ) : null}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
