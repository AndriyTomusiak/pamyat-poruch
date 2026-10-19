"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useOrder } from "@/components/order-provider";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { extras, packages, type CareMode } from "@/content/site";
import { formatUah } from "@/lib/format";

const modes: { id: CareMode; label: string }[] = [
  { id: "once", label: "Разовий візит" },
  { id: "year", label: "Річний догляд" },
];

export function Calculator() {
  const order = useOrder();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const selected = packages.find((item) => item.id === order.packageId) ?? packages[0];

  return (
    <Section
      id="services"
      title="Додаткові послуги"
      intro="Оберіть пакет і режим. У річному догляді кожну додаткову послугу можна закласти від нуля до трьох виконань."
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
        <div className="space-y-8">
          <fieldset>
            <legend className="text-sm font-medium text-foreground">Режим</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={order.mode === item.id}
                  className={`min-h-11 rounded-full px-4 text-sm font-medium ${
                    order.mode === item.id
                      ? "bg-gold text-ink"
                      : "border border-line text-foreground"
                  }`}
                  onClick={() => order.setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          {order.mode === "year" ? (
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              Річний догляд — це погоджений графік, договір, пріоритетний запис і фотозвіт після
              кожного візиту. Сума не є знижкою.
            </p>
          ) : null}

          <fieldset>
            <legend className="text-sm font-medium text-foreground">Пакет</legend>
            <div className="mt-3 grid gap-2">
              {packages.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 has-checked:border-gold"
                >
                  <span className="flex items-center gap-3">
                    <input
                      className="theme-radio"
                      type="radio"
                      name="calculator-package"
                      value={item.id}
                      checked={order.packageId === item.id}
                      onChange={() => order.setPackageId(item.id)}
                    />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-gold">{formatUah(item.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {order.mode === "year" ? (
            <fieldset>
              <legend className="text-sm font-medium text-foreground">Візити на рік</legend>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    aria-pressed={order.visits === count}
                    className={`min-h-11 min-w-11 rounded-full px-4 ${
                      order.visits === count ? "bg-gold text-ink" : "border border-line"
                    }`}
                    onClick={() => order.setVisits(count as 1 | 2 | 3)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <ul className="space-y-3">
            {extras.map((item) => {
              const qty = order.extras[item.id] ?? 0;
              return (
                <li key={item.id} className="rounded-2xl border border-line p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg text-foreground">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted">{item.description}</p>
                      <p className="mt-2 text-sm text-gold">{formatUah(item.price)}</p>
                    </div>
                    {order.mode === "once" ? (
                      <label className="inline-flex min-h-11 items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={qty > 0}
                          onChange={(event) => order.setExtraQty(item.id, event.target.checked ? 1 : 0)}
                        />
                        Додати
                      </label>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex size-11 items-center justify-center rounded-full border border-line"
                          aria-label={`Менше: ${item.name}`}
                          onClick={() => order.setExtraQty(item.id, qty - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center">{qty}</span>
                        <button
                          type="button"
                          className="inline-flex size-11 items-center justify-center rounded-full border border-line"
                          aria-label={`Більше: ${item.name}`}
                          onClick={() => order.setExtraQty(item.id, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        </Reveal>

        <Reveal delay={1}>
        <aside className="h-fit rounded-3xl border border-line bg-card p-6 lg:sticky lg:top-36">
          <h3 className="font-display text-3xl text-foreground">Підсумок</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Пакет</dt>
              <dd>{selected.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Режим</dt>
              <dd>{order.mode === "year" ? "Річний догляд" : "Разовий візит"}</dd>
            </div>
            {order.mode === "year" ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Візити</dt>
                <dd>{order.visits}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 text-sm text-muted">Орієнтовна сума</p>
          <motion.p
            key={`${order.mode}-${order.total}`}
            className="mt-1 font-display text-4xl text-gold"
            aria-live="polite"
            initial={mounted && reduce === false ? { y: 6 } : false}
            animate={{ y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {formatUah(order.total)}
          </motion.p>
          <a
            className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-gold underline decoration-gold/50 underline-offset-4"
            href="#contacts"
          >
            Перенести в заявку
          </a>
        </aside>
        </Reveal>
      </div>
    </Section>
  );
}
