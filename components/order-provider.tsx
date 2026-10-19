"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import {
  extras,
  packages,
  type CareMode,
  type ExtraId,
  type PackageId,
} from "@/content/site";
import { quote } from "@/lib/pricing";

type ExtraMap = Record<ExtraId, number>;

type OrderContextValue = {
  packageId: PackageId;
  mode: CareMode;
  visits: 1 | 2 | 3;
  extras: ExtraMap;
  total: number;
  menuOpen: boolean;
  setPackageId: (id: PackageId) => void;
  setMode: (mode: CareMode) => void;
  setVisits: (visits: 1 | 2 | 3) => void;
  setExtraQty: (id: ExtraId, qty: number) => void;
  setMenuOpen: (open: boolean) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

const initialExtras = Object.fromEntries(extras.map((item) => [item.id, 0])) as ExtraMap;

export function OrderProvider({ children }: { children: ReactNode }) {
  const [packageId, setPackageId] = useState<PackageId>(packages[0].id);
  const [mode, setMode] = useState<CareMode>("once");
  const [visits, setVisits] = useState<1 | 2 | 3>(1);
  const [extraMap, setExtraMap] = useState<ExtraMap>(initialExtras);
  const [menuOpen, setMenuOpen] = useState(false);

  const total = useMemo(() => {
    const selected = packages.find((item) => item.id === packageId) ?? packages[0];
    return quote({
      packagePrice: selected.price,
      mode,
      visits,
      extras: extras.map((item) => ({ price: item.price, qty: extraMap[item.id] ?? 0 })),
    });
  }, [extraMap, mode, packageId, visits]);

  const value = useMemo<OrderContextValue>(
    () => ({
      packageId,
      mode,
      visits,
      extras: extraMap,
      total,
      menuOpen,
      setPackageId,
      setMode,
      setVisits,
      setExtraQty: (id, qty) => {
        const max = mode === "year" ? 3 : 1;
        const next = Math.min(max, Math.max(0, Math.trunc(qty)));
        setExtraMap((current) => ({ ...current, [id]: next }));
      },
      setMenuOpen,
    }),
    [extraMap, menuOpen, mode, packageId, total, visits],
  );

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    </MotionConfig>
  );
}

export function useOrder(): OrderContextValue {
  const value = useContext(OrderContext);
  if (!value) throw new Error("OrderProvider is missing");
  return value;
}
