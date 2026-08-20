import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/shared/cta-section";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Inferago Tech & Digital Services`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container className="flex flex-col gap-6">
          <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
            {project.services.join(" · ")}
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-fg sm:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-base text-fg-muted sm:text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border-soft pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-fg-muted uppercase">Industry</span>
              <span className="text-sm text-fg">{project.industry}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-fg-muted uppercase">Services</span>
              <span className="text-sm text-fg">{project.services.join(", ")}</span>
            </div>
            {project.timeline && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-fg-muted uppercase">Timeline</span>
                <span className="text-sm text-fg">{project.timeline}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-soft py-12">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-bg-secondary">
            <Image src={project.coverImage} alt={project.name} fill className="object-cover" />
          </div>
        </Container>
      </section>

      {(project.problem || project.approach || project.solution) && (
        <section className="border-t border-border-soft py-20 sm:py-28">
          <Container className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {project.problem && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
                  The Challenge
                </h2>
                <p className="text-sm text-fg-muted">{project.problem}</p>
              </div>
            )}
            {project.approach && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
                  The Approach
                </h2>
                <p className="text-sm text-fg-muted">{project.approach}</p>
              </div>
            )}
            {project.solution && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
                  The Solution
                </h2>
                <p className="text-sm text-fg-muted">{project.solution}</p>
              </div>
            )}
          </Container>
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section className="border-t border-border-soft py-20 sm:py-28">
          <Container className="flex flex-col gap-6">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
              Features
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="text-sm text-fg-muted">
                  {feature}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {project.technology && project.technology.length > 0 && (
        <section className="border-t border-border-soft py-20 sm:py-28">
          <Container className="flex flex-col gap-6">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
              Technology
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technology.map((tech) => (
                <TechnologyBadge key={tech} name={tech} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {project.results && (
        <section className="border-t border-border-soft py-20 sm:py-28">
          <Container className="flex flex-col gap-2">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent-orange uppercase">
              Result
            </h2>
            <p className="max-w-2xl text-sm text-fg-muted">{project.results}</p>
          </Container>
        </section>
      )}

      <CTASection
        title="Have a Similar Project?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
