# DGI LINK Web V2 — Approved design implementation

## Base and isolation

- Base main: `0404430268cd0e3a5715a121a5ba23a2650a5ebe`.
- Writer: `dgi-link-connect-web-v2-design`, branch `feat/web-v2-design-parity`.
- The new worktree started clean with zero untracked files and ahead/behind 0/0 against origin/main.
- The original source, previous dirty Corporate worktree, deployment artifact and CardScan Legal are
  protected. This work does not carry over or revert the five existing Corporate worktree changes.
- `main-safety` remains active on main (pull request, deletion and non-fast-forward protection).

## Design source of truth

Both external PNGs were decoded successfully and copied byte-for-byte into local `docs/design-reference/`.

| Reference          | Dimensions  | SHA-256                                                            |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| FINAL_DESIGN_BOARD | 1312 × 1199 | `FF32DB3E1E5D4802B43073908A3D0C65DB2A1F72864159B70DA3C4CE5ACAF2F5` |
| CONCEPT_BOARD      | 1226 × 1283 | `CA3CF3C979CA66E8351568045D71D9228C75CDA0AB0A3E42B869AE0FDDE401E6` |

FINAL takes precedence. These boards contain non-public project identities. The repository is public,
so `.gitignore` excludes the local PNGs from commits as well as keeping them outside `src` and `public`.
They must never be uploaded as PR images or shipped in the website. Review screenshots below contain
only approved public services and are safe to include in the PR.

## Visual gap and implementation

| Element    | Production baseline                   | Approved board implementation                                                                        |
| ---------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Brand      | Navy with rounded gradient cards      | Ink Navy `#081F38`, Link Blue `#2563EB`, Green `#10B981`, Paper `#F8FAFC`                            |
| Typography | System font fallback                  | Self-hosted Pretendard variable font, clear heading/body/meta weights                                |
| Header     | Six section links and language select | Compact wordmark, Services/Projects/About, language select, working contact and service CTAs         |
| Hero       | Corporate relationship map            | Editorial text/photo split, approved KO headline, localized EN/JA, accurate registry-derived metrics |
| Services   | Separate large category sections      | Four equal bordered cards in approved order: DGI PICK, DGI Realty, CardScan AI, kFarmAI              |
| Projects   | No compact project list               | Four public portfolio entries, horizontal desktop list and vertical mobile list                      |
| Contact    | Large standalone contact section      | Ink Navy band with architectural geometric treatment and email CTA                                   |
| Footer     | Four large navigation columns         | Compact wordmark, navigation, legal, email and copyright                                             |
| Mobile     | Full stacked desktop cards            | Text → CTA → landscape → metrics, compact service rows, portrait project thumbnails                  |

At desktop the main editorial container is 1200px. Spacing is based on an 8px rhythm; card corners are
restrained and the hero photograph replaces the previous decorative map. Styles are scoped to
`.corporate-home`, keeping the detail routes and Legal presentation unchanged.

### Required departures from the reference

- Unpublished projects and identifiable customer cases are excluded. Selected Projects uses only the
  same four approved public registry entries and explicitly identifies them as projects within public
  services. It does not claim new launches, customer ownership, customer counts or private engagements.
- The board's unverified metrics are replaced with **4** public services/brands and **3** business
  categories, computed from the registry. The infinity symbol retains the aspirational design treatment.
- No search box or carousel controls are included because there is no corresponding functional service.
- The service section's secondary link opens the actual operator information, rather than suggesting
  a nonexistent separate all-services page.
- DGI PICK's operator relationship and official external link remain visible. DGI Realty's technical
  operations role is distinguished from each licensed office's brokerage responsibilities.
- A compact About disclosure retains verified business information. The operator disclosures sit above
  the footer so review requirements do not disappear in the visual simplification.
- Service visuals use actual public UI captures and the existing CardScan icon, not invented client
  properties or unverified app screens. The landscape is a licensed real photograph matching the board's
  agricultural subject; it is not claimed to depict a DGI Link property or a customer location.

## Review screenshots

- [Desktop, 1440px](design-review/desktop-1440.png)
- [Mobile, 390px](design-review/mobile-390.png)

