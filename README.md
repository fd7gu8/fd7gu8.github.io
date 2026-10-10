# 조형욱 Cho Hyung-wook

Articles · Notes · About으로 구성한 개인 블로그입니다. 글을 읽고 쓰는 데 집중할 수 있도록 Astro의 정적 HTML, Markdown, 작은 규모의 CSS와 JavaScript를 사용합니다.

GitHub Pages에 Astro 정적 빌드 결과를 배포합니다. 공개 주소는 https://fd7gu8.github.io/ 입니다.

## 로컬 실행

Node.js 24와 pnpm 11이 필요합니다.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

기본 주소는 [http://127.0.0.1:4321/](http://127.0.0.1:4321/)입니다. 포트가 사용 중이면 터미널에 표시된 주소를 따릅니다.

| 명령 | 용도 |
| --- | --- |
| `pnpm dev` | 초안을 포함한 개발 서버 |
| `pnpm check` | 타입 및 Astro 파일 검사 |
| `pnpm build` | 검사 후 공개 글만 정적 빌드 |
| `pnpm preview` | `dist/`의 배포 결과 미리보기 |

## 글 작성

`src/content/blog/`에 Markdown 파일을 만듭니다. 예를 들어 `accuracy-vs-speed.md`의 주소는 `/blog/accuracy-vs-speed/`입니다.

```markdown
---
title: "글 제목"
date: 2026-10-10
type: article
published: false
---

여기에 글을 작성합니다.
```

- `type: article`: 분석, 연구, 프로젝트처럼 완결된 글.
- `type: note`: 의견, 관찰, 짧은 기록.
- `published: false`: 로컬 개발 화면에서만 Draft로 표시. 생략해도 기본값은 `false`.
- `published: true`: 프로덕션의 글 페이지·목록·RSS에 포함.
- `description`, `updatedAt`: 선택 항목.

글 전용 이미지는 `src/assets/blog/{글 파일명}/`에 넣고 Markdown의 상대경로로 연결합니다. 자세한 예시는 [로컬 개발 및 작성 안내](LOCAL_DEVELOPMENT.md)를 참고하세요.

`published`는 발행 여부를 결정하는 옵션입니다. 공개 저장소의 원문과 Git 기록을 숨기지 않으며, 참조한 이미지가 빌드 자산에 포함될 수도 있습니다. 민감한 자료를 저장하는 용도로 사용하지 않습니다.

## 구성과 동작

- **Articles · Notes · About**: 홈에는 유형별 최근 글 5개를 날짜와 제목으로 표시합니다.
- **테마**: 라이트·다크 아이콘을 항상 함께 표시합니다. 첫 방문에는 시스템 설정을 따르고, 직접 선택하면 브라우저에 저장합니다.
- **본문**: 반응형 단일 컬럼, 코드 구문 강조, 표와 코드 영역의 가로 스크롤을 제공합니다.
- **폰트**: 공식 SUIT Variable 원본을 자체 호스팅합니다. 폰트용 외부 CDN 요청은 없습니다.
- **RSS**: `/rss.xml`에 공개된 Articles와 Notes를 함께 제공합니다.
- **방문 통계**: GoatCounter는 프로덕션 빌드의 실제 블로그 도메인에서만 로드합니다. 로컬 개발·미리보기에서는 로드하지 않습니다.

## 주요 파일

| 위치 | 역할 |
| --- | --- |
| `src/content/blog/` | Articles와 Notes 원문 |
| `src/content/about.md` | About 본문 |
| `src/content.config.ts` | 글 메타데이터 검증 |
| `src/lib/posts.ts` | 공개 여부 필터와 정렬 |
| `src/pages/` | 홈, 목록, 글, RSS 등의 경로 |
| `src/components/`, `src/layouts/` | 공통 화면 구성 |
| `src/styles/global.css` | 폰트, 색상, 여백, 반응형 스타일 |
| `src/site.ts` | 사이트 정보와 연락처 |
| `public/fonts/suit/` | SUIT 파일, 라이선스, 출처 |
| `astro.config.mjs` | 사이트 주소와 Astro 설정 |

## 배포 전환 상태

기존 `_posts/`, `_layouts/`, `_includes/`, `_sass/`, Ruby 관련 파일은 정리 전까지 보존하지만 빌드·배포에 사용하지 않습니다. Astro는 `src/content/`의 글만 읽습니다. 두 원문 폴더는 자동으로 동기화되지 않습니다.

`master` 브랜치에 push하면 `.github/workflows/deploy.yml`이 Node.js 24와 pnpm으로 의존성을 설치하고 `pnpm build`를 실행합니다. 검증 성공 후 `dist/`만 GitHub Pages에 배포합니다. Pages의 Source는 GitHub Actions로 설정합니다. 로컬에서 `pnpm build`를 실행하는 것만으로 사이트가 배포되지는 않습니다.

## 문서와 라이선스

- [실행·글 작성 상세 안내](LOCAL_DEVELOPMENT.md)
- [설계 및 전환 계획](ASTRO_MIGRATION_PLAN.md)
- [사이트 코드의 MIT 라이선스](LICENSE.txt)
- [글·사진·그림의 이용 조건](CONTENT_LICENSE.md)
- [외부 구성 요소와 원본 고지](THIRD_PARTY_NOTICES.md)
- [기존 Jekyll 테마 문서 보관본](docs/legacy/NO_STYLE_PLEASE_README.md)

사이트 구현 코드와 개발 문서는 MIT 라이선스로 제공합니다. 게시글·About 본문·사진·그림·도표 및 별도 표기가 없는 글 속 예제 코드는 MIT 대상에서 제외하며, 법령상 허용되는 이용 등을 제외한 재사용에는 별도 허락이 필요합니다. 콘텐츠의 원문·첨부 자산뿐 아니라 생성된 HTML과 RSS 속 콘텐츠에도 같은 구분을 적용합니다.

기존 Jekyll 테마의 원본 MIT 고지는 보존합니다. SUIT 폰트는 SIL OFL 1.1을 따릅니다. 다른 제3자 자료와 패키지에도 각각의 이용 조건이 적용됩니다. 과거에 유효하게 부여된 라이선스나 허락은 이번 문서 정리로 철회되지 않습니다.

