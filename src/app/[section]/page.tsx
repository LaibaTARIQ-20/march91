import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import { notFound } from "next/navigation";
import { sections, isSection, sectionLabel } from "@/content/sections";
import SectionLayout from "@/components/article/SectionLayout";
import ReviewList from "@/components/article/ReviewList";
import Wrap from "@/components/ui/Wrap";
import { getArticlesBySection } from "@/lib/articles";
import { siteConfig } from "@/content/site-config";
import type { Section } from "@/types";

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  const label = sectionLabel(section as Section);
  return {
    title: label,
    description: `${label} — ${siteConfig.issueLabel}`,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;

  if (!isSection(section)) {
    notFound();
  }

  const typedSection = section as Section;
  const articles = await getArticlesBySection(typedSection);
  const label = sectionLabel(typedSection);

  // Section index formatted as 01 to 06
  const sectionIndex = sections.findIndex((s) => s.slug === typedSection) + 1;
  const formattedIndex = sectionIndex < 10 ? `0${sectionIndex}` : `${sectionIndex}`;

  return (
    <div className="py-16 desk:py-24">
      <Wrap>
        {/* ── Masthead block ── */}
        <div className="flex justify-between items-baseline border-b border-line pb-6 mb-10">
          <div>
            <span className="kicker block mb-2">{siteConfig.issueLabel}</span>
            <h1 className="font-display font-[900] text-[clamp(44px,6vw,88px)] leading-none text-navy tracking-[-0.02em]">
              {label}
            </h1>
          </div>

          {/* Section Number in outlined numerals */}
          <span className="num hidden sm:block select-none" aria-hidden="true">
            {formattedIndex}
          </span>
        </div>

        {/* ── Dynamic Layout by article count ── */}
        <SectionLayout articles={articles} />

        {/* ── NUST Box'd: include the reviews group ── */}
        {typedSection === "nust-boxd" && <ReviewList />}

        {/* ── Opinion: Full-width band for "Send in your word" ── */}
        {typedSection === "opinion" && (
          <div className="mt-16 bg-navy text-cream p-8 sm:p-12 text-center flex flex-col items-center">
            <span className="kicker text-gold block mb-2">Campus Commentary</span>
            <h2 className="font-display font-bold text-3xl desk:text-4xl text-cream mb-3">
              Send in your word
            </h2>
            <p className="font-body text-cream-dark text-base max-w-lg mb-8 leading-relaxed">
              Have an opinion piece or commentary to share with campus?
            </p>
            <ButtonLink
              href="/send-your-word"
              variant="outline"
              tone="dark"
            >
              Submit your article &rarr;
            </ButtonLink>
          </div>
        )}
      </Wrap>
    </div>
  );
}
