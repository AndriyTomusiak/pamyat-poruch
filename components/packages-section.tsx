import { ChooseAnnual, ChoosePackage } from "@/components/choose";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { annual, packages } from "@/content/site";
import { formatUah } from "@/lib/format";

export function PackagesSection() {
  return (
    <Section
      id="packages"
      title="Пакети"
      intro="Три пакети для разового візиту. Річний графік збирається з того самого пакета і кількості приїздів."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((item, index) => (
          <Reveal key={item.id} delay={index % 3} className="h-full">
            <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-6">
              <h3 className="font-display text-3xl text-foreground">{item.name}</h3>
              <p className="mt-3 text-2xl text-gold">{formatUah(item.price)}</p>
              <p className="mt-3 text-muted">{item.summary}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm leading-relaxed text-foreground">
                {item.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="mt-6">
                <ChoosePackage id={item.id} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
      <article className="rounded-3xl border border-gold/40 bg-card p-6 md:p-8">
        <h3 className="font-display text-3xl text-foreground">{annual.title}</h3>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{annual.text}</p>
        <div className="mt-6">
          <ChooseAnnual />
        </div>
      </article>
      </Reveal>
    </Section>
  );
}
