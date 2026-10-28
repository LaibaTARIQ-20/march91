import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  tone?: "light" | "dark";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

/**
 * Spec button: 11px uppercase tracking-[0.16em] font-medium, padding 14px 26px, focus-visible ring in gold.
 * On hover: a fill slides in from left (pseudo-element translateX(-101%) to 0) and the arrow moves 4px;
 * text colour switches at the same time so contrast stays 4.5:1.
 */
export default function ButtonLink({
  href,
  children,
  variant = "outline",
  tone = "light",
  className,
  external = false,
  type = "button",
  onClick,
}: ButtonLinkProps) {
  const baseClasses =
    "group relative inline-block overflow-hidden font-body text-[11px] font-medium uppercase tracking-[0.16em] px-[26px] py-[14px] leading-none transition-colors duration-200 cursor-pointer text-center select-none focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px] [&_span[aria-hidden='true']]:inline-block [&_span[aria-hidden='true']]:transition-transform [&_span[aria-hidden='true']]:duration-200 @media(hover:hover):hover:[&_span[aria-hidden='true']]:translate-x-1";

  // Sliding fill pseudo-element:
  const slideClasses =
    "before:content-[''] before:absolute before:inset-0 before:z-0 before:transition-transform before:duration-300 before:ease-[var(--ease-out)] before:-translate-x-[101%] @media(hover:hover):hover:before:translate-x-0 motion-reduce:before:transition-none";

  const colorClasses =
    tone === "light"
      ? variant === "outline"
        ? "border border-navy text-navy bg-transparent before:bg-navy hover:text-cream hover:border-navy"
        : "border border-navy bg-navy text-cream before:bg-cream hover:text-navy hover:border-navy"
      : variant === "outline"
        ? "border border-cream text-cream bg-transparent before:bg-cream hover:text-navy hover:border-cream"
        : "border border-cream bg-cream text-navy before:bg-navy hover:text-cream hover:border-cream";

  const combinedStyles = cn(baseClasses, slideClasses, colorClasses, className);

  // Render children wrapped in relative z-10 so it stays above the sliding fill pseudo-element
  const content = <span className="relative z-10 pointer-events-none inline-flex items-center gap-1.5">{children}</span>;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {content}
    </button>
  );
}
