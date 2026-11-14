import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, getArticlesBySection } from "@/lib/articles";
import { isSection } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import { videos } from "@/content/videos";
import { getReadingTime } from "@/lib/reading-time";
import Wrap from "@/components/ui/Wrap";
import ReadingProgress from "@/components/article/ReadingProgress";
import ArticleHero from "@/components/article/ArticleHero";
import KeepReading from "@/components/article/KeepReading";
import VideoPlayer from "@/components/ui/VideoPlayer";
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
    openGraph: image ? { images: [{ url: image }] } : undefined,
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
  const readingTime = getReadingTime(article.body);

  // Associated video if videoId matches
  const associatedVideo = article.videoId
    ? videos.find((v) => v.id === article.videoId)
    : undefined;

  // "Keep reading" with up to 3 other articles from same section (fallback: latest articles)
  const allSectionArticles = await getArticlesBySection(article.section as Section);
  let keepReading = allSectionArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  if (keepReading.length === 0) {
    const allArticles = await getAllArticles();
    keepReading = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  }

  const shareUrl = `${siteConfig.siteUrl}/${article.section}/${article.slug}`;

  return (
    <div className="py-16 desk:py-24">
      <ReadingProgress />

      <Wrap>
        {/* ── HERO ── */}
        <ArticleHero
          article={article}
          displayImage={displayImage}
          readingTime={readingTime}
        />

        {/* ── Video Player (under title/hero if videoId exists) ── */}
        {associatedVideo ? (
          <div className="max-w-[680px] mx-auto mb-10">
            <VideoPlayer
              poster={associatedVideo.poster}
              title={associatedVideo.title}
              src={associatedVideo.src}
              youtubeId={associatedVideo.youtubeId}
            />
          </div>
        ) : null}

        {/* ── Reading Column: max 65ch on desktop, font-body 1.125rem, line-height 1.6 ── */}
        <div className="max-w-[65ch] mx-auto">
          <div className="article-text space-y-4 text-[1.125rem] leading-[1.6] font-body text-ink">
            {article.body.map((para, idx) => {
              const isFirst = idx === 0;
              return (
                <p key={idx} className={isFirst ? "drop-cap" : ""}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* Wide Pull Quote if exists */}
          {article.pullQuote ? (
            <figure className="my-12 py-8 border-y border-line text-center">
              <blockquote className="font-display italic font-[500] text-[28px] desk:text-[34px] leading-[1.2] text-navy">
                &ldquo;{article.pullQuote}&rdquo;
              </blockquote>
            </figure>
          ) : null}

          {/* Glossary Aside if exists */}
          {article.glossary && article.glossary.length > 0 && (
            <aside className="my-10 p-6 border border-line bg-cream">
              <h2 className="kicker text-gold-text mb-4">Terms</h2>
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

          {/* Author line at the end */}
          {article.author ? (
            <div className="mt-12 pt-6 border-t border-line">
              <p className="font-display italic text-lg text-navy">
                Words by <span className="font-bold not-italic">{article.author}</span>
              </p>
            </div>
          ) : null}

          {/* Share buttons */}
          <div className="my-8">
            <ShareButtons url={shareUrl} />
          </div>
        </div>

        {/* ── "Keep reading" section ── */}
        <KeepReading articles={keepReading} currentSection={article.section} />
      </Wrap>
    </div>
  );
}
