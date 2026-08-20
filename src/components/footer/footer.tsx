import Link from "next/link";
import Image from "next/image";
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
    <footer className="border-t border-border-soft">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3 lg:col-span-1">
          <Image
            src="/inferago-logo.png"
            alt="Inferago"
            width={1903}
            height={531}
            className="h-6 w-auto object-contain"
          />
          <p className="text-sm text-fg-muted">Tech &amp; Digital Services</p>
          <p className="max-w-xs text-sm text-fg-muted">
            Building digital products, systems and growth engines.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-[0.15em] text-fg-muted uppercase">
              {col.title}
            </span>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium tracking-[0.15em] text-fg-muted uppercase">
            Inferago
          </span>
          <a
            href="https://inferago.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-fg-muted transition-colors hover:text-fg"
          >
            AI Services
          </a>
          <span className="text-sm text-fg">Tech &amp; Digital Services</span>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-border-soft py-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Inferago</span>
      </Container>
    </footer>
  );
}
