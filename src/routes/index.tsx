import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import cardscannerIcon from "@/assets/cardscanner-icon.png.asset.json";
import kfarmaiLogo from "@/assets/kfarmai-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DGI Link · 흩어진 것을 연결합니다" },
      { name: "description", content: "데이터, 그린 산업, AI 지능으로 현장의 흩어진 정보를 연결하는 브랜드, DGI Link (디지아이링크)." },
      { property: "og:title", content: "DGI Link · 흩어진 것을 연결합니다" },
      { property: "og:description", content: "데이터, 그린 산업, AI 지능으로 현장의 흩어진 정보를 연결합니다." },
    ],
  }),
  component: Index,
});

type Lang = "ko" | "en" | "ja";

const heroCopy: Record<Lang, { badge: string; line1: string; accent: string; subtitle: string; cta1: string; cta2: string; nav: string[] }> = {
  ko: {
    badge: "글로벌 디지털 인텔리전스",
    line1: "흩어진 것을",
    accent: "연결합니다.",
    subtitle:
      "데이터, 그린 산업, AI 지능으로 현장의 흩어진 정보를 연결해 사람의 시간과 기회를 돌려주는 브랜드입니다.",
    cta1: "서비스 보기 →",
    cta2: "브랜드 스토리",
    nav: ["서비스", "스토리", "문의"],
  },
  en: {
    badge: "Global Digital Intelligence",
    line1: "Connecting what's",
    accent: "scattered.",
    subtitle:
      "We connect scattered field information through data, green industries, and AI — giving people back their time and opportunities.",
    cta1: "Our Services →",
    cta2: "Brand Story",
    nav: ["Services", "Story", "Contact"],
  },
  ja: {
    badge: "グローバル・デジタル・インテリジェンス",
    line1: "散らばったものを、",
    accent: "つなぎます。",
    subtitle:
      "データ、グリーン産業、AI知能で現場に散らばった情報をつなぎ、人の時間と機会を取り戻すブランドです。",
    cta1: "サービスを見る →",
    cta2: "ブランドストーリー",
    nav: ["サービス", "ストーリー", "お問合せ"],
  },
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("dgi-reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  const [lang, setLang] = useState<Lang>("ko");
  const [scrolled, setScrolled] = useState(false);
  const copy = heroCopy[lang];
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-border" : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(14px) saturate(160%)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-display text-[18px] font-bold tracking-tight">
            <span className="text-foreground">DGI Link</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {copy.nav.map((n, i) => (
              <a
                key={n}
                href={["#services", "#story", "#contact"][i]}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
            {(["ko", "en", "ja"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  lang === l
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 20%, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <div data-reveal className="dgi-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-dgi-pulse-dot rounded-full bg-primary" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {copy.badge}
              </span>
            </div>
          </div>

          <h1
            data-reveal
            className="dgi-reveal mt-7 font-display text-[44px] font-bold leading-[1.05] sm:text-[68px] md:text-[88px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            {copy.line1}
            <br />
            <span className="text-primary">{copy.accent}</span>
          </h1>

          <p
            data-reveal
            className="dgi-reveal mt-7 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]"
          >
            {copy.subtitle}
          </p>

          <div data-reveal className="dgi-reveal mt-9 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)]"
            >
              {copy.cta1}
            </a>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-transparent px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50"
            >
              {copy.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* DGI MEANING */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="DGI의 의미" title="네 글자에 모든 것이 담겨 있습니다" />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                letter: "D",
                word: "Data",
                desc: "흩어진 정보를 모으고 구조화합니다. 데이터는 단순한 숫자가 아닙니다.",
              },
              {
                letter: "G",
                word: "Green",
                desc: "농업, 식물, 친환경, 현장 산업. 땅을 밟고 일하는 사람들 곁에 있습니다.",
              },
              {
                letter: "I",
                word: "Intelligence",
                desc: "AI는 도구입니다. 기술은 보이지 않아야 합니다. 결과만 보여야 합니다.",
              },
              {
                letter: "→",
                word: "Link",
                desc: "데이터와 사람. 현장과 기술. 문제와 해결책. DGI Link는 그 사이에 있습니다.",
              },
            ].map((c) => (
              <DgiCard key={c.word} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="px-5 py-24 sm:px-8 sm:py-32"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="현재 운영 서비스" title="두 개의 문제를 해결하고 있습니다" />

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ServiceCard
              iconSrc={cardscannerIcon.url}
              iconBg="#0a1628"
              badge="📇 App · 출시 준비중"
              title="명함스캐너"
              lead="명함 찍으면 기본 연락처 즉시 저장. 전화 올 때 회사·이름·직책이 먼저 뜹니다."
              sub="별도 앱 없이. 기본 연락처에서 바로."
              features={[
                "명함 촬영 → AI 인식 → 연락처 즉시 저장",
                "전화 수신 시 회사·지점·이름·직책 자동 표시",
                "별도 앱 없이 기본 연락처에서 바로 확인",
                "한국·영어·일본어 명함 지원",
                "개인 크레딧 · 팀플랜 구독",
              ]}
              tags={["🇰🇷 한국", "🇯🇵 일본", "🌐 글로벌", "영업·보험·부동산"]}
            />
            <ServiceCard
              iconSrc={kfarmaiLogo.url}
              iconBg="#ffffff"
              iconPadded
              ctaHref="https://kfarmai.com"
              ctaLabel="kFarmAI 바로가기 →"
              badge="🌱 Platform · 운영중"
              title="kFarmAI"
              lead="농업인·텃밭·홈가드닝·반려식물을 하나로 잇는 식물 특화 AI 커뮤니티 플랫폼"
              features={[
                "작물 사진 찍으면 AI가 즉시 진단",
                "SEO 질문형 지식 페이지 · 전국 농약사 지도 3,019개",
                "농자재 정보 · 보조사업 안내 · 계산기",
                "식물 직거래 · 원예 클래스 · 커뮤니티",
                "흩어진 식물 정보를 한 곳에",
              ]}
              tags={["🇰🇷 한국", "농업인", "홈가드닝", "반려식물"]}
            />
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="story" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="브랜드 스토리" title="" />
          <blockquote
            data-reveal
            className="dgi-reveal mt-10 border-l-[3px] border-primary pl-6 font-display text-[24px] font-medium leading-snug text-foreground sm:text-[32px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            "세상은 정보가 부족한 것이 아닙니다.
            <br />
            연결이 끊겨 있을 뿐입니다."
          </blockquote>

          <div className="mt-12 space-y-6 text-[15px] leading-[1.85] text-muted-foreground sm:text-[16px]">
            <p data-reveal className="dgi-reveal">
              당신은 오늘도 명함을 받았습니다. 그리고 그 명함은 지갑 속에서 잠들었습니다.
            </p>
            <p data-reveal className="dgi-reveal">
              농부는 오늘도 작물이 이상한 것을 발견했습니다. 네이버 카페, 블로그, 유튜브를 전전하다 결국 답을 찾지 못했습니다.
            </p>
            <p data-reveal className="dgi-reveal text-foreground">
              DGI Link는 이 문제를 발견했습니다. 우리는 앱을 만드는 회사가 아닙니다. 현장의 불편함을 발견하고, 데이터로 정리하고, AI로 연결하고, 사람의 시간을 돌려주는 브랜드입니다.
            </p>
          </div>
        </div>
      </section>

      {/* SLOGAN */}
      <section className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2
            data-reveal
            className="dgi-reveal font-display text-[44px] font-bold leading-[1.05] sm:text-[72px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            흩어진 것을
            <br />
            <span className="text-primary">연결합니다.</span>
          </h2>
          <p data-reveal className="dgi-reveal mt-8 text-[15px] tracking-wide text-muted-foreground sm:text-[17px]">
            Connecting What's Scattered.
          </p>
          <p data-reveal className="dgi-reveal mt-2 text-[14px] tracking-wide text-muted-foreground/60 sm:text-[15px]">
            散らばったものを、つなぎます。
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: "#0d0d0d" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHeader label="Contact" title="함께 만들어 갑니다" />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContactCard icon="✉️" label="일반 문의 · Contact" value="contact@dgilink.com" />
            <ContactCard icon="🤝" label="제휴·B2B · Partner" value="partner@dgilink.com" />
            <ContactCard icon="💬" label="고객지원 · Support" value="support@dgilink.com" />
            <ContactCard icon="🌱" label="Platform · kFarmAI" value="kfarmai.com" href="https://kfarmai.com" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="font-display text-[16px] font-bold tracking-tight">
            <span>DGI Link</span>
          </div>
          <div className="col-span-2 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground sm:col-auto">
            {["서비스", "개인정보처리방침", "이용약관", "문의"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </div>
          <p className="col-span-2 text-[12px] text-muted-foreground/70 sm:col-auto sm:w-full sm:text-center sm:pt-4">
            © 2026 DGI Link (디지아이링크). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div data-reveal className="dgi-reveal">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{label}</p>
      {title && (
        <h2
          className="mt-4 font-display text-[30px] font-bold leading-tight sm:text-[44px]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
      )}
    </div>
  );
}

function DgiCard({ letter, word, desc }: { letter: string; word: string; desc: string }) {
  return (
    <div
      data-reveal
      className="dgi-reveal group relative overflow-hidden rounded-[20px] border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <div className="font-display text-[56px] font-bold leading-none text-primary sm:text-[72px]">
        {letter}
      </div>
      <div className="mt-5 font-display text-[20px] font-semibold text-foreground">{word}</div>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function ServiceCard({
  iconSrc,
  iconBg,
  iconPadded,
  ctaHref,
  ctaLabel,
  badge,
  title,
  lead,
  sub,
  features,
  tags,
}: {
  iconSrc?: string;
  iconBg?: string;
  iconPadded?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  badge: string;
  title: string;
  lead: string;
  sub?: string;
  features: string[];
  tags: string[];
}) {
  return (
    <div
      data-reveal
      className="dgi-reveal group rounded-[20px] border border-border bg-background/60 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(34,197,94,0.25)] sm:p-9"
    >
      <div className="flex items-center gap-4">
        {iconSrc && (
          <div
            className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-border"
            style={{ background: iconBg, padding: iconPadded ? 6 : 0 }}
          >
            <img src={iconSrc} alt={`${title} logo`} className="h-full w-full object-contain" />
          </div>
        )}
        <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
          {badge}
        </div>
      </div>
      <h3
        className="mt-5 font-display text-[32px] font-bold sm:text-[40px]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h3>
      <p className="mt-5 text-[17px] font-semibold leading-snug text-foreground sm:text-[19px]">
        {lead}
      </p>
      {sub && <p className="mt-2 text-[14px] text-muted-foreground">{sub}</p>}
      <ul className="mt-7 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] text-muted-foreground sm:text-[15px]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      {ctaHref && ctaLabel && (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)]"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

function ContactCard({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-[22px]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 truncate font-display text-[16px] font-semibold text-foreground">{value}</p>
      </div>
    </>
  );
  const className =
    "dgi-reveal group flex items-center gap-4 rounded-[20px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40";
  if (href) {
    return (
      <a data-reveal href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <div data-reveal className={className}>
      {inner}
    </div>
  );
}
