import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ href, variant = "primary", className, children, onClick }: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
        variant === "primary" &&
          "bg-fg text-black hover:bg-white",
        variant === "secondary" &&
          "border border-white/10 bg-white/[0.03] text-fg backdrop-blur-md hover:border-white/20 hover:bg-white/[0.07]",
        className
      )}
    >
      {children}
    </Link>
  );
}
