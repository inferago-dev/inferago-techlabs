import { Check, Lock, Sparkles, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/motion/reveal";
import { DitherField } from "@/components/ui/dither-field";
import { cn } from "@/lib/utils";

const PIPELINE = [
  { label: "Design", state: "done" },
  { label: "Build", state: "done" },
  { label: "Launch", state: "active" },
] as const;

const BARS = [28, 36, 32, 48, 44, 60, 72, 88];

const glass =
  "rounded-2xl border border-white/10 bg-black/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl";

/**
 * Illustrative composition for the hero: a site in a browser window, flanked
 * by cards for the launch pipeline, an AI assistant and growth, all floating
 * over a dithered grain orb.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-[440px] w-full select-none sm:h-[520px] lg:h-[580px]", className)}>
      {/* Grain orb behind the cards. */}
      <DitherField
        interactive
        className="-inset-x-16 -inset-y-10"
        shape={[0.52, 0.48, 0.42, 0.5]}
        bias={0.62}
      />

      {/* Browser window */}
      <FadeIn delay={0.5} y={30} className="absolute top-[12%] left-[4%] w-[82%] sm:left-[8%] sm:w-[76%]">
        <div className={cn(glass, "overflow-hidden")}>
          <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-accent-blue" />
              <span className="size-2.5 rounded-full bg-accent-orange" />
              <span className="size-2.5 rounded-full bg-accent-sand" />
            </div>
            <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[11px] text-fg-muted">
              <Lock className="size-3" />
              yourbrand.com
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-5 p-5 sm:p-6">
            <div className="flex flex-col gap-2.5">
              <span className="h-2 w-12 rounded-full bg-accent-orange/70" />
              <span className="h-3.5 w-full rounded-full bg-white/80" />
              <span className="h-3.5 w-4/5 rounded-full bg-white/80" />
              <span className="mt-1 h-2 w-full rounded-full bg-white/15" />
              <span className="h-2 w-3/4 rounded-full bg-white/15" />
              <div className="mt-3 flex gap-2">
                <span className="h-6 w-20 rounded-full bg-fg" />
                <span className="h-6 w-16 rounded-full border border-white/15" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1996eb,#ef6b39_55%,#d1c9a3)] opacity-90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] p-5 sm:p-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="size-6 rounded-lg bg-white/[0.08]" />
                <span className="h-2 w-4/5 rounded-full bg-white/25" />
                <span className="h-2 w-3/5 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Launch pipeline */}
      <FadeIn delay={0.8} className="absolute top-0 right-0 sm:right-[2%]">
        <div className={cn(glass, "float-slow w-48 p-4")}>
          <span className="text-[11px] tracking-[0.18em] text-fg-muted uppercase">Project</span>
          <ul className="mt-3 flex flex-col gap-2.5">
            {PIPELINE.map(({ label, state }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                {state === "done" ? (
                  <span className="grid size-5 place-items-center rounded-full bg-white/10">
                    <Check className="size-3 text-fg" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="relative grid size-5 place-items-center">
                    <span className="absolute size-5 animate-ping rounded-full bg-accent-orange/40" />
                    <span className="size-2.5 rounded-full bg-accent-orange" />
                  </span>
                )}
                <span className={state === "done" ? "text-fg-muted" : "text-fg"}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* AI assistant */}
      <FadeIn delay={1} className="absolute bottom-[4%] left-0">
        <div className={cn(glass, "float-slower w-60 p-4 sm:w-64")}>
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-accent-blue/20">
              <Sparkles className="size-3.5 text-accent-blue" />
            </span>
            <span className="text-xs font-medium text-fg">AI assistant</span>
          </div>
          <p className="mt-3 rounded-xl bg-white/[0.06] px-3 py-2 text-xs leading-relaxed text-fg/80">
            Draft follow-ups for this week&apos;s new leads.
          </p>
          <div className="mt-2.5 flex items-center gap-1 pl-1">
            <span className="size-1.5 animate-bounce rounded-full bg-fg/60 [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-fg/60 [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-fg/60" />
          </div>
        </div>
      </FadeIn>

      {/* Growth */}
      <FadeIn delay={1.2} className="absolute right-[2%] bottom-[10%] hidden sm:block">
        <div className={cn(glass, "float-slow w-52 p-4")}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-fg">Organic traffic</span>
            <TrendingUp className="size-4 text-accent-sand" />
          </div>
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {BARS.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={cn(
                  "flex-1 rounded-sm",
                  i === BARS.length - 1 ? "bg-accent-orange" : "bg-white/15"
                )}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
