"use client";

import { useOrder } from "@/components/order-provider";
import { goldButtonClass, ghostButtonClass } from "@/components/styles";
import type { PackageId } from "@/content/site";

export function ChoosePackage({ id }: { id: PackageId }) {
  const { setPackageId } = useOrder();
  return (
    <a
      className={`${goldButtonClass} w-full`}
      href="#services"
      onClick={() => setPackageId(id)}
    >
      Обрати для розрахунку
    </a>
  );
}

export function ChooseAnnual() {
  const { setMode } = useOrder();
  return (
    <a className={ghostButtonClass} href="#services" onClick={() => setMode("year")}>
      Порахувати графік
    </a>
  );
}
