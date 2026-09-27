"use client";

import { useEffect, useRef } from "react";
import { animate as animateValue, useAnimate } from "framer-motion";
import { EASE_OUT } from "@/components/motion/reveal";

const HANDLES = ["-top-[4px] -left-[4px]", "-top-[4px] -right-[4px]", "-bottom-[4px] -left-[4px]", "-bottom-[4px] -right-[4px]"];

// Smooth in-and-out, like a hand dragging at an even pace.
const DRAG_EASE = [0.6, 0.05, 0.2, 1] as const;

/**
 * Intro for the hero headline: the line first reads "We build products", then a
 * collaborator's cursor drags a selection open between the words, stretching
 * "digital" into place while the rest of the line slides aside to make room.
 */
export function SelectedWord({ children, delay = 0.9 }: { children: React.ReactNode; delay?: number }) {
  const [scope, animate] = useAnimate();
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    const text = textRef.current;
    if (!el) return;
    const width = text?.offsetWidth ?? 0;
    const height = text?.offsetHeight ?? 0;
    const frame = el.querySelector<HTMLElement>("[data-frame]");
    const cursor = el.querySelector<HTMLElement>("[data-cursor]");

    // One progress value drives every property, so the box, the word and the
    // spacing around it stay in lockstep (em units keep it right at every size).
    // The word scales uniformly from its centre-left, and the frame grows in
    // height with it, like dragging a corner handle.
    const setOpen = (p: number) => {
      const inset = `${((1 - p) * height) / 2}px`;
      el.style.width = `${p * width}px`;
      el.style.paddingLeft = el.style.paddingRight = `${p * 0.14}em`;
      // Starts at minus one word space, so the line reads with single spaces before the drag.
      el.style.marginRight = `${-0.26 * (1 - p)}em`;
      if (text) text.style.transform = `scale(${p})`;
      if (frame) frame.style.top = frame.style.bottom = inset;
      if (cursor) cursor.style.top = `calc(${inset} - 4px)`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(1);
      animate("[data-frame], [data-label]", { opacity: 1 }, { duration: 0 });
      animate("[data-cursor]", { opacity: 1, x: 0, y: 0 }, { duration: 0 });
      return;
    }

    setOpen(0);
    let cancelled = false;
    (async () => {
      // 1. The cursor glides in and lands between "build" and "products".
      await animate("[data-cursor]", { opacity: [0, 1], x: [60, 0], y: [50, 0] }, { duration: 1, delay, ease: EASE_OUT });
      if (cancelled) return;

      // 2. It presses down, and a tiny selection appears.
      setOpen(0.02);
      animate("[data-cursor]", { scale: 0.86 }, { duration: 0.18 });
      await animate("[data-frame]", { opacity: 1 }, { duration: 0.2 });
      if (cancelled) return;

      // 3. Drag: the box opens, "digital" scales up, the rest of the line makes room.
      await animateValue(0, 1, { duration: 1.6, ease: DRAG_EASE, onUpdate: setOpen });
      if (cancelled) return;

      // 4. Release, and the layer name settles in.
      animate("[data-cursor]", { scale: 1 }, { duration: 0.25, ease: EASE_OUT });
      animate("[data-label]", { opacity: 1, y: [4, 0] }, { duration: 0.5, ease: EASE_OUT });
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, scope, delay]);

  return (
    // The animation scope wraps the box without affecting layout.
    <span ref={scope} className="contents">
      <span
        ref={boxRef}
        style={{ width: 0, paddingLeft: 0, paddingRight: 0, marginRight: "-0.26em" }}
        className="relative inline-block box-content whitespace-nowrap"
      >
        {/* Grows from nothing, in step with the box opening. */}
        <span ref={textRef} style={{ transform: "scale(0)" }} className="inline-block origin-left">
          {children}
        </span>

        {/* Selection frame and corner handles. */}
        <span aria-hidden data-frame style={{ opacity: 0 }} className="absolute inset-0 border border-accent-blue bg-accent-blue/[0.08]">
          {HANDLES.map((position) => (
            <span key={position} className={`absolute size-[9px] rounded-[2px] border border-accent-blue bg-white ${position}`} />
          ))}
        </span>

        {/* Layer name, as a design tool labels a selection. */}
        <span
          aria-hidden
          data-label
          style={{ opacity: 0 }}
          className="absolute bottom-full left-[-1px] mb-1.5 text-[11px] leading-none font-medium tracking-normal text-accent-blue sm:text-xs"
        >
          Heading
        </span>

        {/* Collaborator cursor on the right edge; it rides along as the box is dragged open. */}
        <span
          aria-hidden
          data-cursor
          style={{ opacity: 0 }}
          className="absolute top-[-4px] left-full -translate-x-[3px] -translate-y-[2px]"
        >
          <svg viewBox="0 0 20 22" className="block h-[20px] w-[18px] sm:h-[24px] sm:w-[22px]">
            <path
              d="M3 2.5v15.2l4.1-3.9 2.9 6.4 2.7-1.2-2.8-6.3h5.9Z"
              fill="#ffffff"
              stroke="#07070a"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          
        </span>
      </span>
    </span>
  );
}
