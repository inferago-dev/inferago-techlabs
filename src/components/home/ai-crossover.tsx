import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DitherField } from "@/components/ui/dither-field";
import { Eyebrow } from "@/components/ui/section-heading";

/* How AI slots into a business, told as a left-to-right journey. */
const JOURNEY = [
  { title: "Connect", caption: "Plug AI models into the systems and data you already use." },
  { title: "Enhance", caption: "Add smart search, content and insights to your product." },
  { title: "Automate", caption: "Agents and workflows take repetitive work off your team." },
  { title: "Scale", caption: "Roll out what works across the rest of the business." },
];

export function AICrossover() {
  return (
    <section className="pt-8 sm:pt-12">
      <Container>
        <div className="card relative overflow-hidden">
          <DitherField
            tone="grey"
            interactive
            className="inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,#000_45%,transparent_75%)]"
            shape={[0.95, 0.1, 0.5, 0.75]}
            bias={0.52}
          />

          <div className="relative flex flex-col gap-14 p-8 sm:p-12 lg:gap-16 lg:p-14">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="flex max-w-xl flex-col gap-4">
                <Eyebrow>Inferago AI</Eyebrow>
                <h2 className="text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-fg sm:text-5xl">
                  Need more than software?
                </h2>
                <p className="max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
                  Add intelligent automation and AI capabilities to your digital products
                  with Inferago AI.
                </p>
              </div>
              <a
                href="https://inferago.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white"
              >
                Explore Inferago AI
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Timeline: a light runs along the rail and each stop lights up as it arrives. */}
            <ol className="relative grid grid-cols-1 gap-4 pl-10 lg:grid-cols-4 lg:gap-4 lg:pt-14 lg:pl-0">
              <span aria-hidden className="absolute top-3 bottom-3 left-[13px] w-px bg-white/15 lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto">
                <span className="rail-run-y absolute left-1/2 h-16 w-px -translate-x-1/2 -translate-y-full bg-[linear-gradient(to_bottom,transparent,#ef6b39)] lg:hidden" />
                <span className="rail-run-x absolute top-1/2 hidden h-px w-28 -translate-x-full -translate-y-1/2 bg-[linear-gradient(to_right,transparent,#ef6b39)] lg:block" />
              </span>

              {JOURNEY.map((stop, i) => (
                <li
                  key={stop.title}
                  className="relative flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/55 p-5 backdrop-blur-md sm:p-6"
                >
                  <span
                    aria-hidden
                    style={{ animationDelay: `${i * 1.5}s` }}
                    className="stop-light absolute top-5 -left-10 grid size-[27px] place-items-center rounded-full border border-white/20 bg-surface text-[10px] font-medium text-fg-muted tabular-nums lg:-top-14 lg:left-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-fg">{stop.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{stop.caption}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
