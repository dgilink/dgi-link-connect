import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import cardscanIconUrl from "@/assets/cardscanner-icon.png";
import dgiLinkIconUrl from "@/assets/dgi-link-icon.png";
import dgiLinkLogoUrl from "@/assets/dgi-link-logo.png";
import kfarmLogoUrl from "@/assets/kfarmai-logo.png";
import { homeContent, languageLabels, type Lang } from "@/content/home";
import { brands, businessServices, products, type PublicService } from "@/data/services";

const SITE_URL = "https://dgilink.com/";
const OG_IMAGE_URL = "https://dgilink.com/dgi-link-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
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

function detectLanguage(): Lang {
  if (typeof window === "undefined") return "ko";
  try {
    const saved = window.localStorage.getItem("dgi-lang");
    if (saved === "ko" || saved === "en" || saved === "ja") return saved;
  } catch {
    // Browser privacy settings may disable storage; language switching still works.
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ko")) return "ko";
  if (browserLanguage.startsWith("ja")) return "ja";
  return "en";
}

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("dgi-reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dgi-reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function Index() {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useReveal();
  const content = homeContent[lang];

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLanguage = (nextLanguage: Lang) => {
    setLang(nextLanguage);
    setMenuOpen(false);
    try {
      window.localStorage.setItem("dgi-lang", nextLanguage);
    } catch {
      // Keep the selected language for this page when persistent storage is unavailable.
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="DGI Link home">
            <img src={dgiLinkIconUrl} alt="" className="h-10 w-10" width={40} height={40} />
            <img
              src={dgiLinkLogoUrl}
              alt="DGI Link"
              className="hidden h-10 w-36 object-cover object-center sm:block"
            />
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            <NavLink href="#what">{content.nav.what}</NavLink>
            <NavLink href="#products">{content.nav.products}</NavLink>
            <NavLink href="#brands">{content.nav.brands}</NavLink>
            <NavLink href="#b2b">{content.nav.b2b}</NavLink>
            <NavLink href="#about">{content.nav.about}</NavLink>
            <NavLink href="#contact">{content.nav.contact}</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelect lang={lang} onChange={changeLanguage} />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-[color:var(--navy-deep)] lg:hidden"
              aria-label={menuOpen ? content.nav.closeMenu : content.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-border bg-white px-4 py-4 lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
              <MobileNavLink href="#what" onClick={closeMenu}>
                {content.nav.what}
              </MobileNavLink>
              <MobileNavLink href="#products" onClick={closeMenu}>
                {content.nav.products}
              </MobileNavLink>
              <MobileNavLink href="#brands" onClick={closeMenu}>
                {content.nav.brands}
              </MobileNavLink>
              <MobileNavLink href="#b2b" onClick={closeMenu}>
                {content.nav.b2b}
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={closeMenu}>
                {content.nav.about}
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={closeMenu}>
                {content.nav.contact}
              </MobileNavLink>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative isolate overflow-hidden border-b border-border bg-white">
          <HeroGlow />
          <div className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="animate-dgi-fade-up text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-green)]">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-5 animate-dgi-fade-up whitespace-pre-line font-display text-[42px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[color:var(--navy-deep)] sm:text-6xl lg:text-7xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl animate-dgi-fade-up text-base leading-7 text-muted-foreground sm:text-xl sm:leading-8">
                {content.hero.description}
              </p>
              <div className="mt-8 flex animate-dgi-fade-up flex-col gap-3 min-[420px]:flex-row">
                <a
                  href="#what"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {content.hero.primary}
                  <ArrowIcon />
                </a>
                <a
                  href="mailto:contact@dgilink.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[color:var(--navy)]/20 bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy)] hover:bg-secondary"
                >
                  {content.hero.secondary}
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5">
                {content.hero.proof.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-semibold text-muted-foreground sm:text-sm"
                  >
                    <span className="mr-2 text-[color:var(--brand-cyan)]">●</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <CorporateMap lang={lang} />
          </div>
        </section>

        <section id="what" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={content.what.eyebrow}
              title={content.what.title}
              description={content.what.description}
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.what.pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  data-reveal
                  className="dgi-reveal rounded-2xl border border-border bg-white p-6 shadow-[0_16px_50px_-38px_rgba(8,26,58,0.55)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.18em] text-[color:var(--brand-green)]">
                      0{index + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[color:var(--brand-cyan)]" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-[color:var(--navy-deep)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="products"
          className="scroll-mt-24 border-y border-border bg-white py-20 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={content.products.eyebrow}
              title={content.products.title}
              description={content.products.description}
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {products.map((service) => {
                const cardscan = service.id === "cardscan-ai";
                const kfarm = service.id === "kfarmai";
                const copy = cardscan
                  ? content.products.cardscan
                  : kfarm
                    ? content.products.kfarm
                    : undefined;
                return (
                  <ProductCard
                    key={service.id}
                    service={service}
                    lang={lang}
                    imageUrl={cardscan ? cardscanIconUrl : kfarm ? kfarmLogoUrl : dgiLinkIconUrl}
                    imageAlt={service.name}
                    imageClassName={cardscan ? "rounded-[22%]" : "object-contain p-2"}
                    accent={kfarm ? "green" : "cyan"}
                    tagline={copy?.tagline ?? ""}
                    features={copy?.features ?? []}
                    action={copy?.action ?? content.products.action}
                    label={content.products.label}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section id="brands" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={content.brands.eyebrow}
              title={content.brands.title}
              description={content.brands.description}
            />
            {brands.map((service) => (
              <article
                key={service.id}
                data-reveal
                className="dgi-reveal mt-12 overflow-hidden rounded-3xl bg-[color:var(--navy-deep)] text-white shadow-[0_30px_80px_-45px_rgba(8,26,58,0.8)]"
              >
                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="flex min-h-64 items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(6,182,212,0.28),transparent_45%),linear-gradient(135deg,#0f2d68,#081a3a)] p-8 sm:p-12">
                    <div className="text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                        Curated by DGI Link
                      </p>
                      <div className="mt-4 font-display text-5xl font-extrabold tracking-[-0.05em] sm:text-7xl">
                        {service.id === "dgi-pick" ? (
                          <>
                            DGI <span className="text-[color:var(--brand-orange)]">PICK</span>
                          </>
                        ) : (
                          service.name
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-7 sm:p-10 lg:p-12">
                    <p className="text-sm font-semibold text-cyan-200">{content.brands.relation}</p>
                    <h3 className="mt-4 text-3xl font-bold">{service.name}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                      {service.summary[lang]}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={service.detailUrl}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[color:var(--navy-deep)]"
                      >
                        {content.brands.action}
                        <ArrowIcon />
                      </a>
                      <a
                        href={service.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                      >
                        {content.brands.external}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="b2b" className="scroll-mt-24 border-y border-border bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={content.b2b.eyebrow}
              title={content.b2b.title}
              description={content.b2b.description}
            />
            {businessServices.map((service) => (
              <article
                key={service.id}
                data-reveal
                className="dgi-reveal mt-12 grid overflow-hidden rounded-3xl border border-border bg-[color:var(--background)] lg:grid-cols-[1fr_1.15fr]"
              >
                <div className="border-b border-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
                  <span className="inline-flex rounded-full bg-[color:var(--brand-orange-soft)] px-3 py-1 text-xs font-bold text-[color:var(--brand-orange)]">
                    B2B Operations Support
                  </span>
                  <h3 className="mt-5 text-3xl font-bold text-[color:var(--navy-deep)]">
                    {service.displayName?.[lang] ?? service.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {service.summary[lang]}
                  </p>
                  <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                    {content.b2b.privacy}
                  </p>
                  <a
                    href={service.detailUrl}
                    className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white"
                  >
                    {content.b2b.action}
                    <ArrowIcon />
                  </a>
                </div>
                <div className="grid gap-5 p-7 sm:p-10 lg:p-12">
                  <ScopePanel
                    title={content.b2b.scopeLabel}
                    items={content.b2b.scope}
                    tone="green"
                  />
                  <ScopePanel
                    title={content.b2b.responsibilityLabel}
                    items={[content.b2b.responsibility]}
                    tone="navy"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <SectionHeader
              eyebrow={content.about.eyebrow}
              title={content.about.title}
              description={content.about.description}
              align="left"
            />
            <div data-reveal className="dgi-reveal grid gap-3 sm:grid-cols-2">
              {content.about.points.map((point, index) => (
                <div key={point} className="rounded-2xl border border-border bg-white p-5">
                  <span className="text-xs font-bold text-[color:var(--brand-cyan)]">
                    0{index + 1}
                  </span>
                  <p className="mt-3 font-semibold text-[color:var(--navy-deep)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 bg-[color:var(--navy)] py-20 text-white sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-reveal className="dgi-reveal grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                  {content.partnership.eyebrow}
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">
                  {content.partnership.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                  {content.partnership.description}
                </p>
              </div>
              <a
                href="mailto:contact@dgilink.com"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[color:var(--navy-deep)]"
              >
                {content.partnership.action}
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={content.business.eyebrow}
              title={content.business.title}
              description={content.business.description}
              align="left"
            />
            <dl
              data-reveal
              className="dgi-reveal mt-10 grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-5"
            >
              <BusinessDatum label={content.business.labels.name} value="디지아이링크 (DGI Link)" />
              <BusinessDatum label={content.business.labels.representative} value="송성민" />
              <BusinessDatum
                label={content.business.labels.email}
                value="contact@dgilink.com"
                href="mailto:contact@dgilink.com"
              />
              <BusinessDatum
                label={content.business.labels.domain}
                value="dgilink.com"
                href="https://dgilink.com/"
              />
              <BusinessDatum
                label={content.business.labels.mailOrder}
                value="제 2026-전남순천-7250 호"
              />
            </dl>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-[color:var(--navy)]"
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-[color:var(--navy-deep)]"
    >
      {children}
    </a>
  );
}

function LanguageSelect({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <label className="relative">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(event) => onChange(event.target.value as Lang)}
        className="h-10 appearance-none rounded-xl border border-border bg-white py-2 pl-3 pr-8 text-xs font-semibold text-[color:var(--navy-deep)] outline-none focus:ring-2 focus:ring-[color:var(--brand-cyan)]"
        aria-label="Language"
      >
        {(Object.entries(languageLabels) as [Lang, string][]).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
        ▼
      </span>
    </label>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <div className={alignment}>
      <p
        data-reveal
        className="dgi-reveal text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--brand-green)]"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="dgi-reveal mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[color:var(--navy-deep)] sm:text-5xl"
      >
        {title}
      </h2>
      <p
        data-reveal
        className="dgi-reveal mt-5 text-base leading-7 text-muted-foreground sm:text-lg"
      >
        {description}
      </p>
    </div>
  );
}

function CorporateMap({ lang }: { lang: Lang }) {
  const labels = {
    ko: ["제품", "브랜드", "B2B 운영지원"],
    en: ["Products", "Brand", "B2B Support"],
    ja: ["プロダクト", "ブランド", "B2B運用支援"],
  }[lang];

  return (
    <div data-reveal className="dgi-reveal relative mx-auto w-full max-w-xl">
      <div className="rounded-[32px] border border-[color:var(--navy)]/10 bg-white/85 p-5 shadow-[0_30px_90px_-45px_rgba(8,26,58,0.55)] backdrop-blur sm:p-7">
        <div className="flex items-center gap-4 rounded-2xl bg-[color:var(--navy-deep)] p-5 text-white">
          <img
            src={dgiLinkIconUrl}
            alt=""
            className="h-14 w-14 shrink-0 rounded-2xl bg-white"
            width={56}
            height={56}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Corporate · Operator
            </p>
            <p className="mt-1 text-2xl font-bold">DGI Link</p>
          </div>
        </div>
        <div className="my-3 flex justify-center" aria-hidden="true">
          <span className="h-7 w-px bg-gradient-to-b from-[color:var(--brand-cyan)] to-border" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <MapCard
            label={labels[0]}
            names={products.map((service) => service.name).join(" · ")}
            tone="cyan"
          />
          <MapCard
            label={labels[1]}
            names={brands.map((service) => service.name).join(" · ")}
            tone="orange"
          />
          <MapCard
            label={labels[2]}
            names={businessServices
              .map((service) => service.displayName?.[lang] ?? service.name)
              .join(" · ")}
            tone="green"
          />
        </div>
      </div>
    </div>
  );
}

function MapCard({
  label,
  names,
  tone,
}: {
  label: string;
  names: string;
  tone: "cyan" | "orange" | "green";
}) {
  const tones = {
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-800",
    orange: "border-orange-200 bg-orange-50 text-orange-800",
    green: "border-green-200 bg-green-50 text-green-800",
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em]">{label}</p>
      <p className="mt-3 text-sm font-bold leading-5 text-[color:var(--navy-deep)]">{names}</p>
    </div>
  );
}

function ProductCard({
  service,
  lang,
  imageUrl,
  imageAlt,
  imageClassName,
  accent,
  tagline,
  features,
  action,
  label,
}: {
  service: PublicService;
  lang: Lang;
  imageUrl: string;
  imageAlt: string;
  imageClassName: string;
  accent: "cyan" | "green";
  tagline: string;
  features: readonly string[];
  action: string;
  label: string;
}) {
  const palette =
    accent === "cyan"
      ? "border-cyan-100 bg-gradient-to-br from-slate-50 to-cyan-50"
      : "border-green-100 bg-gradient-to-br from-white to-green-50";
  const actionColor =
    accent === "cyan" ? "bg-[color:var(--navy)]" : "bg-[color:var(--brand-green)]";

  return (
    <article
      data-reveal
      className={`dgi-reveal flex h-full flex-col rounded-3xl border p-6 shadow-[0_24px_70px_-45px_rgba(8,26,58,0.65)] sm:p-8 ${palette}`}
    >
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white p-1 shadow-sm sm:h-24 sm:w-24">
          <img src={imageUrl} alt={imageAlt} className={`h-full w-full ${imageClassName}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[color:var(--navy-deep)] sm:text-3xl">
            {service.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[color:var(--brand-green)]">{tagline}</p>
        </div>
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground sm:text-base">
        {service.summary[lang]}
      </p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="rounded-xl border border-white bg-white/80 px-3 py-3 text-xs font-semibold leading-5 text-[color:var(--navy-deep)]"
          >
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <a
          href={service.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${actionColor}`}
        >
          {action}
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function ScopePanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "green" | "navy";
}) {
  const classes =
    tone === "green"
      ? "border-green-200 bg-green-50 text-green-950"
      : "border-slate-200 bg-slate-100 text-[color:var(--navy-deep)]";
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${classes}`}>
      <h4 className="text-sm font-bold">{title}</h4>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6">
            <span aria-hidden="true" className="font-bold text-[color:var(--brand-green)]">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BusinessDatum({ label, value, href }: { label: string; value: string; href?: string }) {
  const renderedValue = href ? (
    <a href={href} className="break-all font-semibold text-[color:var(--navy)] hover:underline">
      {value}
    </a>
  ) : (
    <span className="font-semibold text-[color:var(--navy-deep)]">{value}</span>
  );

  return (
    <div className="border-b border-border p-5 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6">{renderedValue}</dd>
    </div>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const content = homeContent[lang].footer;
  return (
    <footer className="bg-[color:var(--navy-deep)] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-xl font-bold text-white">DGI Link</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">{content.statement}</p>
        </div>
        <FooterGroup
          title={content.products}
          links={products.map((service) => ({
            label: service.name,
            href: service.externalUrl ?? service.detailUrl,
          }))}
          external
        />
        <FooterGroup
          title={content.brands}
          links={brands.map((service) => ({
            label: service.name,
            href: service.detailUrl ?? service.externalUrl,
          }))}
        />
        <FooterGroup
          title={content.legal}
          links={[
            ...businessServices.map((service) => ({
              label: service.displayName?.[lang] ?? service.name,
              href: service.detailUrl ?? service.externalUrl,
            })),
            { label: content.privacy, href: "/privacy.html" },
            { label: content.terms, href: "/terms.html" },
            { label: content.contact, href: "mailto:contact@dgilink.com" },
          ]}
        />
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        © 2026 DGI Link (디지아이링크). All rights reserved.
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
  external = false,
}: {
  title: string;
  links: readonly { label: string; href: string | undefined }[];
  external?: boolean;
}) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function HeroGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-44 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(54,168,82,0.14),transparent_68%)]"
      />
    </>
  );
}
