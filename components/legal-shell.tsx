import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/footer";
import { site } from "@/content/site";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <Link href="/" className="font-display text-3xl text-gold">
            {site.brand}
          </Link>
          <Link className="text-sm text-muted underline underline-offset-4" href="/">
            На головну
          </Link>
        </div>
      </header>
      <main id="content" className="mx-auto max-w-3xl px-4 py-12">
        <p className="rounded-2xl border border-gold bg-card px-4 py-3 font-medium text-gold">
          Чернетка. Текст потребує перевірки юристом перед публікацією.
        </p>
        <h1 className="mt-8 font-display text-4xl leading-tight text-foreground md:text-5xl">{title}</h1>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-muted">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
