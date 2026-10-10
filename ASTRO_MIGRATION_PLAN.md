# Astro 블로그 로컬 구현계획서

## 1. 목표

현재 Jekyll 블로그를 외부 테마에 의존하지 않는 Astro 정적 사이트로 전환한다.

첫 번째 목표는 배포가 아니라 **로컬 완성본을 브라우저에서 직접 확인하는 것**이다. 로컬 검토와 수정이 끝나기 전에는 GitHub Pages 설정을 변경하거나 기존 Jekyll 파일을 제거하지 않는다.

사이트는 다음 원칙을 따른다.

- 글이 인터페이스보다 먼저 보이는 단순한 개인 블로그
- 일반 페이지는 정적 HTML 중심이며 불필요한 JavaScript를 포함하지 않음
- 라이트·다크 모드와 모바일·데스크톱 지원
- 코드, 표, 그림을 명확하게 표현
- GoatCounter, RSS, 기본 SEO 지원
- Astro 공식 기능과 일반적인 웹 표준을 우선 사용
- 작성 편의를 위해 복잡한 콘텐츠 시스템이나 CMS를 도입하지 않음

## 2. 정보 구조

상단 내비게이션은 다음 세 항목만 둔다.

```text
Articles · Notes · About · 테마 전환
```

- `Articles`: 분석, 연구, 프로젝트, 방법론처럼 완결된 글
- `Notes`: 사적인 의견, 관찰, 짧은 기록, 진행 중인 생각
- `About`: 소개, 관심 분야, 연구 실적, 연락처
- `RSS`: 주 내비게이션이 아니라 푸터의 보조 링크

표기와 목록에 대한 결정:

- 사이트 이름: `조형욱 Cho Hyung-wook`
- 메뉴: `Articles · Notes · About`
- 글 목록: 날짜와 제목만 표시
- 홈: Articles와 Notes 각각 최근 5개 표시
- 날짜 형식: `YYYY-MM-DD`
- 푸터: `RSS · Email · GitHub`

홈에서는 별도의 소개 문구 없이 이름과 글 목록을 바로 보여준다.

```text
조형욱 Cho Hyung-wook

Articles
2025-04-13  제한된 컴퓨팅 환경에서의 대용량 공간데이터 분할 처리 사례
2025-04-07  계산 비용과 정확도 사이: 대용량 공간 데이터 처리 전략

Notes
2025-03-29  첫 게시글: 앞으로 쓸 글에 대하여

RSS · Email
```

`공간과 이동에 대한 데이터 기반의 해석`은 화면에서 제거하고 검색엔진 및 공유 미리보기용 기본 description으로만 사용한다.

## 3. URL 정책

게시글 canonical URL은 일반적인 블로그 구조로 변경한다.

```text
/blog/hello-world/
/blog/accuracy-vs-speed-spatial-analysis/
/blog/ring-file-method-for-large-scale-gis-analysis/
```

브라우저에서는 `/blog/accuracy-vs-speed-spatial-analysis`처럼 마지막 슬래시 없이 입력해도 동일한 페이지로 이동할 수 있다. 생성 파일은 GitHub Pages와 정적 호스팅에 자연스러운 디렉터리형 URL을 사용한다.

목록과 고정 페이지:

```text
/                 홈
/articles/        Articles 전체 목록
/notes/           Notes 전체 목록
/about/           소개
/rss.xml          RSS 피드
/404.html         오류 페이지
```

기존 Jekyll의 루트 `.html` 주소는 유지하거나 리디렉션하지 않는다. 현재 유입과 외부 링크가 사실상 없으므로 새 URL 구조를 깨끗하게 시작한다.

## 4. 표준성 원칙

공식 Astro 블로그 예제에 가까운 구조를 사용한다.

