import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WHY_INFERAGO } from "@/data/services";

export function WhyInferago() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Why Inferago" title="A Different Kind of Technology Partner." />

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {WHY_INFERAGO.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 border-l-2 border-accent-orange/40 pl-6">
              <h3 className="text-lg font-medium text-fg">{item.title}</h3>
              <p className="text-sm text-fg-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
