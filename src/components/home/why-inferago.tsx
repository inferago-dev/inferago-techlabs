import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { WHY_INFERAGO } from "@/data/services";

export function WhyInferago() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          eyebrow="Why Inferago"
          title="A different kind of"
          highlight="technology partner."
          description="What working with us feels like, and why it holds up long after launch."
          className="lg:sticky lg:top-32 lg:self-start"
        />

        {/* Hovering one reason dims the rest, so the list reads like a spotlight. */}
        <Stagger stagger={0.08} className="flex flex-col border-b border-white/[0.08] [&:hover>div]:opacity-40 [&>div:hover]:opacity-100">
          {WHY_INFERAGO.map((item, i) => (
            <StaggerItem key={item.title} className="transition-opacity duration-500">
              <div className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-3 border-t border-white/[0.08] py-8 sm:gap-x-10 sm:py-10">
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-fg/70 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="pt-2 text-xs font-medium tracking-[0.16em] text-fg/35 tabular-nums transition-colors duration-500 group-hover:text-fg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  <h3 className="text-2xl font-medium tracking-[-0.035em] text-fg sm:text-4xl">{item.title}</h3>
                  <p className="max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">{item.description}</p>
                </div>
                <span className="mt-1 grid size-10 place-items-center rounded-full border border-white/10 text-fg-muted transition-colors duration-500 group-hover:border-fg group-hover:bg-fg group-hover:text-black">
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
