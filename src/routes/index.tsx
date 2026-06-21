import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import cardscanIconUrl from "@/assets/cardscanner-icon.png";
import kfarmLogoUrl from "@/assets/kfarmai-logo.png";
import dgiLinkLogoUrl from "@/assets/dgi-link-logo.png";
import dgiLinkIconUrl from "@/assets/dgi-link-icon.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DGI Link — 흩어진 것을 연결합니다" },
      {
        name: "description",
        content:
          "DGI Link는 명함 스캔·만남 기록 앱 CardScan AI와 농업·식물 AI 커뮤니티 kFarmAI를 운영하는 디지털 인텔리전스 브랜드입니다.",
      },
      { property: "og:title", content: "DGI Link — 흩어진 것을 연결합니다" },
      {
        property: "og:description",
        content:
          "DGI Link connects scattered data and people through AI. We operate CardScan AI and kFarmAI — real solutions for real problems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "DGI Link — 흩어진 것을 연결합니다" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DGI Link",
          alternateName: "디지아이링크",
          url: "/",
          description:
            "DGI Link operates CardScan AI and kFarmAI — connecting scattered information through data and AI.",
          sameAs: [
            "https://play.google.com/store/apps/details?id=com.ssmshsoil.bizcardscanner",
            "https://kfarmai.com",
          ],
        }),
      },
    ],
  }),
});

/* =========================
   i18n
   ========================= */
type Lang = "ko" | "en" | "ja";

const CARDSCAN_URL =
  "https://play.google.com/store/apps/details?id=com.ssmshsoil.bizcardscanner";
const KFARM_URL = "https://kfarmai.com";

