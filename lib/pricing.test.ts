import assert from "node:assert/strict";
import test from "node:test";

import { quote } from "./pricing";

test("разовий візит додає обрані послуги по одному разу", () => {
  assert.equal(
    quote({
      packagePrice: 2400,
      mode: "once",
      visits: 1,
      extras: [
        { price: 500, qty: 1 },
        { price: 700, qty: 1 },
      ],
    }),
    3600,
  );
});

test("разовий візит без додаткових послуг дорівнює ціні пакета", () => {
  assert.equal(
    quote({
      packagePrice: 4600,
      mode: "once",
      visits: 3,
      extras: [
        { price: 900, qty: 0 },
        { price: 1600, qty: 0 },
      ],
    }),
    4600,
  );
});

test("річний догляд множить пакет на візити і послугу на кількість", () => {
  assert.equal(
    quote({
      packagePrice: 2400,
      mode: "year",
      visits: 3,
      extras: [
        { price: 500, qty: 2 },
        { price: 850, qty: 0 },
      ],
    }),
    8200,
  );
});

test("річний догляд без додаткових послуг — це лише пакет на візити", () => {
  assert.equal(
    quote({
      packagePrice: 6800,
      mode: "year",
      visits: 2,
      extras: [],
    }),
    13600,
  );
});
