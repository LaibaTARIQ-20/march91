import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.description,
};

export default function AboutPage() {
  return (
    <Container className="py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-navy">
          About
        </h1>

        <p className="font-body text-base leading-relaxed mb-12 text-ink">
          {aboutContent.description}
        </p>

        <section>
          <h2 className="font-display text-xl font-bold mb-6 pb-4 border-b border-line text-navy">
            The Team
          </h2>
          <ul className="flex flex-col gap-5">
            {aboutContent.team.map((member) => (
              <li key={member.name} className="flex flex-col gap-0.5">
                <span className="font-display text-base font-bold text-navy">
                  {member.name}
                </span>
                <span className="font-heading text-xs tracking-[0.08em] uppercase text-muted">
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
