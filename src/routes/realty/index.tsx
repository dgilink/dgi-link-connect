import { createFileRoute } from "@tanstack/react-router";

import {
  CorporateDetailLayout,
  DetailCard,
  DetailHero,
  DetailSection,
  IdentityCard,
  PrimaryLink,
} from "@/components/corporate-detail-layout";

const PAGE_URL = "https://dgilink.com/realty/";

export const Route = createFileRoute("/realty/")({
  component: RealtyPage,
  head: () => ({
    meta: [
      { title: "DGI Realty 운영지원 | DGI Link B2B Services" },
      {
        name: "description",
        content:
          "DGI Link가 운영하는 공인중개사사무소 대상 웹·AI·매물 데이터·SEO 운영지원 서비스 안내",
      },
      { property: "og:title", content: "DGI Realty 운영지원 | DGI Link" },
      {
        property: "og:description",
        content: "공인중개사사무소의 디지털 운영을 지원하는 DGI Link의 B2B 서비스",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: "https://dgilink.com/dgi-link-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DGI Realty 운영지원 | DGI Link" },
      {
        name: "twitter:description",
        content: "공인중개사사무소 대상 웹·AI·매물 데이터·SEO 운영지원",
      },
      { name: "twitter:image", content: "https://dgilink.com/dgi-link-logo.png" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://dgilink.com/realty/#service",
          name: "DGI Realty 운영지원",
          url: PAGE_URL,
          serviceType: "공인중개사사무소 대상 디지털 운영지원",
          description:
            "웹 구축·운영, AI 기반 자료 구조화, 매물 데이터 운영지원, SEO 및 운영 기술지원",
          provider: {
            "@type": "Organization",
            "@id": "https://dgilink.com/#organization",
            name: "DGI Link",
            url: "https://dgilink.com/",
          },
        }),
      },
    ],
  }),
});

function RealtyPage() {
  return (
    <CorporateDetailLayout>
      <main>
        <DetailHero
          eyebrow="DGI Link · B2B Services"
          title={
            <>
              DGI Realty
              <br />
              운영지원
            </>
          }
          lead="DGI Realty 운영지원은 디지아이링크(DGI Link)가 운영하는 공인중개사사무소 대상 웹·AI·매물 데이터·SEO 운영지원 서비스입니다."
          action={
            <PrimaryLink href="mailto:contact@dgilink.com?subject=DGI%20Realty%20운영지원%20문의">
              운영지원 문의
            </PrimaryLink>
          }
          aside={
            <IdentityCard
              label="B2B Operations Support"
              title={
                <>
                  전문 영역은 분명하게,
                  <br />
                  운영지원은 실용적으로
                </>
              }
              rows={[
                { label: "운영사업자", value: "디지아이링크 (DGI Link)" },
                { label: "서비스 유형", value: "디지털 운영지원" },
                { label: "대상", value: "개업공인중개사사무소" },
                { label: "문의", value: "contact@dgilink.com" },
              ]}
            />
          }
        />

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <DetailSection eyebrow="Service Scope" title="DGI Link가 지원하는 영역">
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <DetailCard title="웹 구축·운영">
                공식 웹사이트의 정보 구조, 화면 구성, 콘텐츠 게시와 기술 운영을 지원합니다.
              </DetailCard>
              <DetailCard title="AI 기반 자료 구조화">
                업무 자료를 검토 가능한 형태로 정리하고 반복 작업을 줄이는 기술 활용을 지원합니다.
              </DetailCard>
              <DetailCard title="매물 데이터 운영지원">
                개업공인중개사사무소가 제공·확인한 정보를 기준으로 데이터 정리와 운영을 지원합니다.
              </DetailCard>
              <DetailCard title="SEO·운영 기술지원">
                검색 접근성과 웹 운영 안정성을 높이기 위한 기술적 개선을 지원합니다.
              </DetailCard>
            </div>
          </DetailSection>

          <DetailSection
            eyebrow="Roles & Responsibilities"
            title="중개업무와 기술지원의 역할을 구분합니다"
          >
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <DetailCard title="각 개업공인중개사사무소의 책임">
                <ul className="list-disc space-y-2 pl-5">
                  <li>중개 및 중개계약</li>
                  <li>중개대상물 광고와 표시 내용</li>
                  <li>거래조건의 확인과 결정</li>
                  <li>중개보수의 청구와 수령</li>
                  <li>관계 법령에 따른 전문 업무와 최종 검수</li>
                </ul>
              </DetailCard>
              <DetailCard title="디지아이링크(DGI Link)의 역할">
                <ul className="list-disc space-y-2 pl-5">
                  <li>웹 구축과 운영</li>
                  <li>AI 기반 자료 구조화 지원</li>
                  <li>매물 데이터 운영지원</li>
                  <li>SEO 지원</li>
                  <li>운영 기술지원</li>
                </ul>
              </DetailCard>
            </div>
            <p className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-950">
              디지아이링크(DGI Link)는 공인중개사 또는 중개업체가 아니며, 중개광고의 책임자나
              중개보수의 수령주체가 아닙니다. 개별 중개업무와 광고의 적법성·정확성에 대한 최종
              책임은 해당 개업공인중개사사무소에 있습니다.
            </p>
          </DetailSection>

          <DetailSection
            eyebrow="Confidentiality"
            title="고객 정보는 기본적으로 비공개입니다"
            description="DGI Link는 고객사명, 대표자, 주소, 계약조건, 비용, 내부자료와 수행 세부내용을 공개하지 않습니다. 고객 사례는 해당 고객의 명시적인 공개 동의가 확인된 경우에만 별도로 게시합니다."
          />

          <DetailSection
            eyebrow="Contact"
            title="운영지원 상담"
            description="지원 범위와 진행 방식은 각 사무소의 운영 환경을 확인한 뒤 협의합니다."
          >
            <div className="mt-7">
              <PrimaryLink href="mailto:contact@dgilink.com?subject=DGI%20Realty%20운영지원%20문의">
                contact@dgilink.com
              </PrimaryLink>
            </div>
          </DetailSection>
        </div>
      </main>
    </CorporateDetailLayout>
  );
}
