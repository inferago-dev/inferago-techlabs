import type { Metadata } from "next";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "About | Inferago Tech & Digital Services",
  description:
    "Inferago is a technology company focused on helping businesses build digital products, adopt AI and grow through technology.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Technology built"
        highlight="with purpose."
        description="Inferago is a technology company focused on helping businesses build digital products, adopt AI and grow through technology."
      />

      <section className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="https://inferago.com"
            target="_blank"
            rel="noreferrer"
            className="card card-interactive group flex flex-col gap-3 p-8 sm:p-10"
          >
            <span className="mb-4 grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
              <Sparkles className="size-[18px] text-fg" strokeWidth={1.75} />
            </span>
            <h2 className="text-xl font-semibold text-fg">AI Services</h2>
            <p className="text-base leading-relaxed text-fg-muted">
              AI solutions, automation, intelligent systems and AI integrations.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
              Explore Inferago AI
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
          <div className="card flex flex-col gap-3 p-8 sm:p-10">
            <span className="mb-4 grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
              <Layers className="size-[18px] text-fg" strokeWidth={1.75} />
            </span>
            <h2 className="text-xl font-semibold text-fg">Tech &amp; Digital Services</h2>
            <p className="text-base leading-relaxed text-fg-muted">
              Digital products and growth services for businesses: websites,
              applications, software, e-commerce, marketing and SEO.
            </p>
            <span className="mt-auto pt-6 text-sm text-fg-muted">You are here</span>
          </div>
        </Container>
      </section>

      <CTASection
        title="Have a project in mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
