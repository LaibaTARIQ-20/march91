import Link from "next/link";
import type { Article } from "@/content/articles";
import { sectionLabels } from "@/content/articles";

export function ArticleCard({
  article,
  size = "grid",
}: {
  article: Article;
  size?: "grid" | "featured";
}) {
  const isFeatured = size === "featured";
  return (
    <Link href={`/${article.section}/${article.slug}`} className="group block">
      {article.heroImage && (
        <div
          className={`relative overflow-hidden mb-3 ${isFeatured ? "aspect-video" : "aspect-4/3"
            }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.isPlaceholderImage && (
            <span className="absolute top-2 left-2 placeholder-badge">
              PLACEHOLDER
            </span>
          )}
        </div>
      )}
      <p
        className={`text-[9px] tracking-widest mb-1 ${isFeatured ? "" : "text-center"
          }`}
        style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
      >
        {sectionLabels[article.section].toUpperCase()}
      </p>
      <h3
        className={`font-bold leading-snug mb-1 transition-opacity group-hover:opacity-70 ${isFeatured ? "text-2xl" : "text-base text-center"
          }`}
        style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
      >
        {article.title}
      </h3>
      <p
        className={isFeatured ? "text-sm" : "text-[12px] text-center"}
        style={{ color: "var(--text-muted)" }}
      >
        {article.excerpt}
      </p>
    </Link>
  );
}

export function InterviewBlock() {
  return (
    <div className="px-6 md:px-10 py-10 md:py-14">
      {/* Video well */}
      <div className="relative mb-6 max-w-3xl mx-auto aspect-video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/JzuTcapa4C4?autoplay=1&mute=1&si=IjLGABMiU0WCmzwQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="border"
          style={{ borderColor: "var(--navy)" }}
        ></iframe>
      </div>

      {/* Label + headline */}
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-[10px] tracking-[0.14em] mb-2 uppercase"
          style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
        >
          The Interview
        </p>
        <p
          className="text-lg md:text-xl font-bold leading-snug"
          style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
        >
          In conversation with this issue&apos;s cover subjects, plus the quotes
          that didn&apos;t make the cut
        </p>
      </div>
    </div>
  );
}

export function NotePanel({
  eyebrow,
  quote,
  attribution,
}: {
  eyebrow: string;
  quote: string;
  attribution: string;
}) {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 md:py-14 text-center">
      <p
        className="text-[10px] tracking-[0.14em] mb-4 uppercase"
        style={{ fontFamily: "var(--font-heading)", color: "var(--navy)" }}
      >
        {eyebrow}
      </p>
      <p
        className="text-xl md:text-2xl italic leading-relaxed mb-4 max-w-2xl mx-auto"
        style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p
        className="text-[11px] tracking-[0.06em]"
        style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}
      >
        {attribution}
      </p>
    </div>
  );
}
