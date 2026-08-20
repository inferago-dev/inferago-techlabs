import { Container } from "@/components/ui/container";

export function AICrossover() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 rounded-lg border border-border-soft bg-surface px-8 py-16 text-center">
        <h2 className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          Need More Than Software?
        </h2>
        <p className="max-w-xl text-base text-fg-muted">
          Add intelligent automation and AI capabilities to your digital products
          with Inferago AI.
        </p>
        <a
          href="https://inferago.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-accent-orange transition-opacity hover:opacity-80"
        >
          Explore Inferago AI →
        </a>
      </Container>
    </section>
  );
}
