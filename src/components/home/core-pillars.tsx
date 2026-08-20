import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICE_PILLARS } from "@/data/services";

export function CorePillars() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="What We Do" title="Technology Built Around Your Business." />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PILLARS.map((pillar) => (
            <div
              key={pillar.key}
              className="flex flex-col gap-4 rounded-lg border border-border-soft bg-surface p-8 transition-all duration-200 hover:-translate-y-1 hover:border-accent-orange/40 hover:shadow-[0_16px_40px_-16px_rgba(255,60,0,0.25)]"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
                {pillar.label}
              </span>
              <h3 className="text-xl font-medium text-fg">{pillar.title}</h3>
              <p className="text-sm text-fg-muted">{pillar.tagline}</p>
              <ul className="mt-2 flex flex-col gap-2 border-t border-border-soft pt-4">
                {pillar.items.map((item) => (
                  <li key={item} className="text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
