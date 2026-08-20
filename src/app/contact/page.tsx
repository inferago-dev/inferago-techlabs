import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { COMPANY_CONTACT } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact — Inferago Tech & Digital Services",
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
    <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something."
            description="Tell us what you're trying to build. We'll help you figure out the right approach."
          />
          <ContactForm />
        </div>

        {channels.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium tracking-[0.15em] text-fg-muted uppercase">
              Reach Us Directly
            </span>
            {channels.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-xs text-fg-muted">
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
