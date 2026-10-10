# 외부 구성 요소와 원본 고지

이 저장소는 Astro 정적 블로그입니다. 사이트 코드, 게시글 콘텐츠, 외부에서 가져온 파일의 이용 조건을 구분합니다.

## 사이트 코드와 콘텐츠

사이트 구현 코드와 개발 문서는 [MIT 라이선스](LICENSE.txt)로 제공합니다. `src/components/`, `src/layouts/`, `src/pages/`, `src/lib/`, `src/styles/`, 사이트 설정 및 실행·개발 안내가 이에 해당합니다. 코드 파일에 글이 인라인으로 포함된 경우 글 부분은 콘텐츠 정책을 따릅니다.

게시글, About 본문, 사진·그림·도표와 글 속 예제 코드에는 [콘텐츠 이용 안내](CONTENT_LICENSE.md)가 적용됩니다. 폰트와 기타 제3자 자료는 아래의 개별 라이선스를 따릅니다. 저장소의 루트 MIT 표기는 이러한 별도 조건을 대체하지 않습니다.

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

Astro, RSS·타입 검사 도구와 그 의존성은 각 패키지에 포함된 라이선스를 따릅니다. 정확한 설치 버전은 `pnpm-lock.yaml`에 기록됩니다. 이 문서는 전체 전이 의존성의 라이선스 목록을 대신하지 않습니다.

사이트는 실제 배포 도메인에서 GoatCounter 스크립트를 요청합니다. 폰트는 자체 호스팅하며 Google Fonts나 KaTeX CDN은 사용하지 않습니다. 외부 서비스의 코드·서비스 조건은 사이트의 MIT 라이선스로 변경되지 않습니다.

## 이전 버전

이 문서는 현재 작업 트리의 구성 요소를 설명합니다. Git 기록에 남은 이전 구현을 복제·재배포할 때는 해당 버전의 저작권·라이선스 고지를 함께 확인하고 보존해야 합니다. 과거 고지는 Git 기록에서 변경하지 않았습니다.
