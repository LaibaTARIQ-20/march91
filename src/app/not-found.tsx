import Link from "next/link";
import { sections } from "@/content/sections";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-16 md:py-28 text-center">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="font-display font-bold text-4xl md:text-6xl text-navy">
          404 &mdash; Page Not Found
        </h1>

        <p className="font-body text-lg text-ink leading-relaxed">
          The page you are looking for does not exist or may have moved.
        </p>

        <div>
          <Button href="/" size="md">
            Return Home
          </Button>
        </div>

        <div className="pt-8 border-t border-line">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-4">
            Browse by Section
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section) => (
              <Link
                key={section.slug}
                href={`/${section.slug}`}
                className="font-heading text-xs uppercase tracking-[0.12em] text-navy hover:underline underline-offset-4"
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