- 콘텐츠 컬렉션은 `blog` 하나
- 게시글은 `src/content/blog/{slug}.md` 형태의 평면 Markdown 파일
- Articles와 Notes는 frontmatter의 `type`으로 구분
- 공식 `glob()` loader와 Content Collections 사용
- Astro가 제공하는 스키마 검증 사용
- Astro 파일 기반 라우팅과 `getStaticPaths()` 사용
- Markdown 이미지는 표준 `![alt](path)` 문법 사용
- 코드 강조는 Astro 기본 Shiki 사용
- 별도 Markdown 파서, 콘텐츠 플러그인, CMS를 사용하지 않음

프로젝트 고유 구현은 다음으로 제한한다.

1. `type: article | note`에 따른 두 목록
2. 라이트·다크 테마 전환
3. 프로덕션 전용 GoatCounter

## 5. 기술 구성

- Astro 정적 출력
- TypeScript
- Markdown Content Collections
- Shiki
- 프레임워크 없는 Astro 컴포넌트와 CSS
- pnpm
- RSS
- GoatCounter
- GitHub Pages는 로컬 승인 후 전환

초기 버전에는 React, Vue, Svelte, Tailwind CSS, 검색 라이브러리, 댓글 시스템을 추가하지 않는다.

## 6. 목표 디렉터리 구조

```text
src/
├─ assets/
│  └─ blog/
│     ├─ accuracy-vs-speed-spatial-analysis/
│     │  └─ h3-grid.webp
│     └─ ring-file-method-for-large-scale-gis-analysis/
│        └─ ring-process.webp
├─ components/
│  ├─ Header.astro
│  ├─ Footer.astro
│  ├─ PostList.astro
│  └─ ThemeControl.astro
├─ content/
│  └─ blog/
│     ├─ hello-world.md
│     ├─ accuracy-vs-speed-spatial-analysis.md
│     └─ ring-file-method-for-large-scale-gis-analysis.md
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ PostLayout.astro
├─ pages/
│  ├─ blog/
│  │  └─ [slug].astro
│  ├─ articles/
│  │  └─ index.astro
│  ├─ notes/
│  │  └─ index.astro
│  ├─ index.astro
│  ├─ about.astro
│  ├─ rss.xml.ts
│  └─ 404.astro
├─ styles/
│  └─ global.css
└─ content.config.ts

public/
├─ favicon.*
└─ robots.txt
```

Markdown 파일은 공식 예제처럼 평면으로 유지한다. 글 전용 이미지가 생기면 `src/assets/blog/{slug}/`에 모은다. 이미지가 없는 글에는 빈 폴더를 만들지 않는다.

## 7. 콘텐츠 모델

모든 글은 하나의 `blog` 컬렉션에 저장한다.

```yaml
title: "글 제목"
date: 2025-04-13
type: article
published: true
description: "목록과 메타 태그에 사용할 짧은 설명" # 선택
updatedAt: 2025-04-13 # 선택
```

필수 필드:

- `title`
- `date`
- `type`: `article` 또는 `note`

선택 필드:

- `published`: 기본값 `false`
- `description`
- `updatedAt`

slug는 Markdown 파일명에서 자동 생성한다.

```text
accuracy-vs-speed.md
→ /blog/accuracy-vs-speed/
```

스키마에서 제목, 날짜, type을 검증한다. `published`는 생략하면 `false`로 처리하여 새 글이 실수로 공개되지 않게 한다. 기존 공개 글에는 `published: true`를 명시한다.

로컬 개발 서버에서는 공개 여부와 무관하게 모든 글을 보여주고 비공개 글에 `Draft` 표시를 붙인다. 프로덕션 빌드에서는 `published: false`인 글의 개별 HTML을 생성하지 않으며 홈, Articles, Notes, RSS에서도 제외한다. 모든 조회는 공통 필터 함수를 사용하여 페이지마다 공개 조건이 달라지지 않게 한다.

```ts
const isVisible = ({ data }) => import.meta.env.DEV || data.published;
```

`published: false`는 블로그에서만 비공개라는 의미다. 공개 GitHub 저장소에서는 Markdown 원문이 보일 수 있으므로 민감한 개인 기록은 저장소에 커밋하지 않는다.

