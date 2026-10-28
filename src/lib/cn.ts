/**
 * Utility for merging class names.
 * Filters out falsy values so you can conditionally include classes.
 *
 * Usage: cn("base-class", isActive && "active", size === "lg" && "text-lg")
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
