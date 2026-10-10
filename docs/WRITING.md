# 로컬 실행과 글 작성

아래 경로와 명령은 저장소 루트를 기준으로 한다. 사이트 개요와 라이선스 구분은 [README](../README.md)를 참고한다.

## 실행

Node.js 24와 pnpm 11을 사용한다. 의존성 버전은 `package.json`과 `pnpm-lock.yaml`에 고정되어 있다.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

터미널에 표시되는 로컬 주소를 연다. 기본 주소는 `http://127.0.0.1:4321/`이다. 파일을 수정하면 화면에 반영된다. 서버 종료는 터미널에서 `Ctrl+C`를 누른다.

프로덕션 결과 확인:

```powershell
pnpm build
pnpm preview
```

`build`는 타입 검사와 정적 HTML 생성을 함께 수행하며 결과는 `dist/`에 저장된다. `preview`에서는 공개 글만 보인다. `pnpm check`로 타입 검사만 실행할 수도 있다.

제한된 실행 환경에서 Astro 사용자 설정 폴더 접근 오류가 나면 해당 PowerShell 세션에서 아래 환경 변수를 설정하고 다시 실행한다.

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

## 글 작성

`src/content/blog/accuracy-vs-speed.md`처럼 Markdown 파일을 만든다. 파일명이 주소가 되어 `/blog/accuracy-vs-speed/`로 연결된다. 파일명에는 영문 소문자, 숫자, 하이픈을 권장한다.

```markdown
---
title: "계산 비용과 정확도 사이"
date: 2026-10-10
type: article
published: false
---

여기에 글을 작성합니다.
```

- Articles에 올리려면 `type: article`, Notes에 올리려면 `type: note`를 사용한다.
- 작성 중에는 `published: false`로 둔다. 생략해도 기본값은 `false`다.
- `pnpm dev`에서는 초안을 포함해 표시하고 제목 옆에 `Draft`를 붙인다.
- 공개하려면 `published: true`로 바꾸고 `pnpm build`로 확인한다.
- `description`과 `updatedAt`은 선택 사항이다. 날짜는 `YYYY-MM-DD`로 입력한다.

비공개 글은 프로덕션의 글 페이지, 목록, RSS에서 제외된다. 개발 중에도 RSS에는 공개 글만 포함된다. 이 옵션은 발행 여부이며 접근 제어 기능은 아니다. 공개 저장소의 원문과 Git 기록은 볼 수 있고, 참조한 이미지가 빌드 자산으로 생성될 수도 있으므로 비밀 자료를 보관하는 용도로 사용하지 않는다.

## 이미지와 코드

글에 사용할 이미지는 필요할 때 `src/assets/blog/{글 파일명}/` 폴더를 만들고 넣는다.

```text
src/content/blog/accuracy-vs-speed.md
src/assets/blog/accuracy-vs-speed/h3-grid.webp
```

```markdown
![H3 격자와 원형 버퍼 비교](../../assets/blog/accuracy-vs-speed/h3-grid.webp)
```

코드는 Markdown 코드 펜스에 `python`, `javascript`, `sql` 같은 언어 이름을 지정하면 구문 강조가 적용된다. 긴 코드는 코드 영역 안에서 가로로 스크롤된다. 이미지는 본문 폭에 맞춰 표시된다.

## 수정 위치

- 글: `src/content/blog/`
- About 본문: `src/content/about.md`
- 사이트 메타데이터·이메일·GitHub: `src/site.ts`
- 화면의 이름과 메뉴: `src/components/Header.astro`
- 글꼴·여백·색상: `src/styles/global.css`
- 배포 도메인: `astro.config.mjs`
- GoatCounter: `src/layouts/BaseLayout.astro`

테마는 라이트·다크 두 아이콘으로 선택한다. 저장된 선택이 없으면 시스템 설정을 따르고, 직접 선택한 값은 브라우저에 저장된다. 시스템 설정으로 되돌리는 별도 버튼은 두지 않는다. 기존에 저장된 `auto` 값은 선택이 없는 상태로 처리한다. GoatCounter는 프로덕션 빌드 중에서도 실제 `fd7gu8.github.io` 도메인에서만 로드된다.

## 웹폰트

제목·메뉴·본문·코드에 SUIT Variable을 사용하며 코드 블록은 14px로 표시한다. 비례폭 글꼴이므로 공백으로 맞춘 열은 정렬되지 않을 수 있다. 공식 원본 WOFF2와 라이선스를 `public/fonts/suit/`에 함께 보관한다. 출처와 고정한 원본 커밋은 해당 폴더의 `SOURCE.md`에 기록했다. 폰트 파일은 수정하거나 별도 서브셋을 만들지 않았다.

폰트 파일 하나는 624,536바이트(약 610KiB)이며 100–900 굵기를 지원한다. CSS와 폰트 모두 블로그에서 제공하므로 방문 시 Google Fonts나 jsDelivr로 폰트 요청을 보내지 않는다. `font-display: swap`으로 로딩 중에는 시스템 글꼴을 표시한다. 같은 블로그 내 이동과 재방문에서는 브라우저·호스팅의 HTTP 캐시 정책에 따라 재사용 또는 재검증된다.

라이선스 원문은 `/fonts/suit/LICENSE`로 배포된다. 블로그 화면에 별도 출처 문구를 추가하지 않는다.

## 배포

GitHub Pages는 `.github/workflows/deploy.yml`을 통해 Astro의 `dist/`를 배포한다. Markdown의 `published: true`는 다음 Astro 빌드에 포함한다는 의미이며, `master`에 push하고 배포가 성공하면 인터넷에 발행된다. 로컬 파일 수정만으로는 발행되지 않는다.

배포 전에는 `pnpm build`와 `pnpm preview`로 공개 여부, 링크, 이미지, 모바일 화면과 라이트·다크 모드를 확인한다. GitHub Actions의 build와 deploy가 모두 성공한 뒤 실제 블로그에서 결과를 확인한다.

## 독립 HTML 페이지를 추가할 때

추후 독립적인 시각화가 필요하면 `public/labs/이름/index.html`과 같은 위치에 HTML·JavaScript·데이터 파일을 넣을 수 있다. 주소는 `/labs/이름/`이 되며 Astro는 이 파일들을 가공하지 않고 배포한다. `public/`에 넣은 파일은 `published` 설정과 관계없이 공개되므로 비밀 키나 비공개 데이터는 넣지 않는다.