description 자동 추출을 위해 복잡한 Markdown 파서를 추가하지 않으며, 값이 없으면 사이트 기본 description을 사용한다.

## 8. 게시글 작성 방식

### 8.1 기본 작성 절차

새 Markdown 파일을 복사하거나 직접 만든다.

```text
src/content/blog/new-post.md
```

```markdown
---
title: "새 글"
date: 2026-09-27
type: article
published: false
---

여기에 글을 작성합니다.
```

작성 과정:

```text
1. src/content/blog/에 slug.md 생성
2. title, date, type 입력
3. Markdown으로 본문 작성
4. pnpm dev로 미리보기
5. published: true로 변경
6. pnpm build로 검증
7. 커밋 및 push
```

### 8.2 이미지가 있는 글

이미지는 글 slug와 같은 이름의 자산 폴더에 둔다.

```text
src/content/blog/accuracy-vs-speed.md
src/assets/blog/accuracy-vs-speed/h3-grid.webp
```

Markdown에서는 표준 상대경로를 사용한다.

```markdown
![H3 격자와 원형 버퍼 비교](../../assets/blog/accuracy-vs-speed/h3-grid.webp)
```

규칙:

- 파일명은 영문 소문자, 숫자, 하이픈 사용
- 사진은 JPEG 또는 WebP 권장
- 도표와 투명 이미지에는 PNG 또는 WebP 사용
- 의미 있는 대체 텍스트 작성
- 게시글 전용 이미지는 `src/assets/`에 두어 Astro 이미지 처리를 사용
- 여러 글에서 공통으로 쓰는 자산만 `src/assets/shared/`에 배치

### 8.3 새 글 생성 도구

첫 구현에서는 생성 명령을 만들지 않는다. 직접 Markdown 파일을 만드는 표준 흐름을 먼저 사용한다.

실제 작성 과정에서 반복 작업이 불편하다고 확인되면 Node.js 표준 라이브러리만 사용하는 선택적 명령을 추가한다.

```powershell
pnpm new article
pnpm new note
```

이 도구는 편의 기능일 뿐이며 콘텐츠 구조와 빌드가 도구에 의존해서는 안 된다.

## 9. 디자인 규칙

### 9.1 디자인 방향

이 블로그는 여러 개인 블로그에서 확인할 수 있는 장점을 선별해 조합하되, 어느 한 사이트의 외형이나 코드를 재현하지 않는다. 참고 대상의 문구, 이미지, 아이콘, 고유한 배치와 세부 수치를 복제하지 않고 이 사이트의 정보 구조와 콘텐츠에 맞춰 처음부터 구현한다.

화면의 기본 인상은 **조용하고 단정하며 읽는 일을 방해하지 않는 것**이다. 방문자가 첫 화면에서 큰 소개 영역이나 장식적인 요소를 지나치지 않고 사이트 이름, 메뉴, 최신 글을 바로 확인할 수 있게 한다. 개인적인 성격은 별도의 홍보 문구나 시각 효과보다 글의 선택과 문체, Articles와 Notes의 축적을 통해 드러낸다.

구체적으로 다음 장점을 취한다.

- 작은 내비게이션과 단순한 글 목록으로 전체 구조를 빠르게 파악할 수 있게 한다.
- 한글과 영문이 함께 있을 때에도 자연스럽게 읽히도록 본문 폭, 행간, 문단 간격, 제목 크기의 위계를 세심하게 조정한다.
- 글 목록에서는 날짜와 제목을 중심으로 보여주고, 부가 정보가 콘텐츠보다 먼저 눈에 띄지 않게 한다.
- Articles는 완결된 글, Notes는 짧거나 개인적이고 진행 중인 생각을 담는 공간으로 구분하되, 두 유형 사이에 불필요한 시각적 등급 차이를 만들지 않는다.
- About은 긴 자기소개용 랜딩 페이지가 아니라 필요한 소개와 연락 정보를 담은 일반 문서처럼 구성한다.
- 모바일에서도 데스크톱의 축소판처럼 보이게 하기보다 제목 줄바꿈, 여백, 터치 영역이 자연스럽도록 조정한다.
- 라이트와 다크 모드는 서로 다른 디자인이 아니라 동일한 정보 위계와 가독성을 유지하는 두 가지 색상 환경으로 다룬다.

