import type { ReactNode } from "react";

export function CorporateDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-xl">
        <nav
          className="mx-auto flex min-h-[68px] max-w-6xl items-center justify-between gap-5 px-4 sm:px-6"
          aria-label="주요 탐색"
        >
          <a
            href="/"
            className="font-display text-xl font-extrabold tracking-[-0.04em] text-[color:var(--navy-deep)]"
          >
            DGI Link
          </a>
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground sm:text-sm">
            <a href="/" className="hidden hover:text-[color:var(--navy)] sm:inline">
              Corporate Home
            </a>
            <a href="mailto:contact@dgilink.com" className="hover:text-[color:var(--navy)]">
              문의
            </a>
          </div>
        </nav>
      </header>
      {children}
      <footer className="bg-[color:var(--navy-deep)] text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <strong className="text-lg text-white">DGI Link</strong>
            <p className="mt-2 text-xs text-slate-400">© 2026 디지아이링크. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="/privacy.html" className="hover:text-white">
              개인정보처리방침
            </a>
            <a href="/terms.html" className="hover:text-white">
              이용조건
            </a>
            <a href="mailto:contact@dgilink.com" className="hover:text-white">
              문의
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function DetailHero({
  eyebrow,
  title,
  lead,
  action,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  action: ReactNode;
  aside: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-52 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.17),transparent_68%)]"
      />
      <div className="relative mx-auto grid min-h-[480px] max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[42px] font-extrabold leading-[1.06] tracking-[-0.05em] text-[color:var(--navy-deep)] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {lead}
          </p>
          <div className="mt-7">{action}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}

export function IdentityCard({
  label,
  title,
  rows,
}: {
  label: string;
  title: ReactNode;
  rows: readonly { label: string; value: string }[];
}) {
  return (
    <aside className="rounded-3xl border border-[color:var(--navy)]/10 bg-white/90 p-6 shadow-[0_30px_80px_-48px_rgba(8,26,58,0.7)] backdrop-blur sm:p-8">
      <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-800">
        {label}
      </span>
      <strong className="mt-5 block text-2xl leading-9 text-[color:var(--navy-deep)]">
        {title}
      </strong>
      <dl className="mt-5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 border-t border-border py-3 text-sm sm:grid-cols-[110px_1fr] sm:gap-3"
          >
            <dt className="text-xs font-semibold text-muted-foreground">{row.label}</dt>
            <dd className="m-0 font-semibold text-[color:var(--navy-deep)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function DetailSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mb-16 last:mb-0 sm:mb-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand-green)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[color:var(--navy-deep)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">{description}</p>
      )}
      {children}
    </section>
  );
}

export function DetailCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-6">
      <h3 className="text-lg font-bold text-[color:var(--navy-deep)]">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </article>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[color:var(--navy)] px-5 py-3 text-sm font-bold text-white"
    >
      {children}
    </a>
  );
}
