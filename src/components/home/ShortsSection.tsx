import Image from "next/image";
import Wrap from "@/components/ui/Wrap";
import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/content/site-config";
import type { Short } from "@/types";

type ShortsSectionProps = {
  shorts: Short[];
  showPlaceholders: boolean;
};

export default function ShortsSection({ shorts, showPlaceholders }: ShortsSectionProps) {
  const count = shorts.length;

  if (count === 0 && !showPlaceholders) {
    return null;
  }

  // To ensure one set is wider than 2400px:
  // Each card is 220px + 20px gap = 240px pitch.
  // 11 cards = 2620px > 2400px.
  // If we have real shorts, repeat them until >= 11 cards; if placeholders, use 11 placeholder cards.
  const targetPerSet = 11;

  let baseSet: Array<{ id: string; title: string; href?: string; thumbnail?: string; isPlaceholder?: boolean }> = [];

  if (count > 0) {
    const repeatCount = Math.ceil(targetPerSet / count);
    for (let r = 0; r < repeatCount; r++) {
      shorts.forEach((s, idx) => {
        baseSet.push({
          id: `${s.id}-${r}-${idx}`,
          title: s.title,
          href: s.href,
          thumbnail: s.thumbnail,
          isPlaceholder: false,
        });
      });
    }
  } else {
    baseSet = Array.from({ length: targetPerSet }).map((_, idx) => ({
      id: `placeholder-${idx}`,
      title: "Coming soon",
      isPlaceholder: true,
    }));
  }

  const renderCard = (
    item: { id: string; title: string; href?: string; thumbnail?: string; isPlaceholder?: boolean },
    keyPrefix: string,
    isAriaHidden = false
  ) => {
    if (item.isPlaceholder) {
      return (
        <div
          key={`${keyPrefix}-${item.id}`}
          className="w-[220px] aspect-[9/16] border border-line flex flex-col justify-between p-5 bg-cream/40 shrink-0 select-none"
          tabIndex={isAriaHidden ? -1 : undefined}
        >
          <span className="text-[18px] text-navy/40 leading-none">▶</span>
          <span className="font-display text-[19px] text-muted leading-tight">
            {item.title}
          </span>
        </div>
      );
    }

    return (
      <a
        key={`${keyPrefix}-${item.id}`}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isAriaHidden ? -1 : undefined}
        className="w-[220px] aspect-[9/16] relative overflow-hidden flex flex-col justify-between p-4 group bg-cream shrink-0 border border-line"
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="220px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent pointer-events-none" />
        <span
          className="relative z-10 text-[18px] text-cream leading-none"
          aria-hidden="true"
        >
          ▶
        </span>
        <span className="relative z-10 font-display text-[19px] leading-[1.15] text-cream">
          {item.title}
        </span>
      </a>
    );
  };

  return (
    <section className="bg-cream-dark py-[90px] overflow-hidden" aria-label="March '91 Shorts">
      {/* Header row */}
      <Wrap>
        <div className="flex justify-between items-end mb-9">
          <h2 className="h2 font-display font-black text-navy">
            March &#8217;91 <em className="font-medium italic">Shorts</em>
          </h2>
          <ButtonLink
            href={siteConfig.instagramUrl}
            external
            variant="outline"
            tone="light"
          >
            Follow on Instagram &rarr;
          </ButtonLink>
        </div>
      </Wrap>

      {/* Row of marquee cards */}
      <div className="w-full overflow-hidden pb-2.5">
        <div className="shm flex gap-5 w-max hover:[animation-play-state:paused]">
          {/* First set of cards */}
          <div className="flex gap-5 shrink-0">
            {baseSet.map((item) => renderCard(item, "set1", false))}
          </div>

          {/* Second duplicate set of cards */}
          <div className="flex gap-5 shrink-0" aria-hidden="true">
            {baseSet.map((item) => renderCard(item, "set2", true))}
          </div>
        </div>
      </div>
    </section>
  );
}
