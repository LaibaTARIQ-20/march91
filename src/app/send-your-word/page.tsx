import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Send Your Word",
  description: "Submit an opinion piece or commentary to March '91.",
};

export default function SendYourWordPage() {
  const mailtoUrl = `mailto:${siteConfig.magazineEmail}?subject=${encodeURIComponent(
    "Opinion submission"
  )}`;

  return (
    <Container className="py-16 desk:py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy">
          Send Your Word
        </h1>

        <p className="font-body text-lg leading-relaxed text-ink">
          March &apos;91 welcomes submissions from NUST students, alumni, and
          faculty. If you have an essay, op-ed, or cultural critique you would
          like to see published, send your draft to our editorial board.
        </p>

        <div className="border border-line p-8 bg-cream text-left space-y-4">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">
            Submission Guidelines
          </h2>
          <ul className="font-body text-base text-ink space-y-2 list-disc list-inside">
            <li>Submissions should typically range from 600 to 1,200 words.</li>
            <li>Include your full name, department/school, and graduation year.</li>
            <li>Articles must be original work not previously published elsewhere.</li>
          </ul>
        </div>

        <div>
          <ButtonLink href={mailtoUrl} variant="solid" tone="light">
            Email Your Submission
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
