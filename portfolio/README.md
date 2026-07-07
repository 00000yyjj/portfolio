# 여연정 (Yeonjeong Yeo) · Product Owner Portfolio

이력서(사람인)와 경력기술서·자기소개서를 바탕으로 제작한 개인 포트폴리오 웹사이트입니다.
순수 **HTML + CSS + JavaScript**로 만들어져 있어 별도 빌드 과정 없이 GitHub Pages에 바로 배포할 수 있습니다.

- 데이터(경력, 프로젝트, 스킬 등)는 전부 `data/portfolio.json` 한 곳에서 관리됩니다.
- 라이트/다크 모드를 지원합니다.
- 모바일(폰) · 태블릿 · 데스크톱 반응형 레이아웃을 지원합니다.
- 스크롤 리빌 애니메이션, 카드형 UI, Glassmorphism 내비게이션을 적용했습니다.

---

## 1. 폴더 구조

```
portfolio/
 ├── index.html              # 엔트리 포인트 (전체 페이지 구조)
 ├── css/
 │    ├── variables.css      # 색상·타이포·spacing 디자인 토큰 (라이트/다크)
 │    ├── base.css           # 리셋 및 기본 타이포그래피
 │    ├── components.css     # 네비게이션/히어로/카드/타임라인 등 컴포넌트
 │    ├── animations.css     # 키프레임 + 스크롤 리빌 유틸리티
 │    ├── responsive.css     # 태블릿/모바일 브레이크포인트, 모바일 드로어
 │    └── dark-mode.css      # 다크 모드 세부 보정
 ├── js/
 │    ├── data-loader.js     # data/portfolio.json fetch
 │    ├── renderer.js        # JSON → DOM 렌더링 함수 모음
 │    ├── theme.js           # 다크모드 토글 + localStorage 저장
 │    ├── nav.js              # 스크롤스파이, 모바일 드로어 메뉴
 │    ├── animations.js       # IntersectionObserver 기반 스크롤 애니메이션
 │    └── main.js             # 위 모듈들을 초기화하는 엔트리 스크립트
 ├── assets/
 │    ├── images/            # 프로필 사진, OG 이미지 등 (사용법은 폴더 내 README 참고)
 │    └── icons/             # 커스텀 아이콘을 추가하고 싶을 때 사용 (기본 아이콘은 인라인 SVG)
 ├── data/
 │    └── portfolio.json     # 모든 콘텐츠(경력/프로젝트/스킬/자격 등)
 ├── favicon.svg
 └── README.md
```

---

## 2. 로컬에서 미리보기

`data/portfolio.json`을 `fetch()`로 불러오기 때문에, `index.html`을 브라우저에서 **더블클릭으로 직접 열면**
브라우저 보안 정책(CORS)에 막혀 데이터가 표시되지 않습니다. 아래처럼 로컬 서버를 띄워 확인해주세요.

```bash
# 방법 1: Node가 있다면
npx serve .

# 방법 2: Python이 있다면
python3 -m http.server 8080
```

이후 브라우저에서 `http://localhost:8080` (또는 `npx serve`가 안내하는 주소)로 접속합니다.

---

## 3. GitHub Pages 배포 방법

### 방법 A. Settings에서 바로 배포 (가장 간단)

1. GitHub에 새 저장소를 만들고, 이 `portfolio` 폴더의 내용을 저장소 루트에 push 합니다.

   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. GitHub 저장소 페이지에서 **Settings → Pages** 로 이동합니다.
3. **Build and deployment → Source**를 `Deploy from a branch`로 선택합니다.
4. **Branch**를 `main` (또는 배포용 브랜치), 폴더는 `/ (root)`로 지정한 뒤 **Save**를 누릅니다.
5. 잠시 후 `https://<your-username>.github.io/<repo-name>/` 주소에서 사이트가 열립니다.

> 저장소 이름을 `<your-username>.github.io`로 만들면 루트 도메인(`https://<your-username>.github.io/`)으로 바로 배포됩니다.

### 방법 B. GitHub Actions로 배포

정적 파일만 있는 프로젝트이므로 별도 빌드가 필요 없습니다. **Settings → Pages → Source**에서
`GitHub Actions`를 선택하면 GitHub가 제공하는 기본 정적 배포 워크플로(`Static HTML`)를 그대로 사용할 수 있습니다.

---

## 4. 콘텐츠 수정 가이드

