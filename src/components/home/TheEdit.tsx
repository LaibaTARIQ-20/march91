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
  return (
    <section className="py-16 desk:py-24" aria-label="The Edit">
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

        {/* Three columns on desktop, two on tablet, one on mobile.
            Gap between cards: 24px on desktop, 16px on mobile. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article, idx) => {
            const sectionName = sectionLabel(article.section as Section);

            return (
              <Reveal key={article.slug} variant="up" delay={idx * 100}>
                <Link
                  href={`/${article.section}/${article.slug}`}
                  className="group block p-0 rounded-none"
                >
                  {/* Image aspect ratio 4:5 on all cards. object-fit cover. Card padding: 0. Border radius: 0. */}
                  <ImageFrame className="aspect-4/5 bg-cream-dark border border-line/40 rounded-none p-0">
                    {article.heroImage ? (
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded-none"
                      />
                    ) : null}
                  </ImageFrame>

                  {/* 12px between image and category label (mt-3) */}
                  <span className="kicker block mt-3 transition-colors group-hover:text-navy">
                    {sectionName}
                  </span>

                  {/* 8px between label and title (mt-2) */}
                  <h3 className="font-display text-[28px] leading-[1.1] text-navy mt-2 mb-2 link-sweep inline-block group-hover:text-navy transition-colors">
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
