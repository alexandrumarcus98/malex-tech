# malex.tech — Claude Code Project Guide

Personal software developer site (`https://malex.tech` and `https://www.malex.tech`) built with Astro 6 + Tailwind CSS v4 and deployed on Cloudflare Workers Static Assets (`wrangler.jsonc`).

## Project Skills

Read the matching skill in `.claude/skills/` when working in that area:
- `malex-frontend`: Astro layouts/pages, Tailwind v4 styling, Dark/Light mode, Shiki blocks, and Playwright desktop/mobile verification.
- `malex-content`: Updating `src/data/site.ts` and Markdown collections (`src/content/projects/`, `src/content/notes/`), plus public-repo redaction rules.
- `malex-deploy-ops`: `npm run build`, Cloudflare Workers Static Assets (`wrangler.jsonc`), `public/_headers`, Node 22 compatibility, and git push -> auto-deploy guardrails.

## Architecture & Key Paths

- `src/data/site.ts`: Site metadata, bio, status, links, and grouped tech stack.
- `src/content.config.ts`: Astro Content Layer schemas (`projects` and `notes` collections).
- `src/layouts/BaseLayout.astro`: Shared HTML shell, theme toggle (`localStorage.theme` + `html.dark`), nav, and footer.
- `src/styles/global.css`: Tailwind v4 `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, `@custom-variant dark`, design tokens (cream `#efe6d5` / sage `#9dbeb7` / vermilion `#e73213` on warm charcoal; light values on `:root`, dark on `html.dark`), fonts (`Rethink Sans` + `JetBrains Mono`), compositor-only motion gated by `prefers-reduced-motion`, and Shiki dual-theme overrides.
- `src/components/`: `SectionHeading`, `ProjectCard`, `NoteRow`; `src/utils/accent.ts` cycles palette accents by list position.
- `public/_headers`: Security headers (`/*`) and immutable asset caching (`/_astro/*`).
- `wrangler.jsonc`: Cloudflare Workers Static Assets config (`assets.directory: "./dist"`, `not_found_handling: "404-page"`).

## Never

- **Never** publish internal VPS IPs, WireGuard configs/addresses, seedbox hostnames/usernames/ports, `.env` secrets, private keys, or Adult Vault details in any Markdown post, page, or commit. This repo is public on GitHub.
- **Never** edit `dist/` or `.astro/` manually; both are build artifacts ignored by git.
- **Never** proxy `media.malex.tech` in Cloudflare or route it through this Worker; `media.malex.tech` must stay **DNS only** pointing at the VPS Caddy origin.
- **Never** push to `main` without running `npm run build` first and confirming with the user, because pushing `main` triggers an automatic Cloudflare Workers Build deploy.

## Verification Before Finishing

```bash
npm run build
```

When changing layout, CSS, or responsive UI, also run a Playwright headless check across Desktop (Dark + Light) and Mobile (`390x844`) confirming zero console/page errors and no horizontal overflow (`scrollWidth <= innerWidth`).

Existing project guide in `AGENTS.md` covers Astro dev background commands and official Astro docs links.

