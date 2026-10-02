export type ServiceStatus = "public" | "pilot" | "comingSoon" | "internal";

export type ServiceCategory = "product" | "brand" | "businessService";

export interface PublicService {
  id: string;
  name: string;
  category: ServiceCategory;
  status: ServiceStatus;
  operator: "DGI Link";
  displayName?: { ko: string; en: string; ja: string };
  summary: {
    ko: string;
    en: string;
    ja: string;
  };
  detailUrl?: string;
  externalUrl?: string;
  isPublic: boolean;
  publicCaseStudy?: boolean;
}

// Never store customer data or confidential projects in this client-side registry.
// Only explicitly approved, public services can appear in the UI or structured data.
export function isPublished(service: PublicService): boolean {
  return service.isPublic && service.status === "public";
}

const productRegistry: readonly PublicService[] = [
  {
    id: "cardscan-ai",
    name: "CardScan AI",
    category: "product",
    status: "public",
    operator: "DGI Link",
    summary: {
      ko: "명함과 만남의 맥락을 다음 행동으로 연결하는 AI 업무 연락처 앱",
      en: "An AI business-contact app that turns cards and meeting context into next actions",
      ja: "名刺と出会いの文脈を次の行動につなぐAIビジネス連絡先アプリ",
    },
    externalUrl: "https://play.google.com/store/apps/details?id=com.ssmshsoil.bizcardscanner",
    isPublic: true,
  },
  {
    id: "kfarmai",
    name: "kFarmAI",
    category: "product",
    status: "public",
    operator: "DGI Link",
    summary: {
      ko: "농업인과 식물 생활자를 정보·AI·커뮤니티로 잇는 플랫폼",
      en: "A platform connecting growers and plant lovers through information, AI, and community",
      ja: "農業従事者と植物を楽しむ人を、情報・AI・コミュニティでつなぐプラットフォーム",
    },
    externalUrl: "https://kfarmai.com",
    isPublic: true,
  },
];

const brandRegistry: readonly PublicService[] = [
  {
    id: "dgi-pick",
    name: "DGI PICK",
    category: "brand",
    status: "public",
    operator: "DGI Link",
    summary: {
      ko: "복잡한 정보를 선별하고 맥락 있게 전달하는 DGI Link의 정보 콘텐츠 브랜드",
      en: "DGI Link's information-content brand for curated, contextual guidance",
      ja: "複雑な情報を選び、文脈とともに届けるDGI Linkの情報コンテンツブランド",
    },
    detailUrl: "/dgi-pick/",
    externalUrl: "https://dgipick.com",
    isPublic: true,
  },
];

const businessServiceRegistry: readonly PublicService[] = [
  {
    id: "dgi-realty-operations",
    name: "DGI Realty 운영지원",
    displayName: {
      ko: "DGI Realty 운영지원",
      en: "DGI Realty Operations Support",
      ja: "DGI Realty 運用支援",
    },
    category: "businessService",
    status: "public",
    operator: "DGI Link",
    summary: {
      ko: "공인중개사사무소를 위한 웹·AI·매물 데이터·SEO 운영지원 서비스",
      en: "Web, AI, listing-data, and SEO operations support for licensed real-estate offices",
      ja: "公認仲介事務所向けのWeb・AI・物件データ・SEO運用支援サービス",
    },
    detailUrl: "/realty/",
    isPublic: true,
    // Customer cases remain private unless the customer has explicitly consented to publication.
    publicCaseStudy: false,
  },
];

export const products = productRegistry.filter(isPublished);
export const brands = brandRegistry.filter(isPublished);
export const businessServices = businessServiceRegistry.filter(isPublished);
export const publicServices = [...products, ...brands, ...businessServices];