반대로 큰 히어로 문구, 프로필 카드, 인기 글 순위, 조회수, 태그 묶음, 사이드바, 과도한 카테고리 표시와 애니메이션은 초기 화면에 넣지 않는다. 기능이 있다는 이유만으로 추가하지 않으며, 실제 글이 쌓여 탐색 문제가 확인될 때만 검색이나 태그 같은 기능을 다시 검토한다.

### 9.2 공통

- 단일 컬럼 중심
- 본문 최대 폭 약 `680px`
- 카드, 그림자, 배지, 큰 히어로 영역 사용 금지
- 공식 SUIT 가변 WOFF2를 수정 없이 자체 호스팅하고, 원본 저작권 고지와 OFL 라이선스를 함께 배포
- 외부 폰트 CDN 요청 없이 동일 도메인에서 제공하며, 로딩 중에는 시스템 산세리프 글꼴 표시
- 제목·메뉴·본문은 SUIT, 코드 블록은 시스템 고정폭 글꼴 사용
- 색상과 장식보다 타이포그래피, 여백, 위계로 구분
- 링크와 키보드 포커스는 명확하게 표시
- 링크는 절제된 파란색과 밑줄로 구분
- About 내용은 현재 연구 실적과 이메일을 우선 그대로 이전한 뒤 로컬 검토에서 다듬음

### 9.3 반응형

- 모바일 좌우 여백 약 `20px`
- 데스크톱 좌우 여백 최소 `32px`
- 기본 본문 글자 크기 최소 `16px`
- 긴 제목, URL, 코드가 화면 폭을 깨지 않도록 처리
- 표와 코드 블록은 자체 가로 스크롤 허용
- 테마 버튼의 터치 영역은 최소 `44px` 확보
- `320px` 너비부터 넓은 데스크톱까지 확인

### 9.4 라이트·다크 모드

헤더에 라이트(햇빛)·다크(달) 아이콘 버튼 두 개를 나란히 둔다. 두 아이콘은 항상 함께 보이며, 선택한 버튼은 배경과 테두리 및 `aria-pressed`로 구분한다. 각각 접근성 레이블과 툴팁을 제공한다. 시스템 설정을 고르는 세 번째 버튼은 두지 않는다.

1. 저장된 수동 선택이 있으면 이를 사용
2. 저장된 선택이 없으면 `prefers-color-scheme`으로 초기 모드를 결정
3. 수동 선택은 `localStorage`에 저장
4. 직접 선택하기 전에는 운영체제 설정 변경도 반영하고, 직접 선택한 뒤에는 사용자 선택을 우선함
5. 이전 구현에서 저장된 `auto`는 선택이 없는 상태로 처리

CSS 변수로 색상을 정의하고 전체 화면 `filter: invert()`는 사용하지 않는다. 초기 렌더링 전에 테마를 적용하고, JavaScript가 없어도 시스템 테마가 동작하게 한다. 버튼에는 현재 상태와 `aria-label`을 제공한다.

## 10. 코드 블록

- 빌드 시 Shiki로 구문 강조
- 라이트·다크 양쪽에 대응하는 테마 사용
- 긴 줄은 코드 블록 내부에서 가로 스크롤
- 본문 레이아웃을 넘지 않도록 처리
- 언어가 지정되지 않은 블록에도 읽기 편한 기본 스타일 제공
- 인라인 코드는 과도하게 강조하지 않음
- 첫 버전에는 줄 번호와 복사 버튼을 넣지 않음

