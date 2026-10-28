import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
  external?: boolean;
};

/**
 * Spec button: 1px navy border, 14px 26px padding, 11px uppercase tracking .16em, weight 500.
 * - outline: transparent bg, navy text → navy fill cream text on hover.
 * - solid: navy fill, cream text (no border change on hover, slight opacity).
 */
export default function ButtonLink({
  href,
  children,
  variant = "outline",
  className,
  external = false,
}: ButtonLinkProps) {
  const styles = cn(
    "btn inline-block",
    variant === "solid" && "bg-navy text-cream border-navy hover:opacity-90",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}

