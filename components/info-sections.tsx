import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import {
  cemeteries,
  contractItems,
  directions,
  faq,
  processSteps,
  remoteSteps,
  reviews,
  reviewsEmpty,
  scenes,
  seoCopy,
} from "@/content/site";

function Cards({
  items,
}: {
  items: readonly {
    title: string;
    text: string;
    image?: { src: string; alt: string };
  }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index % 3} className="h-full">
          <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card">
            {item.image ? (
              <Photo
                src={item.image.src}
                alt={item.image.alt}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="h-44 w-full object-cover"
              />
            ) : null}
            <div className="p-6">
              <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function SeoCopy() {
  return (
    <Section id="about" title={seoCopy.title}>
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            {seoCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={1}>
          <Photo
            src={scenes.seo.src}
            alt={scenes.seo.alt}
            className="h-72 w-full rounded-3xl object-cover md:h-96"
          />
        </Reveal>
      </div>
    </Section>
  );
}

export function Directions() {
  return (
    <Section id="areas" title="Що можна замовити">
      <Cards items={directions} />
    </Section>
  );
}

export function RemoteOrder() {
  return (
    <Section
      id="remote"
      title="Якщо ви не в місті"
      intro="Три кроки, коли замовити догляд потрібно дистанційно."
    >
      <Cards items={remoteSteps} />
    </Section>
  );
}

export function Process() {
  return (
    <Section id="process" title="Як це працює">
      <ol className="grid gap-4 md:grid-cols-3">
        {processSteps.map((step, index) => (
          <li key={step.title} className="h-full">
            <Reveal delay={index} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-card p-6">
                <p className="text-sm text-gold">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl text-foreground">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Contract() {
  return (
    <Section
      id="contract"
      title="Що фіксуємо в домовленості"
      intro="Перед виїздом проговорюємо і записуємо однаковий для обох сторін обсяг."
    >
      <Cards items={contractItems} />
    </Section>
  );
}

export function Cemeteries() {
  const city = cemeteries.filter((item) => item.group === "city");
  const community = cemeteries.filter((item) => item.group === "community");
  return (
    <Section
      id="cemeteries"
      title="Кладовища"
      intro="Доглядаємо наявні поховання у Хмельницькому і Хмельницькій міській громаді. Назви варто звірити перед публікацією, тож карти тут немає."
    >
      <CemeteryGroup label="Хмельницький" items={city} />
      <div className="mt-8">
        <CemeteryGroup label="Сільські кладовища громади" items={community} />
      </div>
    </Section>
  );
}

function CemeteryGroup({
  label,
  items,
}: {
  label: string;
  items: typeof cemeteries;
}) {
  return (
    <div>
      <p className="text-sm text-gold">{label}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index % 3} className="h-full">
            <article className="h-full rounded-2xl border border-line bg-card p-4">
              <h3 className="text-lg text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
              {item.mapUrl ? (
                <a className="mt-3 inline-flex text-sm text-gold underline" href={item.mapUrl}>
                  Карта
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  const published = reviews.filter((item) => item.verified);
  return (
    <Section id="reviews" title="Відгуки">
      {published.length === 0 ? (
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{reviewsEmpty}</p>
        </Reveal>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {published.map((item) => (
            <article key={item.id} className="rounded-3xl border border-line bg-card p-6">
              <h3 className="text-lg text-foreground">{item.author}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" title="Питання і відповіді">
      <Reveal>
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-foreground">{item.question}</h3>
                <span aria-hidden="true" className="text-gold group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden text-gold group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
