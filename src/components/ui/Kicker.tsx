import Link from "next/link";
import { cn } from "@/lib/cn";

type KickerProps = {
  label: string;
  href?: string;
  className?: string;
};

/**
 * Category kicker — Lexend 500, 11px, uppercase, tracking .14em, gold-text.
 * Optionally wraps in a link.
 * Previously named Rubric; import from either path.
 */
export default function Kicker({ label, href, className }: KickerProps) {
  const styles = cn("kicker inline-block", className);

  if (href) {
    return (
      <Link href={href} className={cn(styles, "hover:opacity-75 transition-opacity")}>
        {label}
      </Link>
    );
  }

  return <p className={styles}>{label}</p>;
}

