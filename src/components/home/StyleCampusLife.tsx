import Image from "next/image";
import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";
import type { Article } from "@/types";

type StyleCampusLifeProps = {
  lead: Article;
  list: Article[];
};

export default function StyleCampusLife({ lead, list }: StyleCampusLifeProps) {
  return (
    <section className="py-16 desk:py-24" aria-label="Style & Campus Life">
      <Wrap>
        {/* Header: kicker "Lifestyle" and h2 (margin-top 10px), margin-bottom 44px */}
        <div className="mb-11">
          <span className="kicker block">Lifestyle</span>
          <Reveal variant="mask">
            <h2 className="h2 font-display font-black text-navy mt-2.5">
              Style &amp; <em className="font-medium italic">Campus Life</em>
            </h2>
          </Reveal>
        </div>

        {/* Grid 1.35fr / 1fr, gap 56px */}
        <div className="grid grid-cols-1 desk:grid-cols-[1.35fr_1fr] gap-14">
          {/* Left: Lead story */}
          <Reveal variant="up">
            <Link
              href={`/${lead.section}/${lead.slug}`}
              className="group block"
            >
              <ImageFrame className="aspect-4/5 bg-cream-dark border border-line/40">
                {lead.heroImage ? (
                  <Image
                    src={lead.heroImage}
                    alt={lead.title}
                    fill
                    sizes="(max-width: 820px) 100vw, 55vw"
                    className="object-cover"
                  />
                ) : null}
              </ImageFrame>

              <h3 className="font-display text-[40px] leading-[1.05] text-navy mt-5 mb-2 link-sweep inline-block group-hover:text-navy transition-colors">
                {lead.title}
              </h3>

              {lead.author ? (
                <span className="byline block text-muted">By {lead.author}</span>
              ) : null}
            </Link>
          </Reveal>

          {/* Right: rows with staggered up reveals */}
          <div className="flex flex-col">
            {list.map((article, idx) => {
              const isFirst = idx === 0;

              return (
                <Reveal key={`${article.slug}-${idx}`} variant="up" delay={idx * 80}>
                  <Link
                    href={`/${article.section}/${article.slug}`}
                    className={`grid grid-cols-[130px_1fr] gap-5 items-center group transition-colors ${
                      isFirst ? "pb-6" : "rule py-6"
                    }`}
                  >
                    <ImageFrame className="aspect-square bg-cream-dark border border-line/40">
                      {article.heroImage ? (
                        <Image
                          src={article.heroImage}
                          alt={article.title}
                          fill
                          sizes="130px"
                          className="object-cover"
                        />
                      ) : null}
                    </ImageFrame>

                    <div>
                      <span className="kicker block transition-colors group-hover:text-navy">
                        Lifestyle
                      </span>
                      <h4 className="font-display text-[24px] leading-[1.1] text-navy my-2 link-sweep inline-block group-hover:text-navy transition-colors">
                        {article.title}
                      </h4>
                      {article.author ? (
                        <span className="byline block text-muted">
                          By {article.author}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
