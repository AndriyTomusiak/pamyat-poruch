import Link from "next/link";

import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.brand}. {site.areaLabel}.
        </p>
        <nav aria-label="Юридичні сторінки" className="flex gap-4">
          <Link className="underline underline-offset-4 hover:text-foreground" href="/privacy">
            Політика конфіденційності
          </Link>
          <Link className="underline underline-offset-4 hover:text-foreground" href="/consent">
            Згода на обробку даних
          </Link>
        </nav>
      </div>
    </footer>
  );
}
