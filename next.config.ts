import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

if (process.env.NODE_ENV === "production") {
  // HSTS має сенс лише за HTTPS у продакшені.
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
