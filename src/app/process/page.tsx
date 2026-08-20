import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/process/process-step";
import { CTASection } from "@/components/shared/cta-section";
import { PROCESS_STEPS } from "@/data/services";

export const metadata: Metadata = {
  title: "Process — Inferago Tech & Digital Services",
  description: "How Inferago takes a project from idea to launch and beyond.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading eyebrow="Process" title="From Idea to Launch." />
        </Container>
      </section>

      <section className="border-t border-border-soft py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
