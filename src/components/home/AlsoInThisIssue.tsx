import Link from "next/link";
import type { Article } from "@/types";
import { sectionLabel, type Section } from "@/content/sections";

type AlsoInThisIssueProps = {
  coverLines: Article[];
};

export default function AlsoInThisIssue({ coverLines }: AlsoInThisIssueProps) {
  return (
    <div className="flex flex-col justify-end gap-0 pt-6 desk:pt-0">
      <span className="kicker text-navy pb-3.5 block border-b desk:border-b-0 border-line">
        Also in this issue
      </span>
      {coverLines.map((article) => {
        const sectionName = sectionLabel(article.section as Section);
        return (
          <Link
            key={article.slug}
            href={`/${article.section}/${article.slug}`}
            className="rule py-[18px] desk:py-[18px] desk:pb-[22px] block group hover:bg-cream-dark transition-colors"
          >
            <span className="kicker block mb-2">{sectionName}</span>
            <span className="font-display text-[21px] leading-[1.15] font-bold text-navy block group-hover:text-gold-text transition-colors">
              {article.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
