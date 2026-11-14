import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import type { Article } from "@/types";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import HoverArrow from "@/components/ui/HoverArrow";

type InThisIssueContentsProps = {
  articles: Article[];
};

export default function InThisIssueContents({ articles }: InThisIssueContentsProps) {
  return (
    <section className="py-16 desk:py-24" aria-label="In this issue">
      <Wrap>
        {/* Header row: h2 left, issue label right */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-line">
          <Reveal variant="mask">
            <h2 className="h2 font-display font-black text-navy">
              Latest Stories
            </h2>
          </Reveal>
          <span className="byline text-muted">
            {siteConfig.issueLabel}
          </span>
        </div>

        {/* Desktop (768px and up): Two equal columns, 48px gap between them */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {articles.map((article, idx) => {
            const image = article.heroImage;

            return (
              <Reveal key={article.slug} variant="up" delay={idx * 70}>
                <Link
                  href={`/${article.section}/${article.slug}`}
                  className="relative group border-t border-line py-6 overflow-hidden block min-w-0"
                >
                  {/* Sliding cream-dark background on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cream-dark origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out)] @media(hover:hover):group-hover:scale-x-100 motion-reduce:transition-none pointer-events-none"
                  />

                  {/* Desktop Layout (768px and up):
                      Grid columns: thumbnail 106px, title 220px, excerpt flexible (max 240px), READ link 96px.
                      Gap between items: 24px. Align items top.
                  */}
                  <div className="relative z-10 hidden md:grid md:grid-cols-[106px_220px_minmax(0,240px)_96px] md:gap-6 md:items-start min-w-0">
                    {/* Thumbnail: 106px wide, 142px tall, object-fit cover */}
                    <div className="relative w-[106px] h-[142px] overflow-hidden flex-shrink-0 border border-line rounded-none min-w-0">
                      {image ? (
                        <Image
                          src={image}
                          alt={article.title}
                          fill
                          sizes="106px"
                          className="w-full h-full object-cover object-center rounded-none transition-transform duration-300 ease-[var(--ease-out)] @media(hover:hover):group-hover:scale-105 motion-reduce:transform-none"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-dark" />
                      )}
                    </div>

                    {/* Title: Playfair Display, 28px on desktop (1024px+), 24px under 1024px.
                        Allow wrapping to two lines. overflow-wrap: anywhere. Never overlap excerpt. */}
                    <h3
                      className="font-display font-bold text-navy leading-[1.1] text-[24px] lg:text-[28px] line-clamp-2 min-w-0 m-0 [overflow-wrap:anywhere]"
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt: Lexend, --color-ink, max-width 240px, line-height 1.6 */}
                    <p className="font-body text-ink text-sm leading-[1.6] max-w-[240px] line-clamp-4 min-w-0 m-0">
                      {article.excerpt}
                    </p>

                    {/* READ link: --color-gold-text, Lexend, uppercase, aligned to right edge */}
                    <div className="flex justify-end items-start min-w-0">
                      <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-text inline-flex items-center gap-1">
                        <span>Read</span>
                        <HoverArrow distance={4} />
                      </span>
                    </div>
                  </div>

                  {/* Mobile Layout (under 768px):
                      One column. Thumbnail left (80px wide, 112px tall),
                      title and excerpt stacked on right, READ link below excerpt.
                  */}
                  <div className="relative z-10 grid grid-cols-[80px_1fr] gap-4 items-start md:hidden min-w-0">
                    {/* Mobile Thumbnail: 80px wide, 112px tall */}
                    <div className="relative w-[80px] h-[112px] overflow-hidden flex-shrink-0 border border-line rounded-none min-w-0">
                      {image ? (
                        <Image
                          src={image}
                          alt={article.title}
                          fill
                          sizes="80px"
                          className="w-full h-full object-cover object-center rounded-none"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-dark" />
                      )}
                    </div>

                    {/* Title, Excerpt, READ stacked */}
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-display font-bold text-navy leading-[1.1] text-[20px] line-clamp-2 min-w-0 m-0 [overflow-wrap:anywhere]">
                        {article.title}
                      </h3>
                      <p className="font-body text-ink text-xs leading-[1.6] mt-2 mb-3 line-clamp-3 min-w-0">
                        {article.excerpt}
                      </p>
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-text inline-flex items-center gap-1 self-start">
                        <span>Read</span>
                        <HoverArrow distance={4} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
