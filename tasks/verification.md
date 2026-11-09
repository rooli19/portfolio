# Portfolio verification

## Restored motion and sections

- Production build and all nine page routes passed in Chromium, Firefox, and WebKit at desktop and mobile sizes. The four legacy redirects still preserve query strings and fragments.
- Chromium exercised the Home lanyard, camera buttons and shutter, the notebook opening by scroll and click, the About rope, and the gallery with mouse and touch drag. It also checked reduced motion, blocked animation code, unavailable WebGL, and a missing portrait.
- Firefox kept all 20 emulated mobile transitions visible for ten seconds each.
- The framed showreel and photo roll are visible. Their media slots remain empty until populated in `src/content/media.js`.

## Initial rebuild checks

- Chromium, Firefox, and WebKit passed all nine pages at 1440px and 402px, including direct links, legacy redirects with query and fragment, refresh, back, and forward.
- Chromium also checked 360px and 768px, keyboard focus, heading order, opening a project in a new tab, contact validation and the resulting email draft, mouse and emulated touch drag, missing images, blocked scripts, and slow module loading.
- Twenty navigation transitions in Firefox at 402 × 874 stayed visible immediately and after ten seconds.
- All normal page loads passed without uncaught errors, missing required assets, or external requests.
- Reviewed the rebuilt screenshots against the original at both sizes. The original lanyard and Playground physics were recreated with 2D motion. The class slide deck and a real phone were unavailable for the remaining submission checks.

## Initial size comparison

These figures describe the first rebuild, before the original motion and interactive sections were restored.

Cold Chromium loads at 402 × 874 on plain local static servers, with external requests blocked on both versions. Total transfer includes the document and local resources loaded within 3.2 seconds after load. Gzip figures sum the compressed sizes of the unique JavaScript files loaded. Units are decimal KB and rounded.

| Page | Original total | React total | Original JS gzip | React JS gzip |
| --- | ---: | ---: | ---: | ---: |
| Home | 4,334 | 844 | 489 | 121 |
| About | 2,265 | 716 | 422 | 71 |
| Works | 2,016 | 497 | 443 | 73 |
| Playground | 2,066 | 761 | 527 | 118 |
| Contact | 1,753 | 481 | 391 | 70 |
| TranspoGAPO | 2,175 | 526 | 476 | 73 |
| RESH | 2,172 | 526 | 476 | 73 |
| Landr. | 2,175 | 526 | 476 | 73 |
| Hiss n Miss | 2,120 | 526 | 476 | 73 |

The initial build totaled 1.11 MB on disk. The current browser checks report transfers without a performance gate so that restored motion can use the original effects.

Original screenshots and the interaction recording are in `test-results/reference/`. Rebuilt screenshots and measured gzip-enabled transfers are in `test-results/`.
