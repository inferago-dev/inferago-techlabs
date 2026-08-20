import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/shared/cta-section";
import { SERVICE_GROUPS } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Inferago Tech & Digital Services",
  description:
    "Website and app development, custom software, e-commerce, digital marketing, SEO and AI integration.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Technology Built Around Your Business."
          />
        </Container>
      </section>

      {SERVICE_GROUPS.map((group) => (
        <section key={group.key} className="border-t border-border-soft py-20 sm:py-28">
          <Container className="flex flex-col gap-10">
            <span className="text-xs font-medium tracking-[0.2em] text-accent-orange uppercase">
              {group.title}
            </span>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {group.services.map((service) => (
                <div key={service.title} className="flex flex-col gap-3">
                  <h3 className="text-xl font-medium text-fg">{service.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {service.items.map((item) => (
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
      ))}

      <section className="border-t border-border-soft py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-4 rounded-lg border border-border-soft bg-surface px-8 py-12 text-center">
          <h2 className="text-2xl font-medium text-fg">
            Existing software can become smarter.
          </h2>
          <p className="max-w-xl text-sm text-fg-muted">
            AI feature integration, AI APIs, automation, workflows and agents —
            layered onto what you already have.
          </p>
          <a
            href="https://inferago.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-accent-orange transition-opacity hover:opacity-80"
          >
            Explore Inferago AI →
          </a>
        </Container>
      </section>

      <section className="border-t border-border-soft py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-4 rounded-lg border border-border-soft bg-surface px-8 py-12 text-center">
          <h2 className="text-2xl font-medium text-fg">Pricing, scoped to what you actually need.</h2>
          <p className="max-w-xl text-sm text-fg-muted">
            Project and AMC pricing depends on scope — systems involved, response
            SLA and monthly hours. Tell us about your project and we&apos;ll put
            together a quote.
          </p>
          <Link
            href="/contact"
            className="text-sm font-medium text-accent-orange transition-opacity hover:opacity-80"
          >
            Get a Custom Quote →
          </Link>
        </Container>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Tell us what you're trying to build. We'll help you figure out the right approach."
      />
    </>
  );
}
