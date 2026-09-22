export function PageHero({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-lavender-100/70 bg-gradient-hero dark:border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-lavender-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="container relative py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
        {action ? <div className="mt-8">{action}</div> : null}
      </div>
    </section>
  );
}
