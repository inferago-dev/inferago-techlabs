"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { PROCESS_STEPS } from "@/data/services";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

/**
 * The six stages as a rising staircase: each column is taller than the last, and
 * they grow up from a shared baseline in sequence, so the layout itself climbs
 * from idea to launch. The final stage is solid white.
 */
export function ProcessPreview() {
  const last = PROCESS_STEPS.length - 1;

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our process"
            title="From idea"
            highlight="to launch."
            description="Six clear stages, so you always know where your project stands and what comes next."
          />
          <Link
            href="/process"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            Full process
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        {/* Staircase (large screens) */}
        <div className="relative hidden lg:block">
          <ol className="grid h-[480px] grid-cols-6 items-end gap-3">
            {PROCESS_STEPS.map((step, i) => {
              const final = i === last;
              return (
                <li key={step.number} className="flex h-full flex-col justify-end">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0% 0% 0% round 16px)" }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.1, ease: EASE_OUT, delay: i * 0.12 }}
                    style={{ height: `${40 + (i / last) * 60}%` }}
                    className={cn(
                      "flex flex-col overflow-hidden rounded-2xl border p-5 transition-colors duration-300",
                      final
                        ? "border-fg bg-fg"
                        : "border-white/[0.08] bg-surface hover:border-white/20 hover:bg-surface-raised"
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 + i * 0.12 }}
                      className="flex flex-col gap-3"
                    >
                      <span className="flex items-center justify-between">
                        <span className={cn("text-xs font-medium tabular-nums", final ? "text-black/50" : "text-fg/35")}>
                          {step.number}
                        </span>
                        {final && <ArrowUpRight className="size-4 text-black" />}
                      </span>
                      <h3 className={cn("text-xl font-medium tracking-[-0.02em]", final ? "text-black" : "text-fg")}>
                        {step.title}
                      </h3>
                      <p className={cn("text-sm leading-relaxed", final ? "text-black/65" : "text-fg-muted")}>
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
          {/* Baseline the stairs stand on. */}
          <div aria-hidden className="mt-3 h-px w-full bg-white/[0.08]" />
        </div>

        {/* Stacked list (small screens), with a bar that lengthens stage by stage. */}
        <ol className="flex flex-col gap-3 lg:hidden">
          {PROCESS_STEPS.map((step, i) => {
            const final = i === last;
            return (
              <li
                key={step.number}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl border p-5",
                  final ? "border-fg bg-fg" : "border-white/[0.08] bg-surface"
                )}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className={cn("text-xs font-medium tabular-nums", final ? "text-black/50" : "text-fg/35")}>
                    {step.number}
                  </span>
                  <span
                    style={{ width: `${20 + (i / last) * 40}%` }}
                    className={cn("h-1 rounded-full", final ? "bg-black" : "bg-white/25")}
                  />
                </span>
                <h3 className={cn("text-xl font-medium tracking-[-0.02em]", final ? "text-black" : "text-fg")}>
                  {step.title}
                </h3>
                <p className={cn("text-sm leading-relaxed", final ? "text-black/65" : "text-fg-muted")}>
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
