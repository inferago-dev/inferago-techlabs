import { Container } from "@/components/ui/container";

const KEYWORDS = ["Build", "Grow", "Automate"];

export function IntroStrip() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <h2 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          Build. Grow. Scale.
        </h2>
        <div className="flex flex-col gap-8">
          <p className="max-w-lg text-base text-fg-muted sm:text-lg">
            We combine design, engineering and digital strategy to help businesses
            create better digital experiences and stronger digital operations.
          </p>
          <div className="flex gap-8">
            {KEYWORDS.map((word) => (
              <span
                key={word}
                className="text-xs font-medium tracking-[0.2em] text-fg-muted uppercase"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
