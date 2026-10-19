import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { goldButtonClass, ghostButtonClass } from "@/components/styles";
import { hero, packages, scenes, site } from "@/content/site";
import { formatUah } from "@/lib/format";

export function Hero() {
  const facts = [
    { label: "Вартість", value: `від ${formatUah(packages[0].price)}` },
    ...hero.facts,
  ];

  return (
    <section
      id="hero"
      className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
    >
      <Reveal fromStart>
        <p className="text-sm tracking-wide text-gold">{site.areaLabel}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className={goldButtonClass} href="#contacts">
            Залишити заявку
          </a>
          <a className={ghostButtonClass} href="#packages">
            Дивитися пакети
          </a>
        </div>
      </Reveal>
      <div className="grid gap-4">
        <Reveal fromStart delay={1}>
          <Photo
            src={scenes.hero.src}
            alt={scenes.hero.alt}
            priority
            className="h-64 w-full rounded-3xl object-cover md:h-80"
          />
        </Reveal>
        <Reveal fromStart delay={2}>
          <div className="rounded-3xl border border-line bg-card p-6">
            <dl className="grid gap-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-xl text-foreground">{fact.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-sm text-muted">Години</dt>
                <dd className="mt-1 text-xl text-foreground">{site.hoursLabel}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
