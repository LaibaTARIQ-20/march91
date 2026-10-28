import Image from "next/image";
import Link from "next/link";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";

type KeepReadingProps = {
  articles: Article[];
  currentSection: string;
};

export default function KeepReading({ articles, currentSection }: KeepReadingProps) {
  if (articles.length === 0) return null;

  const label = sectionLabel(currentSection as Section);

  return (
    <div className="mt-20 pt-12 border-t border-line">
      <div className="mb-8">
        <span className="kicker block">Keep Reading</span>
        <h2 className="h2 font-display font-[900] text-navy mt-1">
          More from <em className="font-medium italic">{label}</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 desk:grid-cols-3 gap-8">
        {articles.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.section}/${item.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] bg-cream-dark overflow-hidden w-full border border-line/40">
              {item.heroImage ? (
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display italic text-navy/40">
                    {sectionLabel(item.section as Section)}
                  </span>
                </div>
              )}
            </div>
            <span className="kicker block mt-3">
              {sectionLabel(item.section as Section)}
            </span>
            <h3 className="font-display font-bold text-xl text-navy my-1.5 group-hover:text-gold-text transition-colors">
              {item.title}
            </h3>
            {item.author ? (
              <span className="byline block text-muted">
                By {item.author}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
