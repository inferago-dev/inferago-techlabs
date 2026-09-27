import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/reveal";
import { DitherField } from "@/components/ui/dither-field";
import { SelectedWord } from "@/components/home/hero-selected-word";

const SERVICES = ["Websites", "Apps", "Custom Software", "Marketing", "SEO", "AI Integration"];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-bg-secondary">
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Quiet grey grain across the whole canvas. */}
        <DitherField tone="grey" className="inset-0 opacity-40" shape={[0.5, 0.5, 1.1, 1.1]} bias={0.36} />
        {/* Clear pool behind the copy. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_40%_at_50%_44%,#07070a_35%,transparent_100%)]" />

        {/* Brand grain rising from the bottom edge. */}
        <div className="absolute inset-x-0 bottom-0 h-[46%] [mask-image:linear-gradient(to_bottom,transparent,#000_55%)]">
          <DitherField interactive className="inset-0" shape={[0.5, 1, 0.8, 1.05]} bias={0.6} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pt-32 pb-[14svh] text-center sm:px-8">
        <h1 className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.04em] text-fg sm:text-6xl lg:text-[4.25rem]">
          <FadeIn as="span" delay={0.15} y={24} className="block">
            We build <SelectedWord>digital</SelectedWord> products
          </FadeIn>
          <FadeIn as="span" delay={0.3} y={24} className="block">
            <span className="text-gradient-brand inline-block pb-[0.08em]">that move businesses forward.</span>
          </FadeIn>
        </h1>

        <FadeIn delay={0.5}>
          <p className="mx-auto mt-7 text-base leading-relaxed font-normal tracking-[-0.011em] text-fg/60 sm:text-lg">
            Websites, apps, custom software, marketing and AI,
            <br className="hidden sm:block" /> designed and built to help businesses grow.
          </p>
        </FadeIn>

        <FadeIn delay={0.65} className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/contact" variant="primary" className="px-6 py-3">
            Start a project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
          <Button href="/work" variant="secondary" className="bg-black/40 px-6 py-3">
            View our work
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </FadeIn>
      </div>

      {/* Services ticker resting on the grain. */}
      <FadeIn delay={0.85} className="border-t border-white/[0.08] bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-6 py-4 pr-5 sm:pr-8">
          <div className="flex min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee flex shrink-0 items-center gap-12 pr-12 text-sm text-fg-muted">
              {[...SERVICES, ...SERVICES].map((service, i) => (
                <li key={i} className="flex shrink-0 items-center gap-12">
                  {service}
                  <span aria-hidden className="size-1 rounded-full bg-white/25" />
                </li>
              ))}
            </ul>
          </div>
          <span className="hidden shrink-0 items-center gap-2 text-xs text-fg-muted sm:inline-flex">
            Scroll
            <ArrowDown className="size-3.5 animate-bounce" />
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
