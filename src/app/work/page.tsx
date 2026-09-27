import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work | Inferago Tech & Digital Services",
  description: "A look at what Inferago has built for businesses and products.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Work That Speaks" highlight="for Itself." />

      <section className="py-24 sm:py-32">
        <Container>
          {PROJECTS.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="card px-8 py-16 text-center text-sm text-fg-muted">
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
