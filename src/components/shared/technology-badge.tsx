export function TechnologyBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-sm text-fg/75 transition-colors hover:border-white/25 hover:text-fg">
      {name}
    </span>
  );
}
