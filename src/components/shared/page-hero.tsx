import { Container } from "@/components/ui/container";
import { DitherField } from "@/components/ui/dither-field";
import { SectionHeading } from "@/components/ui/section-heading";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-44 pb-20 sm:pt-52 sm:pb-24">
      <DitherField
        tone="grey"
        interactive
        className="inset-x-0 top-0 h-[520px]"
        shape={[0.78, 0, 0.5, 0.7]}

      />
      <Container className="relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
          className="[&_h2]:text-5xl sm:[&_h2]:text-6xl lg:[&_h2]:text-7xl"
        />
      </Container>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />
    </section>
  );
}
