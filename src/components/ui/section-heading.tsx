import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-xs font-medium tracking-[0.22em] text-fg-muted uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Trailing words rendered in a dimmed tone. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="max-w-3xl text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-fg sm:text-5xl lg:text-[3.5rem]">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-fg/40">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