const T = {
  ko: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Data · Green · Intelligence",
      title: ["흩어진 것을\n", "연결", "합니다."] as readonly string[],
      desc: "명함은 지갑에, 식물 정보는 블로그에 흩어집니다.\n찍으면 AI가 연결합니다.",
      ctaPrimary: "서비스 살펴보기",
      ctaSecondary: "브랜드 스토리",
    },
    services: {
      eyebrow: "현재 운영 서비스",
      title: "두 개의 문제를\n해결하고 있습니다",
      desc: "명함 한 장, 작물 사진 한 장.\n찍으면 AI가 해결합니다.",
    },
    cardscan: {
      badge: "📇 App · Google Play",
      type: "업무 연락처 앱",
      title: "CardScan AI",
      tagline: "만남을 기억합니다",
      desc:
        "명함을 찍으면 연락처가 저장됩니다.\n누구를, 어디서, 무슨 약속을 했는지도 함께 기록합니다.",
      features: [
        "AI 명함 스캔 · 연락처 즉시 저장",
        "전화 수신 시 회사·이름·직책 자동 표시",
        "만남 장소·대화·약속 함께 기록",
        "행사별 인맥 정리 · Excel 내보내기",
        "한국·영어·일본어 명함 지원",
      ],
      tags: ["🇰🇷 한국", "🇯🇵 일본", "🌐 글로벌", "영업·보험·부동산"],
      ctaPrimary: "Google Play에서 보기",
      ctaSecondary: "자세히 보기",
    },
    kfarm: {
      badge: "🌱 Platform · 운영중",
      type: "농업·식물 AI 플랫폼",
      title: "kFarmAI",
      tagline: "식물 정보, 이제 한 곳에서",
      desc:
        "농업인·텃밭·홈가드닝·반려식물 사용자를 하나로 잇는\nAI 기반 식물 커뮤니티 플랫폼입니다.",
      features: [
        "작물 사진 찍으면 AI가 즉시 진단",
        "전국 농약사 지도 3,019개",
        "농자재 정보 · 보조사업 안내 · 계산기",
        "식물 직거래 · 원예 클래스 · 커뮤니티",
      ],
      tags: ["🇰🇷 한국", "농업인", "홈가드닝", "반려식물"],
      cta: "kFarmAI 방문하기",
    },
    about: {
      eyebrow: "About DGI Link",
      title: "데이터와 현장을\n연결하는 브랜드",
      desc:
        "우리는 앱을 만드는 회사가 아닙니다.\n현장의 불편함을 AI로 연결해 사람의 시간을 돌려주는 브랜드입니다.",
      meaning: [
        { k: "Data", v: "흩어진 정보를 모으고 구조화합니다" },
        { k: "Green", v: "농업·식물·환경, 현장을 이해합니다" },
        { k: "Intelligence", v: "AI를 실용적인 도구로 바꿉니다" },
        { k: "Link", v: "사람과 정보, 문제와 해결을 연결합니다" },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "세상은 정보가 부족한 것이 아닙니다.\n연결이 끊겨 있을 뿐입니다.",
      p1: "당신은 오늘도 누군가를 만났습니다.\n회의에서, 박람회에서, 거래처에서.\n명함을 받고 악수를 나눴지만\n그 만남은 지갑 속 명함 한 장으로 끝났습니다.",
      p2: "농부는 오늘도 작물이 이상한 것을 발견했습니다.\n네이버 카페, 블로그, 유튜브를 전전했지만\n결국 답을 찾지 못했습니다.",
      p3: "DGI Link는 이 문제를 발견했습니다.\n현장의 불편함을 데이터로 정리하고,\nAI로 연결하고,\n사람의 시간과 기회를 돌려주는 브랜드입니다.",
    },
    flow: {
      eyebrow: "How we connect",
      title: "서로 다른 현장, 하나의 목표",
      cs: ["사람", "만남", "약속", "다음 행동"],
      kf: ["식물 문제", "정보", "진단", "해결 연결"],
      footer: "DGI Link는 복잡한 정보를 실제 행동으로 연결합니다.",
    },
    contact: {
      eyebrow: "Contact",
      title: "함께 만들어 갑니다",
      desc: "제휴, B2B 문의, 서비스 관련 이야기를 들려주세요.",
      items: [
        {
          k: "일반 문의 · 제휴/B2B",
          v: "협업과 파트너십 제안을 환영합니다.",
          action: "문의하기",
          href: "mailto:contact@dgilink.com",
        },
        { k: "CardScan AI", v: "Google Play에서 다운로드", action: "앱 보기", href: CARDSCAN_URL },
        { k: "kFarmAI", v: "농업·식물 커뮤니티 방문", action: "사이트 열기", href: KFARM_URL },
      ],
    },
    footer: {
      tagline: "흩어진 것을 연결합니다.",
      sections: "Services",
      privacy: "개인정보처리방침",
      terms: "이용약관",
      inquiry: "문의",
      rights: "All rights reserved.",
    },
  },
  en: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Data · Green · Intelligence",
      title: ["Connecting\n", "What's", " Scattered."] as readonly string[],
      desc: "Business cards pile up. Plant info scatters online.\nSnap once — AI connects everything.",
      ctaPrimary: "View Services",
      ctaSecondary: "Brand Story",
    },
    services: {
      eyebrow: "Our Services",
      title: "Two Problems.\nTwo Solutions.",
      desc: "One photo of a card. One photo of a plant.\nAI handles the rest.",
    },
    cardscan: {
      badge: "📇 App · Google Play",
      type: "Business Contact App",
      title: "CardScan AI",
      tagline: "We Remember Your Meetings",
      desc:
        "Scan a card — contacts saved instantly.\nWho you met, where, what you promised — all remembered.",
      features: [
        "AI card scan · instant contact save",
        "Caller ID shows company, name, title",
        "Record meeting place, notes, next actions",
        "Organize by event · Export to Excel",
        "Korean, English, Japanese cards supported",
      ],
      tags: ["🇰🇷 Korea", "🇯🇵 Japan", "🌐 Global", "Sales · Insurance · Real Estate"],
      ctaPrimary: "View on Google Play",
      ctaSecondary: "Learn more",
    },
    kfarm: {
      badge: "🌱 Platform · 운영중",
      type: "Agriculture & Plant AI Platform",
      title: "kFarmAI",
      tagline: "All Plant Info, One Place",
      desc:
        "An AI-powered community connecting farmers,\nhome gardeners, and plant lovers in one place.",
      features: [
        "AI crop diagnosis from one photo",
        "3,019 agricultural stores nationwide",
        "Supply info · Subsidy guide · Calculator",
        "Plant marketplace · Gardening classes",
      ],
      tags: ["🇰🇷 Korea", "Farmers", "Home Gardening", "Plant Parents"],
      cta: "Visit kFarmAI",
    },
    about: {
      eyebrow: "About DGI Link",
      title: "A Brand That Connects\nData and Real Life",
      desc:
        "We are not an app company.\nWe bridge real-world friction with AI and give people back their time.",
      meaning: [
        { k: "Data", v: "We collect and structure scattered data" },
        { k: "Green", v: "We understand agriculture, nature, and field industries" },
        { k: "Intelligence", v: "We turn AI into practical, invisible tools" },
        { k: "Link", v: "We connect people, data, problems and solutions" },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "The world doesn't lack information.\nIt lacks connection.",
      p1: "You met someone today.\nAt a conference, a trade show, a client meeting.\nYou shook hands and exchanged cards —\nbut that moment ended as a card in your wallet.",
      p2: "A farmer noticed something wrong with the crops.\nHe searched online for hours —\nand still couldn't find a clear answer.",
      p3: "DGI Link was built to solve this.\nWe find friction, structure it with data,\nbridge it with AI,\nand give people back their time.",
    },
    flow: {
      eyebrow: "How we connect",
      title: "Different fields, one purpose",
      cs: ["People", "Meeting", "Promise", "Next action"],
      kf: ["Plant issue", "Information", "Diagnosis", "Solution"],
      footer: "DGI Link turns complex information into real action.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's Connect",
      desc: "Tell us about partnerships, B2B, or anything about our services.",
      items: [
        {
          k: "Inquiries · Partnership",
          v: "We welcome collaboration proposals.",
          action: "Contact Us",
          href: "mailto:contact@dgilink.com",
        },
        { k: "CardScan AI", v: "Download on Google Play", action: "View App", href: CARDSCAN_URL },
        { k: "kFarmAI", v: "Visit Agriculture & Plant Community", action: "Visit Site", href: KFARM_URL },
      ],
    },
    footer: {
      tagline: "Connecting What's Scattered.",
      sections: "Services",
      privacy: "Privacy",
      terms: "Terms",
      inquiry: "Contact",
      rights: "All rights reserved.",
    },
  },
  ja: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Data · Green · Intelligence",
      title: ["散らばったものを、\n", "つなぎ", "ます。"] as readonly string[],
      desc: "名刺は財布に、植物情報はブログに散らばります。\n撮るだけで、AIがつなぎます。",
      ctaPrimary: "サービスを見る",
      ctaSecondary: "ブランドストーリー",
    },
    services: {
      eyebrow: "サービス",
      title: "ふたつの問題を\n解決しています",
      desc: "名刺1枚、作物の写真1枚。\n撮るだけでAIが解決します。",
    },
    cardscan: {
      badge: "📇 App · Google Play",
      type: "ビジネス連絡先アプリ",
      title: "CardScan AI",
      tagline: "出会いを、記憶します",
      desc:
        "名刺を撮るだけで連絡先が保存されます。\n誰と、どこで、何を約束したかも一緒に記録します。",
      features: [
        "AI名刺スキャン・連絡先即時保存",
        "着信時に会社名・氏名・役職を表示",
        "場所・会話・約束を一緒に記録",
        "イベント別整理・Excelエクスポート",
        "韓国語・英語・日本語の名刺対応",
      ],
      tags: ["🇰🇷 韓国", "🇯🇵 日本", "🌐 グローバル", "営業・保険・不動産"],
      ctaPrimary: "Google Playで見る",
      ctaSecondary: "詳しく見る",
    },
    kfarm: {
      badge: "🌱 Platform · 운영중",
      type: "農業・植物AIプラットフォーム",
      title: "kFarmAI",
      tagline: "植物情報を、一か所に",
      desc:
        "農業従事者・家庭菜園・ホームガーデニング・\n観葉植物ユーザーをつなぐAIコミュニティです。",
      features: [
        "写真1枚でAIが即座に診断",
        "全国農薬店マップ3,019件",
        "農業資材情報・補助事業案内・計算機",
        "植物直取引・園芸クラス・コミュニティ",
      ],
      tags: ["🇰🇷 韓国", "農業従事者", "家庭菜園", "観葉植物"],
      cta: "kFarmAIを開く",
    },
    about: {
      eyebrow: "About DGI Link",
      title: "データと現場を\nつなぐブランド",
      desc:
        "私たちはアプリを作る会社ではありません。\n現場の不便さをAIでつなぎ、人の時間を取り戻すブランドです。",
      meaning: [
        { k: "Data", v: "散らばった情報を集め、構造化します" },
        { k: "Green", v: "農業・植物・環境、現場を理解します" },
        { k: "Intelligence", v: "AIを実用的なツールに変えます" },
        { k: "Link", v: "人と情報、問題と解決をつなぎます" },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "世界に情報が足りないのではありません。\nただ、つながっていないだけです。",
      p1: "今日も誰かと出会いました。\n会議で、展示会で、取引先で。\n名刺を交わし握手をしましたが、\nその出会いは財布の中の名刺1枚で終わりました。",
      p2: "農家の方は今日も作物の異変に気づきました。\n何時間も検索しましたが、\n答えが見つかりませんでした。",
      p3: "DGI Linkはこの問題を解決するために生まれました。\n現場の不便さをデータで整理し、\nAIでつなぎ、\n人の時間とチャンスを取り戻します。",
    },
    flow: {
      eyebrow: "How we connect",
      title: "異なる現場、ひとつのゴール",
      cs: ["人", "出会い", "約束", "次の行動"],
      kf: ["植物の課題", "情報", "診断", "解決へ"],
      footer: "DGI Linkは複雑な情報を実際の行動につなぎます。",
    },
    contact: {
      eyebrow: "Contact",
      title: "一緒につくりましょう",
      desc: "提携・B2B・サービスに関するお問い合わせをお待ちしています。",
      items: [
        {
          k: "お問い合わせ・提携",
          v: "コラボレーションのご提案をお待ちしています。",
          action: "お問い合わせ",
          href: "mailto:contact@dgilink.com",
        },
        { k: "CardScan AI", v: "Google Playでダウンロード", action: "アプリを見る", href: CARDSCAN_URL },
        { k: "kFarmAI", v: "農業・植物コミュニティを訪問", action: "サイトを開く", href: KFARM_URL },
      ],
    },
    footer: {
      tagline: "散らばったものを、つなぎます。",
      sections: "Services",
      privacy: "プライバシー",
      terms: "利用規約",
      inquiry: "お問い合わせ",
      rights: "All rights reserved.",
    },
  },
} as const;

