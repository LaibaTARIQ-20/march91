import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, getArticlesBySection } from "@/lib/articles";
import { isSection, sectionLabel } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Byline from "@/components/ui/Byline";
import Rubric from "@/components/ui/Rubric";
import Container from "@/components/layout/Container";
import ArticleBody from "@/components/article/ArticleBody";
import RelatedArticles from "@/components/article/RelatedArticles";
import ShareButtons from "@/components/article/ShareButtons";
import type { Section } from "@/types";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ section: a.section, slug: a.slug }));
}

type Props = { params: Promise<{ section: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const article = await getArticle(section, slug);
  if (!article) return {};

  const image = article.articleImage ?? article.heroImage;
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: image
      ? { images: [{ url: image }] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { section, slug } = await params;

  if (!isSection(section)) {
    notFound();
  }

  const article = await getArticle(section, slug);

  if (!article) {
    notFound();
  }

  const displayImage = article.articleImage ?? article.heroImage;
  const label = sectionLabel(article.section as Section);
  const allSectionArticles = await getArticlesBySection(article.section as Section);
  const related = allSectionArticles.filter((a) => a.slug !== article.slug);
  const shareUrl = `${siteConfig.siteUrl}/${article.section}/${article.slug}`;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Container className="py-10 md:py-16">
      <article>
        {/* Centered header */}
        <header className="max-w-3xl mx-auto text-center mb-10 space-y-4">
          <Rubric label={label} href={`/${article.section}`} />
          <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight text-navy">
            {article.title}
          </h1>
          <p className="font-body text-lg text-ink leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {article.author && <Byline author={article.author} />}
            {article.author && formattedDate && (
              <span className="text-muted text-xs">&middot;</span>
            )}
            {formattedDate && (
              <time
                dateTime={article.publishedAt}
                className="font-heading text-xs uppercase tracking-[0.12em] text-muted"
              >
                {formattedDate}
              </time>
            )}
          </div>
        </header>

        {/* Lead Image */}
        {displayImage && (
          <div className="max-w-5xl mx-auto my-10">
            <ResponsiveImage
              src={displayImage}
              alt={article.title}
              aspect={article.heroAspect ?? "wide"}
              isPlaceholder={article.isPlaceholderImage}
              photoCredit={article.photoCredit}
              sizes="(max-width: 1280px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <ArticleBody body={article.body} />

        {/* Glossary Aside */}
        {article.glossary && article.glossary.length > 0 && (
          <aside className="max-w-2xl mx-auto my-8 p-6 border border-line bg-cream">
            <h2 className="font-heading uppercase text-xs text-gold-text tracking-[0.14em] font-semibold mb-4">
              Terms
            </h2>
            <dl className="divide-y divide-line">
              {article.glossary.map((item, idx) => (
                <div key={idx} className={idx === 0 ? "pb-3" : "py-3"}>
                  <dt className="font-display font-bold text-navy text-base mb-1">
                    {item.term}
                  </dt>
                  <dd className="font-body text-ink text-sm leading-relaxed m-0">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        )}

        {/* Share buttons */}
        <div className="max-w-2xl mx-auto">
          <ShareButtons url={shareUrl} />
        </div>

        {/* Related articles */}
        <RelatedArticles articles={related} sectionName={label} />
      </article>
    </Container>
  );
}
