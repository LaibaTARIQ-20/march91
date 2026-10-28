import Image from "next/image";
import { cn } from "@/lib/cn";
import { showPlaceholders } from "@/lib/flags";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  aspect?: "cover" | "landscape" | "portrait" | "tall" | "video" | "wide";
  isPlaceholder?: boolean;
  photoCredit?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectMap = {
  cover: "aspect-[2/3]",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  video: "aspect-video",
  wide: "aspect-[16/10]",
};

/**
 * Image with configurable aspect ratio, placeholder treatment, and photo credit.
 * Rendered inside a <figure> element, with photoCredit as a <figcaption> below.
 */
export default function ResponsiveImage({
  src,
  alt,
  aspect = "landscape",
  isPlaceholder = false,
  photoCredit,
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ResponsiveImageProps) {
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <div className={cn("relative w-full", aspectMap[aspect])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            isPlaceholder && "placeholder-photo",
            imgClassName
          )}
        />
        {showPlaceholders && isPlaceholder && (
          <span className="absolute top-2 left-2 placeholder-badge z-10">
            PLACEHOLDER
          </span>
        )}
      </div>

      {photoCredit && (
        <figcaption className="font-heading text-xs text-muted mt-2">
          {photoCredit}
        </figcaption>
      )}
    </figure>
  );
}
