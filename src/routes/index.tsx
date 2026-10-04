import { createFileRoute } from "@tanstack/react-router";

import { CorporateHome } from "@/components/corporate-home";
import { brands, businessServices, products } from "@/data/services";

const SITE_URL = "https://dgilink.com/";
const OG_IMAGE_URL = "https://dgilink.com/dgi-link-logo.png";

export const Route = createFileRoute("/")({
  component: CorporateHome,
  head: () => ({
    meta: [
      { title: "DGI Link — 사람과 정보, 현장과 기술을 연결합니다" },
      {
        name: "description",
        content:
          "DGI Link는 소프트웨어·AI·데이터·디지털 서비스로 현장의 문제를 해결하며 CardScan AI, kFarmAI, DGI PICK과 B2B 운영지원 서비스를 운영합니다.",
      },
      {
        name: "keywords",
        content:
          "DGI Link, 디지아이링크, CardScan AI, kFarmAI, DGI PICK, AI, 데이터, 디지털 서비스, B2B 운영지원",
      },
      { property: "og:title", content: "DGI Link — 흩어진 것을 연결합니다" },
      {
        property: "og:description",
        content: "제품, 콘텐츠 브랜드, B2B 운영지원을 통해 사람과 정보, 현장과 기술을 연결합니다.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:alt", content: "DGI Link corporate logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DGI Link — 흩어진 것을 연결합니다" },
      {
        name: "twitter:description",
        content: "Products, brands, and B2B operations support by DGI Link.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://dgilink.com/#organization",
          name: "DGI Link",
          alternateName: "디지아이링크",
          url: SITE_URL,
          email: "contact@dgilink.com",
          logo: OG_IMAGE_URL,
          description:
            "DGI Link connects people, information, operations, and technology through software, AI, data, digital services, and B2B operations support.",
          brand: brands.map((service) => ({
            "@type": "Brand",
            "@id": new URL(`${service.detailUrl}#brand`, SITE_URL).href,
            name: service.name,
            url: service.externalUrl,
          })),
          makesOffer: [...products, ...businessServices].map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": service.category === "product" ? "SoftwareApplication" : "Service",
              name: service.name,
              url: new URL(service.detailUrl ?? service.externalUrl ?? "/", SITE_URL).href,
              description: service.summary.ko,
            },
          })),
        }),
      },
    ],
  }),
});
