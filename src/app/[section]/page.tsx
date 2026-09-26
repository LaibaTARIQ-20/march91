import { notFound } from "next/navigation";
import {
  getArticlesBySection,
  sectionLabels,
  type Section,
} from "@/content/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { siteConfig } from "@/content/site-config";

const validSections = Object.keys(sectionLabels) as Section[];

export function generateStaticParams() {
  return validSections.map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!validSections.includes(section as Section)) {
    notFound();
  }

  const typedSection = section as Section;
  const articles = getArticlesBySection(typedSection);

  return (
    <div className="px-5 md:px-10 py-10 md:py-14">
      <h1
        className="text-4xl md:text-5xl font-bold mb-10 pb-6 border-b text-center"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--navy)",
          borderColor: "var(--rule)",
        }}
      >
        {sectionLabels[typedSection]}
      </h1>

      {articles.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Articles for this section are on the way.
        </p>
      ) : (
        <div
          className="gap-x-8 gap-y-12 mb-10"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      {typedSection === "opinion" && (
        <div
          className="p-6 border text-center max-w-xl mx-auto"
          style={{ borderColor: "var(--gold)" }}
        >
          <p
            className="text-base font-bold mb-2"
            style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
          >
            Send in your word
          </p>
          <p className="text-xs text-(--text-muted)">
            Have an opinion piece?{" "}
            <a
              href={`mailto:${siteConfig.magazineEmail}`}
              className="underline text-(--navy)"
            >
              Email your article
            </a>{" "}
            to the magazine for a chance to be featured.
          </p>
        </div>
      )}
    </div>
  );
}