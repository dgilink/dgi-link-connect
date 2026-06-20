import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import cardscanIconAsset from "@/assets/cardscanner-icon.png.asset.json";
import kfarmLogoAsset from "@/assets/kfarmai-logo.png.asset.json";
import dgiLinkLogoAsset from "@/assets/dgi-link-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DGI Link | CardScan AI와 kFarmAI" },
      {
        name: "description",
        content:
          "DGI Link는 명함과 업무 연락처를 관리하는 CardScan AI, 농업·식물 AI 커뮤니티 kFarmAI를 운영합니다.",
      },
      { property: "og:title", content: "DGI Link | CardScan AI와 kFarmAI" },
      {
        property: "og:description",
        content:
          "흩어진 정보와 사람을 데이터·AI로 연결하는 브랜드. CardScan AI · kFarmAI 운영.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
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
      title: ["흩어진 것을 ", "연결", "합니다."] as readonly string[],
      desc:
        ["DGI Link", "는 현장에 흩어진 정보와 사람을 ", "데이터", "와 ", "AI", "로 연결해 더 간단하고 효율적인 경험을 만듭니다."] as readonly string[],
      ctaPrimary: "서비스 살펴보기",
      ctaSecondary: "브랜드 이야기",
    },
    services: {
      eyebrow: "Our Services",
      title: "현장의 문제를 해결하는 두 가지 서비스",
      desc:
        "업무 연락처 관리부터 농업·식물 정보까지, 서로 다른 현장의 불편을 더 간단한 방식으로 해결합니다.",
    },
    cardscan: {
      badge: "Available on Google Play",
      type: "업무 연락처 앱",
      title: "CardScan AI",
      tagline: "명함이 있어도, 없어도 사람과 만남을 기억하는 업무 연락처 앱",
      desc:
        "명함을 스캔하면 이름, 회사, 부서, 직책, 연락처, 이메일, 주소까지 자동으로 정리합니다. 명함이 없어도 직접 입력하거나 휴대폰 연락처에서 가져와 업무 연락처로 관리할 수 있어요.",
      features: [
        { t: "AI 명함 스캔", d: "명함 정보를 빠르게 인식하고 수정" },
        { t: "업무 연락처 관리", d: "명함이 없어도 직접 등록·관리" },
        { t: "만남·약속 기록", d: "장소, 행사, 메모, 다음 행동 저장" },
        { t: "행사·내보내기", d: "행사별 관리 · Excel/CSV 내보내기" },
      ],
      ctaPrimary: "Google Play에서 보기",
      ctaSecondary: "자세히 보기",
    },
    kfarm: {
      badge: "AI Farm Community",
      type: "농업·식물 AI 플랫폼",
      title: "kFarmAI",
      tagline: "농업과 식물의 문제를 정보, AI, 사람으로 연결하는 커뮤니티 플랫폼",
      desc:
        "농업인, 텃밭·홈가드닝·반려식물 사용자가 식물 문제를 찾고 해결할 수 있도록 공식기관 기반 정보, AI 진단, 주변 농자재 정보와 커뮤니티를 연결합니다.",
      features: [
        { t: "AI 식물 진단", d: "사진 기반 증상 확인" },
        { t: "농업·식물 정보", d: "공식기관 자료 기반 탐색" },
        { t: "주변 농자재 연결", d: "농약사·농자재 업체 정보" },
        { t: "커뮤니티", d: "질문·경험·해결 방법 공유" },
      ],
      cta: "kFarmAI 방문하기",
    },
    about: {
      eyebrow: "About",
      title: "데이터와 현장을 연결하는 브랜드",
      desc:
        "DGI Link는 단순히 앱을 만드는 브랜드가 아닙니다. 현장에서 반복되는 불편을 발견하고, 정보를 정리하고, 기술을 연결해 사람들이 더 중요한 일에 집중할 수 있도록 돕습니다.",
      meaning: [
        { k: "Data", v: "흩어진 정보를 구조화합니다." },
        { k: "Green", v: "농업과 현장의 문제를 이해합니다." },
        { k: "Intelligence", v: "AI를 실용적인 도구로 사용합니다." },
        { k: "Link", v: "사람과 정보, 문제와 해결을 연결합니다." },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "세상은 정보가 부족한 것이 아니라, 연결이 끊겨 있을 뿐입니다.",
      p1: "명함은 지갑이나 서랍에 남고, 중요한 만남과 약속은 잊힙니다.",
      p2: "농업과 식물 정보는 여러 사이트와 커뮤니티에 흩어져 있어 필요한 답을 찾기 어렵습니다.",
      p3: "DGI Link는 이렇게 흩어진 정보와 사람을 하나의 흐름으로 연결합니다.",
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
      title: "함께 연결할 이야기가 있나요?",
      desc: "제휴, 문의, 또는 서비스 사용에 대해 알려주세요.",
      items: [
        { k: "일반 문의 · 제휴/B2B", v: "프로젝트와 협업 제안 환영합니다.", action: "문의하기" },
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
      title: ["Connecting ", "What's", " Scattered."] as readonly string[],
      desc:
        ["DGI Link", " connects scattered information and people on the ground through ", "data", " and ", "AI", " — for simpler, more efficient work."] as readonly string[],
      ctaPrimary: "Explore services",
      ctaSecondary: "Our story",
    },
    services: {
      eyebrow: "Our Services",
      title: "Two services solving real problems on the ground",
      desc:
        "From business contacts to farming and plant care — we tackle very different problems in a simpler way.",
    },
    cardscan: {
      badge: "Available on Google Play",
      type: "Business contacts app",
      title: "CardScan AI",
      tagline:
        "Remember every person and meeting — with or without a business card.",
      desc:
        "Scan a business card and we auto-organize name, company, role, phone, email, and address. No card? Enter it manually or import from your phone contacts.",
      features: [
        { t: "AI Card Scan", d: "Fast recognition with easy edits" },
        { t: "Contact Manager", d: "Add and manage even without a card" },
        { t: "Meeting Notes", d: "Place, event, notes, next actions" },
        { t: "Events & Export", d: "Event grouping · Excel/CSV export" },
      ],
      ctaPrimary: "View on Google Play",
      ctaSecondary: "Learn more",
    },
    kfarm: {
      badge: "AI Farm Community",
      type: "Agriculture & plant AI platform",
      title: "kFarmAI",
      tagline:
        "A community platform connecting plant problems with information, AI, and people.",
      desc:
        "For farmers, gardeners, and plant lovers — official sources, AI diagnosis, nearby agri-supplies, and a community, all in one place.",
      features: [
        { t: "AI Plant Diagnosis", d: "Identify symptoms from photos" },
        { t: "Verified Info", d: "From official institutions" },
        { t: "Nearby Suppliers", d: "Agri-chemical and supply shops" },
        { t: "Community", d: "Ask, share, solve together" },
      ],
      cta: "Visit kFarmAI",
    },
    about: {
      eyebrow: "About",
      title: "A brand that links data to the field",
      desc:
        "DGI Link is more than apps. We notice the friction that repeats on the ground, organize the information, and connect the technology — so people can focus on what really matters.",
      meaning: [
        { k: "Data", v: "Structure scattered information." },
        { k: "Green", v: "Understand field and farming problems." },
        { k: "Intelligence", v: "Use AI as a practical tool." },
        { k: "Link", v: "Connect people, information, and solutions." },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "The world doesn't lack information — it lacks connection.",
      p1: "Business cards end up in wallets and drawers; important meetings get forgotten.",
      p2: "Farming and plant info is scattered across sites and communities — answers are hard to find.",
      p3: "DGI Link weaves these scattered pieces of information and people into a single flow.",
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
      title: "Have something to connect?",
      desc: "Reach out about partnerships, questions, or product feedback.",
      items: [
        { k: "General · B2B", v: "Partnerships and projects welcome.", action: "Get in touch" },
        { k: "CardScan AI", v: "Download on Google Play", action: "Open app page", href: CARDSCAN_URL },
        { k: "kFarmAI", v: "Visit the community", action: "Open site", href: KFARM_URL },
      ],
    },
    footer: {
      tagline: "Connecting what's scattered.",
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
      title: ["散らばったものを、", "つなぐ", "。"] as readonly string[],
      desc:
        ["DGI Link", "は、現場に散らばった情報と人を", "データ", "と", "AI", "でつなぎ、よりシンプルで効率的な体験をつくります。"] as readonly string[],
      ctaPrimary: "サービスを見る",
      ctaSecondary: "ブランドストーリー",
    },
    services: {
      eyebrow: "Our Services",
      title: "現場の課題を解決する2つのサービス",
      desc:
        "ビジネス連絡先から農業・植物情報まで、異なる現場の不便をよりシンプルに解決します。",
    },
    cardscan: {
      badge: "Available on Google Play",
      type: "ビジネス連絡先アプリ",
      title: "CardScan AI",
      tagline: "名刺があっても、なくても、人と出会いを記録できる連絡先アプリ。",
      desc:
        "名刺をスキャンすると、氏名・会社・部署・役職・電話・メール・住所まで自動で整理。名刺がなくても直接入力や電話帳からの取り込みで管理できます。",
      features: [
        { t: "AI 名刺スキャン", d: "高速認識と簡単修正" },
        { t: "連絡先管理", d: "名刺がなくても登録可能" },
        { t: "ミーティング記録", d: "場所・イベント・メモ・次の行動" },
        { t: "イベント・書き出し", d: "イベント別管理 · Excel/CSV" },
      ],
      ctaPrimary: "Google Playで見る",
      ctaSecondary: "詳しく見る",
    },
    kfarm: {
      badge: "AI Farm Community",
      type: "農業・植物AIプラットフォーム",
      title: "kFarmAI",
      tagline: "農業と植物の課題を、情報・AI・人でつなぐコミュニティ。",
      desc:
        "農家・家庭菜園・観葉植物のユーザー向けに、公的機関情報、AI診断、周辺の農資材、コミュニティを1つにまとめます。",
      features: [
        { t: "AI 植物診断", d: "写真から症状を確認" },
        { t: "信頼できる情報", d: "公的機関ベース" },
        { t: "近隣の農資材", d: "農薬店・資材店情報" },
        { t: "コミュニティ", d: "質問・共有・解決" },
      ],
      cta: "kFarmAIを開く",
    },
    about: {
      eyebrow: "About",
      title: "データと現場をつなぐブランド",
      desc:
        "DGI Linkは単なるアプリブランドではありません。現場で繰り返される不便を見つけ、情報を整理し、技術をつなぐことで、人々がより大切なことに集中できるようにします。",
      meaning: [
        { k: "Data", v: "散らばった情報を構造化。" },
        { k: "Green", v: "農業と現場の課題を理解。" },
        { k: "Intelligence", v: "AIを実用的な道具に。" },
        { k: "Link", v: "人と情報、課題と解決をつなぐ。" },
      ],
    },
    story: {
      eyebrow: "Brand Story",
      quote: "世界に足りないのは情報ではなく、つながりです。",
      p1: "名刺は財布や引き出しに残り、大切な約束は忘れられます。",
      p2: "農業や植物の情報はあちこちに散らばり、答えを探すのが難しい。",
      p3: "DGI Linkは、こうした散らばった情報と人を1つの流れにつなぎます。",
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
      title: "つなげたい話がありますか？",
      desc: "提携・お問い合わせ・ご意見をお寄せください。",
      items: [
        { k: "一般・B2B", v: "提携・プロジェクトを歓迎します。", action: "問い合わせる" },
        { k: "CardScan AI", v: "Google Playからダウンロード", action: "アプリページ", href: CARDSCAN_URL },
        { k: "kFarmAI", v: "コミュニティを訪問", action: "サイトを開く", href: KFARM_URL },
      ],
    },
    footer: {
      tagline: "散らばったものを、つなぐ。",
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
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <img
              src={dgiLinkLogoAsset.url}
              alt="DGI Link"
              className="block h-8 w-auto sm:h-9"
              loading="eager"
            />
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
              <h1 className="mt-5 font-display text-[40px] font-extrabold leading-[1.15] tracking-tight text-[color:var(--navy-deep)] sm:text-[56px] lg:text-[64px]">
                {t.hero.title[0]}
                <span className="text-[color:var(--brand-cyan)]">
                  {t.hero.title[1]}
                </span>
                {t.hero.title[2]}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                <span className="font-bold text-[color:var(--navy-deep)]">DGI</span>
                <span className="font-bold text-[color:var(--brand-cyan)]"> Link</span>
                {t.hero.desc[0].replace(/^DGI Link/, "")}
                {t.hero.desc[1]}
                <span className="font-semibold text-[color:var(--brand-cyan)]">{t.hero.desc[2]}</span>
                {t.hero.desc[3]}
                <span className="font-semibold text-[color:var(--brand-orange)]">{t.hero.desc[4]}</span>
                {t.hero.desc[5]}
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
                        <div className="font-display text-lg font-bold text-[color:var(--navy-deep)] sm:text-xl">
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
              className="dgi-reveal mx-auto mt-4 max-w-3xl font-display text-[28px] font-bold leading-[1.3] tracking-tight text-[color:var(--navy-deep)] sm:text-[40px]"
            >
              <span className="text-[color:var(--brand-green)]">“</span>
              {t.story.quote}
              <span className="text-[color:var(--brand-green)]">”</span>
            </blockquote>
            <div data-reveal className="dgi-reveal mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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
                    src={dgiLinkLogoAsset.url}
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
                    <li><a className="hover:text-[color:var(--navy)]" href="#">{t.footer.privacy}</a></li>
                    <li><a className="hover:text-[color:var(--navy)]" href="#">{t.footer.terms}</a></li>
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
              <div>© 2026 DGI Link. {t.footer.rights}</div>
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
      <h2 data-reveal className="dgi-reveal mt-3 font-display text-[28px] font-bold leading-tight tracking-tight text-[color:var(--navy-deep)] sm:text-[40px]">
        {title}
      </h2>
      {desc && (
        <p data-reveal className="dgi-reveal mt-4 text-base text-muted-foreground sm:text-lg">
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
          <div className="mx-auto flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-5 sm:p-6">
            <img
              src={cardscanIconAsset.url}
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
          className="group animate-dgi-float rounded-3xl border border-border bg-white px-3 py-4 shadow-[0_10px_40px_-20px_rgba(54,168,82,0.45)] transition-all hover:-translate-y-1 hover:border-[color:var(--brand-green)]"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-[color:var(--brand-green-soft)] p-3">
            <img
              src={kfarmLogoAsset.url}
              alt="kFarmAI logo"
              width={160}
              height={160}
              loading="eager"
              className="max-h-full w-full object-contain"
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
            src={cardscanIconAsset.url}
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
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>

      <ul className="relative mt-6 grid grid-cols-2 gap-3">
        {t.features.map((f) => (
          <li key={f.t} className="rounded-xl border border-[rgba(15,45,104,0.10)] bg-white/70 p-3">
            <div className="text-[13px] font-semibold text-[color:var(--navy-deep)]">{f.t}</div>
            <div className="mt-1 text-xs text-muted-foreground">{f.d}</div>
          </li>
        ))}
      </ul>

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
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--brand-green-soft)]" />

      <div className="relative flex items-start gap-4">
        <a
          href={KFARM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="kFarmAI 사이트 열기"
          className="block shrink-0 rounded-2xl border border-border bg-[color:var(--brand-green-soft)] p-2 transition-transform hover:-translate-y-0.5"
        >
          <img
            src={kfarmLogoAsset.url}
            alt="kFarmAI logo"
            width={110}
            height={88}
            className="block h-[80px] w-[110px] object-contain sm:h-[88px]"
          />
        </a>
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-green-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-green)]" />
            {t.badge}
          </span>
          <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{t.type}</div>
          <a
            href={KFARM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-display text-2xl font-bold tracking-tight text-[color:var(--navy-deep)] hover:text-[color:var(--brand-green)]"
          >
            {t.title.replace(/AI$/, "")}
            <span className="text-[color:var(--brand-orange)]">AI</span>
          </a>
        </div>
      </div>

      <p className="relative mt-5 text-[15px] font-medium leading-snug text-[color:var(--navy-deep)]">{t.tagline}</p>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>

      <ul className="relative mt-6 grid grid-cols-2 gap-3">
        {t.features.map((f) => (
          <li key={f.t} className="rounded-xl border border-border bg-[color:var(--background)] p-3">
            <div className="text-[13px] font-semibold text-[color:var(--navy-deep)]">{f.t}</div>
            <div className="mt-1 text-xs text-muted-foreground">{f.d}</div>
          </li>
        ))}
      </ul>

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
    <a data-reveal className="dgi-reveal block" href="mailto:hello@dgilink.com" aria-label={`${k} — ${action}`}>
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
