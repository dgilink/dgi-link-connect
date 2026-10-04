import { useEffect, useRef, useState } from "react";

import cardscanIcon from "@/assets/cardscanner-icon.png";
import fieldLandscape from "@/assets/design/field-landscape.webp";
import kfarmPreview from "@/assets/design/kfarm-preview.jpg";
import pickPreview from "@/assets/design/pick-preview.jpg";
import realtyPreview from "@/assets/design/realty-preview.jpg";
import { designContent } from "@/content/design";
import { homeContent, languageLabels, type Lang } from "@/content/home";
import { brands, businessServices, products } from "@/data/services";

import "@/corporate-home.css";

// Every published entry comes from the existing public registry; no customer projects live here.
const portfolio = [...brands, ...businessServices, ...products];
const images: Record<string, string> = {
  "dgi-pick": pickPreview,
  "dgi-realty-operations": realtyPreview,
  "cardscan-ai": cardscanIcon,
  kfarmai: kfarmPreview,
};

function detectLanguage(): Lang {
  try {
    const stored = localStorage.getItem("dgi-lang");
    if (stored === "ko" || stored === "en" || stored === "ja") return stored;
  } catch {
    // Language switching remains available when browser storage is blocked.
  }
  const language = navigator.language.toLowerCase();
  return language.startsWith("ko") ? "ko" : language.startsWith("ja") ? "ja" : "en";
}