function detectLang(): Lang {
  if (typeof window === "undefined") return "ko";
  const stored = window.localStorage.getItem("dgi-lang") as Lang | null;
  if (stored === "ko" || stored === "en" || stored === "ja") return stored;
  const nav = navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("ko")) return "ko";
  return "en";
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("dgi-reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* =========================
   Page
   ========================= */
function Index() {
  const [lang, setLang] = useState<Lang>("ko");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRef = useReveal();

  useEffect(() => setLang(detectLang()), []);
  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("dgi-lang", lang);
    document.documentElement.lang =
      lang === "ko" ? "ko" : lang === "ja" ? "ja" : "en";
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = T[lang];

  return (
    <div ref={revealRef} className="min-h-dvh bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-white/85 backdrop-blur-xl"
            : "border-b border-transparent bg-white/0"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src={dgiLinkIconUrl}
              alt=""
              className="block h-12 w-12"
              loading="eager"
            />
            <span className="font-display text-[28px] font-bold tracking-tight text-[color:var(--navy-deep)]">
              DGI Link
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)]">{t.nav.home}</a>
            <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)]">{t.nav.services}</a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)]">{t.nav.about}</a>
            <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)]">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch lang={lang} onChange={setLang} />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-[color:var(--navy)] md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (<><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>) : (<><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>)}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-white md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {[
                ["#top", t.nav.home],
                ["#services", t.nav.services],
                ["#about", t.nav.about],
                ["#contact", t.nav.contact],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-muted"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <BackgroundGlow />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div data-reveal className="dgi-reveal text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium tracking-wide text-[color:var(--navy)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-green)]" />
                {t.hero.eyebrow}
              </p>
              <h1 className="mt-5 whitespace-pre-line font-display text-[40px] font-extrabold leading-[1.15] tracking-tight text-[color:var(--navy-deep)] sm:text-[56px] lg:text-[64px]">
                {t.hero.title[0]}
                <span className="text-[color:var(--brand-cyan)]">
                  {t.hero.title[1]}
                </span>
                {t.hero.title[2]}
              </h1>
              <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                {t.hero.desc}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[color:var(--navy-deep)]"
                >
                  {t.hero.ctaPrimary}
                  <Arrow />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] transition-all hover:border-[color:var(--navy)]"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Product Showcase */}
            <div data-reveal className="dgi-reveal">
              <ProductShowcase />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative scroll-mt-20 py-20 sm:py-28">
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} desc={t.services.desc} />
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <CardScanCard t={t.cardscan} />
            <KFarmCard t={t.kfarm} />
          </div>
        </section>

        {/* ABOUT / MEANING */}
        <section id="about" className="relative scroll-mt-20 bg-white py-20 sm:py-28">
          <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} desc={t.about.desc} />
          <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
            <ol data-reveal className="dgi-reveal grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {t.about.meaning.map((m, i) => {
                const tones = [
                  { bg: "var(--navy)", soft: "rgba(15,45,104,0.08)", text: "#fff" },
                  { bg: "var(--brand-green)", soft: "var(--brand-green-soft)", text: "#fff" },
                  { bg: "var(--brand-orange)", soft: "var(--brand-orange-soft)", text: "#fff" },
                  { bg: "var(--brand-cyan)", soft: "rgba(6,182,212,0.10)", text: "#fff" },
                ];
                const tone = tones[i % tones.length];
                return (
                  <li key={m.k} className="h-full">
                    <div
                      className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-25px_rgba(15,45,104,0.35)] sm:p-6"
                      style={{ borderTop: `3px solid ${tone.bg}` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-extrabold"
                          style={{ background: tone.bg, color: tone.text }}
                        >
                          {m.k[0]}
                        </div>
                        <div
                          className={`font-display font-bold text-[color:var(--navy-deep)] ${
                            m.k === "Intelligence"
                              ? "whitespace-nowrap text-sm tracking-tight sm:text-base"
                              : "text-lg sm:text-xl"
                          }`}
                        >
                          {m.k}
                        </div>
                      </div>
                      <div className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]" style={{ wordBreak: "keep-all" }}>
                        {m.v}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* STORY */}
        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p data-reveal className="dgi-reveal text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">
              {t.story.eyebrow}
            </p>
            <blockquote
              data-reveal
              className="dgi-reveal mx-auto mt-4 max-w-3xl whitespace-pre-line font-display text-[28px] font-bold leading-[1.3] tracking-tight text-[color:var(--navy-deep)] sm:text-[40px]"
            >
              <span className="text-[color:var(--brand-green)]">“</span>
              {t.story.quote}
              <span className="text-[color:var(--brand-green)]">”</span>
            </blockquote>
            <div data-reveal className="dgi-reveal mx-auto mt-8 max-w-2xl space-y-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
              <p className="font-medium text-[color:var(--navy)]">{t.story.p3}</p>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section className="relative bg-white py-20 sm:py-28">
          <SectionHeader eyebrow={t.flow.eyebrow} title={t.flow.title} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2">
            <FlowCard
              tone="navy"
              label="CardScan AI"
              steps={t.flow.cs}
            />
            <FlowCard
              tone="green"
              label="kFarmAI"
              steps={t.flow.kf}
            />
          </div>
          <p data-reveal className="dgi-reveal mx-auto mt-10 max-w-3xl px-4 text-center text-base font-medium text-[color:var(--navy)] sm:text-lg">
            {t.flow.footer}
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28">
          <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.title} desc={t.contact.desc} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 px-4 sm:px-6 md:grid-cols-3">
            {t.contact.items.map((c, i) => (
              <ContactCard key={c.k} {...c} tone={["blue", "green", "amber"][i % 3] as "blue" | "green" | "amber"} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={dgiLinkLogoUrl}
                    alt="DGI Link"
                    className="block h-8 w-auto"
                  />
                </div>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
                <div>
                  <div className="font-semibold text-[color:var(--navy-deep)]">{t.footer.sections}</div>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li><a className="hover:text-[color:var(--navy)]" href={CARDSCAN_URL} target="_blank" rel="noopener noreferrer">CardScan AI</a></li>
                    <li><a className="hover:text-[color:var(--navy)]" href={KFARM_URL} target="_blank" rel="noopener noreferrer">kFarmAI</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--navy-deep)]">Legal</div>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li><a className="hover:text-[color:var(--navy)]" href="/privacy.html">{t.footer.privacy}</a></li>
                    <li><a className="hover:text-[color:var(--navy)]" href="/terms.html">{t.footer.terms}</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--navy-deep)]">{t.footer.inquiry}</div>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li><a className="hover:text-[color:var(--navy)]" href="#contact">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
              <div>© 2026 DGI Link (디지아이링크). All rights reserved.</div>
              <div>Data · Green · Intelligence · Link</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* =========================
   Components
   ========================= */
