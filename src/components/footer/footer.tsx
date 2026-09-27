import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "App Development", href: "/services" },
      { label: "Software", href: "/services" },
      { label: "E-commerce", href: "/services" },
      { label: "Digital Marketing", href: "/services" },
      { label: "SEO", href: "/services" },
      { label: "AI Integration", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] ">
      <Container className="relative grid grid-cols-1 uppercase gap-12 pt-20 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Image
            src="/inferago-logo.png"
            alt="Inferago"
            width={1903}
            height={531}
            className="h-6 w-auto self-start object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/50 normal-case">
            Tech &amp; Digital Services. Building digital products, systems and
            growth engines.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="mb-1 text-sm tracking-wide">{col.title}</span>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="w-fit text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <span className="mb-1 text-sm ">Inferago</span>
          <a
            href="https://inferago.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-1 text-sm  text-fg-muted transition-colors hover:text-fg"
          >
            AI Services
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="text-sm text-fg-muted">Tech &amp; Digital Services</span>
        </div>
      </Container>

      {/* Oversized wordmark, cropped by the bottom bar. */}
      <div aria-hidden className="overflow-hidden">
        <Container>
          <span className="block translate-y-[18%] bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-center text-[18vw] leading-none font-semibold tracking-[-0.06em] text-transparent select-none xl:text-[15rem]">
            inferago
          </span>
        </Container>
      </div>

      <div className="relative border-t border-white/[0.06] bg-black">
        <Container className="flex flex-col gap-2 py-6 text-xs tracking-tight text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Inferago. All rights reserved.</span>
          <span>Build. Grow. Automate.</span>
        </Container>
      </div>
    </footer>
  );
}
