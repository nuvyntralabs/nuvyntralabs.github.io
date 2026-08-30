export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-gradient-ink text-white">
      <div className="container py-16 sm:py-20">
        <p className="eyebrow-on-dark">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-lavender-100/80 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
