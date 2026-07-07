# assets/icons

이 프로젝트의 UI 아이콘은 별도 이미지 파일 대신 `js/renderer.js`의 `ICONS` 객체에
인라인 SVG로 정의되어 있습니다 (요청 수 감소, 색상/크기 커스터마이징 용이).

커스텀 아이콘(예: 회사 로고, 뱃지 이미지 등)을 추가하고 싶다면 이 폴더에 `.svg` 또는
`.png` 파일을 넣고 `index.html` / `js/renderer.js`에서 원하는 위치에 참조하면 됩니다.
