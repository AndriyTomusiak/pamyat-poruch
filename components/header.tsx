"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import { Messengers } from "@/components/messengers";
import { useOrder } from "@/components/order-provider";
import { goldButtonClass } from "@/components/styles";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const { menuOpen, setMenuOpen } = useOrder();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const opener = openRef.current;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (previous instanceof HTMLElement) previous.focus();
      else opener?.focus();
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-8 py-4">
          <Link href="/" className="shrink-0 font-display text-3xl leading-none text-gold">
            {site.brand}
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            <a className="whitespace-nowrap text-sm font-medium text-foreground" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <Messengers compact />
            <a className={`${goldButtonClass} shrink-0`} href="#contacts">
              Залишити заявку
            </a>
          </div>
          <button
            ref={openRef}
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Меню
          </button>
        </div>
        <nav
          className="hidden flex-wrap gap-x-8 gap-y-2 border-t border-line py-3 lg:flex"
          aria-label="Розділи сторінки"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
      {menuOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 overflow-y-auto bg-background px-4 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <p id={titleId} className="font-display text-2xl text-gold">
              {site.brand}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Закрити
            </button>
          </div>
          <nav className="mx-auto mt-8 flex max-w-6xl flex-col gap-2" aria-label="Розділи сторінки">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-lg text-foreground hover:bg-card"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 border-t border-line pt-6">
            <a className="text-lg font-medium" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <Messengers />
            <a className={goldButtonClass} href="#contacts" onClick={() => setMenuOpen(false)}>
              Залишити заявку
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
