import Image from "next/image";
import ImageFrame from "@/components/ui/ImageFrame";
import { reviews } from "@/content/reviews";

/** First paragraph long enough to work as a teaser ("Inspiring." alone would not). */
function pickPreview(text: string[]): string {
  return text.find((paragraph) => paragraph.length > 120) ?? text[0] ?? "";
}

export default function ReviewList() {
  return (
    <div className="border-t border-line py-12">
      {/* Group heading and writer */}
      <div className="mb-10">
        <span className="kicker block">Film Dispatches</span>
        <h2 className="h2 mt-2 font-display font-black text-navy">
          Hadeed&#8217;s <em className="font-medium italic">Reviews</em>
        </h2>
        <span className="byline mt-1 block text-muted">By Hadeed Bashir</span>
      </div>

      {/* 2 columns from desk, 1 on mobile; items-start so only the opened card grows */}
      <div className="grid grid-cols-1 items-start gap-8 desk:grid-cols-2">
        {reviews.map((review) => (
          <details
            key={review.id}
            className="group/review border border-line/60 bg-cream p-6"
          >
            {/* Everything that must stay visible while closed lives in the summary */}
            <summary className="group/summary block cursor-pointer list-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
              <ImageFrame
                showChip={false}
                className="mb-5 aspect-2/3 border border-line/40 bg-cream-dark"
              >
                <Image
                  src={review.poster}
                  alt={`${review.title} poster`}
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className="object-cover"
                />
              </ImageFrame>

              <span className="kicker mb-1 block">Film Review</span>
              <h3 className="mb-3 font-display text-2xl font-bold text-navy">
                {review.title}
              </h3>

              <span className="mb-4 line-clamp-3 block font-body text-sm leading-relaxed text-ink group-open/review:hidden">
                {pickPreview(review.text)}
              </span>

              <span className="inline-flex w-fit items-center border border-navy px-6.5 py-3.5 font-body text-[11px] font-medium uppercase leading-none tracking-[0.16em] text-navy transition-colors duration-200 group-hover/summary:bg-navy group-hover/summary:text-cream">
                <span className="group-open/review:hidden">Read review +</span>
                <span className="hidden group-open/review:inline">Close review &minus;</span>
              </span>
            </summary>

            {/* Full text, shown only when opened */}
            <div className="article-text mt-6 space-y-4 border-t border-line/60 pt-6 font-body text-[1.0625rem] leading-[1.8] text-ink">
              {review.text.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}