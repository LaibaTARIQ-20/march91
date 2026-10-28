import { cn } from "@/lib/cn";

type DividerProps = {
  variant?: "soft" | "strong";
  className?: string;
};

/**
 * Hairline divider — section-separating rule.
 * - `soft` (default): subtle line border
 * - `strong`: full navy border
 */
export default function Divider({ variant = "soft", className }: DividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full",
        variant === "strong" ? "bg-navy" : "bg-line",
        className
      )}
    />
  );
}
