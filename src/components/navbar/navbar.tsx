"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EASE_OUT } from "@/components/motion/reveal";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeHref = NAV_LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
  )?.href;
  const pillHref = hovered ?? activeHref;

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled || open
          ? "border-white/[0.08] bg-black/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link href="/" className="flex w-fit items-center" aria-label="Inferago home">
          <Image
            src="/inferago-logo.png"
            alt="Inferago"
            width={1903}
            height={531}
            preload
            className="h-[22px] w-auto object-contain"
          />
        </Link>

        {/* Links sit in a hairline capsule; a pill slides to the hovered or current page. */}
        <nav
          onMouseLeave={() => setHovered(null)}
          className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className={cn(
                "relative isolate rounded-full px-4 py-1.5 text-sm font-medium tracking-normal uppercase transition-colors duration-300",
                link.href === pillHref ? "text-fg" : "text-fg-muted"
              )}
            >
              {link.href === pillHref && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button href="/contact" className="hidden !px-4 !py-2 md:inline-flex">
            Start a project
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>

          {/* Two-line burger that folds into a cross. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative grid size-10 place-items-center rounded-full border border-white/10 md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-5 pt-2 pb-6">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-white/[0.06] py-4 text-sm font-medium tracking-normal uppercase transition-colors hover:text-fg",
                    link.href === activeHref ? "text-fg" : "text-fg-muted"
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-fg/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              ))}
              <Button href="/contact" className="mt-5 w-full" onClick={() => setOpen(false)}>
                Start a project
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
