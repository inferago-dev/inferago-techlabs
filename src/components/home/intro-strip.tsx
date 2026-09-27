import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { AutomateVisual, BuildVisual, GrowVisual } from "@/components/home/pillar-visuals";

/* Each pillar takes one brand colour, in gradient order. */
const PILLARS = [
  {
    title: "Build",
    description: "Websites, apps and custom software engineered to last.",
    tags: ["Websites", "Apps", "Software"],
    dot: "bg-accent-blue",
    Visual: BuildVisual,
  },
  {
    title: "Grow",
    description: "Marketing and SEO that turn traffic into revenue.",
    tags: ["SEO", "Social", "Ads"],
    dot: "bg-accent-orange",
    Visual: GrowVisual,
  },
  {
    title: "Automate",
    description: "AI and workflows that remove repetitive work.",
    tags: ["AI agents", "Workflows", "APIs"],
    dot: "bg-accent-sand",
    Visual: AutomateVisual,
  },
];

export function IntroStrip() {
  return (
    <section className="py-24 sm:py-36">
      <Container className="flex flex-col gap-16 sm:gap-24">
        <div className="flex flex-col gap-8">
          <Eyebrow>Build. Grow. Scale.</Eyebrow>
          <ScrollWords
            text="We combine design, engineering and digital strategy to help businesses create better digital experiences and stronger digital operations."
            className="max-w-5xl text-3xl leading-[1.15] font-medium tracking-[-0.035em] text-fg sm:text-4xl lg:text-5xl"
          />
        </div>

        <Stagger stagger={0.12} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map(({ title, description, tags, dot, Visual }, i) => (
            <StaggerItem key={title}>
              <div className="card card-interactive group flex h-full flex-col overflow-hidden">
                {/* Illustration, full-bleed on a faint dot grid. */}
                <div className="relative grid h-56 place-items-center border-b border-white/[0.06] bg-bg-secondary px-8">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]"
                  />
                  <div aria-hidden className="relative flex w-full justify-center">
                    <Visual />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-3 text-2xl font-medium tracking-[-0.03em] text-fg">
                      <span className={`size-2 rounded-full ${dot}`} />
                      {title}
                    </h3>
                    <span className="text-xs font-medium text-fg/30 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
                  <p className="mt-auto border-t border-white/[0.06] pt-4 text-xs text-fg/60">
                    {tags.join("  ·  ")}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
