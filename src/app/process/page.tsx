import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProcessTimeline } from "@/components/process/process-timeline";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { PROCESS_STEPS } from "@/data/services";

export const metadata: Metadata = {
  title: "Process | Inferago Tech & Digital Services",
  description: "How Inferago takes a project from idea to launch and beyond.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Process" title="From Idea" highlight="to Launch." />

      <section className="py-24 sm:py-32">
        <Container>
          <ProcessTimeline steps={PROCESS_STEPS} />
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
