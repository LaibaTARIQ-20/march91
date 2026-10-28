import Image from "next/image";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import ImageFrame from "@/components/ui/ImageFrame";
import ButtonLink from "@/components/ui/ButtonLink";
import { sectionLabel, type Section } from "@/content/sections";
import type { Article } from "@/types";

type FeatureSpreadProps = {
  article: Article;
};

export default function FeatureSpread({ article }: FeatureSpreadProps) {
  const sectionName = sectionLabel(article.section as Section);

  return (
    <section className="py-12 desk:pb-[120px]" aria-label="Feature spread">
      <Wrap>
        <div className="grid grid-cols-1 desk:grid-cols-[7fr_5fr] items-center gap-0">
          {/* Image 4:5 with clip reveal */}
          <Reveal variant="clip" className="w-full">
            <ImageFrame showChip={false} className="aspect-4/5 bg-cream-dark">
              {article.heroImage ? (
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 820px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : null}
            </ImageFrame>
          </Reveal>

          {/* Overlapping Text block slides in from 40px on the right */}
          <div className="bg-cream desk:-ml-[90px] desk:p-12 pt-8 pb-4 relative z-10 transition-all duration-700 ease-[var(--ease-out)]">
            <span className="kicker block mb-2">{sectionName} · Feature</span>
            <h2 className="font-display font-black text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.02em] my-6 text-navy">
              This happened. <em className="font-medium italic">We watched.</em> You&#8217;re reading.
            </h2>
            <ButtonLink
              href={`/${article.section}/${article.slug}`}
              variant="outline"
              tone="light"
              className="mt-2"
            >
              Read the story &rarr;
            </ButtonLink>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
