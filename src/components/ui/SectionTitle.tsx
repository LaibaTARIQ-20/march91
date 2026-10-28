import Link from "next/link";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  title: string;
  href?: string;
  className?: string;
};

/**
 * Centered section title — flex row with a hairline on each side.
 */
export default function SectionTitle({ title, href, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center my-8", className)}>
      <div className="h-px flex-1 bg-line" />
      <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] px-4 text-navy text-center">
        {href ? (
          <Link href={href} className="hover:underline underline-offset-4">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
