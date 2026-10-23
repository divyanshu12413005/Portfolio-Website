# Divyanshu Singh Chauhan — Portfolio

React + Vite portfolio deployed at https://divyanshu12413005.github.io/Portfolio-Website/.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local development URL, usually `http://localhost:5173/`.

## Build and preview

```sh
npm run build
npm run preview
```

## Create a new Vite React project

Only needed if starting over in an empty directory:

```sh
npm create vite@latest . -- --template react
npm install
```

## Contact form setup

Copy `.env.example` to `.env` and set your Web3Forms key:

```env
VITE_WEB3FORMS_KEY=YOUR_ACCESS_KEY
```

Vite exposes `VITE_` variables in the browser bundle, so use a key intended for website form submissions. Do not commit `.env`.

## GitHub Pages deployment

1. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
2. Open **Settings → Secrets and variables → Actions → New repository secret**. Set the name to `VITE_WEB3FORMS_KEY` and paste your Web3Forms access key.
3. Push the project to the `main` branch, or run the **Deploy portfolio to GitHub Pages** workflow manually from the **Actions** tab. The workflow installs with `npm ci`, builds `dist`, and publishes it to Pages.
4. The configured Vite base path is `/Portfolio-Website/`, matching this repository's Pages address.

## Images

Put public image files in `public/`. Reference them as `${import.meta.env.BASE_URL}filename.png` in React so they work both locally and under `/Portfolio-Website/` on the deployed site. The profile photo is `public/divyaimg.png`.

## Project content

- `src/data/projects.js` contains all project card and modal details.
- Project cards support optional screenshots. Put optimized images in `public/projects/`, then add `image: "projects/your-image.webp"` and an `imageAlt` description to that project's entry in `src/data/projects.js`. Until an image is set, the card shows a styled preview placeholder.
- `src/data/skills.js` contains the skill categories and chips.
- `src/components/` contains the page sections and controls.
- `portfolio.css` is the global theme stylesheet; `src/react.css` contains React interaction/layout rules.
