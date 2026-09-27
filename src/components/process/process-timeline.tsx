"use client";

import { motion } from "framer-motion";
import { EASE_OUT, Stagger, StaggerItem } from "@/components/motion/reveal";

type Step = { number: string; title: string; description: string };

const transition = { duration: 1.6, ease: EASE_OUT };
const fillDown = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition } };
const fillAcross = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition } };

/** Numbered steps on a rail that fills with the brand gradient as it enters view. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <Stagger stagger={0.1} className="relative">
      {/* Rail: vertical on mobile, horizontal from lg up. Centred on the 44px nodes. */}
      <div aria-hidden className="absolute top-0 bottom-0 left-[21.5px] w-px bg-white/10 lg:hidden">
        <motion.div
          variants={fillDown}
          className="size-full origin-top bg-[linear-gradient(to_bottom,#1996eb,#ef6b39,#d1c9a3)]"
        />
      </div>
      <div aria-hidden className="absolute top-[21.5px] right-0 left-0 hidden h-px bg-white/10 lg:block">
        <motion.div
          variants={fillAcross}
          className="size-full origin-left bg-[linear-gradient(to_right,#1996eb,#ef6b39,#d1c9a3)]"
        />
      </div>

      <div role="list" className="relative grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-6">
        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <div role="listitem" className="group flex gap-5 lg:flex-col lg:gap-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-bg text-sm font-medium text-fg tabular-nums transition-colors duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-black">
                {step.number}
              </span>
              <div className="flex flex-col gap-2 pt-2.5 lg:pt-0 lg:pr-2">
                <h3 className="text-lg font-medium tracking-tight text-fg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
