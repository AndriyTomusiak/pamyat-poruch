"use client";

import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { gallery, galleryNote } from "@/content/site";

export function Gallery() {
  return (
    <Section id="works" title="Як виглядає догляд" intro={galleryNote}>
      <div className="grid gap-8">
        {gallery.map((item, index) => (
          <Reveal key={item.id} delay={index % 3}>
            <div className="grid gap-3 md:grid-cols-2">
              <figure>
                <Image
                  src={item.before.src}
                  alt={item.before.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-auto w-full rounded-2xl"
                />
                <figcaption className="mt-2 text-sm text-muted">До</figcaption>
              </figure>
              <figure>
                <Image
                  src={item.after.src}
                  alt={item.after.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-auto w-full rounded-2xl"
                />
                <figcaption className="mt-2 text-sm text-muted">Після</figcaption>
              </figure>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