export function CorporateHome() {
  const [lang, setLang] = useState<Lang>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const content = designContent[lang];
  const legacy = homeContent[lang];
  const nav = ["#services", "#projects", "#about"];

  useEffect(() => setLang(detectLanguage()), []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLanguage = (next: Lang) => {
    setLang(next);
    setMenuOpen(false);
    try {
      localStorage.setItem("dgi-lang", next);
    } catch {
      // The in-memory preference still works.
    }
  };

  return (
    <div className="corporate-home" id="top">
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <header className="site-nav">
        <div className="editorial-container nav-inner">
          <a className="wordmark" href="#top" aria-label="DGI LINK home">
            DGI LINK
          </a>
          <nav className="desktop-navigation" aria-label="Primary navigation">
            {nav.map((href, index) => (
              <a key={href} href={href}>
                {content.nav[index]}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <label className="language-control">
              <span className="sr-only">Language</span>
              <select
                aria-label="Language"
                value={lang}
                onChange={(event) => changeLanguage(event.target.value as Lang)}
              >
                {Object.entries(languageLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <a className="header-contact" href="mailto:contact@dgilink.com">
              {content.contact}
            </a>
            <a className="button button-ink header-explore" href="#services">
              {content.explore}
              <Arrow />
            </a>
            <button
              ref={menuButton}
              className="menu-button"
              type="button"
              aria-label={menuOpen ? legacy.nav.closeMenu : legacy.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={menuOpen ? "M6 6 18 18M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            {nav.map((href, index) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {content.nav[index]}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {content.contact}
            </a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="editorial-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="brand-axis">
              <span>Data</span> · Green · Intelligence · <span>Link</span>
            </p>
            <h1 id="hero-title">{content.hero}</h1>
            <p className="hero-description">{content.description}</p>
            <div className="hero-actions">
              <a className="button button-ink" href="#about">
                {content.intro}
                <Arrow />
              </a>
              <a className="button button-outline" href="#services">
                {content.servicesAction}
              </a>
            </div>
          </div>
          <figure className="hero-visual">
            <img
              src={fieldLandscape}
              alt={content.visualAlt}
              width={1600}
              height={1067}
              fetchPriority="high"
            />
            <div className="hero-visual-line" aria-hidden="true" />
            <p className="visual-message">
              From
              <br />
              Real Problems
              <br />
              to Working Solutions.
            </p>
            <figcaption>
              <span>
                Connecting
                <br />
                People, Data,
                <br />
                and a Better Tomorrow.
              </span>
              <strong>DGI LINK</strong>
            </figcaption>
          </figure>
          <dl className="hero-stats">
            {[
              String(portfolio.length),
              String(new Set(portfolio.map((service) => service.category)).size),
              "∞",
            ].map((value, index) => (
              <div key={content.stats[index]}>
                <dt>{content.stats[index]}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="services-section editorial-container"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our services</p>
              <h2 id="services-title">
                <span className="desktop-copy">{content.servicesTitle}</span>
                <span className="mobile-copy">{content.servicesShort}</span>
              </h2>
            </div>
            <p className="section-description">{content.servicesDescription}</p>
            <a className="text-link" href="#service-directory">
              {content.allServices}
              <Arrow />
            </a>
          </div>
          <div className="service-grid">
            {portfolio.map((service, index) => {
              const copy = content.cards[index];
              const href = service.detailUrl ?? service.externalUrl;
              const external = !service.detailUrl;
              return (
                <article
                  key={service.id}
                  id={
                    service.category === "brand"
                      ? "brands"
                      : service.category === "businessService"
                        ? "b2b"
                        : service.id === "cardscan-ai"
                          ? "products"
                          : undefined
                  }
                  className={`service-card service-${service.id}`}
                >
                  <a
                    className="service-card-link"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <div className="service-copy">
                      <h3>
                        <span className="service-mark" aria-hidden="true">
                          {index === 3 ? "↗" : "•"}
                        </span>
                        {service.id === "dgi-realty-operations" ? "DGI Realty" : service.name}
                      </h3>
                      <p className="service-tagline desktop-copy">
                        {copy?.title ?? service.summary[lang]}
                      </p>
                      <p className="service-short mobile-copy">
                        {copy?.short ?? service.summary[lang]}
                      </p>
                      <ul className="service-tags">
                        {copy?.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="service-image">
                      <img
                        src={images[service.id]}
                        alt=""
                        width={1024}
                        height={650}
                        loading="lazy"
                      />
                    </div>
                    <span className="service-action">
                      {service.id === "cardscan-ai"
                        ? legacy.products.cardscan.action
                        : service.id === "kfarmai"
                          ? legacy.products.kfarm.action
                          : content.details}
                      <Arrow />
                    </span>
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="projects-section editorial-container"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected projects</p>
              <h2 id="projects-title">
                <span className="desktop-copy">{content.projectsTitle}</span>
                <span className="mobile-copy">{content.projectsShort}</span>
              </h2>
            </div>
            <p className="project-note">{content.projectsNote}</p>
          </div>
          <div className="project-grid">
            {portfolio.map((service, index) => (
              <a
                key={service.id}
                className={`project-item project-${service.id}`}
                href={service.detailUrl ?? service.externalUrl}
                target={service.detailUrl ? undefined : "_blank"}
                rel={service.detailUrl ? undefined : "noopener noreferrer"}
              >
                <div className="project-image">
                  <img src={images[service.id]} alt="" loading="lazy" width={1024} height={650} />
                </div>
                <div className="project-copy">
                  <span className="project-number">0{index + 1}</span>
                  <h3>{service.id === "dgi-realty-operations" ? "DGI Realty" : service.name}</h3>
                  <p>{content.projectDescriptions[index] ?? service.summary[lang]}</p>
                  <span className="project-category">
                    {service.category === "product"
                      ? "Product"
                      : service.category === "brand"
                        ? "Brand · Content"
                        : "B2B · Operations"}
                  </span>
                  <Arrow />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact" aria-labelledby="contact-title">
          <div className="contact-geometry" aria-hidden="true" />
          <div className="editorial-container contact-inner">
            <div>
              <p className="eyebrow">Let’s connect</p>
              <h2 id="contact-title">{content.cta}</h2>
              <p>{content.ctaDescription}</p>
            </div>
            <a className="button button-white" href="mailto:contact@dgilink.com">
              {content.contact}
              <Arrow />
            </a>
          </div>
        </section>

        <section
          className="company-section editorial-container"
          id="about"
          aria-labelledby="about-title"
        >
          <details className="company-details">
            <summary>
              <span>
                <span className="eyebrow">About DGI LINK</span>
                <span id="about-title" className="company-title">
                  {content.about}
                </span>
              </span>
              <span className="expand-sign" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="company-body">
              <p>{content.aboutDescription}</p>
              <dl className="business-data">
                <BusinessDatum
                  label={legacy.business.labels.name}
                  value="디지아이링크 (DGI Link)"
                />
                <BusinessDatum label={legacy.business.labels.representative} value="송성민" />
                <BusinessDatum
                  label={legacy.business.labels.email}
                  value="contact@dgilink.com"
                  href="mailto:contact@dgilink.com"
                />
                <BusinessDatum
                  label={legacy.business.labels.domain}
                  value="dgilink.com"
                  href="https://dgilink.com/"
                />
                <BusinessDatum
                  label={legacy.business.labels.mailOrder}
                  value="제 2026-전남순천-7250 호"
                />
              </dl>
            </div>
          </details>
          <div className="operator-disclosures" id="service-directory">
            <p>
              {content.pickRelation}{" "}
              <a href="https://dgipick.com" target="_blank" rel="noopener noreferrer">
                dgipick.com <span aria-hidden="true">↗</span>
              </a>
            </p>
            <p>
              {content.realtyRole}{" "}
              <a href="/realty/">
                {content.details} <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="corporate-footer editorial-container">
        <div className="footer-brand">
          <a className="wordmark" href="#top">
            DGI LINK
          </a>
          <p>{content.brandMessage}</p>
        </div>
        <nav aria-label="Footer navigation">
          {nav.map((href, index) => (
            <a key={href} href={href}>
              {content.nav[index]}
            </a>
          ))}
          <a href="/privacy.html">{legacy.footer.privacy}</a>
          <a href="/terms.html">{legacy.footer.terms}</a>
        </nav>
        <div className="footer-contact">
          <a href="mailto:contact@dgilink.com">contact@dgilink.com</a>
          <small>© 2026 DGI Link. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

function BusinessDatum({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{href ? <a href={href}>{value}</a> : value}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}
