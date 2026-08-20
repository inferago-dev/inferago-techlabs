import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CTASection({
  eyebrow,
  title,
  description,
  buttonLabel = "Start a Project",
  buttonHref = "/contact",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div
          className="relative overflow-hidden rounded-2xl p-[1px]"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="relative flex flex-col items-center gap-6 rounded-2xl bg-bg-secondary px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[560px] -translate-x-1/2 rounded-full blur-[120px]"
              style={{ background: "var(--gradient-brand)", opacity: 0.16 }}
            />
            {eyebrow && (
              <span className="relative text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
                {eyebrow}
              </span>
            )}
            <h2 className="relative max-w-2xl text-3xl font-medium tracking-tight text-fg sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="relative max-w-xl text-base text-fg-muted sm:text-lg">{description}</p>
            )}
            <Button href={buttonHref} className="relative mt-2">
              {buttonLabel} →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
