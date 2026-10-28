import ButtonLink from "@/components/ui/ButtonLink";

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
 * Standard button delegating to ButtonLink to maintain single source of button styling.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <ButtonLink
      href={href}
      variant={variant === "primary" ? "solid" : "outline"}
      tone="light"
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </ButtonLink>
  );
}
