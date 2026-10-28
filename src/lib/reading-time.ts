/**
 * Calculates estimated reading time in minutes based on 200 words per minute, ceil.
 */
export function getReadingTime(text: string | string[]): string {
  const content = Array.isArray(text) ? text.join(" ") : text;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
