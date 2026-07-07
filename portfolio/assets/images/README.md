# assets/images

이 폴더는 비워 둔 상태입니다. 아래 파일을 추가하면 사이트에 자동으로 반영할 수 있습니다.

| 파일명 예시              | 용도                                              | 권장 규격            |
| ------------------------ | ------------------------------------------------- | --------------------- |
| `profile.jpg`             | Hero 카드의 프로필 사진 (현재는 이니셜 아바타)     | 정사각형, 400×400px 이상 |
| `og-cover.png`            | 카카오톡·페이스북 등 링크 공유 시 노출되는 썸네일 | 1200×630px            |

## 프로필 사진 적용 방법

1. 이 폴더에 사진 파일을 추가합니다 (예: `profile.jpg`).
2. `index.html`에서 `hero-card__avatar` 요소를 아래처럼 이미지로 교체합니다.

```html
<div class="hero-card__avatar" id="heroAvatar" style="padding:0; overflow:hidden;">
  <img src="assets/images/profile.jpg" alt="여연정 프로필 사진" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```

3. `js/renderer.js`의 `renderHero` 함수에서 `heroAvatar.textContent = profile.initials;` 줄은 삭제하거나 그대로 두어도 이미지가 우선 표시됩니다(위 예시처럼 `img`를 직접 넣으면 `textContent`가 이미지를 덮어쓰므로, 이미지를 넣을 경우 해당 줄은 지워주세요).

## OG 이미지 적용 방법

`data/portfolio.json`의 `meta.ogImage` 값과 `index.html`의 `og:image` 메타 태그 경로를 실제 파일명으로 맞춰주세요.
