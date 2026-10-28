import Image from "next/image";
import { reviews } from "@/content/reviews";

export default function ReviewList() {
  return (
    <div className="py-12 border-t border-line">
      <div className="mb-8">
        <span className="kicker block">Film Dispatches</span>
        <h2 className="h2 font-display font-[900] text-navy mt-2">
          Hadeed&#8217;s <em className="font-medium italic">Reviews</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 desk:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="border border-line/60 bg-cream p-6 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[2/3] bg-cream-dark overflow-hidden mb-5 border border-line/40">
                <Image
                  src={review.poster}
                  alt={review.title}
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <span className="kicker block mb-1">Film Review</span>
              <h3 className="font-display font-bold text-2xl text-navy mb-2">
                {review.title}
              </h3>
              <span className="byline block text-muted mb-4">
                By {review.writer}
              </span>

              <div className="font-body text-ink text-sm leading-relaxed space-y-3">
                {review.text.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
