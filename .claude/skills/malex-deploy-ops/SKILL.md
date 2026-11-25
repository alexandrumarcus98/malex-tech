---
name: malex-deploy-ops
description: Astro production builds, Node 22 compatibility, Cloudflare Workers Static Assets (wrangler.jsonc), custom headers, and git push auto-deploy safety for malex.tech. Use when changing build config, wrangler.jsonc, _headers, .node-version, or deploying updates.
---

# malex.tech Build & Cloudflare Deploy Ops Skill

Use these checks before modifying deployment configuration or pushing changes to GitHub.

## 1. Runtime & Cloudflare Workers Configuration
- **Node version:** Keep `.node-version` pinned to `22`. Astro `^6.4.8` requires Node `>=22.12.0` (do not upgrade to Astro 7 unless Cloudflare Workers Builds and local Node are `>=22.23.4`).
- **Static Assets (`wrangler.jsonc`):**
  - `assets.directory`: `"./dist"`
  - `assets.not_found_handling`: `"404-page"` (serves Astro's built `src/pages/404.astro`)
  - No `main` Worker entrypoint is needed while the site remains purely static.
- **Headers (`public/_headers`):** Applies security headers on `/*` and immutable 1-year caching on `/_astro/*`.

## 2. Auto-Deploy & Domain Guardrails
- **Git push to `main` auto-deploys:** Cloudflare Workers Builds watches `main` on `github.com/alexandrumarcus98/malex-tech`, runs `pnpm build`, and publishes `./dist`.
  - Develop larger changes on a feature branch, run `pnpm check && pnpm build`, and confirm before pushing to `main`.
- **Keep unrelated subdomains isolated:** This Worker attaches only to the apex and www domains. Never add wildcard routes, redirects, or proxy rules touching unrelated subdomains.

## 3. Verification Commands
Before committing or pushing:
```bash
pnpm check && pnpm build
git status -s
```
If testing the built static bundle locally:
```bash
pnpm preview -- --host 127.0.0.1 --port 4321
curl -fsSI http://127.0.0.1:4321/
```
After deployment to production:
```bash
curl -fsSI https://malex.tech/
curl -fsSI https://www.malex.tech/
```
