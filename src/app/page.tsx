import MagazineCoverHero from "@/components/home/MagazineCoverHero";
import CampusWireTicker from "@/components/home/CampusWireTicker";
import InThisIssueContents from "@/components/home/InThisIssueContents";
import EditorNote from "@/components/home/EditorNote";
import Container from "@/components/layout/Container";
import { siteConfig } from "@/content/site-config";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="sr-only">
        March &apos;91 — The Student Magazine of MARCOMS NUST Islamabad
      </h1>

      {/* ── §4.1 The Cover: Full-bleed Cover Story Hero ── */}
      <MagazineCoverHero />

      {/* ── §4.2 Campus Wire: Continuous Marquee Ticker ── */}
      <CampusWireTicker />

      {/* ── §4.3 In This Issue: Magazine Contents Page ── */}
      <InThisIssueContents />

      {/* ── Editorial Statements: Letters from the Editor & Director ── */}
      <Container className="py-16 rule-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <EditorNote
            eyebrow="A Note from the Editor in Chief"
            quote={siteConfig.editorNote}
            attribution={siteConfig.editorAttribution}
          />
          <EditorNote
            eyebrow="A Note from the MARCOMS Director"
            quote={siteConfig.directorNote}
            attribution={siteConfig.directorAttribution}
          />
        </div>
      </Container>
    </div>
  );
}
