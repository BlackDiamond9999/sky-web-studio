export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm uppercase tracking-[0.28em] text-sky">{eyebrow}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
      {description ? <p className="text-lg leading-8 text-muted">{description}</p> : null}
    </div>
  );
}
