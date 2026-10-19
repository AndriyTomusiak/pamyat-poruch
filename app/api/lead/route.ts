import { cookies } from "next/headers";

import { LEAD_COOKIE, LEAD_MAX_AGE_SECONDS, LEAD_MIN_MS, readStamp } from "@/lib/form-token";
import { fieldErrors, leadSchema } from "@/lib/lead-schema";
import {
  LEAD_RATE_LIMIT_MESSAGE,
  LEAD_SUCCESS_MESSAGE,
  LEAD_VALIDATION_MESSAGE,
} from "@/lib/messages";
import { allowLead, clientIp } from "@/lib/rate-limit";
import { leadText, sendLead } from "@/lib/telegram";

const MAX_BODY = 8000;

function success() {
  return Response.json({ ok: true, message: LEAD_SUCCESS_MESSAGE });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json({ ok: false, message: LEAD_VALIDATION_MESSAGE }, { status: 400 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return Response.json({ ok: false, message: LEAD_VALIDATION_MESSAGE }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, message: LEAD_VALIDATION_MESSAGE }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, message: LEAD_VALIDATION_MESSAGE }, { status: 400 });
  }

  const honeypot = "companyWebsite" in body ? body.companyWebsite : "";
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return success();
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: LEAD_VALIDATION_MESSAGE, fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const secret = process.env.TELEGRAM_BOT_TOKEN;
  const jar = await cookies();
  const stamp = secret ? await readStamp(jar.get(LEAD_COOKIE)?.value ?? "", secret) : null;
  const now = Date.now();
  const fresh =
    stamp !== null && now - stamp >= LEAD_MIN_MS && now - stamp <= LEAD_MAX_AGE_SECONDS * 1000;
  if (!fresh) {
    if (!secret) console.error("lead delivery skipped");
    return success();
  }

  if (!allowLead(clientIp(request), now)) {
    return Response.json({ ok: false, message: LEAD_RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  await sendLead(leadText(parsed.data));
  return success();
}
