const MOBILE_CODES = new Set([
  "39",
  "50",
  "63",
  "66",
  "67",
  "68",
  "73",
  "75",
  "77",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
]);

export function normalizeUaMobile(input: string): string | null {
  const compact = input.replace(/[^\d+]/g, "");
  let normalized = compact;
  if (normalized.startsWith("00")) normalized = `+${normalized.slice(2)}`;
  if (normalized.startsWith("380")) normalized = `+${normalized}`;
  if (/^0\d{9}$/.test(normalized)) normalized = `+38${normalized}`;
  if (!/^\+380\d{9}$/.test(normalized)) return null;
  const code = normalized.slice(4, 6);
  if (!MOBILE_CODES.has(code)) return null;
  return normalized;
}
