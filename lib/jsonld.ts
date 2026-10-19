import { faq, packages, site } from "@/content/site";

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: site.brand,
        description: site.seo.description,
        url: site.siteUrl,
        telephone: site.phone,
        areaServed: site.areaServed,
        openingHours: site.openingHours,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      ...packages.map((item) => ({
        "@type": "Offer",
        name: item.name,
        description: item.summary,
        price: item.price,
        priceCurrency: "UAH",
        url: site.siteUrl,
        availability: "https://schema.org/InStock",
      })),
    ],
  };
}
