import Wrap from "@/components/ui/Wrap";
import ButtonLink from "@/components/ui/ButtonLink";
import ReelCard from "@/components/ui/ReelCard";
import { siteConfig } from "@/content/site-config";
import reelsData from "@/data/reels.json";
import type { Short } from "@/types";

type ShortsSectionProps = {
  shorts?: Short[];
  showPlaceholders?: boolean;
};

export default function ShortsSection({}: ShortsSectionProps) {
  // Render the 8 most recent reels
  const recentReels = reelsData.slice(0, 8);

  return (
    <section className="bg-cream-dark py-16 desk:py-24 overflow-hidden" aria-label="March '91 Shorts">
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

        {/* Horizontal row of cards: scrolls inside its container on mobile, w-48 on mobile, w-56 from sm up */}
        <div className="w-full overflow-x-auto no-scrollbar pb-4 pt-1">
          <div className="flex gap-4 w-max min-w-full">
            {recentReels.map((reel) => (
              <div
                key={reel.url}
                className="w-48 sm:w-56 shrink-0"
              >
                <ReelCard
                  url={reel.url}
                  poster={reel.poster}
                  title={reel.title}
                />
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
