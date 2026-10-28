import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Section heading (.h2): Playfair 900, clamp(40px,5vw,72px), line-height 1,
 * tracking -.02em, navy. Wrap one word in <em> for italic 500 gold-text accent.
 */
export default function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "h2 [&_em]:not-italic [&_em]:font-[500] [&_em]:italic [&_em]:text-gold-text",
        className
      )}
    >
      {children}
    </h2>
  );
}