## 11. GoatCounter

- 사이트 ID `fd7gu8` 유지
- 프로덕션 빌드에서만 로드
- 공통 레이아웃에서 한 번만 삽입
- 로컬 개발 및 테스트에서는 요청을 전송하지 않음
- 별도의 광고·마케팅 분석 도구는 추가하지 않음

## 12. RSS와 메타데이터

- `/rss.xml` 생성
- Articles와 Notes를 하나의 시간순 피드로 제공
- `published: false`인 글 제외
- 푸터에서 RSS 링크 제공
- 모든 페이지에 RSS discovery 링크 포함
- 페이지별 title, description, canonical URL, Open Graph 기본 태그 제공
- 화면상 태그라인은 두지 않음

## 13. 독립 HTML 시각화의 추후 확장

독립 HTML은 이번 로컬 1차 구현 범위에서 제외한다. 빈 Visualizations 메뉴, 빈 페이지, 샘플 앱을 만들지 않는다.

향후 필요해지면 Astro의 표준 `public/` 정적 자산 규칙을 사용한다.

```text
public/visualizations/commute-map/
├─ index.html
├─ app.js
├─ style.css
└─ data.geojson
```

예상 주소는 `https://fd7gu8.github.io/visualizations/commute-map/`이다. 이 확장은 현재 콘텐츠 구조나 라우팅 설계에 선행 설정을 요구하지 않는다.

## 14. 구현 단계

### 1단계: 기준선 확보

- 현재 Jekyll 빌드 결과와 공개 URL 목록 기록
- 기존 세 게시글, About, RSS 내용 보존
- 비교용 주요 페이지 캡처
- 현재 작업 트리의 Ruby 환경 변경분 처리 여부 확인

### 2단계: Astro 최소 골격

- `package.json`, `astro.config.*`, `tsconfig.json` 생성
- `blog` 컬렉션과 스키마 정의
- BaseLayout, 전역 CSS, 홈 구현
- `pnpm install`, `pnpm dev`, `pnpm build` 확인

### 3단계: 콘텐츠 이전

- 기존 Markdown 세 편을 평면 `blog` 컬렉션으로 이전
- Article과 Note type 설정
- About 이전
- `/blog/[slug]/` 글 페이지 구현
- Articles와 Notes 목록 구현

### 4단계: 디자인

- 헤더와 삼단 내비게이션 구현
- 단일 컬럼 타이포그래피 구현
- 라이트·다크 전환 구현
- 코드, 표, 인용문, 이미지 스타일 구현
- 모바일·데스크톱 반응형 조정

### 5단계: 부가 기능

- RSS 생성
- GoatCounter 적용
- favicon, robots.txt, canonical, Open Graph 적용
- 404 구현

### 6단계: 로컬 검토

- `pnpm dev`로 개발 서버 실행
- 홈, Articles, Notes, About, 기존 글 확인
- 첫 방문의 시스템 기본값과 라이트·다크 비교
- 코드 블록과 반응형 확인
- 사용자가 글꼴, 여백, 색상, 목록 표현 검토
- 승인 전에는 배포 설정과 Jekyll 파일을 변경하지 않음

### 7단계: 승인 후 배포 전환

- 기존 Jekyll GitHub Actions를 Astro Pages 워크플로로 교체
- 실제 GitHub Pages에서 URL, RSS, GoatCounter 확인
- 검증 후 Jekyll 전용 파일 제거
- 남은 원본 테마 코드와 라이선스 관계 검토

## 15. 로컬 실행 방법

```powershell
pnpm install
pnpm dev
```

기본 개발 서버는 `http://localhost:4321/`이다.

프로덕션 결과 확인:

```powershell
pnpm build
pnpm preview
```

포트가 사용 중이면 터미널에 출력되는 실제 주소를 따른다. 로컬에서는 GoatCounter 요청을 보내지 않는다.

## 16. 검증 항목

### 기능

