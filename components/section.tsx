import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  return (
      <section
        id={id}
        aria-labelledby={titleId}
        className="scroll-mt-36 scroll-mb-24 border-t border-line py-16 md:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-4">
          <Reveal>
            <h2
              id={titleId}
              className="max-w-3xl font-display text-4xl leading-tight text-gold md:text-5xl"
            >
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
            ) : null}
          </Reveal>
          <div className="mt-10">{children}</div>
        </div>
      </section>
  );
}
