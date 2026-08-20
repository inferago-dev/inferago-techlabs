export function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-orange/40 hover:shadow-[0_16px_40px_-16px_rgba(255,60,0,0.25)]">
      <span className="text-sm font-medium text-accent-orange">{number}</span>
      <h3 className="text-lg font-medium text-fg">{title}</h3>
      <p className="text-sm text-fg-muted">{description}</p>
    </div>
  );
}
