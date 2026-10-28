import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import HoverArrow from "@/components/ui/HoverArrow";

type InThisIssueContentsProps = {
  articles: Article[];
};

export default function InThisIssueContents({ articles }: InThisIssueContentsProps) {
  return (
    <section className="py-[110px]" aria-label="In this issue">
      <Wrap>
        {/* Header row: h2 left, issue label right */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-line">
          <Reveal variant="mask">
            <h2 className="h2 font-display font-black text-navy">
              In <em className="font-medium italic">this</em> issue
            </h2>
          </Reveal>
          <span className="byline text-muted">
            {siteConfig.issueLabel}
          </span>
        </div>

        {/* 2 columns grid on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 desk:grid-cols-2 desk:column-gap-[72px]">
          {articles.map((article, idx) => {
            const sectionName = sectionLabel(article.section as Section);
            const image = article.heroImage;

            return (
              <Reveal key={article.slug} variant="up" delay={idx * 70}>
                <Link
                  href={`/${article.section}/${article.slug}`}
                  className="relative group grid grid-cols-[72px_1fr] desk:grid-cols-[96px_minmax(0,1fr)_minmax(0,1.3fr)_auto] items-center gap-[22px] py-[22px] border-t border-line overflow-hidden px-3 -mx-3"
                >
                  {/* Sliding cream-dark background on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cream-dark origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out)] @media(hover:hover):group-hover:scale-x-100 motion-reduce:transition-none pointer-events-none"
                  />

                  {/* 3:4 Thumbnail or placeholder - scales 1.06 on hover */}
                  <div className="relative z-10 aspect-3/4 bg-cream-dark overflow-hidden w-full flex items-center justify-center border border-line/40">
                    {image ? (
                      <Image
                        src={image}
                        alt={article.title}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-300 ease-[var(--ease-out)] @media(hover:hover):group-hover:scale-106 motion-reduce:transform-none"
                      />
                    ) : (
                      <span className="font-display italic text-[14px] text-navy/30 select-none">
                        {sectionName}
                      </span>
                    )}
                  </div>

                  {/* Section Name - moves 10px right on hover */}
                  <span className="relative z-10 font-display italic font-medium text-[clamp(30px,3.2vw,46px)] leading-none text-navy transition-all duration-300 ease-[var(--ease-out)] @media(hover:hover):group-hover:translate-x-2.5 motion-reduce:transform-none">
                    {sectionName}
                  </span>

                  {/* Story line */}
                  <span className="relative z-10 font-body text-[14px] leading-[1.5] text-ink max-w-[380px] hidden desk:block">
                    {article.title}
                  </span>

                  {/* Read -> kicker with moving arrow, hidden below desk */}
                  <span className="relative z-10 kicker justify-self-end hidden desk:inline-flex items-center gap-1 text-gold-text">
                    <span>Read</span>
                    <HoverArrow distance={4} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
