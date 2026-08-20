import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
        variant === "primary" &&
          "bg-[image:var(--gradient-brand)] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(255,60,0,0.45)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_32px_-6px_rgba(255,60,0,0.6)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-border-soft text-fg hover:border-accent-orange/60 hover:bg-white/5 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </Link>
  );
}