거의 모든 텍스트/데이터는 **`data/portfolio.json`** 한 파일에서 수정할 수 있습니다.

| 섹션 | JSON 키 |
| --- | --- |
| Hero (이름/직무/한줄소개) | `profile`, `quickFacts` |
| About | `about` |
| Skills | `skillGroups` |
| Working Style (강점) | `workingStyle` |
| Career (경력) | `career` (회사별 `bullets`, `tags` 자유롭게 추가/삭제 가능) |
| Projects | `projects` |
| Education | `education` |
| Certifications | `certifications` |
| Global Experience & Activities | `activities` |
| 상단/모바일 내비게이션 메뉴 | `nav` |
| SEO 메타 정보 | `meta` |

새로운 경력이나 프로젝트를 추가하고 싶다면 `career` 또는 `projects` 배열에 같은 형태의 객체를
하나 더 추가하면 됩니다. 코드(HTML/JS)를 건드릴 필요가 없습니다.

### 프로필 사진 추가

기본값은 이니셜(YY) 아바타입니다. 실제 사진을 넣는 방법은 `assets/images/README.md`를 참고하세요.

### 이력서 PDF 다운로드 버튼

`index.html`의 "이력서 다운로드" 버튼은 `assets/yeonjeong-yeo-resume.pdf` 경로를 가리키고 있습니다.
실제 이력서 PDF 파일을 해당 경로(또는 원하는 경로)에 추가하고,
`data/portfolio.json`의 `profile.resumeFile` 값을 맞춰주세요. 파일을 추가하지 않으면 해당 버튼은 동작하지 않습니다.

---

## 5. 개인정보 관련 안내 (배포 전 꼭 확인하세요)

원본 이력서에는 실제 연락처(이메일·휴대폰 번호)와 상세 자택 주소가 포함되어 있습니다.
공개 웹사이트에 그대로 노출되면 스팸·프라이버시 위험이 있으므로, 이 템플릿에는 다음과 같이
**의도적으로 예시 값**만 넣어두었습니다.

- `data/portfolio.json → profile.email` : `contact@example.com` (실제 이메일로 교체 필요)
- 상세 자택 주소는 아예 포함하지 않았고, `location`은 `"Seoul, South Korea"` 정도로만 표기했습니다.
- 생년(나이) 정보도 포함하지 않았습니다.

실제 배포 전 `profile.email` 값과 필요 시 연락처 관련 문구를 원하는 수준으로 조정해주세요.
(공개 이메일 노출이 부담스럽다면 이메일 대신 링크드인 등 별도 연락 채널로 교체하는 것도 방법입니다.)

---

## 6. 디자인 토큰

`css/variables.css`에 색상·폰트·spacing이 CSS 커스텀 프로퍼티로 정의되어 있어
전체적인 룩앤필을 이 파일만 수정해서 바꿀 수 있습니다.

- **색상 컨셉**: 해운·물류 도메인에서 착안한 딥 네이비(`--ink-*`, `--navy-*`) + 앰버 포인트 컬러(`--amber-*`), 보조 틸(`--teal-*`)
- **폰트**: 제목 `Space Grotesk`, 본문 `Inter`, 라벨/날짜 `IBM Plex Mono` (Google Fonts CDN)
- **라운드 코너**: `--r-sm` ~ `--r-xl`, `--r-pill`
- **다크 모드**: `[data-theme="dark"]` 선택자로 토큰을 오버라이드 (`css/dark-mode.css`에서 세부 보정)

---

## 7. 접근성 & 성능 참고사항

- 모든 인터랙티브 요소에 `:focus-visible` 스타일이 적용되어 있습니다.
- `prefers-reduced-motion`을 존중하여, 모션에 민감한 사용자에게는 애니메이션을 최소화합니다.
- 이미지 없이 인라인 SVG 아이콘을 사용해 초기 로딩 요청 수를 최소화했습니다.
- 시맨틱 태그(`header`, `main`, `nav`, `section`, `footer`)와 skip link를 사용했습니다.

---

## 8. 라이선스 / 크레딧

- 폰트: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — 모두 Google Fonts를 통해 오픈소스 라이선스로 제공됩니다.
- 아이콘: 프로젝트 내 직접 제작한 인라인 SVG (Lucide 스타일의 라인 아이콘 참고).
- 콘텐츠 저작권은 여연정 본인에게 있습니다.
