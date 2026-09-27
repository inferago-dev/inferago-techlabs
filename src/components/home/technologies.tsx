"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { TECHNOLOGY_GROUPS } from "@/data/technologies";
import { cn } from "@/lib/utils";

const TOOLS = TECHNOLOGY_GROUPS.flatMap((group) => group.items.map((name) => ({ name, category: group.category })));

/* Tools are dealt onto three rings: fewer inside, more outside. */
const RING_SIZES = [4, 6, 8];
const RINGS = RING_SIZES.map((count, r) => {
  const start = RING_SIZES.slice(0, r).reduce((a, b) => a + b, 0);
  return {
    tools: TOOLS.slice(start, start + count),
    radius: [22, 35, 48][r],
    duration: [70, 95, 120][r],
    reverse: r % 2 === 1,
  };
}).filter((ring) => ring.tools.length > 0);

function Orbit({ active }: { active: string }) {
  return (
    <div aria-hidden className="orbit-wrap relative mx-auto aspect-square w-full max-w-[520px]">
      {RINGS.map((ring, r) => (
        <div
          key={r}
          style={{ animationDuration: `${ring.duration}s` }}
          className={cn("absolute inset-0", ring.reverse ? "orbit-ccw" : "orbit-cw")}
        >
          <span
            style={{ inset: `${50 - ring.radius}%` }}
            className="absolute rounded-full border border-dashed border-white/[0.09]"
          />
          {ring.tools.map((tool, i) => {
            const angle = (i / ring.tools.length) * Math.PI * 2 + r * 0.6;
            const lit = tool.category === active;
            return (
              <span
                key={tool.name}
                style={{
                  left: `${50 + ring.radius * Math.cos(angle)}%`,
                  top: `${50 + ring.radius * Math.sin(angle)}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                {/* Counter-spin keeps each label upright while its ring turns. */}
                <span
                  style={{ animationDuration: `${ring.duration}s` }}
                  className={cn(
                    "block rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-all duration-500",
                    ring.reverse ? "orbit-cw" : "orbit-ccw",
                    lit
                      ? "border-fg bg-fg font-medium text-black"
                      : "border-white/10 bg-bg-secondary text-fg/60"
                  )}
                >
                  {tool.name}
                </span>
              </span>
            );
          })}
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-bg">
        <span style={{ animationDuration: "30s" }} className="orbit-cw absolute inset-2 rounded-full border border-dashed border-white/15" />
        <Image src="/inferago-logo.png" alt="" width={1903} height={531} className="h-4 w-auto object-contain" />
      </div>
    </div>
  );
}

export function Technologies() {
  const [active, setActive] = useState(TECHNOLOGY_GROUPS[0]?.category ?? "");
  const activeGroup = TECHNOLOGY_GROUPS.find((group) => group.category === active);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-10 p-7 sm:p-10 lg:p-12">
              <SectionHeading
                eyebrow="Stack"
                title="Built with"
                highlight="modern technology."
                description="Proven tools across the whole product, chosen for what each project needs."
              />

              <div className="flex flex-col gap-4">
                <div role="tablist" aria-label="Technology categories" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TECHNOLOGY_GROUPS.map((group) => {
                    const selected = group.category === active;
                    return (
                      <button
                        key={group.category}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onMouseEnter={() => setActive(group.category)}
                        onFocus={() => setActive(group.category)}
                        onClick={() => setActive(group.category)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-300",
                          selected
                            ? "border-fg bg-fg text-black"
                            : "border-white/[0.08] bg-white/[0.02] text-fg/80 hover:border-white/20"
                        )}
                      >
                        {group.category}
                        <span className={cn("text-xs tabular-nums", selected ? "text-black/50" : "text-fg/30")}>
                          {String(group.items.length).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* The selected category's tools, spelled out. */}
                <div role="tabpanel" className="min-h-10">
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={active}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="flex flex-wrap gap-2"
                    >
                      {activeGroup?.items.map((item) => (
                        <li key={item} className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-fg">
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Orbit on a dot grid. */}
            <div className="relative hidden items-center justify-center overflow-hidden border-t border-white/[0.06] bg-bg-secondary p-10 md:flex lg:border-t-0 lg:border-l">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000,transparent)]"
              />
              <div className="relative w-full">
                <Orbit active={active} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
