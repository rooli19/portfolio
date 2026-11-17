# Rholly Cao’s portfolio

A scrapbook-style portfolio built with React, Vite, CSS, Motion, and Three.js. Each page has its own HTML entry, so links and reloads work on ordinary static hosting.

## Run locally

Use a Node.js version supported by the installed Vite version. The rebuild was developed with Node 26.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production preview:

```sh
npm run build
npm run preview
```

GitHub Pages publishes the portfolio from `main` at https://rooli19.github.io/portfolio/. The Pages workflow builds `dist/` with the path reported by GitHub. To preview that same path locally, run `npm run build -- --base=/portfolio/` and then `npm run preview -- --base=/portfolio/`.

For another static host, publish the contents of `dist/` and configure the host to use `404.html` for missing pages. The old project links redirect from ordinary HTML files. If you use VS Code Live Server, serve `dist/` as its root after a build for `/`.

## Change the content

- `src/content/projects.js` holds the projects, roles, technologies, case studies, and live links.
- `src/content/profile.js` holds skills, experience, and contact details.
- `src/content/media.js` holds the project images, Playground photos, and Home camera photos.
- `ASSETS.md` maps the reused artwork and fonts to their original export files.

The page layouts live in `src/pages/`. The camera, notebook, hanging badge, and interactive gallery are separate components in `src/components/`. The lanyard and paper motion live in `src/animation/`, alongside the code that paints the gallery paper textures.

Put your PNG images in `public/photos/`. Project slots load automatically from `<project>-<slot>.png`, such as `transpogapo-cover.png` or `resh-interface.png`. The project prefixes are `transpogapo`, `resh`, `landr`, and `hiss-n-miss`. The same cover appears on Home, Works, and the project page. Empty slots stay blank.

| Project     | Cover                           | Process                             | Interface                         | Result                                    |
| ----------- | ------------------------------- | ----------------------------------- | --------------------------------- | ----------------------------------------- |
| TranspoGAPO | Route map with a readable route | Routing flow or early wireframe     | Mobile route selection            | Turn-by-turn walking directions           |
| RESH        | Receipt dashboard               | OCR and extraction flow             | Receipt upload or review          | Organized expense record with sample data |
| Landr.      | Registry or map screen          | Submission and review flow          | Admin review or wallet connection | Verified record or hackathon result       |
| Hiss n Miss | Gameplay screenshot             | Voice input diagram or sprite sheet | In-game obstacles and controls    | Screenshot from a completed run           |

Name the five hanging photos `playground-01.png` through `playground-05.png` and the eight camera photos `camera-01.png` through `camera-08.png`. The numbers set their display order. You can customize alt text in `src/content/media.js`.

TranspoGAPO has a dedicated eight-chapter scrapbook at `works/transpogapo.html`. Chapter metadata, survey counts, journey stages, and screenshot descriptions live in `src/content/transpogapo.js`; narrative content lives in `src/components/TranspoChapters.jsx`. Its chapter fragments support direct links and browser history. The plane respects reduced motion; screenshots open in a keyboard-accessible dialog. Other case studies retain their shared layout.

The current role and implementation dates were confirmed by Rholly. Content follows the instructor’s 26-slide template and the updated TranspoGAPO context through November 17, 2026. Persona and journey are illustrative; wireframes and the clickable flow are retrospective reconstructions. Evaluation scores describe the team’s 21 respondents, not measured journey improvements. The four `transpogapo-{planner,mobile,routes,terminals}.png` images were captured from the live app on November 17, 2026. The planner image is also used on project cards. Keep map attribution visible when replacing captures.

The contact form opens a draft in the visitor’s email app. The email and LinkedIn links offer direct contact options.

## Verify the build

```sh
npx playwright install
npm run build
npm test
```

The checks serve `dist/` as static files and cover Chromium, Firefox, and WebKit. They include the gallery drag, lanyard, About rope, camera, notebook, and the gallery’s fallback when 3D is unavailable. Screenshots are written to `test-results/`. For a submission check, open the published site on an actual phone.

For scrapbook interactions, run `npm run test:transpogapo` against a running dev or preview server. Set `PORTFOLIO_URL` to its URL (default `http://127.0.0.1:5174`, include `/portfolio` for a subpath build). This checks chapters, history, rapid navigation, reduced motion, the journey, reconstructed prototype, screenshot dialog, and widths from 320 to 1440 pixels.
