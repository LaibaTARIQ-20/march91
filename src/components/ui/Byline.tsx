import { cn } from "@/lib/cn";

type BylineProps = {
  author: string;
  className?: string;
};

/**
 * Author attribution line — uppercase sans-serif, muted color.
 */
export default function Byline({ author, className }: BylineProps) {
  return (
    <p
      className={cn(
        "font-heading text-xs uppercase tracking-[0.12em] text-muted",
        className
      )}
    >
      By {author}
    </p>
  );
}
