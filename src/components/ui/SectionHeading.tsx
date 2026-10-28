import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/**
 * Section heading (.h2): Playfair 900, clamp(40px,5vw,72px), line-height 1,
 * tracking -.02em, navy. Wrap one word in <em> for italic 500 accent.
 * Revealed with mask transition line-by-line.
 */
export default function SectionHeading({
  children,
  className,
  as: Component = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal variant="mask">
      <Component
        className={cn(
          "h2 [&_em]:italic [&_em]:font-medium",
          className
        )}
      >
        {children}
      </Component>
    </Reveal>
  );
}