These are full-page Chromium captures of the production build served as static files. The layout,
section order, hero proportions, typography, card geometry, mobile ordering, CTA and footer were
visually compared with the local FINAL board. Imagery and public-only portfolio entries follow the
required constraints above; pixel-identical reproduction is not claimed. The user decides whether to
merge after reviewing these captures.

## Asset provenance

- Hero: real photograph by Rowan Heuvel,
  [Terraced rice fields in misty mountains at sunrise](https://unsplash.com/photos/terraced-rice-fields-in-misty-mountains-at-sunrise-IeB9sIk5lbE).
  Downloaded from the photo's official image URL and hosted locally under the
  [Unsplash License](https://unsplash.com/license). No AI image generation was used.
- DGI PICK: public homepage capture from `https://dgipick.com/`.
- kFarmAI: public homepage capture from `https://kfarmai.com/`; the captured top section excludes user
  posts, account data, and uploaded photos.
- DGI Realty: capture of the existing public Corporate `/realty/` page from the baseline build.
- CardScan AI: unchanged existing `src/assets/cardscanner-icon.png`.
- Pretendard 1.3.9: official distribution from `orioncactus/pretendard`, self-hosted. Its SIL Open Font
  License is retained in [Pretendard-LICENSE.txt](design-reference/Pretendard-LICENSE.txt).

No remote image/font requests are made by the published page. The PNG design boards are not asset
sources; no board crop or embedded reference image is included in the build.

## Preserved contracts and verification

- KO/EN/JA selection, localStorage persistence, invalid/blocked storage fallback and mobile navigation.
- `/dgi-pick/`, `/realty/`, Corporate Privacy/Terms, all three CardScan Legal URLs, approved product URLs.
- Home route metadata and JSON-LD are unchanged. Registry, robots, sitemap and Legal files are unchanged.
- Existing customer privacy policy, mailto contact, no forms/login/database/tracking/write API.
- Google Workspace DPA remains **VERIFY**. No Privacy wording is changed or new legal assertion added.
- Baseline lint: 0 errors / 6 existing warnings; no-new-regression ceiling is 0/6.
- Browser matrix: 320/375/390/768/1024/1280/1440, HOME KO/EN/JA plus both detail and both Legal pages.
  This is Chromium viewport verification, not a claim about physical devices or all browser engines.
- Static HTTP responses are checked against actual file bytes, with unknown routes returning 404.
- Public source/build are scanned for secrets and restricted customer/project identifiers; protected
  worktrees are compared by file hashes and Git status.

Push and PR creation are authorized only after technical validation passes. Merge, main push,
production deploy, DNS, GitHub Pages settings and ruleset changes are not authorized. All verification
logs remain outside the repository; the two public-safe review screenshots are included here.

## Final validation result

- Repo-wide lint: **0 errors / 6 existing warnings**, unchanged from baseline.
- Changed-source ESLint (zero warnings), changed-file Prettier, typecheck, production build and
  `git diff --check`: **PASS**.
- Browser: **54 checks PASS** (49 route/language/viewport cases and 5 functional groups), including
  navigation, no horizontal overflow, loaded images, hero ordering, language persistence/storage
  denial, original product destinations, operator identity, metadata and no-JavaScript content.
- Static hosting: **7/7 HTTP 200**, with each response matching its physical build file byte-for-byte;
  an unknown path returns 404. Neither detail route relies on SPA fallback.
- Existing CardScan Legal's three URLs, CardScan Google Play, kFarmAI and DGI PICK returned HTTP 200
  in read-only external checks. This does not claim universal store-region/install availability.
- Source/build privacy scan: no restricted customer/project or secret-pattern findings across 107
  text files. Browser runtime: no external requests, tracking cookies or write requests.
- Protection: previous dirty worktree 93 files, source 92 files, deploy artifact 9 files and CardScan
  Legal 4 files retain their initial content hashes and status.
- Google Workspace DPA remains **VERIFY**, separate from technical acceptance. No legal text changed.

The implementation and technical verification pass. Production approval remains with the user after
reviewing the 1440px and 390px screenshots; this PR must not be merged or deployed automatically.
