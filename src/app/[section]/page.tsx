import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, isSection, sectionLabel } from "@/content/sections";
import ArticleGrid from "@/components/article/ArticleGrid";
import Divider from "@/components/ui/Divider";
import Container from "@/components/layout/Container";
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

  return (
    <Container className="py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
          {label}
        </h1>
        <Divider />
      </div>

      {articles.length === 0 ? (
        <p className="font-heading text-sm text-muted text-center py-12">
          Articles for this section are on the way.
        </p>
      ) : (
        <ArticleGrid articles={articles} columns={3} />
      )}

      {typedSection === "opinion" && (
        <div className="p-8 border border-gold text-center max-w-xl mx-auto my-12 space-y-3">
          <p className="font-display text-lg font-bold text-navy">
            Send in your word
          </p>
          <p className="font-heading text-xs text-muted">
            Have an opinion piece or commentary to share with campus?
          </p>
          <Link
            href="/send-your-word"
            className="inline-block font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy underline underline-offset-4 hover:opacity-80"
          >
            Submit your article &rarr;
          </Link>
        </div>
      )}
    </Container>
  );
}