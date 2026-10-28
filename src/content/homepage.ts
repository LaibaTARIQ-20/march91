/**
 * Editorial choices for the March '91 homepage, organized by article slug.
 */
export const homepage = {
  // Section 3 (Cover): Three teaser lines in the "Also in this issue" right column
  coverLines: [
    "why-even-do-sports", // "Why Even Do Sports?"
    "mom-i-dont-need-an-internship", // "Mom, I Don't Need an Internship, My GPA is 3.8"
    "what-exactly-is-film-for", // "What exactly is film for?"
  ],

  // Section 5 (In this issue): One article per section in exact order
  contents: [
    "samaj-this-happened-we-watched-youre-reading", // samaj → "This happened. We watched. You're reading."
    "mom-i-dont-need-an-internship", // karobaar → "Mom, I Don't Need an Internship, My GPA is 3.8"
    "what-exactly-is-film-for", // nust-boxd → "What exactly is film for?"
    "how-to-wear-yourself", // lifestyle → "How to wear yourself: A necessary reminder before fall"
    "why-students-prefer-torture-over-teamwork", // opinion → "Why students prefer torture over teamwork"
    "why-even-do-sports", // sports → "Why Even Do Sports?"
  ],

  // Section 6 (Feature spread): Primary big story
  feature: "samaj-this-happened-we-watched-youre-reading", // "This happened. We watched. You're reading."

  // Section 7 (The Edit): Three curated stories
  edit: [
    "before-the-chaos-begins", // "Before the chaos begins"
    "karobaar-navigating-innovation-enterprise-and-opportunity", // "Karobaar: Navigating Innovation, Enterprise, and Opportunity"
    "why-students-prefer-torture-over-teamwork", // "Why students prefer torture over teamwork"
  ],

  // Section 9 (Lifestyle): Lead story + 4 list stories
  lifestyle: {
    lead: "how-to-wear-yourself", // "How to wear yourself: A necessary reminder before fall"
    list: [
      "a-glamorous-junkyard", // "A Glamorous Junkyard"
      "the-unedited-life", // "The Unedited Life"
      "living-a-double-life", // "Living a Double Life (or Multiple Lives)"
    ],
  },

  // Section 11 (NUST Box'd): The critics' shelf
  shelf: [
    "nust-boxd-intro", // "NUST Box'd"
    "what-exactly-is-film-for", // "What exactly is film for?"
  ],

  // Editorial UI copy
  copy: {
    editTagline: "Three stories worth your evening",
    shelfTagline: "The critics’ shelf.",
    coverKicker: "NUST Fall '26 · Cover Story",
  },
} as const;
