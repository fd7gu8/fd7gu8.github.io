# 외부 구성 요소와 원본 고지

이 저장소는 기존 Jekyll 블로그에서 Astro로 전환 중입니다. 직접 작성한 사이트 코드, 게시글 콘텐츠, 외부에서 가져온 파일의 이용 조건을 구분합니다.

## 사이트 코드와 콘텐츠

사이트 구현 코드와 개발 문서는 [MIT 라이선스](LICENSE.txt)로 제공합니다. `src/components/`, `src/layouts/`, `src/pages/`, `src/lib/`, `src/styles/`, 사이트 설정 및 실행·개발 안내가 이에 해당합니다. 코드 파일에 글이 인라인으로 포함된 경우 글 부분은 콘텐츠 정책을 따릅니다.

게시글, About 본문, 사진·그림·도표와 글 속 예제 코드에는 [콘텐츠 이용 안내](CONTENT_LICENSE.md)가 적용됩니다. 폰트와 기타 제3자 자료는 아래의 개별 라이선스를 따릅니다. 저장소의 루트 MIT 표기는 이러한 별도 조건을 대체하지 않습니다.

## no style, please! — 기존 Jekyll 테마

- 원본: https://github.com/riggraz/no-style-please
- 저작권 고지: Copyright (c) 2020 Riccardo Graziosi
- 라이선스: MIT
- 원본 라이선스 보관: [licenses/no-style-please-LICENSE.txt](licenses/no-style-please-LICENSE.txt)
- 기존 문서 보관: [docs/legacy/NO_STYLE_PLEASE_README.md](docs/legacy/NO_STYLE_PLEASE_README.md)

기존 `_layouts/`, `_includes/`, `_sass/`, `assets/css/main.scss`, `no-style-please.gemspec`와 원본에서 유래한 관련 파일에는 이 고지를 보존합니다. 저장소에 남아 있는 `logo.png`도 이 출처의 자료로 구분하며, 새 Astro 사이트의 직접 제작 자산으로 표시하지 않습니다. 원본 테마의 홍보용 `_screenshots/` 이미지는 정리 과정에서 제거했습니다.

일부 기존 파일에는 블로그 운영 과정에서 수정이 있습니다. 원본 고지를 보존하는 것은 해당 수정분을 원저작자가 작성했다는 의미가 아닙니다. 새 Astro 화면은 `src/`에서 별도로 구현하며 기존 Jekyll 테마를 런타임 테마로 불러오지 않습니다.

## SUIT Variable — 웹폰트

- 원본: https://github.com/sun-typeface/SUIT
- 저작권 고지: Copyright (c) 2022, SUNN
- Reserved Font Name: SUIT
- 라이선스: SIL Open Font License 1.1
- 원본 파일 및 고지: [public/fonts/suit/](public/fonts/suit/)
- 라이선스 전문: [public/fonts/suit/LICENSE](public/fonts/suit/LICENSE)
- 버전 출처: [public/fonts/suit/SOURCE.md](public/fonts/suit/SOURCE.md)

공식 WOFF2를 수정 없이 자체 호스팅합니다. 원본 저작권 고지와 라이선스는 폰트와 함께 빌드 결과에도 포함됩니다. 사이트의 MIT 라이선스는 이 폰트에 적용되지 않습니다.

## 패키지와 외부 서비스

Astro, RSS·타입 검사 도구와 그 의존성은 각 패키지에 포함된 라이선스를 따릅니다. 정확한 설치 버전은 `pnpm-lock.yaml`에 기록됩니다. 기존 Ruby 의존성은 `Gemfile`과 `Gemfile.lock`에 기록됩니다. 이 문서는 전체 전이 의존성의 라이선스 목록을 대신하지 않습니다.

새 Astro 사이트는 실제 배포 도메인에서 GoatCounter 스크립트를 요청합니다. 기존 Jekyll 코드에는 Google Fonts와 KaTeX CDN 참조가 남아 있습니다. 이들은 새 Astro 사이트의 폰트 제공 방식과 구분해야 하며, 외부 서비스의 코드·서비스 조건은 사이트의 MIT 라이선스로 변경되지 않습니다.
