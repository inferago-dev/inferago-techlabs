"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border-soft bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/inferago-logo.png"
            alt="Inferago"
            width={1903}
            height={531}
            priority
            className="h-6 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" className="!px-5 !py-2.5 text-xs">
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-fg md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border-soft bg-bg md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-4 w-fit">
              Start a Project
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
