import { Globe, Smartphone, Code2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  { label: "Website", icon: Globe },
  { label: "App", icon: Smartphone },
  { label: "Software", icon: Code2 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-brand)", opacity: 0.5 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "var(--gradient-brand)", opacity: 0.14 }}
      />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
          Inferago / Tech &amp; Digital Services
        </span>

        <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-fg sm:text-6xl lg:text-7xl">
          We Build Digital Products That Move Businesses Forward.
        </h1>

        <p className="max-w-2xl text-base text-fg-muted sm:text-lg">
          From websites and applications to custom software, digital marketing and
          AI-powered solutions, Inferago helps businesses build, launch and grow.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Start a Project →
          </Button>
          <Button href="/work" variant="secondary">
            Explore Our Work
          </Button>
        </div>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-3 gap-4 sm:mt-16">
          {PRODUCTS.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-lg border border-border-soft bg-surface/60 px-4 py-8 text-sm text-fg-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent-orange/40"
            >
              <Icon className="size-5 text-accent-orange" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
