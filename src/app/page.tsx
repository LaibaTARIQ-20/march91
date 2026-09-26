import CoverStoryHero from "@/components/CoverStoryHero";
import {
  ArticleCard,
  InterviewBlock,
  NotePanel,
} from "@/components/ArticleCard";
import { getCoverStory, getFeaturedGrid } from "@/content/articles";
import { siteConfig } from "@/content/site-config";

export default function Home() {
  const cover = getCoverStory();
  const grid = getFeaturedGrid();
  const [featuredStory, ...secondary] = grid;

  return (
    <div>
      {/* ── Cover story hero ── */}
      <CoverStoryHero article={cover} />

      {/* ── Interview block ── */}
      <div className="h-px" style={{ background: "var(--rule-soft)" }} />
      <InterviewBlock />

      {/* ── Featured story ── */}
      {featuredStory && (
        <>
          <div className="h-px" style={{ background: "var(--rule)" }} />
          <div
            className="px-6 md:px-10 py-10 md:py-12 border-b"
            style={{ borderColor: "var(--rule-soft)" }}
          >
            <ArticleCard article={featuredStory} size="featured" />
          </div>
        </>
      )}

      {/* ── Secondary articles grid ── */}
      <div className="h-px" style={{ background: "var(--rule-soft)" }} />
      <div
        className="gap-x-6 gap-y-10 px-6 md:px-10 py-10 md:py-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        {secondary.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* ── Editor note ── */}
      <div className="h-px" style={{ background: "var(--rule)" }} />
      <NotePanel
        eyebrow="A NOTE FROM THE EDITOR IN CHIEF"
        quote={siteConfig.editorNote}
        attribution={siteConfig.editorAttribution}
      />

      {/* ── Director note ── */}
      <div className="h-px" style={{ background: "var(--rule-soft)" }} />
      <NotePanel
        eyebrow="A NOTE FROM THE MARCOMS DIRECTOR"
        quote={siteConfig.directorNote}
        attribution={siteConfig.directorAttribution}
      />
    </div>
  );
}

