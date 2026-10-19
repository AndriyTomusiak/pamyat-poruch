import { headers } from "next/headers";

import { structuredData } from "@/lib/jsonld";

export async function JsonLd() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
    />
  );
}
