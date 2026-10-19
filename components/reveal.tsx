"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  fromStart = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fromStart?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(fromStart);

  useEffect(() => {
    if (fromStart) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px 80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fromStart]);

  const classes = ["block-rise", shown ? "is-shown" : "", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes} data-delay={delay > 0 ? delay : undefined}>
      {children}
    </div>
  );
}
