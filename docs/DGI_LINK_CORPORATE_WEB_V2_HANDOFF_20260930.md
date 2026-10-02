# DGI LINK Corporate Web v2 — Handoff

Date: 2026-09-30

Branch: `feature/corporate-web-v2`

Baseline HEAD: `57b074a32e20aa2448b5ae37643c3b8752052600`

## 1. Public information architecture

The home page presents DGI Link as the Corporate/operator brand in this order:

1. Hero
2. What DGI Link Does
3. Products — CardScan AI, kFarmAI
4. Brands — DGI PICK
5. B2B Services — DGI Realty 운영지원
6. About DGI Link
7. Business / Partnership
8. Business Information
9. Legal / Footer

The extensible public registry is `src/data/services.ts`. It separates `products`, `brands`, and
`businessServices` and records status, operator, public URLs, and publication state. DGI Realty customer
cases default to `publicCaseStudy: false`.

## 2. Standalone verification pages

- `/dgi-pick/`: confirms DGI Link → DGI PICK → dgipick.com and lists the official contact.
- `/realty/`: defines DGI Link's technical operations-support role separately from licensed brokerage
  responsibilities.

Both are TanStack file routes that prerender to physical `dist/client/<route>/index.html` files, so a
static host can return HTTP 200 for a direct request without SPA fallback.

## 3. Legal document roles

- `/privacy.html` applies only to the DGI Link Corporate Website and email inquiries. It does not claim
  that the Corporate Website processes CardScan AI or kFarmAI account, image, device, or payment data.
- `/terms.html` governs informational use of dgilink.com. Individual products and contracted services may
  apply their own policies or agreements.
- The separate CardScanAI legal repository is not part of this change and remains the source for
  CardScanAI-specific privacy, terms, and account deletion documents.

## 4. Public/private policy

- Public: operator name, representative, official email/domain, existing public mail-order registration,
  approved Products/Brands/B2B service descriptions.
- Private by default: customer identity, representatives, addresses, dates, fees, revenue share, contracts,
  internal files, and service-delivery details.
- Customer cases may be published only after explicit, documented consent.
- Original certificates, identity documents, and contracts are never published through this site.

## 5. SEO and privacy decisions

- Canonical and Open Graph URLs use absolute `https://dgilink.com/...` values.
- Organization JSON-LD identifies DGI Link and its public products, brand, and service without customer
  names.
- `robots.txt`, `sitemap.xml`, SVG favicon, and web manifest are included.
- The Lovable/R2 preview image reference was removed.
- Google Fonts requests were removed; the site uses a system font stack and introduces no analytics,
  ad pixel, login, form, database, or write API.

## 6. Verification policy

Baseline before implementation:

- install: PASS (existing dependencies available)
- typecheck: PASS
- build: PASS
- diff check: PASS
- repo-wide lint: FAIL — 77 errors / 6 warnings, predominantly legacy Prettier formatting plus existing
  react-refresh warnings

Completion uses No-New-Regression:

- final repo-wide error/warning counts must not exceed baseline;
- changed source files must pass ESLint;
- all changed supported files must pass Prettier;
- typecheck, build, and `git diff --check` must pass.

## 7. Remaining deployment-time VERIFY

- Confirm production hosting serves the built files with the expected MIME types and HTTPS redirects.
- Validate the final Open Graph image rendering in the target social preview tools after deployment.
- Reconfirm business information immediately before production release if any registration detail changes.
- A real customer case remains intentionally absent until explicit publication consent exists.

## 8. Pre-deployment checklist

- [ ] Review all public copy and business information.
- [ ] Confirm `/`, `/dgi-pick/`, `/realty/`, `/privacy.html`, `/terms.html`, `/robots.txt`, and
      `/sitemap.xml` return HTTP 200 from the release artifact.
- [ ] Re-run typecheck, build, changed-file lint/format, repo-wide lint comparison, and secret/privacy scan.
- [ ] Confirm no customer name or contract detail is present.
- [ ] Confirm the CardScanAI legal repository and protected original-source files are unchanged.
- [ ] Obtain explicit approval before push, deployment, or DNS work.

## 9. Resumed verification — 2026-10-02

The user explicitly authorized continuation on top of all existing tracked/untracked changes.
The initial files and diff were copied to a local temporary evidence folder before further edits.
No reset, restore, checkout, deletion, commit, push, deployment, DNS, account, or secret changes were used.

