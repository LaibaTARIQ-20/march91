import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { heroSlides } from "@/content/hero-slides";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/content/site-config";
import Wrap from "@/components/ui/Wrap";
import ButtonLink from "@/components/ui/ButtonLink";
import ImageFrame from "@/components/ui/ImageFrame";

export const metadata: Metadata = {
  title: "Archive",
  description: "Explore all stories published in March '91 by section.",
};

export default async function ArchivePage() {
  const articles = await getAllArticles();
  const coverSlide = heroSlides[0];

  return (
    <div className="py-12 desk:py-20">
      <Wrap className="space-y-16">
        <div className="border-b border-line pb-6">
          <span className="kicker block mb-2">{siteConfig.credit}</span>
          <h1 className="h2 font-display font-black text-navy">
            Archive
          </h1>
        </div>

        {/* ── Issue No. 1 large cover tile ── */}
        <div className="bg-navy text-cream grid grid-cols-1 desk:grid-cols-[1fr_1.2fr] items-center overflow-hidden border border-line">
          <div className="relative aspect-4/5 bg-navy w-full flex items-center justify-center p-6">
            {coverSlide?.image ? (
              <Image
                src={coverSlide.image}
                alt="March '91 Issue No. 1 Cover"
                fill
                sizes="(max-width: 820px) 100vw, 45vw"
                className="object-contain p-4"
              />
            ) : null}
          </div>

          <div className="p-8 sm:p-12 desk:p-16">
            <span className="kicker text-gold block mb-2">Inaugural Edition</span>
            <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] leading-none text-cream mb-4">
              {siteConfig.issueLabel}
            </h2>
            <p className="font-body text-cream-dark text-lg mb-8 leading-relaxed">
              {articles.length} stories across {sections.length} sections documenting student life, culture, enterprise, and opinion at NUST Islamabad.
            </p>
            <div>
              <ButtonLink href="/" variant="solid" tone="dark">
                View current issue &rarr;
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* ── All Stories by Section ── */}
        <div className="space-y-16 pt-8">
          {sections.map((section) => {
            const sectionArticles = articles.filter((a) => a.section === section.slug);
            if (sectionArticles.length === 0) return null;

            return (
              <section key={section.slug} className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-line pb-3">
                  <h3 className="font-display font-bold text-2xl desk:text-3xl text-navy">
                    <Link href={`/${section.slug}`} className="hover:text-gold-text transition-colors">
                      {section.label}
                    </Link>
                  </h3>
                  <Link href={`/${section.slug}`} className="kicker text-gold-text hover:underline">
                    View section &rarr;
                  </Link>
                </div>

                <div className="flex flex-wrap gap-8">
                  {sectionArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/${article.section}/${article.slug}`}
                      className="group grow basis-full sm:basis-[calc(50%-1rem)] desk:basis-[calc(33.333%-1.34rem)] flex flex-col border border-line/40 p-4 bg-cream hover:bg-cream-dark transition-colors"
                    >
                      <ImageFrame className="w-full h-65 desk:h-80 bg-cream-dark mb-3 border border-line/20">
                        {article.heroImage ? (
                          <Image
                            src={article.heroImage}
                            alt={article.title}
                            fill
                            sizes="(max-width: 820px) 100vw, 33vw"
                            className="object-cover"
                            style={
                              article.heroPosition
                                ? { objectPosition: article.heroPosition }
                                : undefined
                            }
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-display italic text-xs text-navy/40">
                              {section.label}
                            </span>
                          </div>
                        )}
                      </ImageFrame>
                      <h4 className="font-display font-bold text-base text-navy line-clamp-2 link-sweep inline-block group-hover:text-navy transition-colors mb-1">
                        {article.title}
                      </h4>
                      {article.author ? (
                        <span className="byline block text-muted text-[10px] mt-auto">
                          By {article.author}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Wrap>
    </div>
  );
}