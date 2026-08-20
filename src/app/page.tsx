import { Hero } from "@/components/home/hero";
import { IntroStrip } from "@/components/home/intro-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { CorePillars } from "@/components/home/core-pillars";
import { WhyInferago } from "@/components/home/why-inferago";
import { ProcessPreview } from "@/components/home/process-preview";
import { Technologies } from "@/components/home/technologies";
import { AICrossover } from "@/components/home/ai-crossover";
import { CTASection } from "@/components/shared/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStrip />
      <FeaturedWork />
      <CorePillars />
      <WhyInferago />
      <ProcessPreview />
      <Technologies />
      <AICrossover />
      <CTASection
        eyebrow="Get Started"
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
