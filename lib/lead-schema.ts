import { z } from "zod";

import { extraIds, packageIds, type CareMode, type ExtraId, type PackageId } from "../content/site";
import { normalizeUaMobile } from "./phone";

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Вкажіть ім’я.").max(80, "Скоротіть ім’я."),
    phone: z
      .string()
      .trim()
      .min(1, "Вкажіть номер телефону.")
      .transform((value, ctx) => {
        const normalized = normalizeUaMobile(value);
        if (!normalized) {
          ctx.addIssue({ code: "custom", message: "Вкажіть український мобільний номер." });
          return z.NEVER;
        }
        return normalized;
      }),
    cemetery: z.string().trim().min(2, "Вкажіть кладовище.").max(160, "Скоротіть назву кладовища."),
    plot: z.string().trim().max(200, "Скоротіть орієнтир.").default(""),
    packageId: z.enum(packageIds, "Оберіть пакет."),
    mode: z.enum(["once", "year"], "Оберіть режим догляду."),
    visits: z.number().int().min(1).max(3),
    extras: z
      .array(
        z.object({
          id: z.enum(extraIds),
          qty: z.number().int().min(0).max(3),
        }),
      )
      .max(extraIds.length),
    date: z
      .string()
      .trim()
      .max(10)
      .regex(/^$|^\d{4}-\d{2}-\d{2}$/, "Вкажіть дату у форматі РРРР-ММ-ДД.")
      .default(""),
    comment: z.string().trim().max(1000, "Скоротіть коментар.").default(""),
    consent: z.literal(true, "Потрібна згода на обробку даних."),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "once" && data.visits !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["visits"],
        message: "Для разового візиту кількість візитів — 1.",
      });
    }
    const seen = new Set<string>();
    data.extras.forEach((extra, index) => {
      if (seen.has(extra.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["extras", index, "id"],
          message: "Послуга повторюється.",
        });
      }
      seen.add(extra.id);
      const max = data.mode === "once" ? 1 : 3;
      if (extra.qty > max) {
        ctx.addIssue({
          code: "custom",
          path: ["extras", index, "qty"],
          message: "Перевірте кількість послуги.",
        });
      }
    });
  });

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema> & {
  packageId: PackageId;
  mode: CareMode;
  extras: { id: ExtraId; qty: number }[];
};

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}
