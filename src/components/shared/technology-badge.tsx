export function TechnologyBadge({ name }: { name: string }) {
  return (
    <span className="rounded-full border border-border-soft bg-white/[0.03] px-4 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent-orange/40 hover:text-fg">
      {name}
    </span>
  );
}
