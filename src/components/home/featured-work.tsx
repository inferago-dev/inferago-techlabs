import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PROJECTS } from "@/data/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function FeaturedWork() {
  const featured = PROJECTS.slice(0, 2);

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12 sm:gap-14">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected"
            highlight="work."
            description="A look at what we've built for businesses and products."
          />
          {featured.length > 0 && (
            <Link
              href="/work"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.04]"
            >
              View all work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </Reveal>

        {featured.length > 0 ? (
          <Stagger stagger={0.12} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featured.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
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
  );
}
