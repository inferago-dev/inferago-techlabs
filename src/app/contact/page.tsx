import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DitherField } from "@/components/ui/dither-field";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { COMPANY_CONTACT } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact | Inferago Tech & Digital Services",
  description: "Tell us what you're trying to build.",
};

const CONTACT_LABELS: Record<keyof typeof COMPANY_CONTACT, string> = {
  email: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  location: "Location",
};

export default function ContactPage() {
  const channels = Object.entries(COMPANY_CONTACT).filter(([, value]) => Boolean(value));

  return (
    <section className="relative overflow-hidden pt-44 pb-24 sm:pt-52 sm:pb-32">
      <DitherField
        tone="grey"
        interactive
        className="inset-x-0 top-0 h-[520px]"
        shape={[0.78, 0, 0.5, 0.7]}

      />

      <Container className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build"
            highlight="something."
            description="Tell us what you're trying to build. We'll help you figure out the right approach."
            className="[&_h2]:text-5xl sm:[&_h2]:text-6xl lg:[&_h2]:text-7xl"
          />
          <div className="card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>

        {channels.length > 0 && (
          <div className="card flex flex-col gap-5 self-start p-7">
            <span className="text-sm font-medium text-fg">Reach us directly</span>
            {channels.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1 border-t border-white/[0.06] pt-4">
                <span className="text-sm text-fg-muted">
                  {CONTACT_LABELS[key as keyof typeof COMPANY_CONTACT]}
                </span>
                <span className="text-sm text-fg">{value}</span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
