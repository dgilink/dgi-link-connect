# DGI Link Corporate Website

DGI Link의 Products, Brands, B2B Services와 공식 사업자 정보를 제공하는 Corporate Website입니다.

## Public structure

- Products: CardScan AI, kFarmAI
- Brands: DGI PICK
- B2B Services: DGI Realty 운영지원
- Legal: Corporate Website 개인정보처리방침 및 이용조건

공개 서비스 목록은 `src/data/services.ts`에서 관리합니다. 새 사업은 공개 승인이 확인된 뒤
`isPublic: true`와 적절한 `status`로 등록합니다. 내부·준비중 사업은 공개 목록에 추가하지 않습니다.
화면·Footer·Organization JSON-LD는 `isPublic: true`이면서 `status: "public"`인 항목만 사용합니다.
이 registry는 브라우저 번들에 포함되므로 비공개 프로젝트명이나 고객 자료 자체를 저장하지 않습니다.

## Development

```bash
bun install
bun run dev
bunx tsc --noEmit
bun run build
```

프로덕션 빌드는 정적 호스팅을 위해 페이지를 prerender합니다. `/dgi-pick/`과 `/realty/`는
각각의 file route에서 `dist/client/<route>/index.html`로 생성되어 SPA fallback 없이 직접 접근할 수
있습니다.

SPA fallback 없는 로컬 직접 접근 검증은 `python -m http.server 4175 --bind 127.0.0.1 --directory dist/client`로
실행할 수 있습니다. 배포 대상은 `dist/client`이며, 기존 배포의 `CNAME`과 `.nojekyll`, 별도 프로젝트의
`/legal/` 경로를 보존해야 합니다. 이 저장소의 `/privacy.html`·`/terms.html`은 Corporate 전용이고,
CardScan AI의 `/legal/privacy.html`·`/legal/terms.html`·`/legal/delete-account.html`과 구분됩니다.

## Repository and deployment policy

- `dgi-link-connect`가 원본 source 저장소입니다.
- `dgi-link-connect-corporate-v2`는 `feature/corporate-web-v2` 작업용 worktree입니다.
- `dgilink.github.io`는 deploy artifact이며 직접 수정하지 않습니다.
- push, production deploy, DNS 변경은 명시적 승인 전까지 금지하는 HARD GATE입니다.
- 고객명은 기본적으로 비공개입니다. DGI Realty 고객 사례는 고객의 명시적 공개 동의가 있을 때만
  공개합니다.
- 작업 충돌 방지를 위해 **One Task = One Writer** 원칙을 사용합니다.

## Verification policy

저장소 전체 lint에는 기존 CRLF/Prettier baseline 문제가 있습니다. 따라서 완료 검증은
No-New-Regression 원칙을 사용합니다.

- repo-wide lint의 error/warning 수가 baseline보다 악화되지 않아야 합니다.
- 최초 기록은 77 errors / 6 warnings이며, 현재 유지 기준은 **0 errors / 6 warnings**입니다.
- 변경한 source 파일은 개별 ESLint를 통과해야 합니다.
- 변경 파일은 Prettier check를 통과해야 합니다.
- typecheck, build, `git diff --check`를 모두 통과해야 합니다.
- 검증 로그는 내부에서 조용히 확인하고 최종 요약만 공유합니다.

상세 인수인계는 `docs/DGI_LINK_CORPORATE_WEB_V2_HANDOFF_20260930.md`를 참고하세요.
