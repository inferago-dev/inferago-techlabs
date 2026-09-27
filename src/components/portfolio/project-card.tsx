import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const host = project.clientUrl
    ? new URL(project.clientUrl).host.replace(/^www\./, "")
    : `inferago.com/work/${project.slug}`;

  return (
    <Link href={`/work/${project.slug}`} className="group flex h-full flex-col gap-5">
      {/* Stage: the site sits in a browser window that bleeds off the bottom edge. */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-bg-secondary px-6 pt-8 transition-colors duration-500 group-hover:border-white/20 sm:px-10 sm:pt-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />

        <div className="relative -mb-px translate-y-2 overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-surface transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="relative flex h-9 items-center border-b border-white/[0.06] px-3.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-accent-orange" />
              <span className="size-2.5 rounded-full bg-white/15 transition-colors delay-75 duration-300 group-hover:bg-accent-sand" />
              <span className="size-2.5 rounded-full bg-white/15 transition-colors delay-150 duration-300 group-hover:bg-accent-blue" />
            </div>
            <span className="absolute left-1/2 flex max-w-[60%] -translate-x-1/2 items-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-0.5 text-[11px] text-fg-muted">
              <Lock className="size-3 shrink-0" strokeWidth={2} />
              <span className="truncate">{host}</span>
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.coverImage}
              alt={`${project.name} website`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 px-1">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate text-xl font-medium tracking-[-0.02em] text-fg">{project.name}</h3>
          <p className="truncate text-sm text-fg-muted">
            {project.industry} <span className="text-fg/25">·</span> {project.type}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-fg-muted transition-colors duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-black">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
        </span>
      </div>
    </Link>
  );
}
