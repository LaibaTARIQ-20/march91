"use client";

import { useState } from "react";
import Image from "next/image";

type ReelCardProps = {
  url: string;
  poster: string;
  title: string;
};

export default function ReelCard({ url, poster, title }: ReelCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on Instagram: ${title}`}
      className="group w-full aspect-[9/16] relative overflow-hidden border border-line rounded-none bg-cream-dark block transition-transform duration-200 desk:hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
    >
      {!hasError ? (
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 640px) 192px, 224px"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-navy text-cream flex flex-col justify-end p-4">
          <span className="font-display text-[17px] leading-tight text-cream">
            {title}
          </span>
        </div>
      )}

      {/* Play icon: 48px circle, --color-navy background, cream arrow, centred over poster */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-cream shadow-none transition-transform duration-200 desk:group-hover:scale-110"
          aria-hidden="true"
        >
          <span className="text-[18px] ml-1 leading-none">&rarr;</span>
        </span>
      </div>
    </a>
  );
}
