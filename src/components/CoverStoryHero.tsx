import Link from "next/link";
import type { Article } from "@/content/articles";

export default function CoverStoryHero({ article }: { article: Article }) {
  return (
    <div className="hero-rise-in grid md:grid-cols-[1fr_1.1fr] gap-0 md:gap-0 items-stretch border-b" style={{ borderColor: "var(--rule-soft)" }}>

      {/* ── Text side ── */}
      <div className="flex flex-col justify-center px-6 md:px-10 py-10 md:py-16 order-2 md:order-1 border-r" style={{ borderColor: "var(--rule-soft)" }}>
        <p
          className="text-[10px] tracking-[0.14em] mb-4 uppercase"
          style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
        >
          Cover Story
        </p>

        <Link href={`/${article.section}/${article.slug}`}>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 transition-opacity hover:opacity-75"
            style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
          >
            {article.title}
          </h1>
        </Link>

        <p
          className="text-sm md:text-base leading-relaxed mb-8 max-w-sm"
          style={{ color: "var(--text-body)" }}
        >
          {article.excerpt}
        </p>

        <Link
          href={`/${article.section}/${article.slug}`}
          className="self-start inline-block text-[11px] tracking-[0.12em] border-b pb-1 transition-opacity hover:opacity-60"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--navy)",
            borderColor: "var(--navy)",
          }}
        >
          READ THE STORY
        </Link>
      </div>

      {/* ── Image side ── */}
      <div className="order-1 md:order-2 relative overflow-hidden" style={{ minHeight: "480px" }}>
        {article.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.heroImage}
            alt={article.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
              article.isPlaceholderImage ? "placeholder-photo" : ""
            }`}
          />
        )}
        {article.isPlaceholderImage && (
          <span className="absolute top-3 left-3 placeholder-badge z-10">
            PLACEHOLDER — REPLACE WITH REAL PHOTO
          </span>
        )}
        {article.photoCredit && (
          <p
            className="absolute bottom-3 left-0 right-0 text-center text-[9px] tracking-[0.04em] z-10"
            style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.7)" }}
          >
            {article.photoCredit.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

