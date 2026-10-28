import { cn } from "@/lib/cn";

type HoverArrowProps = {
  className?: string;
  distance?: number;
};

/**
 * Inline arrow that moves 6px right on hover of its parent (group).
 * Motion disabled under prefers-reduced-motion.
 */
export default function HoverArrow({ className, distance = 6 }: HoverArrowProps) {
  return (
    <span
      aria-hidden="true"
      style={{ "--hover-arrow-dist": `${distance}px` } as React.CSSProperties}
      className={cn(
        "inline-block transition-transform duration-250 motion-reduce:transform-none @media(hover:hover):group-hover:translate-x-[var(--hover-arrow-dist)]",
        className
      )}
    >
      &rarr;
    </span>
  );
}
