import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { CTASection } from "@/components/shared/cta-section";
import { SERVICE_GROUPS } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Inferago Tech & Digital Services",
  description:
    "Website and app development, custom software, e-commerce, digital marketing, SEO and AI integration.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Technology built around" highlight="your business." />

      {SERVICE_GROUPS.map((group, i) => (
        <section key={group.key} className="py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[1fr_2.2fr]">
            <div className="flex flex-col gap-2 lg:sticky lg:top-32 lg:self-start">
              <span className="text-sm text-fg-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                {group.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.services.map((service) => (
                <div key={service.title} className="card card-interactive flex flex-col gap-4 p-7">
                  <h3 className="text-lg font-semibold text-fg">{service.title}</h3>
                  <ul className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-fg-muted" strokeWidth={2.25} />
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

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="card flex flex-col gap-3 p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-fg">
              Existing software can become smarter.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted">
              AI feature integration, AI APIs, automation, workflows and agents,
              layered onto what you already have.
            </p>
            <a
              href="https://inferago.com"
              target="_blank"
              rel="noreferrer"
              className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-fg transition-colors hover:text-fg/70"
            >
              Explore Inferago AI
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className="card flex flex-col gap-3 p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-fg">
              Pricing, scoped to what you actually need.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted">
              Project and AMC pricing depends on scope: systems involved, response
              SLA and monthly hours. Tell us about your project and we&apos;ll put
              together a quote.
            </p>
            <Link
              href="/contact"
              className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-fg transition-colors hover:text-fg/70"
            >
              Get a custom quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
