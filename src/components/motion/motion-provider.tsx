"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Site-wide motion settings, plus one pointer listener that feeds the cursor
 * position to whichever `.card` is under it (drives the spotlight in CSS).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
