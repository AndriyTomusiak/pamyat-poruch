import type { CareMode } from "@/content/site";

export type QuoteExtra = {
  price: number;
  qty: number;
};

function clampInt(value: number, min: number, max: number): number {
  const rounded = Math.trunc(value);
  if (Number.isNaN(rounded)) return min;
  return Math.min(max, Math.max(min, rounded));
}

export function quote(input: {
  packagePrice: number;
  mode: CareMode;
  visits: number;
  extras: QuoteExtra[];
}): number {
  const visitCount = input.mode === "year" ? clampInt(input.visits, 1, 3) : 1;
  const extrasTotal = input.extras.reduce((sum, extra) => {
    const qty = input.mode === "year" ? clampInt(extra.qty, 0, 3) : extra.qty > 0 ? 1 : 0;
    return sum + extra.price * qty;
  }, 0);
  return input.packagePrice * visitCount + extrasTotal;
}
