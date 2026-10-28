import { cn } from "@/lib/cn";

type ImageFrameProps = {
  children: React.ReactNode;
  className?: string;
  showChip?: boolean;
};

/**
 * ImageFrame: overflow-hidden wrapper that scales its image 1.0 to 1.05 on hover (700ms)
 * and keeps the aspect ratio. Optional "Read →" chip (cream bg, navy text, 11px uppercase)
 * slides up from below the image's bottom-left on hover (translateY(100%) to 0).
 */
export default function ImageFrame({
  children,
  className,
  showChip = true,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full group/frame",
        "[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[var(--ease-out)]",
        "@media(hover:hover):group-hover:[&_img]:scale-105 @media(hover:hover):group-hover/frame:[&_img]:scale-105",
        "motion-reduce:[&_img]:transform-none",
        className
      )}
    >
      {children}
      {showChip && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 left-0 z-20 bg-cream text-navy font-body text-[11px] font-medium uppercase tracking-[0.16em] px-3 py-1.5 leading-none select-none pointer-events-none",
            "transition-transform duration-300 ease-[var(--ease-out)]",
            "translate-y-full @media(hover:hover):group-hover:translate-y-0 @media(hover:hover):group-hover/frame:translate-y-0",
            "motion-reduce:hidden"
          )}
        >
          Read &rarr;
        </div>
      )}
    </div>
  );
}
