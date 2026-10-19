import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { scenes } from "@/content/site";

export function PictureBand() {
  return (
    <section aria-label="Прибирання, миття пам’ятника, щебінь і заросла ділянка" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-10 md:grid-cols-4">
        {scenes.band.map((item, index) => (
          <Reveal key={item.src} delay={index}>
            <Photo
              src={item.src}
              alt={item.alt}
              sizes="(min-width: 768px) 22vw, 50vw"
              className="h-40 w-full rounded-2xl object-cover md:h-52"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
