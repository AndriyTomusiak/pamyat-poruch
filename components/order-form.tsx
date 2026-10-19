"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState, type FormEvent } from "react";

import { useOrder } from "@/components/order-provider";
import { fieldClass, goldButtonClass } from "@/components/styles";
import { cemeteries, extras, packages, site } from "@/content/site";
import { formatUah } from "@/lib/format";
import { fieldErrors, leadSchema } from "@/lib/lead-schema";
import { LEAD_SUCCESS_MESSAGE, LEAD_VALIDATION_MESSAGE } from "@/lib/messages";

export function OrderForm() {
  const order = useOrder();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const [cemeteryChoice, setCemeteryChoice] = useState(cemeteries[0]?.name ?? "");
  const selected = packages.find((item) => item.id === order.packageId) ?? packages[0];
  const chosenExtras = extras.filter((item) => (order.extras[item.id] ?? 0) > 0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const form = new FormData(event.currentTarget);
    const cemetery =
      cemeteryChoice === "other" ? String(form.get("cemeteryOther") ?? "") : cemeteryChoice;
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      cemetery,
      plot: String(form.get("plot") ?? ""),
      packageId: order.packageId,
      mode: order.mode,
      visits: order.mode === "year" ? order.visits : 1,
      extras: extras.map((item) => ({
        id: item.id,
        qty:
          order.mode === "once"
            ? (order.extras[item.id] ?? 0) > 0
              ? 1
              : 0
            : (order.extras[item.id] ?? 0),
      })),
      date: String(form.get("date") ?? ""),
      comment: String(form.get("comment") ?? ""),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") ?? ""),
    };
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setFormError(LEAD_VALIDATION_MESSAGE);
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, companyWebsite: payload.companyWebsite }),
      });
      const data = (await response.json()) as { message?: string; fields?: Record<string, string> };
      if (!response.ok) {
        setErrors(data.fields ?? {});
        setFormError(data.message ?? LEAD_VALIDATION_MESSAGE);
        return;
      }
      setSuccess(data.message ?? LEAD_SUCCESS_MESSAGE);
    } catch {
      setFormError("Не вдалося надіслати заявку. Зателефонуйте або напишіть у месенджер.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <motion.p
        role="status"
        className="rounded-3xl border border-gold/50 bg-card p-6 text-lg text-foreground"
        initial={reduce === false ? { y: 8 } : false}
        animate={{ y: 0 }}
      >
        {success}
      </motion.p>
    );
  }

  return (
    <form className="relative grid scroll-mb-28 gap-5" onSubmit={onSubmit} noValidate>
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Сайт компанії</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rounded-3xl border border-line bg-card p-5">
        <h3 className="font-display text-2xl text-foreground">У заявці</h3>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Пакет</dt>
            <dd>{selected.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Режим</dt>
            <dd>{order.mode === "year" ? "Річний догляд" : "Разовий візит"}</dd>
          </div>
          <div>
            <dt className="text-muted">Візити</dt>
            <dd>{order.mode === "year" ? order.visits : 1}</dd>
          </div>
          <div>
            <dt className="text-muted">Додаткові послуги</dt>
            <dd>
              {chosenExtras.length === 0
                ? "немає"
                : chosenExtras
                    .map((item) =>
                      order.mode === "year"
                        ? `${item.name} × ${order.extras[item.id]}`
                        : item.name,
                    )
                    .join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Сума</dt>
            <dd className="text-gold">{formatUah(order.total)}</dd>
          </div>
        </dl>
        <a className="mt-4 inline-flex text-sm text-gold underline underline-offset-4" href="#services">
          Змінити в калькуляторі
        </a>
      </div>

      <Field label="Ім’я" name="name" error={errors.name} autoComplete="name" required />
      <Field
        label="Телефон"
        name="phone"
        error={errors.phone}
        autoComplete="tel"
        inputMode="tel"
        required
      />

      <div>
        <label htmlFor="cemetery" className="text-sm font-medium">
          Кладовище
        </label>
        <select
          id="cemetery"
          name="cemeteryChoice"
          className={fieldClass}
          value={cemeteryChoice}
          onChange={(event) => setCemeteryChoice(event.target.value)}
          required
        >
          {cemeteries.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
          <option value="other">Інше</option>
        </select>
        {cemeteryChoice === "other" ? (
          <div className="mt-3">
            <label htmlFor="cemeteryOther" className="text-sm font-medium">
              Назва кладовища
            </label>
            <input id="cemeteryOther" name="cemeteryOther" className={fieldClass} required />
          </div>
        ) : null}
        {errors.cemetery ? <FieldError message={errors.cemetery} /> : null}
      </div>

      <Field label="Ділянка або орієнтир" name="plot" error={errors.plot} />
      <Field label="Бажана дата" name="date" type="date" error={errors.date} />

      <div>
        <label htmlFor="comment" className="text-sm font-medium">
          Коментар
        </label>
        <textarea id="comment" name="comment" rows={4} className={fieldClass} />
        {errors.comment ? <FieldError message={errors.comment} /> : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input className="mt-1" type="checkbox" name="consent" />
          <span>
            Погоджуюсь на обробку персональних даних згідно з{" "}
            <Link className="text-gold underline underline-offset-4" href="/consent">
              згодою
            </Link>{" "}
            та{" "}
            <Link className="text-gold underline underline-offset-4" href="/privacy">
              політикою конфіденційності
            </Link>
            .
          </span>
        </label>
        {errors.consent ? <FieldError message={errors.consent} /> : null}
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-gold-strong">
          {formError}
        </p>
      ) : null}

      <button className={`${goldButtonClass} w-full sm:w-auto`} type="submit" disabled={pending}>
        {pending ? "Надсилаємо…" : "Надіслати заявку"}
      </button>
      <p className="text-sm text-muted">
        Або одразу: <a href={site.phoneHref}>{site.phoneDisplay}</a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text";
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={fieldClass}
        aria-invalid={error ? true : undefined}
      />
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-sm text-gold-strong">
      {message}
    </p>
  );
}
