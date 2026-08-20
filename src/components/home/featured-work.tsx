import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PROJECTS } from "@/data/projects";

export function FeaturedWork() {
  const featured = PROJECTS.slice(0, 4);

  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          description="A look at what we've built for businesses and products."
        />

        {featured.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <Link
              href="/work"
              className="self-center text-sm font-medium text-fg transition-colors hover:text-accent-orange"
            >
              View All Work →
            </Link>
          </>
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
  );
}
