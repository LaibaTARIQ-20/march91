import Link from "next/link";
import type { Article } from "@/types";
import { sectionLabel, type Section } from "@/content/sections";

type AlsoInThisIssueProps = {
  coverLines: Article[];
};

export default function AlsoInThisIssue({ coverLines }: AlsoInThisIssueProps) {
  const pitchBlock = (
    <a
      href="mailto:march91.magazine@gmail.com"
      aria-label="Pitch a Story by email"
      className="mt-6 w-full flex items-center justify-between gap-4 border-2 border-gold bg-cream p-6 hover:bg-cream-dark transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
    >
      <div className="flex flex-col min-w-0">
        <h3 className="font-display font-bold text-navy text-[24px] leading-[1.1] m-0">
          Pitch a Story
        </h3>
        <p className="font-body text-ink text-[16px] leading-[1.5] m-0 mt-2">
          For any story worth reporting, contact us
        </p>
      </div>
      <span
        className="w-[48px] h-[48px] min-h-[44px] min-w-[44px] rounded-full bg-navy flex items-center justify-center shrink-0 text-cream"
        aria-hidden="true"
      >
        <span className="text-[18px] leading-none">&rarr;</span>
      </span>
    </a>
  );

  return (
    <>
      {/* Mobile & Tablet view: below 1024px */}
      <div className="lg:hidden w-full pt-6">
        <span className="kicker text-navy pb-3.5 block border-b border-line mb-3">
          Also This Issue
        </span>
        <ul className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar pb-3 -mx-4 sm:-mx-6 px-4 sm:px-6 scroll-p-4">
          {coverLines.map((article) => {
            const sectionName = sectionLabel(article.section as Section);
            return (
              <li
                key={article.slug}
                className="snap-start shrink-0 w-[78%] sm:w-[45%] border-t border-line pt-3.5"
              >
                <Link
                  href={`/${article.section}/${article.slug}`}
                  className="block group"
                >
                  <span className="kicker block mb-1">{sectionName}</span>
                  <span className="font-display text-[21px] leading-[1.15] font-bold text-navy block group-hover:text-gold-text transition-colors">
                    {article.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {pitchBlock}
      </div>

      {/* Desktop view: vertical list in the third column */}
      <div className="hidden lg:flex flex-col justify-start gap-0 pt-0 w-full">
        <span className="kicker text-navy pb-3.5 block border-b border-line">
          Also This Issue
        </span>
        {coverLines.map((article) => {
          const sectionName = sectionLabel(article.section as Section);
          return (
            <Link
              key={article.slug}
              href={`/${article.section}/${article.slug}`}
              className="border-b border-line py-4 block group hover:bg-cream-dark transition-colors"
            >
              <span className="kicker block mb-1.5">{sectionName}</span>
              <span className="font-display text-[20px] leading-[1.15] font-bold text-navy block group-hover:text-gold-text transition-colors">
                {article.title}
              </span>
            </Link>
          );
        })}
        {pitchBlock}
      </div>
    </>
  );
}
