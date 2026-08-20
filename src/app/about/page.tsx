import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "About — Inferago Tech & Digital Services",
  description:
    "Inferago is a technology company focused on helping businesses build digital products, adopt AI and grow through technology.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="Technology Built With Purpose."
            description="Inferago is a technology company focused on helping businesses build digital products, adopt AI and grow through technology."
          />
        </Container>
      </section>

      <section className="border-t border-border-soft py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface p-8">
            <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
              AI Services
            </span>
            <p className="text-sm text-fg-muted">
              AI solutions, automation, intelligent systems and AI integrations.
            </p>
            <a
              href="https://inferago.com"
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-sm font-medium text-fg hover:text-accent-orange"
            >
              Explore Inferago AI →
            </a>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface p-8">
            <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
              Tech &amp; Digital Services
            </span>
            <p className="text-sm text-fg-muted">
              Digital products and growth services for businesses — websites,
              applications, software, e-commerce, marketing and SEO.
            </p>
            <span className="mt-2 text-sm font-medium text-fg-muted">
              You are here
            </span>
          </div>
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
