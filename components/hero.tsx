import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { goldButtonClass, ghostButtonClass } from "@/components/styles";
import { hero, scenes, site } from "@/content/site";

export function Hero() {
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
      <Reveal fromStart delay={1}>
        <Photo
          src={scenes.hero.src}
          alt={scenes.hero.alt}
          priority
          className="h-80 w-full rounded-3xl object-cover md:h-[32rem]"
        />
      </Reveal>
    </section>
  );
}
