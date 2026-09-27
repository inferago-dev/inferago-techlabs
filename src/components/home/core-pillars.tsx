"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Megaphone, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { SERVICE_PILLARS } from "@/data/services";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  build: Code2,
  grow: Megaphone,
  automate: Sparkles,
  support: ShieldCheck,
};

export function CorePillars() {
  const [active, setActive] = useState(0);
  const pillar = SERVICE_PILLARS[active];
  const Icon = ICONS[pillar.key] ?? Code2;

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12 sm:gap-14">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we do" title="Technology built around" highlight="your business." />
          <Link
            href="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            All services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
          {/* Service list; the white bar slides to the selected row. */}
          <div role="tablist" aria-label="Services" className="flex flex-col">
            {SERVICE_PILLARS.map((p, i) => {
              const selected = i === active;
              return (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative flex items-center gap-6 border-t border-white/[0.08] py-6 pl-6 text-left last:border-b sm:py-7"
                >
                  {selected && (
                    <motion.span
                      layoutId="pillar-bar"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute top-0 bottom-0 left-0 w-[2px] bg-fg"
                    />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium tabular-nums transition-colors duration-300",
                      selected ? "text-fg" : "text-fg/30"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-2xl font-medium tracking-[-0.03em] transition-colors duration-300 sm:text-3xl",
                      selected ? "text-fg" : "text-fg/35 group-hover:text-fg/70"
                    )}
                  >
                    {p.title}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-5 shrink-0 transition-all duration-300",
                      selected ? "text-fg opacity-100" : "-translate-x-1 translate-y-1 opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel for the selected service. */}
          <div role="tabpanel" className="card relative min-h-[26rem] overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,#000,transparent)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="relative flex h-full flex-col gap-8 p-7 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-fg text-black">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-medium tracking-[0.2em] text-fg-muted uppercase">{pillar.label}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-3xl font-medium tracking-[-0.035em] text-fg sm:text-4xl">{pillar.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-fg-muted">{pillar.tagline}</p>
                </div>

                <ul className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-fg/85">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/15">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services"
                  className="group mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-fg/70"
                >
                  Explore {pillar.label.toLowerCase()} services
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
