import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LEAD_COOKIE, LEAD_MAX_AGE_SECONDS, readStamp, signStamp } from "@/lib/form-token";

function contentSecurityPolicy(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = contentSecurityPolicy(nonce, isDev);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (!isDev) {
    // HSTS має сенс лише за HTTPS у продакшені.
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  }

  const secret = process.env.TELEGRAM_BOT_TOKEN;
  const path = request.nextUrl.pathname;
  const opensForm = path === "/" || path === "/privacy" || path === "/consent";
  if (secret && opensForm) {
    const existing = request.cookies.get(LEAD_COOKIE)?.value;
    const openedAt = existing ? await readStamp(existing, secret) : null;
    const now = Date.now();
    const stillValid =
      openedAt !== null && now >= openedAt && now - openedAt < LEAD_MAX_AGE_SECONDS * 1000;
    if (!stillValid) {
      response.cookies.set(LEAD_COOKIE, await signStamp(now, secret), {
        httpOnly: true,
        sameSite: "lax",
        secure: !isDev,
        path: "/",
        maxAge: LEAD_MAX_AGE_SECONDS,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
