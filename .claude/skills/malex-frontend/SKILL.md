---
name: malex-frontend
description: Astro 6 components/pages, Tailwind CSS v4 tokens and @custom-variant dark mode, dual-theme Shiki syntax highlighting, and Playwright Dark/Light + 390x844 mobile verification. Use whenever editing src/layouts/, src/pages/, src/styles/, or public/.
---

# malex.tech Frontend Skill

Follow these conventions when editing Astro templates, Tailwind v4 styles, or client-side scripts.

## 1. Stack & Theme Architecture
- **Astro 6 + Tailwind v4:** Tailwind is loaded via `@tailwindcss/vite` in `astro.config.mjs` and configured in `src/styles/global.css` (`@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`). There is no `tailwind.config.js`.
- **Dark Mode:** `src/styles/global.css` defines `@custom-variant dark (&:where(.dark, .dark *));`.
  - Keep the inline `<script is:inline>` theme initializer in `src/layouts/BaseLayout.astro` in `<head>` so Dark/Light mode renders without a flash on page load.
  - Colours come from tokens in `src/styles/global.css` (light on `:root`, dark on `html.dark`), exposed to Tailwind via `@theme inline` as `bg-bg`, `text-ink`, `text-ink-2`, `text-ink-3`, `border-line`, `bg-vermilion`, `bg-sage`, `bg-ochre`. Use tokens for every new surface, border, badge, and link so both themes stay in sync; reach for `dark:` only for genuinely mode-specific tweaks (e.g. icon swaps).
  - Palette: cream `#efe6d5`, sage `#9dbeb7`, vermilion `#e73213` on warm charcoal (`#17191e` dark). Avoid pure `#000`/`#fff` canvases.
- **Typography & Code Blocks:** Body uses `Rethink Sans`, code/mono labels use `JetBrains Mono`. Markdown code blocks use Shiki (`github-light` / `github-dark-default`) styled via `html.dark .astro-code` rules; `pre.astro-code` takes `--code-bg` so blocks sit on the warm palette. Article styles live in the unlayered `.prose-site` block (it must stay outside `@layer` to beat the typography plugin).
- **Motion:** Animate only `transform`/`opacity`. Scroll reveals use CSS `animation-timeline: view()` (`.reveal`), hero entrance uses `.in` / `.line-mask` with `--i` stagger. Everything animated lives inside `@media (prefers-reduced-motion: no-preference)`; content must render fully without it.
- **Navigation:** Desktop uses the centred floating island (`[data-island]`); below `sm` a floating bottom tab bar replaces the links, so pages keep `pb-28 sm:pb-0` space on `<main>`.

## 2. Static Asset & Caching Rules
- Static files in `public/` are copied verbatim to `dist/` (`public/favicon.svg`, `public/_headers`).
- `/_astro/*` hashed bundles are served with `Cache-Control: public, max-age=31536000, immutable` from `public/_headers`. Avoid hardcoding unhashed asset URLs unless they are meant to be mutable.

## 3. Build & Visual Verification (Headless Playwright)
1. Run the production build:
   ```bash
   pnpm build
   ```
2. For layout, theme, or CSS changes, preview `./dist` (`pnpm preview -- --host 127.0.0.1 --port 4321`) and verify in headless Chromium across:
   - Desktop (`1280x800` or `1440x900`) in both Light and Dark modes
   - Mobile (`390x844`) confirming `document.documentElement.scrollWidth <= window.innerWidth` and zero `console.error` / `pageerror` events.
   - On Linux ARM64 hosts, if Playwright cannot locate an x64 browser binary, pass the local arm64 headless Chromium executable path explicitly.

