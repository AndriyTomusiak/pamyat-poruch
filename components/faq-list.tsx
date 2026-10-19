"use client";

import { useState } from "react";

export function FaqList({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  function toggle(question: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  }

  return (
    <div className="max-w-3xl divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open.has(item.question);
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => toggle(item.question)}
              >
                <span className="text-lg font-medium text-foreground">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-gold"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-4 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
