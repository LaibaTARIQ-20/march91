import type { Section } from "@/types";

export const sections = [
  { slug: "samaj", label: "Samaj" },
  { slug: "karobaar", label: "Karobaar" },
  { slug: "nust-boxd", label: "NUST Box'd" },
  { slug: "lifestyle", label: "Lifestyle" },
  { slug: "opinion", label: "Opinion" },
  { slug: "sports", label: "Sports" },
] as const;

export type { Section };

export function isSection(value: string): value is Section {
  return sections.some((s) => s.slug === value);
}

export function sectionLabel(section: Section): string {
  return sections.find((s) => s.slug === section)?.label ?? section;
}
