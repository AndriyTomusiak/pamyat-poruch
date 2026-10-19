"use client";

import { useEffect, useState } from "react";

import { useOrder } from "@/components/order-provider";
import { goldButtonClass } from "@/components/styles";

export function StickyCta() {
  const { menuOpen } = useOrder();
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const nodes = ["hero", "services", "contacts"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered(visible.size > 0);
    });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (menuOpen || covered) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-background/95 p-3 backdrop-blur md:hidden">
      <a className={`${goldButtonClass} w-full`} href="#contacts">
        Залишити заявку
      </a>
    </div>
  );
}
