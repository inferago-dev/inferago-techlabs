"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/** Reveals each direct <StaggerItem> in sequence once the group enters view. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/**
 * Headline that rises in word by word from behind a clip line.
 * `accent` is appended as a single unit so its gradient stays continuous.
 */
export function SplitWords({
  text,
  accent,
  accentClassName,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  accent?: string;
  accentClassName?: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}) {
  const words = text.split(" ");
  const step = 0.055;

  return (
    <Tag className={className}>
      <span className="sr-only">
        {text}
        {accent ? ` ${accent}` : ""}
      </span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EASE_OUT, delay: delay + i * step }}
              >
                {word}
              </motion.span>
            </span>{" "}
          </span>
        ))}
        {accent && (
          <motion.span
            className={cn("inline-block", accentClassName)}
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: delay + words.length * step + 0.05 }}
          >
            {accent}
          </motion.span>
        )}
      </span>
    </Tag>
  );
}

/** One-shot entrance for above-the-fold content (no scroll trigger). */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a span when nested in phrasing content such as a heading. */
  as?: "div" | "span";
}) {
  const Tag = as === "span" ? motion.span : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}
