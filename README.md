# Zoomzy (zoomzy1)

Small photo-focused web app. Contains a gallery, theme toggle, and a login page. Built as a simple static site with modular JS under `src/`.

## Quick start

1. download the Repo from:

   - (https://github.com/Sandy-Shohdy/zoomzy1)

2. Serve the site
   - If project uses Vite:
     - npm install
     - npm run dev
   - Or use any static server (Live Server extension, `npx serve .`, or `python -m http.server`) and open `index.html`.

## Files & folders (important)

- index.html — main landing page (gallery + home)
- login.html — login page with glow ring
- src/
  - main.js — app entry (gallery, theme toggle, scroll-to-top)
  - login.js — client-side validation for login form
  - style.css — main styles
  - login.css — styles used by login page
  - styles/features/ — feature CSS (comments, likes, loadmore, imageZoom)
- img/ — icons and logo
- README.md — this file

## Key behaviors / developer notes

- Theme toggle:
  - JS toggles `body.light` and stores choice in `localStorage` under `theme`.
  - If the toggle doesn’t work, ensure the page has an element with `id="toggle"` and that `body` accepts the `light` class.
- Gallery:
  - `#app` is populated by `src/main.js`. fetch failures are logged to the console.
- Login:
  - `src/login.js` validates email and password fields and writes messages to `#error-message`.
  - Ensure form inputs use the expected IDs (`email`, `pass`) so validation works.

## Styling & layout

- Main layout is responsive using CSS columns/grid and media queries in `src/style.css`.
- Login page uses a centered glow (`.glow-ring`) and a fixed centered panel (`#Login-page`). z-index controls stacking above content and below the login panel.

## Troubleshooting

- Footer overlapping login: adjust `#Login-page` `top` or `z-index` in `src/style.css`.
- No images showing: check `img/` folder and network console for fetch errors.
- Toggle not persisting: check localStorage and that JS runs (open DevTools Console).

## Contributing

- Edit source in `src/`. Keep HTML structure stable if other files rely on specific IDs/classes.
- Open a PR with a short description of changes.


