import { Catalog } from "@/components/catalog";
import { nugetPackages, packages } from "@/content/packages";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="bg-grid">
      <section className="container pb-10 pt-16 sm:pb-14 sm:pt-24">
        <p className="eyebrow">Product portfolio</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Production <span className="heading-gradient">.NET MAUI</span> plugins, documented in one place
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {siteConfig.name} publishes focused NuGet packages for field, enterprise, and always-connected
          mobile apps — location, real connectivity, durable queues, encrypted storage, VoIP, and
          observability. Each package versions independently.
        </p>
        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
          <Stat value={String(nugetPackages.length)} label="On NuGet" />
          <Stat value={String(packages.length)} label="In catalog" />
          <Stat value="net10" label="MAUI target" />
        </dl>
      </section>

      <section className="container pb-20 sm:pb-28">
        <Catalog />
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card px-3 py-4 text-center">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold text-lavender-800">{value}</dd>
    </div>
  );
}