function LogoMark() {
  return (
    <span
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl shadow-md"
      style={{
        background:
          "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 45%, var(--brand-cyan) 75%, var(--brand-green) 100%)",
      }}
      aria-hidden
    >
      <span
        className="pointer-events-none absolute -inset-0.5 rounded-xl opacity-60 blur-[6px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.55), rgba(34,197,94,0.45))",
          zIndex: -1,
        }}
      />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        {/* Left link (DGI side) */}
        <rect
          x="2.5"
          y="8.5"
          width="11"
          height="7"
          rx="3.5"
          stroke="#ffffff"
          strokeOpacity="0.95"
          strokeWidth="2"
        />
        {/* Right link (Link side) */}
        <rect
          x="10.5"
          y="8.5"
          width="11"
          height="7"
          rx="3.5"
          stroke="#a7f3d0"
          strokeWidth="2"
        />
        {/* Spark */}
        <circle cx="12" cy="12" r="1.4" fill="#ffffff" />
      </svg>
    </span>
  );
}

function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const opts: Lang[] = ["ko", "en", "ja"];
  return (
    <div role="tablist" aria-label="Language" className="flex items-center rounded-full border border-border bg-white p-0.5 text-xs">
      {opts.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={lang === o}
          onClick={() => onChange(o)}
          className={`min-w-[2rem] rounded-full px-2.5 py-1 font-semibold uppercase tracking-wider transition-colors ${
            lang === o ? "bg-[color:var(--navy)] text-white" : "text-muted-foreground hover:text-[color:var(--navy)]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <p data-reveal className="dgi-reveal text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">
        {eyebrow}
      </p>
      <h2 data-reveal className="dgi-reveal mt-3 whitespace-pre-line font-display text-[28px] font-bold leading-tight tracking-tight text-[color:var(--navy-deep)] sm:text-[40px]">
        {title}
      </h2>
      {desc && (
        <p data-reveal className="dgi-reveal mt-4 whitespace-pre-line text-base text-muted-foreground sm:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(54,168,82,0.14),transparent_70%)]" />
    </>
  );
}

function ProductShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Connector line between the two cards */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 400 280"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M150 140 C 200 110, 220 170, 260 140"
          stroke="url(#dgi-connector)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="8 8"
          style={{ animation: "dgi-dash 1.6s linear infinite" }}
        />
        <circle cx="150" cy="140" r="5" fill="#06B6D4" />
        <circle cx="260" cy="140" r="5" fill="#36A852" />
        <defs>
          <linearGradient id="dgi-connector" x1="0" x2="1">
            <stop offset="0" stopColor="#06B6D4" />
            <stop offset="1" stopColor="#36A852" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 grid grid-cols-[0.85fr_1fr] items-start gap-6 sm:gap-8">
        <a
          href={CARDSCAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CardScan AI Google Play 페이지 열기"
          className="group mt-8 animate-dgi-float rounded-3xl border border-border bg-white px-3 py-4 shadow-[0_10px_40px_-20px_rgba(15,45,104,0.35)] transition-all hover:-translate-y-1 hover:border-[color:var(--brand-cyan)]"
          style={{ animationDelay: "0s" }}
        >
          <div className="mx-auto flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl">
            <img
              src={cardscanIconUrl}
              alt="CardScan AI 앱 아이콘"
              width={160}
              height={160}
              loading="eager"
              className="block h-full w-full rounded-2xl object-contain"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="text-[13px] font-bold tracking-wide text-[color:var(--navy-deep)]">
              CardScan<span className="text-[color:var(--brand-orange)]"> AI</span>
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">Business contacts</div>
          </div>
        </a>

        <a
          href={KFARM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="kFarmAI 사이트 열기"
          className="group animate-dgi-float rounded-3xl border border-border bg-[#dcfce7] px-3 py-4 shadow-[0_10px_40px_-20px_rgba(54,168,82,0.45)] transition-all hover:-translate-y-1 hover:border-[color:var(--brand-green)]"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex aspect-square w-full items-center justify-center rounded-2xl p-3">
            <img
              src={kfarmLogoUrl}
              alt="kFarmAI logo"
              width={160}
              height={160}
              loading="eager"
              className="max-h-full w-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="text-[13px] font-bold tracking-wide text-[color:var(--brand-green)]">
              kFarm<span className="text-[color:var(--brand-orange)]">AI</span>
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">Farm community</div>
          </div>
        </a>
      </div>
    </div>
  );
}

function CardScanCard({ t }: { t: typeof T[Lang]["cardscan"] }) {
  return (
    <article
      data-reveal
      className="dgi-reveal group relative overflow-hidden rounded-3xl border border-[rgba(15,45,104,0.14)] bg-gradient-to-br from-[#f3f7ff] to-[#e7eef9] p-7 text-[color:var(--navy-deep)] shadow-[0_20px_60px_-30px_rgba(8,26,58,0.25)] transition-all hover:-translate-y-1"
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[color:var(--brand-cyan)]/15 blur-3xl" />

      <div className="relative flex items-start gap-4">
        <a
          href={CARDSCAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CardScan AI Google Play 페이지 열기"
          className="block shrink-0 overflow-hidden rounded-2xl bg-[#08152e] ring-1 ring-[rgba(15,45,104,0.18)] transition-transform hover:-translate-y-0.5"
        >
          <img
            src={cardscanIconUrl}
            alt="CardScan AI 앱 아이콘"
            width={88}
            height={88}
            className="block h-[88px] w-[88px] rounded-2xl sm:h-[100px] sm:w-[100px]"
            style={{ mixBlendMode: "normal" }}
          />
        </a>
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-cyan)]/15 px-2.5 py-1 text-[11px] font-semibold text-[#0a7a93]">
            {t.badge}
          </span>
          <div className="mt-2 text-xs uppercase tracking-wider text-[color:var(--navy)]/60">{t.type}</div>
          <a
            href={CARDSCAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-display text-2xl font-bold tracking-tight text-[color:var(--navy-deep)] hover:text-[color:var(--navy)]"
          >
            {t.title.replace(/\s*AI\s*$/, "")}
            <span className="text-[color:var(--brand-orange)]"> AI</span>
          </a>
        </div>
      </div>

      <p className="relative mt-5 text-[15px] font-medium leading-snug text-[color:var(--navy-deep)]">{t.tagline}</p>
      <p className="relative mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{t.desc}</p>

      <ul className="relative mt-6 grid grid-cols-2 gap-3">
        {t.features.map((f) => (
          <li key={f} className="rounded-xl border border-[rgba(15,45,104,0.10)] bg-white/70 p-3">
            <div className="text-[13px] font-semibold text-[color:var(--navy-deep)]">{f}</div>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {t.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[rgba(15,45,104,0.12)] bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[color:var(--navy)]/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2.5">
        <a
          href={CARDSCAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-orange)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85e15]"
        >
          <PlayIcon />
          {t.ctaPrimary}
        </a>
        <a
          href={CARDSCAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[rgba(15,45,104,0.18)] bg-white px-4 py-2.5 text-sm font-semibold text-[color:var(--navy-deep)] hover:bg-[#eef3fb]"
        >
          {t.ctaSecondary}
          <Arrow />
        </a>
      </div>
    </article>
  );
}

function KFarmCard({ t }: { t: typeof T[Lang]["kfarm"] }) {
  return (
    <article
      data-reveal
      className="dgi-reveal group relative overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-[0_20px_60px_-30px_rgba(54,168,82,0.35)] transition-all hover:-translate-y-1"
    >
      <div className="relative flex items-center gap-4">
        <a
          href={KFARM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="kFarmAI 사이트 열기"
          className="block shrink-0 rounded-2xl border border-border bg-[#dcfce7] p-2 transition-transform hover:-translate-y-0.5"
        >
          <img
            src={kfarmLogoUrl}
            alt="kFarmAI logo"
            width={110}
            height={88}
            className="block h-[80px] w-[110px] object-contain mix-blend-multiply sm:h-[88px]"
          />
        </a>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.type}</div>
        </div>
      </div>

      <p className="relative mt-5 text-[15px] font-medium leading-snug text-[color:var(--navy-deep)]">{t.tagline}</p>
      <p className="relative mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{t.desc}</p>

      <ul className="relative mt-6 grid grid-cols-2 gap-3">
        {t.features.map((f) => (
          <li key={f} className="rounded-xl border border-border bg-[color:var(--background)] p-3">
            <div className="text-[13px] font-semibold text-[color:var(--navy-deep)]">{f}</div>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {t.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-[color:var(--background)] px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-6">
        <a
          href={KFARM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-green)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d8c44]"
        >
          {t.cta}
          <Arrow />
        </a>
      </div>
    </article>
  );
}

function FlowCard({ tone, label, steps }: { tone: "navy" | "green"; label: string; steps: readonly string[] }) {
  const accent = tone === "navy" ? "var(--brand-cyan)" : "var(--brand-green)";
  const bg = tone === "navy" ? "from-[#f3f7ff] to-[#e7eef9]" : "from-white to-[color:var(--brand-green-soft)]";
  const text = "text-[color:var(--navy-deep)]";
  const sub = "text-muted-foreground";
  const aiColor = tone === "navy" ? "var(--brand-orange)" : "var(--brand-orange)";
  // Split "AI" off the end of the label so we can color it differently
  const aiMatch = label.match(/^(.*?)(AI)$/);
  const labelMain = aiMatch ? aiMatch[1] : label;
  const labelAI = aiMatch ? aiMatch[2] : "";
  return (
    <div data-reveal className={`dgi-reveal rounded-3xl border border-border bg-gradient-to-br ${bg} p-5 sm:p-6 ${text}`} style={{ wordBreak: "keep-all" }}>
      <div className="text-[13px] font-display font-bold tracking-wide" style={{ color: accent as string }}>
        {labelMain}
        {labelAI && <span style={{ color: aiColor }}>{labelAI}</span>}
      </div>
      <ol className="mt-3 space-y-1.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ background: accent as string, color: "#fff" }}
            >
              {i + 1}
            </span>
            <span className="font-display text-[15px] font-semibold leading-snug">{s}</span>
            {i < steps.length - 1 && <span className={`ml-auto text-xs ${sub}`}>→</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ContactCard({
  k, v, action, href, tone = "blue",
}: { k: string; v: string; action: string; href?: string; tone?: "blue" | "green" | "amber" }) {
  const aiMatch = k.match(/^(.*?)(AI)$/);
  const kMain = aiMatch ? aiMatch[1] : k;
  const kAI = aiMatch ? aiMatch[2] : "";
  const toneStyles = {
    blue:  { bg: "linear-gradient(180deg, #f3f7ff 0%, #eaf1fb 100%)", border: "rgba(15,45,104,0.14)" },
    green: { bg: "linear-gradient(180deg, #f1faf4 0%, #e6f5ec 100%)", border: "rgba(34,120,72,0.18)" },
    amber: { bg: "linear-gradient(180deg, #fff7ee 0%, #fdeede 100%)", border: "rgba(180,90,20,0.18)" },
  }[tone];
  const inner = (
    <div
      className="flex h-full flex-col rounded-2xl border p-6 shadow-[0_10px_30px_-18px_rgba(15,45,104,0.25)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--navy)] hover:shadow-[0_22px_50px_-25px_rgba(15,45,104,0.5)]"
      style={{ background: toneStyles.bg, borderColor: toneStyles.border }}
    >
      <div className="text-[13px] font-display font-bold tracking-tight text-[color:var(--brand-green)]">
        {kMain}
        {kAI && <span className="text-[color:var(--brand-orange)]">{kAI}</span>}
      </div>
      <div className="mt-2 font-display text-lg font-semibold text-[color:var(--navy-deep)]">{v}</div>
      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--navy)]">
          {action} <Arrow />
        </span>
      </div>
    </div>
  );
  return href ? (
    <a data-reveal className="dgi-reveal block" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${k} — ${action}`}>
      {inner}
    </a>
  ) : (
    <a data-reveal className="dgi-reveal block" href="mailto:contact@dgilink.com" aria-label={`${k} — ${action}`}>
      {inner}
    </a>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 3.5v17l15-8.5z" />
    </svg>
  );
}
