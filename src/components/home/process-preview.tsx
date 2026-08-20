import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/process/process-step";
import { PROCESS_STEPS } from "@/data/services";

export function ProcessPreview() {
  return (
    <section className="border-t border-border-soft py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Our Process" title="From Idea to Launch." />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>

        <Link
          href="/process"
          className="self-center text-sm font-medium text-fg transition-colors hover:text-accent-orange"
        >
          See The Full Process →
        </Link>
      </Container>
    </section>
  );
}
