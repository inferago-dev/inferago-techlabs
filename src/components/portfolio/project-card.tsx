import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-4 overflow-hidden rounded-lg border border-border-soft bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent-orange/40 hover:shadow-[0_16px_40px_-16px_rgba(255,60,0,0.25)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-secondary">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1 px-6 pb-6">
        <span className="text-lg font-medium text-fg">{project.name}</span>
        <span className="text-sm text-fg-muted">{project.type}</span>
        <span className="mt-2 text-xs tracking-[0.1em] text-accent-orange uppercase">
          {project.services.join(" · ")}
        </span>
      </div>
    </Link>
  );
}
