import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DitherField } from "@/components/ui/dither-field";
import { Eyebrow } from "@/components/ui/section-heading";
import { COMPANY_CONTACT } from "@/data/company";

export function CTASection({
  eyebrow,
  title,
  description,
  buttonLabel = "Start a project",
  buttonHref = "/contact",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  const email = COMPANY_CONTACT.email;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="card relative overflow-hidden">
          <DitherField
            tone="grey"
            interactive
            className="inset-0 opacity-70"
            shape={[0.95, 0.5, 0.55, 1]}
            bias={0.5}
          />

          <div className="relative grid grid-cols-1 items-center gap-10 px-7 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-4">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <h2 className="max-w-xl text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-fg sm:text-5xl lg:text-[3.5rem]">
                {title}
              </h2>
              {description && (
                <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
                  {description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-[20px] border border-white/[0.08] bg-black/65 p-3 backdrop-blur-md lg:w-80 lg:justify-self-end">
              <Button href={buttonHref} className="w-full justify-between px-5 py-3">
                {buttonLabel}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              {email && (
                <>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center justify-between gap-4 rounded-full border border-white/10 px-5 py-3 text-sm text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
                  >
                    <span className="flex min-w-0 items-center gap-2.5 truncate">
                      <Mail className="size-4" strokeWidth={1.75} />
                      {email}
                    </span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
