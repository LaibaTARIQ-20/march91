import { cn } from "@/lib/cn";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Sharp-edged CTA button.
 * - `primary`: navy bg, white text
 * - `outline`: transparent bg, navy border + text
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-heading font-semibold uppercase tracking-[0.14em] transition-all border border-solid text-xs",
    size === "sm" && "px-4 py-1.5",
    size === "md" && "px-6 py-2.5",
    variant === "primary" &&
      "bg-navy border-navy text-cream hover:opacity-90",
    variant === "outline" &&
      "bg-transparent border-navy text-navy hover:bg-navy hover:text-cream",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
}
