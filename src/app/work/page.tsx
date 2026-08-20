import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CTASection } from "@/components/shared/cta-section";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Inferago Tech & Digital Services",
  description: "A look at what Inferago has built for businesses and products.",
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="Work That Speaks for Itself."
          />
        </Container>
      </section>

      <section className="border-t border-border-soft py-20 sm:py-28">
        <Container>
          {PROJECTS.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border-soft bg-surface/40 px-8 py-16 text-center text-sm text-fg-muted">
              Case studies are being added. In the meantime,{" "}
              <Link href="/contact" className="text-fg underline underline-offset-4">
                get in touch
              </Link>{" "}
              to talk through a project.
            </div>
          )}
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
