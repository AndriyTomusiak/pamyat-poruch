// Лічильник у пам’яті одного Node-процесу. Якщо інстансів кілька, потрібен спільний сторедж.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_LEADS = 5;

export function allowLead(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_LEADS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}
