import assert from "node:assert/strict";
import test from "node:test";

import { leadSchema } from "./lead-schema";

const valid = {
  name: "Олена Коваль",
  phone: "+380671234567",
  cemetery: "Ракове",
  plot: "центральна алея",
  packageId: "basic",
  mode: "once",
  visits: 1,
  extras: [{ id: "waste", qty: 0 }],
  date: "",
  comment: "",
  consent: true,
};

test("заявка без згоди не проходить схему", () => {
  const parsed = leadSchema.safeParse({ ...valid, consent: false });
  assert.equal(parsed.success, false);
});

test("схема відхиляє номер, який не є українським мобільним", () => {
  const parsed = leadSchema.safeParse({ ...valid, phone: "+380001112233" });
  assert.equal(parsed.success, false);
});

test("схема приймає український мобільний і нормалізує пробіли", () => {
  const parsed = leadSchema.safeParse({ ...valid, phone: "067 123 45 67" });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.phone, "+380671234567");
});