Minimal corrections preserve the existing layout and copy:

- Public registry filtering now drives product/brand/service cards, the corporate map, footer, and
  Organization offers/brands. Adding a public product can use a generic card without changing the home
  layout. Never put confidential projects or customer data into this browser-bundled registry.
- DGI Realty's home title has English and Japanese display names; the dedicated review pages remain
  Korean. The canonical static HTML and social metadata use Korean; language selection is a client-side
  preference, not three independently indexed URLs.
- Blocked localStorage previously produced the root error page. Language detection now falls back to
  browser language, and manual selection works even when storage access throws. Only an explicit
  language selection writes `dgi-lang`.
- Horizontal clipping no longer creates a scroll container that prevents the intended sticky header.
  Reduced-motion preference also disables smooth scrolling. The official wordmark is made legible
  within its existing header area and the icon has a contrasting background on the navy corporate map.
- Metadata uses the stable self-hosted `/dgi-link-logo.png`, copied byte-for-byte from the official
  existing asset. Apple touch uses a PNG copy of the existing official icon. No source image was edited.
- DGI PICK's JSON-LD uses `Organization.brand` to reference `Brand`, rather than a
  `parentOrganization` property on a Brand. Reference: [Schema.org brand](https://schema.org/brand).
- Corporate Legal separates the site's no-form/no-tracking implementation from infrastructure logs.
  GitHub Pages records visitor IP addresses for security, according to its
  [data collection documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).
  GitHub describes processing in multiple countries in its
  [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#international-data-transfers).
  No unverified mail provider, transfer country, or numeric retention period was invented.

### Code and artifact checks

- Resumed-run starting lint: 0 errors / 6 warnings. The older 77/6 number is the historical handoff
  record, not a fresh checkout performed during this run. Maintain the stricter 0/6 threshold.
- Production build generates `dist/client/index.html`, `dgi-pick/index.html`, and `realty/index.html`.
  Corporate Legal files are copied from public. A plain local Python static server, without a fallback,
  returns 200 for all five pages, robots.txt, sitemap.xml, icons, manifest, and the OG asset; an unknown
  path returns 404.
- Chromium verification covers widths 320, 375, 768, 1024, and 1440, all three home languages, both
  detail pages, and both Corporate Legal pages (35 route/language/width combinations). It checks
  horizontal bounds, loaded images, language menus, and HTTP/runtime failures. Screenshots supplement
  the checks. This is browser viewport testing, not a claim of physical-device or cross-browser testing.
- Functional checks cover language persistence, invalid/blocked storage, six mobile navigation anchors,
  localized headings/footer links, detail-page entry/return, product CTA destinations, mailto contacts,
  metadata uniqueness, JSON-LD relationships, sitemap URLs, no-JavaScript content, and a real static 404.
- Observed production-build browser traffic contains no third-party runtime requests, cookies, or
  write requests. Existing optional Lovable error hooks are unchanged; no production telemetry runtime
  was observed. No login, inquiry form, admin, tracking, database, or write API was introduced.
- Secret/customer/privacy scanning covers repository files and built client HTML/JS/CSS, including
  comments and metadata. Pattern scanning is a repository audit, not a guarantee about external services.
- SHA-256 comparison covers all 80 original-source files, 9 deploy-artifact files, and 4 CardScan Legal
  files known at the start, including both protected original-source files. All remain unchanged.

### Previous operational assessment (updated by Final Gate in section 10)

1. **MEDIUM — Existing CardScan Google Play availability.** The exact baseline package URL
   `https://play.google.com/store/apps/details?id=com.ssmshsoil.bizcardscanner` returned HTTP 404 in
   read-only requests, including Korean/KR and English/US variants. The Corporate CTA retains its
   existing destination; no replacement package or release status was guessed. The operator must check
   listing visibility/availability before release. This is not a URL regression introduced here.
2. **MEDIUM — Email privacy operations.** The repository does not establish the provider or contract for
   `contact@dgilink.com`, processing location, actual retention workflow, or processor/transfer details.
   Confirm these operational facts and any required disclosures before publishing the revised privacy
   policy. The draft avoids a blanket assertion that all hosting/email processing is absent or domestic.
   No account or secret was accessed to fill these gaps.
3. Corporate Legal dates identify this as a reviewed draft. Set the actual effective date and publish
   the required notice as part of the approved release; no production policy was replaced by this task.
4. Recheck final production redirects, MIME types and social previews after an approved deployment.
   Preserve existing `CNAME`, `.nojekyll`, and the separate `/legal/` project; do not copy or rewrite the
   CardScan Legal repository into the Corporate build.

Read-only external checks on 2026-10-02 returned 200 for dgilink.com, dgipick.com, kfarmai.com and all
three existing CardScan Legal URLs (`/legal/privacy.html`, `/legal/terms.html`,
`/legal/delete-account.html`). The existing Corporate baseline has no separate support route; its
contact uses `mailto:contact@dgilink.com`. The live Corporate privacy document confirms the published
representative and mail-order registration used by this change; no residential address or new business
registration number was added.

Local evidence (not part of the website):
`C:/Users/user/AppData/Local/Temp/dgi-v2-verification-c0u63zrx/` contains initial file snapshots, build/lint
logs, browser scripts/results/screenshots, external status checks, and protected-file hash comparisons.

### Final local result

- Typecheck, production build, changed-source ESLint (zero warnings), changed-file Prettier, SVG
  formatting, and `git diff --check`: **PASS**.
- Repo-wide lint: **0 errors / 6 existing warnings**; no regression against either the resumed 0/6
  threshold or historical 77/6 record.
- Browser matrix: **35 combinations PASS**, zero document/element horizontal overflow and missing
  images. Functional groups: **10 PASS**, including sticky-header/nav separation and trial-clicking
  every main CTA in KO/EN/JA at all five viewport widths.
- Source/client audit: **101 text files scanned**, no secret/private-customer pattern findings or
  temporary metadata URLs. No `.env*` files were present at the worktree root. Original source,
  protected files, deploy artifact, and CardScan Legal content hashes: **unchanged**.
- Local implementation verification: **PASS**. Release assessment: **CONDITIONAL PASS**, pending the
  two MEDIUM operational checks above. No BLOCKER or HIGH issue was found. Production was not changed.

Files relative to HEAD: 22 (8 tracked modifications and 14 untracked additions). Of those, 16 were
changed in this resumed execution; all initial files were preserved, and two new official PNG copies
were added. The generated route tree and existing operational rules were not manually rewritten.

| File                                                 | Changed in resumed execution               |
| ---------------------------------------------------- | ------------------------------------------ |
| `AGENTS.md`                                          | No — preserved                             |
| `README.md`                                          | Yes                                        |
| `docs/DGI_LINK_CORPORATE_WEB_V2_HANDOFF_20260930.md` | Yes                                        |
| `public/apple-touch-icon.png`                        | New byte-for-byte asset copy               |
| `public/corporate.css`                               | No — preserved                             |
| `public/dgi-link-logo.png`                           | New byte-for-byte asset copy               |
| `public/favicon.svg`                                 | Formatting only                            |
| `public/manifest.webmanifest`                        | No — preserved                             |
| `public/privacy.html`                                | Yes                                        |
| `public/robots.txt`                                  | No — preserved                             |
| `public/sitemap.xml`                                 | No — preserved                             |
| `public/terms.html`                                  | Yes                                        |
| `src/components/corporate-detail-layout.tsx`         | Yes                                        |
| `src/content/home.ts`                                | Yes                                        |
| `src/data/services.ts`                               | Yes                                        |
| `src/routeTree.gen.ts`                               | No — generated result unchanged from start |
| `src/routes/__root.tsx`                              | Yes                                        |
| `src/routes/dgi-pick/index.tsx`                      | Yes                                        |
| `src/routes/index.tsx`                               | Yes                                        |
| `src/routes/realty/index.tsx`                        | Yes                                        |
| `src/styles.css`                                     | Yes                                        |
| `vite.config.ts`                                     | Comment correction only                    |

## 10. Previous Final Gate — 2026-10-02 (superseded by section 11)

This section supersedes the earlier issue classification. All existing Corporate v2 changes are
preserved. This stage changes only `public/privacy.html` and this handoff; application code, product
URLs, Corporate Terms, and the separate CardScan Legal repository are unchanged.

### External operational follow-up — CardScan Google Play

Status: **EXTERNAL FOLLOW-UP**, excluded from Corporate v2 defect counts. The approved URL remains
`https://play.google.com/store/apps/details?id=com.ssmshsoil.bizcardscanner` in the registry, rendered
product CTA, footer, and structured data. It matches HEAD's original destination. No Corporate code
was changed to address the external 404. The earlier 404 observations are retained; no new assertion
about Google Play publication, availability, removal, or region restrictions is made. The owner can
check listing availability separately, without holding up acceptance of the Corporate site's code.

### Corporate Privacy review

The code/content review found no invented email vendor, country, or numeric retention period. However,
the earlier wording described actual deletion, paper shredding/incineration, non-disclosure, and
implemented security controls as established facts without repository evidence of the email workflow.
The minimal revision distinguishes verifiable website behavior from policy principles:

- The website has no inquiry form, email storage, email deletion endpoint, or user database. This does
  not mean the operator's separate mailbox has no personal data.
- Retention/deletion and email access controls are described as principles, not audited operations.
  Unverified destruction methods and the blanket assertion of no email disclosure were removed.
- Browser language storage has no application-set expiry and can be changed or cleared by the user or
  browser. GitHub hosting disclosures and the verified CardScan Legal links remain intact.
- No new mail provider, storage country, contract, account detail, or specific retention period was
  inserted. Corporate Terms and all 14 Privacy sections were preserved.

**Content corrections: PASS. Unconditional publication readiness: not established.** Changing a factual
assertion into a general principle does not confirm the actual mailbox's retention/deletion process,
processor arrangements, or applicable transfer disclosures. The document still covers email inquiries;
silently excluding those inquiries would not resolve the operator's actual processing.

This remains **one MEDIUM operational verification dependency**, not a Corporate application defect.
The required evidence is the operator-confirmed mail provider, relevant processing locations and actual
retention/deletion criteria, followed by any disclosures applicable to that arrangement. Secrets or
account changes are not required. Unknown facts must not be replaced with either invented details or
an assertion that the relevant processing is absent.

The distinction is supported by the current
[Personal Information Protection Act, Article 30](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1020398583),
which lists processing/retention periods, destruction procedures and methods, and outsourcing where
applicable among privacy-policy contents. This review does not infer that a particular email service
is legally an outsourced processor or that a particular international transfer occurs.

### Reverification and disposition

- Repo-wide lint: **0 errors / 6 existing warnings**; changed-source lint, formatting, typecheck,
  production build and `git diff --check`: **PASS**.
- All 35 route/language/viewport combinations and 10 functional groups: **PASS**, covering KO/EN/JA,
  320/375/768/1024/1440 widths, CTAs, sticky navigation, metadata, JSON-LD, robots, sitemap and static
  direct requests without SPA fallback. Legal content checks: **7/7 PASS**.
- CardScan Legal privacy/terms/delete-account and kFarmAI returned HTTP 200 in fresh read-only checks.
  CardScan's approved product URL is unchanged; its external availability is not marked PASS.
- No customer/secret pattern findings in source/client artifacts. Original source (80 files), deploy
  artifact (9 files), and CardScan Legal (4 files) retain their initial content hashes.
- Corporate application defects: **0**. External Play follow-up: **1**, outside defect counts.
  Privacy publication verification: **MEDIUM 1**. Combined Final Gate: **CONDITIONAL PASS** until the
  actual email-processing facts are confirmed; Corporate functional/code verification is **PASS**.
- No commit, push, production deployment, DNS, identity, credentials or permissions changes.

Evidence for this stage:
`C:/Users/user/AppData/Local/Temp/dgi-v2-final-gate-l44jrjjx/`.

## 11. Pre-Commit Final — confirmed inquiry policy

This section is the current disposition and supersedes the earlier MEDIUM privacy dependency and
combined CONDITIONAL PASS assessment. The operator explicitly confirmed the following policy in this
session; these facts were not inferred from source code or from the mail domain:

- Purpose: partnership, B2B, service and general inquiries, replies and necessary follow-up communication.
- Data: email address, inquiry content and information provided by the sender, including name and
  organization/company when provided. The website still has no inquiry form or new collection fields.
- Retention: general inquiry personal data and emails are retained for **one year from completion of
  inquiry handling**, not from receipt or the last website visit.
- Deletion: on expiry, identify and delete the relevant inquiry emails and personal data unless a
  separate legitimate preservation basis applies. Statutory duties, actual contracts/transactions or
  dispute handling are distinguished by their applicable basis and period; no blanket indefinite
  retention or invented numeric exception is added.
- Independent third parties: no discretionary provision of general inquiry personal data. Legal
  requirements and separately consented provision remain limited to their respective scope.
- General inquiry information is not used as an advertising/marketing list without separate consent.
- `contact@dgilink.com` uses **Google Workspace** for business email. This confirmation does not
  establish the contracting entity, legal processing role, processing countries or Google-side retention.

`public/privacy.html` now reflects these confirmed operational rules in sections 2–8 and the change
history. All 14 sections remain. No automated email deletion job, mailbox access, account setting,
database or new API is implemented by this website; the retention rule is the operator's confirmed
email-handling policy. Corporate Terms, application code, approved product URLs, and CardScan Legal
remain unchanged in this stage.

### OPERATIONAL LEGAL CHECK — Google Workspace contract/DPA

Tracked separately from Corporate Web v2 code defects. Before representing contractual/legal details
as verified or treating the policy as legally cleared for publication, the operator should check the
actual Workspace contract and data processing agreement (DPA), including:

- the contracting entity, actual processing/outsourcing relationship, scope and relevant recipients;
- processing/transfer countries, timing and method, where applicable;
- Google-side retention/deletion terms, separately from DGI Link's confirmed one-year inquiry policy;
- any applicable disclosures based on that verified arrangement.

Do not infer these details from MX records, a generic product document or the repository. Do not insert
`Google LLC`, a particular Google processing country, domestic-only storage, specific encryption,
security certifications, absolute non-disclosure guarantees or immediate complete erasure claims.
The existing GitHub hosting disclosure is explicitly separate and does not establish Google Workspace
processing locations. No credentials, contract original or account changes were requested or accessed.

This check remains open; **PASS for implementation/pre-commit verification does not mean that this
operational legal check has been completed or that publication has been authorized**. The actual policy
effective date remains part of an approved release.

### EXTERNAL FOLLOW-UP — Google Play

Unchanged from section 10: the Corporate site preserves the approved CardScan package URL. Earlier
external HTTP 404 observations are not reclassified as publication success. Listing availability is an
external operational follow-up, not a Corporate application regression.

### Scope and evidence

Only `public/privacy.html` and this handoff are intentionally edited in this stage. Existing
tracked/untracked work is preserved. No reset, restore, checkout, deletion, commit, push, production
deployment, DNS, identity, secret or permission changes are performed.

Evidence directory: `C:/Users/user/AppData/Local/Temp/dgi-v2-precommit-ckswnjga/`.

### Completed pre-commit verification

- Corporate Privacy: **12/12 policy checks PASS**, including the one-year period measured from inquiry
  completion in both source and served production HTML, preservation exceptions, expiry deletion,
  confirmed purposes/data, separate marketing consent and no invented Workspace contract details.
- Corporate Terms and product application code: byte-identical to the start of this stage.
- Production build, typecheck, changed-source lint (zero warnings), formatting including SVG, and
  `git diff --check`: **PASS**. Repo-wide lint: **0 errors / 6 existing warnings**.
- Home Corporate, Products/Brands/B2B, KO/EN/JA, detail pages, Corporate Legal, CTA/navigation,
  language persistence/storage denial, SEO metadata, JSON-LD, robots and sitemap: **PASS**.
- Browser matrix: **35 route/language/viewport combinations PASS** at 320/375/768/1024/1440, zero
  horizontal overflow or failed images. Functional groups: **10/10 PASS**. Both detail routes return
  HTTP 200 from physical HTML on a plain static server without an SPA fallback.
- Fresh read-only external requests: CardScan Legal's three existing URLs and kFarmAI return **200**.
  CardScan's approved URL is preserved; Google Play availability remains **EXTERNAL FOLLOW-UP**.
- Secret/customer checks: **101 source/artifact text files**, no pattern findings. No tracking,
  customer data, new database, inquiry form, login or write API was introduced.
- Protected source (80 files), deploy artifact (9 files), and CardScan Legal (4 files): hashes unchanged.
  All initially present worktree files remain; only the two intended files changed in this stage.
- **Pre-commit implementation result: PASS.** Code defects: BLOCKER 0 / HIGH 0 / MEDIUM 0 / LOW 0.
  Google Workspace's **OPERATIONAL LEGAL CHECK** and Google Play's **EXTERNAL FOLLOW-UP** stay open
  separately. Neither is represented as verified by passing the code checks.
- HEAD remains `57b074a32e20aa2448b5ae37643c3b8752052600` on `feature/corporate-web-v2`.
  No commit, push, production deployment or DNS change was performed.
