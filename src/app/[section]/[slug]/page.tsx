import { notFound } from "next/navigation";
import { articles, getArticleBySlug, sectionLabels } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ section: a.section, slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="px-5 md:px-10 py-10 md:py-14 max-w-2xl mx-auto">
      <p
        className="text-[10px] tracking-[0.12em] mb-3"
        style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
      >
        {sectionLabels[article.section].toUpperCase()}
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold leading-tight mb-4"
        style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
      >
        {article.title}
      </h1>
      <p
        className="text-xs mb-8"
        style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}
      >
        By {article.author}
      </p>

      {(article.articleImage ?? article.heroImage) && (
        <div className="relative aspect-16/10 overflow-hidden mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.articleImage ?? article.heroImage ?? undefined}
            alt={article.title}
            className={`w-full h-full object-cover ${article.isPlaceholderImage ? "placeholder-photo" : ""
              }`}
          />
          {article.isPlaceholderImage && (
            <span className="absolute top-3 left-3 placeholder-badge">
              PLACEHOLDER — REPLACE WITH REAL PHOTO
            </span>
          )}
        </div>
      )}
      {article.photoCredit && (
        <p
          className="text-[9px] tracking-[0.04em] mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-faint)" }}
        >
          {article.photoCredit.toUpperCase()}
        </p>
      )}
      {!article.photoCredit && article.heroImage && <div className="mb-10" />}

      <div
        className="space-y-5 text-base leading-relaxed"
        style={{ fontFamily: "var(--font-body)", color: "var(--text-body)" }}
      >
        {article.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
