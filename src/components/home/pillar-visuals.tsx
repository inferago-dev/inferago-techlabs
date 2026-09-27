"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/reveal";

/* Illustrations for the Build / Grow / Automate cards, one brand colour each. */

/** Build: interface layers stacked in isometric space; they fan apart on hover. */
export function BuildVisual() {
  const layers = [
    { z: "group-hover:[transform:translateZ(0px)]", tone: "border-white/10 bg-white/[0.02]" },
    { z: "[transform:translateZ(18px)] group-hover:[transform:translateZ(34px)]", tone: "border-white/15 bg-white/[0.03]" },
    {
      z: "[transform:translateZ(36px)] group-hover:[transform:translateZ(68px)]",
      tone: "border-accent-blue bg-accent-blue/[0.12]",
    },
  ];

  return (
    <div className="[perspective:900px]">
      <div className="relative h-24 w-36 [transform:rotateX(58deg)_rotateZ(-42deg)] [transform-style:preserve-3d]">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-xl border transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${layer.z} ${layer.tone}`}
          >
            {i === layers.length - 1 && (
              <div className="flex h-full flex-col gap-1.5 p-3">
                <span className="h-1.5 w-10 rounded-full bg-accent-blue" />
                <span className="h-1.5 w-16 rounded-full bg-white/40" />
                <span className="h-1.5 w-12 rounded-full bg-white/20" />
                <span className="mt-auto h-3 w-9 rounded-full bg-white/70" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const POINTS = [
  [0, 70], [30, 62], [60, 66], [90, 48], [120, 52], [150, 32], [180, 22], [210, 8],
] as const;
const LINE = POINTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const AREA = `${LINE} L210 80 L0 80 Z`;

/** Grow: a traffic line that draws itself in, ending on a pulsing point. */
export function GrowVisual() {
  const [lastX, lastY] = POINTS[POINTS.length - 1];

  return (
    <div className="relative w-full max-w-60">
      <svg viewBox="-6 -6 222 92" className="w-full overflow-visible">
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" x2="210" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4" />
        ))}
        <motion.path
          d={AREA}
          fill="rgba(239,107,57,0.1)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        <motion.path
          d={LINE}
          fill="none"
          stroke="#ef6b39"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT }}
        />
        <circle cx={lastX} cy={lastY} r="8" fill="rgba(239,107,57,0.25)" className="animate-ping [transform-box:fill-box] [transform-origin:center]" />
        <circle cx={lastX} cy={lastY} r="3.5" fill="#ef6b39" />
      </svg>
      <span className="absolute -top-3 right-0 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium tracking-[0.14em] text-fg uppercase">
        Traffic
      </span>
    </div>
  );
}

/** Automate: a trigger passes through an AI step to a finished task, over and over. */
export function AutomateVisual() {
  const nodes = ["Trigger", "AI", "Done"];

  return (
    <div className="relative flex w-full max-w-64 items-center justify-between">
      <span aria-hidden className="absolute inset-x-6 top-5 h-px border-t border-dashed border-white/15">
        <span className="rail-pulse-x absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-sand" />
      </span>
      {nodes.map((node, i) => (
        <span key={node} className="relative flex flex-col items-center gap-2.5">
          <span
            className={`grid size-10 place-items-center rounded-xl border bg-bg-secondary ${
              i === 1 ? "border-accent-sand bg-accent-sand/10" : "border-white/15"
            }`}
          >
            <span className={`size-2 rounded-sm ${i === 1 ? "bg-accent-sand" : "bg-white/30"}`} />
          </span>
          <span className="text-[10px] font-medium tracking-[0.16em] text-fg-muted uppercase">{node}</span>
        </span>
      ))}
    </div>
  );
}
