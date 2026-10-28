"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import type { Article } from "@/types";

type CampusWireTickerProps = {
  articles: Article[];
};

export default function CampusWireTicker({ articles }: CampusWireTickerProps) {
  const callForArticles = siteConfig.callForArticles;

  return (
    <div
      aria-label="Campus Wire Ticker"
      className="bg-navy text-cream overflow-hidden py-[15px] text-xs uppercase tracking-[0.12em] font-body"
    >
      <div className="mq flex gap-14 whitespace-nowrap w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {/* First Copy */}
        <div className="flex items-center gap-14 shrink-0">
          {/* Label: Start the day here in cream with a small gold square */}
          <span className="inline-flex items-center gap-2 text-cream font-medium tracking-[0.14em]">
            <span className="w-1.5 h-1.5 bg-gold shrink-0 inline-block" aria-hidden="true" />
            Start the day here
          </span>

          {/* Call for articles */}
          {callForArticles && (
            <Link
              href={callForArticles.href}
              className="text-cream link-sweep inline-block"
            >
              {callForArticles.text}
            </Link>
          )}

          {/* Article titles */}
          {articles.map((item) => (
            <Link
              key={`a1-${item.slug}`}
              href={`/${item.section}/${item.slug}`}
              className="text-cream link-sweep inline-block"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Second Copy (for seamless continuous loop) */}
        <div className="flex items-center gap-14 shrink-0" aria-hidden="true">
          <span className="inline-flex items-center gap-2 text-cream font-medium tracking-[0.14em]">
            <span className="w-1.5 h-1.5 bg-gold shrink-0 inline-block" />
            Start the day here
          </span>

          {callForArticles && (
            <Link
              href={callForArticles.href}
              tabIndex={-1}
              className="text-cream link-sweep inline-block"
            >
              {callForArticles.text}
            </Link>
          )}

          {articles.map((item) => (
            <Link
              key={`a2-${item.slug}`}
              href={`/${item.section}/${item.slug}`}
              tabIndex={-1}
              className="text-cream link-sweep inline-block"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
