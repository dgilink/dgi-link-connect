import { createFileRoute } from "@tanstack/react-router";

import {
  CorporateDetailLayout,
  DetailCard,
  DetailHero,
  DetailSection,
  IdentityCard,
  PrimaryLink,
} from "@/components/corporate-detail-layout";

const PAGE_URL = "https://dgilink.com/dgi-pick/";

export const Route = createFileRoute("/dgi-pick/")({
  component: DgiPickPage,
  head: () => ({
    meta: [
      { title: "DGI PICK | DGI Link 공식 정보 콘텐츠 브랜드" },
      {
        name: "description",
        content: "DGI PICK은 디지아이링크(DGI Link)가 직접 운영하는 정보 콘텐츠 브랜드입니다.",
      },
      { property: "og:title", content: "DGI PICK | DGI Link 공식 브랜드" },
      {
        property: "og:description",
        content: "DGI Link가 직접 운영하는 정보 콘텐츠 브랜드 DGI PICK의 공식 운영 안내입니다.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: "https://dgilink.com/dgi-link-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DGI PICK | DGI Link 공식 브랜드" },
      {
        name: "twitter:description",
        content: "DGI Link가 직접 운영하는 정보 콘텐츠 브랜드 DGI PICK",
      },
      { name: "twitter:image", content: "https://dgilink.com/dgi-link-logo.png" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Brand",
              "@id": "https://dgilink.com/dgi-pick/#brand",
              name: "DGI PICK",
              url: "https://dgipick.com",
              description: "DGI Link가 직접 운영하는 정보 콘텐츠 브랜드",
            },
            {
              "@type": "Organization",
              "@id": "https://dgilink.com/#organization",
              name: "DGI Link",
              url: "https://dgilink.com/",
              brand: { "@id": "https://dgilink.com/dgi-pick/#brand" },
            },
          ],
        }),
      },
    ],
  }),
});

function DgiPickPage() {
  return (
    <CorporateDetailLayout>
      <main>
        <DetailHero
          eyebrow="DGI Link · Official Brand"
          title={
            <>
              DGI <span className="text-[color:var(--brand-orange)]">PICK</span>
            </>
          }
          lead="DGI PICK은 디지아이링크(DGI Link)가 직접 운영하는 정보 콘텐츠 브랜드입니다. 복잡한 정보를 선별하고 맥락을 더해, 이해하기 쉬운 콘텐츠로 연결합니다."
          action={
            <div className="flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href="https://dgipick.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[color:var(--navy)] px-5 py-3 text-sm font-bold text-white"
              >
                dgipick.com 방문
              </a>
              <a
                href="mailto:contact@dgilink.com"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[color:var(--navy)] px-5 py-3 text-sm font-bold text-[color:var(--navy)]"
              >
                운영 문의
              </a>
            </div>
          }
          aside={
            <IdentityCard
              label="Verified relationship"
              title="사업자 ↔ 브랜드 ↔ 서비스"
              rows={[
                { label: "운영사업자", value: "디지아이링크 (DGI Link)" },
                { label: "브랜드", value: "DGI PICK" },
                { label: "공식 서비스", value: "dgipick.com" },
                { label: "문의", value: "contact@dgilink.com" },
              ]}
            />
          }
        />

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <DetailSection
            eyebrow="Brand Profile"
            title="정보를 고르고, 맥락을 연결합니다"
            description="DGI PICK은 다양한 주제의 정보를 독자가 판단하고 활용하기 쉬운 형태로 정리하는 정보 콘텐츠 브랜드입니다. DGI Link가 브랜드 기획, 콘텐츠 운영, 기술 운영을 직접 담당합니다."
          />

          <DetailSection eyebrow="Official Identity" title="브랜드 운영 정보">
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <DetailCard title="브랜드명">DGI PICK</DetailCard>
              <DetailCard title="서비스 성격">
                정보를 선별·구조화해 전달하는 콘텐츠 서비스
              </DetailCard>
              <DetailCard title="운영주체">디지아이링크 (DGI Link)</DetailCard>
            </div>
          </DetailSection>

          <DetailSection eyebrow="Official Channel" title="공식 사이트와 문의 채널">
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <DetailCard title="공식 사이트">
                <a href="https://dgipick.com" className="font-semibold text-[color:var(--navy)]">
                  https://dgipick.com
                </a>
              </DetailCard>
              <DetailCard title="운영 문의">
                <a
                  href="mailto:contact@dgilink.com"
                  className="font-semibold text-[color:var(--navy)]"
                >
                  contact@dgilink.com
                </a>
              </DetailCard>
            </div>
            <div className="mt-8">
              <PrimaryLink href="https://dgipick.com">DGI PICK 공식 사이트 열기</PrimaryLink>
            </div>
          </DetailSection>
        </div>
      </main>
    </CorporateDetailLayout>
  );
}
