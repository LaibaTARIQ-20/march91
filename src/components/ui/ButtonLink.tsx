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
  icon?: "arrow" | "round-arrow" | "none";
};

/**
 * Spec button: 11px uppercase tracking-[0.16em] font-medium, padding 14px 26px, focus-visible ring in gold.
 * - outline + light: border navy, text navy, hover: navy fill and cream text
 * - solid + light: navy fill, cream text, hover: cream fill, navy text, navy border
 * - outline + dark: border cream, text cream, hover: cream fill and navy text
 * - solid + dark: cream fill, navy text, hover: transparent with cream border and cream text
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
  icon = "none",
}: ButtonLinkProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center font-body text-[11px] font-medium uppercase tracking-[0.16em] px-[26px] py-[14px] leading-none transition-colors duration-200 cursor-pointer text-center select-none focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px]";

  // Explicit hover colors ensuring text is never invisible and contrast >= 4.5:1
  const colorClasses =
    tone === "light"
      ? variant === "outline"
        ? "border border-navy text-navy bg-transparent hover:bg-navy hover:text-cream hover:border-navy"
        : "border border-navy bg-navy text-cream hover:bg-cream hover:text-navy hover:border-navy"
      : variant === "outline"
        ? "border border-cream text-cream bg-transparent hover:bg-cream hover:text-navy hover:border-cream"
        : "border border-cream bg-cream text-navy hover:bg-transparent hover:text-cream hover:border-cream";

  const combinedStyles = cn(baseClasses, colorClasses, className);

  const roundArrow = (
    <span
      aria-hidden="true"
      className="ml-2 w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 transition-transform duration-200 @media(hover:hover):group-hover:translate-x-0.5"
    >
      <span className="text-[10px] leading-none">&rarr;</span>
    </span>
  );

  const standardArrow = (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-200 @media(hover:hover):group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );

  const content = (
    <span className="relative z-10 pointer-events-none inline-flex items-center gap-1.5 text-inherit">
      <span>{children}</span>
      {icon === "round-arrow" && roundArrow}
      {icon === "arrow" && standardArrow}
    </span>
  );

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