- 홈, Articles, Notes, About, RSS, 404 생성
- 새 `/blog/{slug}/` URL 정상 작동
- Article과 Note 목록이 정확히 분리됨
- RSS가 두 유형을 날짜순으로 포함
- GoatCounter는 프로덕션에서만 로드

### 테마

- 첫 방문 시 시스템 설정을 따름
- Light와 Dark 선택이 새로고침 후 유지됨
- 저장된 선택이 없으면 시스템 설정을 따르고, 두 아이콘 중 실제 모드가 선택 표시됨
- 기존 `auto` 값은 시스템 기본값으로 처리됨
- 이미지와 코드가 비정상적으로 반전되지 않음
- 초기 색상 깜빡임이 없음

### 반응형 및 접근성

- `320px`, `375px`, `768px`, `1440px` 너비 확인
- 페이지 전체의 불필요한 가로 스크롤 없음
- 표와 코드 블록만 필요할 때 내부 스크롤
- 키보드로 모든 링크와 테마 버튼 사용 가능
- 명확한 포커스 표시
- 의미 있는 제목 구조와 landmark 사용
- 라이트·다크 양쪽에서 WCAG AA 수준 대비 목표

### 품질

- `astro check` 통과
- 프로덕션 빌드 성공
- 일반 글 페이지에 프레임워크 JavaScript가 포함되지 않음
- 브라우저 콘솔 오류 없음
- 끊어진 내부 링크 없음
- Lighthouse 성능·접근성·SEO 확인

## 17. 로컬 1차 완료 기준

1. `pnpm dev`로 사이트를 열 수 있다.
2. 기존 콘텐츠와 About을 모두 탐색할 수 있다.
3. Articles, Notes, About 구조가 일관되게 적용된다.
4. `/blog/{slug}/` URL이 동작한다.
5. 첫 방문의 시스템 기본값과 라이트·다크 선택을 확인할 수 있다.
6. 모바일·데스크톱 레이아웃과 코드 블록을 확인할 수 있다.
7. 이 시점까지 기존 GitHub Pages 배포는 변경되지 않는다.

## 18. 이번 전환에서 제외할 사항

- 독립 HTML 시각화 실제 구현
- Visualizations 메뉴
- 검색
- 댓글
- 조회수 표시
- 소셜 공유 버튼
- 뉴스레터 구독 폼
- 태그 시스템
- CMS
- 서버 렌더링 및 별도 백엔드
- 페이지 전환 애니메이션

위 기능은 실제 필요가 생겼을 때 별도 작업으로 검토한다.

## 19. 로컬 구현 현황 (2026-10-10)

Astro 로컬 1차 구현을 작성했다. 기존 세 게시글과 About을 이전하고, 홈·Articles·Notes·개별 글·RSS·404, 라이트·다크 테마, 코드 강조, 반응형 CSS, 프로덕션 도메인 전용 GoatCounter를 구현했다. 실행과 작성 안내는 `LOCAL_DEVELOPMENT.md`에 정리했다.

Astro 7.3.8과 호환되는 TypeScript 6.0.3을 사용한다. 현재 타입 검사 도구의 지원 범위에 맞춘 선택이며, 의존성은 잠금 파일로 고정한다. 공개 글 조회는 공통 함수에 모았고 RSS에는 개발 환경에서도 공개 글만 포함한다.

타입 검사와 프로덕션 빌드를 통과했으며, 임시 초안으로 공개 제외와 코드·표·이미지 표시를 검증했다. 320·375·768·1440 CSS px에서 검증용 본문의 가로 넘침이 없음을 확인했다. 테마 전환과 새로고침 후 선택 유지도 확인했다. Lighthouse 측정과 JavaScript 비활성화·시스템 테마 변경의 실기기 확인은 남아 있다.

기존 Jekyll 코드와 배포 워크플로는 변경하지 않았다. 다음 단계는 사용자가 로컬 화면의 글꼴, 여백, 목록 표현을 검토하는 것이다.
