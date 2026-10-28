"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sections } from "@/content/sections";
import { articles } from "@/content/articles";
import Container from "@/components/layout/Container";

export default function InThisIssueContents() {
  // Map each section to its premier lead article
  const contentsList = sections.map((sec, idx) => {
    const leadArticle =
      articles.find((a) => a.section === sec.slug && a.isFeatured) ??
      articles.find((a) => a.section === sec.slug) ??
      articles[0];

    return {
      index: `0${idx + 1}`,
      sectionSlug: sec.slug,
      sectionLabel: sec.label,
      article: leadArticle,
    };
  });

  const [activeItem, setActiveItem] = useState(contentsList[0]);

  return (
    <section
      aria-label="Magazine Contents"
      className="py-16 sm:py-20 lg:py-24 bg-cream rule-b overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Title & Editorial Manifesto */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch lg:pr-8 lg:rule-r">
            <div>
              <span className="editorial-kicker block mb-2">Issue No. 1 Index</span>
              <h2 className="font-section-title text-navy">
                In This <span className="italic font-normal">Issue</span>
              </h2>
              <p className="font-body text-base text-navy/75 italic mt-4 leading-relaxed">
                A survey of campus life, athletic arenas, startup hustle, and cultural debates across NUST Islamabad.
              </p>
            </div>

            {/* Dynamic Hover Image Preview (Desktop) */}
            <div className="hidden lg:block mt-8 pt-8 rule-t">
              <span className="editorial-kicker block mb-3">
                Viewing: {activeItem.sectionLabel}
              </span>
              <div className="relative aspect-[4/3] w-full rule-all bg-cream-dark overflow-hidden img-zoom">
                {activeItem.article.heroImage && (
                  <Image
                    key={activeItem.article.slug}
                    src={activeItem.article.heroImage}
                    alt={activeItem.article.title}
                    fill
                    className="object-cover fade-in"
                    sizes="380px"
                  />
                )}
              </div>
              <p className="font-display text-sm text-navy mt-3 line-clamp-1 font-medium">
                {activeItem.article.title}
              </p>
            </div>
          </div>

          {/* Right Column: Numbered Magazine Contents List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-line">
            {contentsList.map((item) => (
              <div
                key={item.index}
                onMouseEnter={() => setActiveItem(item)}
                className="group py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 transition-colors hover:bg-cream-light/60 px-2 sm:px-4 -mx-2 sm:-mx-4"
              >
                {/* Outlined Print Numeral */}
                <span className="outline-num shrink-0 w-20 sm:w-28 text-left">
                  {item.index}
                </span>

                {/* Section & Article Headline */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="editorial-kicker text-gold-text">
                      {item.sectionLabel}
                    </span>
                    <span className="text-navy/20">&middot;</span>
                    {item.article.readTime && (
                      <span className="font-heading text-[0.65rem] text-navy/50 tracking-wider">
                        {item.article.readTime}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/${item.sectionSlug}/${item.article.slug}`}
                    className="block group-hover:text-gold-text transition-colors mt-1"
                  >
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-tight text-navy">
                      {item.article.title}
                    </h3>
                  </Link>

                  <p className="font-body text-xs sm:text-sm text-navy/70 line-clamp-1 italic mt-1.5">
                    {item.article.excerpt}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="sm:shrink-0 self-end sm:self-center pt-2 sm:pt-0">
                  <Link
                    href={`/${item.sectionSlug}/${item.article.slug}`}
                    className="editorial-pill text-[0.65rem] py-1.5 px-3.5 group-hover:bg-navy group-hover:text-cream transition-colors"
                  >
                    Read
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
