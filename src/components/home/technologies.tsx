import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import { TECHNOLOGY_GROUPS } from "@/data/technologies";

export function Technologies() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Stack" title="Built With Modern Technology" align="center" />

        <div className="flex flex-col gap-8">
          {TECHNOLOGY_GROUPS.map((group) => (
            <div key={group.category} className="flex flex-col items-center gap-4">
              <span className="text-xs font-medium tracking-[0.15em] text-fg-muted uppercase">
                {group.category}
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {group.items.map((item) => (
                  <TechnologyBadge key={item} name={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
