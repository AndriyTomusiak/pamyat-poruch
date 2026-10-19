const TEXT = new TextEncoder();

function bytesToBase64Url(bytes: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    TEXT.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, TEXT.encode(payload));
  return bytesToBase64Url(signature);
}

function safeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function signStamp(iat: number, secret: string): Promise<string> {
  const payload = String(iat);
  const mac = await hmac(payload, secret);
  return `${payload}.${mac}`;
}

export async function readStamp(value: string, secret: string): Promise<number | null> {
  const dot = value.indexOf(".");
  if (dot <= 0) return null;
  const payload = value.slice(0, dot);
  const mac = value.slice(dot + 1);
  const expected = await hmac(payload, secret);
  if (!safeEqual(mac, expected)) return null;
  if (!/^\d+$/.test(payload)) return null;
  const iat = Number(payload);
  if (!Number.isSafeInteger(iat)) return null;
  return iat;
}

export const LEAD_COOKIE = "lead_opened";
export const LEAD_MIN_MS = 3000;
export const LEAD_MAX_AGE_SECONDS = 60 * 30;
