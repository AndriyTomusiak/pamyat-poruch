import type { Metadata } from "next";
import { connection } from "next/server";

import { Calculator } from "@/components/calculator";
import { Contacts } from "@/components/contacts";
import { SiteFooter } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { SiteHeader } from "@/components/header";
import { Hero } from "@/components/hero";
import {
  Cemeteries,
  Contract,
  Directions,
  Faq,
  Process,
  RemoteOrder,
  Reviews,
  SeoCopy,
} from "@/components/info-sections";
import { JsonLd } from "@/components/json-ld";
import { OrderProvider } from "@/components/order-provider";
import { PackagesSection } from "@/components/packages-section";
import { PictureBand } from "@/components/picture-band";
import { StickyCta } from "@/components/sticky-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  await connection();

  return (
    <>
      <JsonLd />
      <OrderProvider>
        <SiteHeader />
        <main id="content">
          <Hero />
          <PackagesSection />
          <Calculator />
          <SeoCopy />
          <Directions />
          <Gallery />
          <PictureBand />
          <RemoteOrder />
          <Process />
          <Contract />
          <Cemeteries />
          <Reviews />
          <Faq />
          <Contacts />
        </main>
        <SiteFooter />
        <StickyCta />
      </OrderProvider>
    </>
  );
}
