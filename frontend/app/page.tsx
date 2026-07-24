import { SiteHeader } from "@/components/marketing/site-header";
import { MdrPage } from "@/components/marketing/mdr-page";
import { siteConfig } from "@/config/site";
import { faqs, services } from "@/data/mdr";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: siteConfig.title,
    provider: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.url,
    },
    serviceType: "Managed Detection and Response",
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ACPL MDR Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />
      <MdrPage />
    </>
  );
}
