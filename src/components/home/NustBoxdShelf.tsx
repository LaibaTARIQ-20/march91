import Image from "next/image";
import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";
import ButtonLink from "@/components/ui/ButtonLink";
import type { Article } from "@/types";

type NustBoxdShelfProps = {
  articles: Article[];
  tagline: string;
};

export default function NustBoxdShelf({ articles, tagline }: NustBoxdShelfProps) {
  const validArticles = articles.filter((a) => Boolean(a.heroImage));

  return (
    <section className="py-[120px]" aria-label="NUST Box'd Shelf">
      <Wrap>
        <div className="grid grid-cols-1 desk:grid-cols-[1fr_1.4fr] gap-[72px] items-center">
          {/* Left: Info & Link */}
          <div>
            <span className="kicker block">Culture</span>
            <Reveal variant="mask">
              <h2 className="h2 font-display font-black text-navy my-4">
                NUST <em className="font-medium italic">Box&#8217;d</em>
              </h2>
            </Reveal>
            <p className="font-display italic text-[22px] leading-[1.4] text-ink mb-7">
              {tagline}
            </p>
            <ButtonLink href="/nust-boxd" variant="outline" tone="light">
              Browse the shelf &rarr;
            </ButtonLink>
          </div>

          {/* Right: Posters grid (with clip reveal, lift translateY(-6px) and rotate 1.5deg alternate) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {validArticles.map((article, idx) => {
              const isSecond = idx === 1;
              const hoverTransform = isSecond
                ? "@media(hover:hover):hover:-translate-y-1.5 @media(hover:hover):hover:rotate-[1.5deg]"
                : "@media(hover:hover):hover:-translate-y-1.5 @media(hover:hover):hover:-rotate-[1.5deg]";

              return (
                <Reveal key={article.slug} variant="clip" delay={idx * 150} className={isSecond ? "desk:mt-[56px]" : ""}>
                  <Link
                    href={`/${article.section}/${article.slug}`}
                    className={`group block transition-transform duration-500 ease-[var(--ease-out)] motion-reduce:transform-none ${hoverTransform}`}
                  >
                    <ImageFrame className="aspect-2/3 bg-cream-dark border border-line/40">
                      <Image
                        src={article.heroImage!}
                        alt={article.title}
                        fill
                        sizes="(max-width: 820px) 100vw, 35vw"
                        className="object-cover"
                      />
                    </ImageFrame>
                    <h3 className="font-display font-bold text-[24px] text-navy mt-4 mb-1.5 link-sweep inline-block group-hover:text-navy transition-colors">
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
        </div>
      </Wrap>
    </section>
  );
}
