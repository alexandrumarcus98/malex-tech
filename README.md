# malex.tech

Personal software developer site built with **Astro + Tailwind CSS** and deployed on **Cloudflare Workers Static Assets** (`wrangler.jsonc`, `$0`, zero VPS load).

## Local Development

```bash
npm install
npm run dev
# Typecheck and build static output to ./dist
npm run check
npm run build
```

Edit profile info & stack in `src/data/site.ts`, projects in `src/content/projects/`, and notes in `src/content/notes/`.

## Deploy to Cloudflare Workers Static Assets

1. Push this directory to GitHub (e.g., `alexandrumarcus98/malex-tech`).
2. Keep `malex.tech` DNS in Cloudflare:
   - **Keep `media.malex.tech` (`A` record pointing to the VPS origin IP) set to "DNS only" (grey cloud)** so Caddy continues handling TLS and large media streams cleanly.
3. In **Cloudflare Dashboard -> Workers & Pages -> Create -> Workers -> Import a repository**, connect the repo:
   - `wrangler.jsonc` configures `assets.directory` (`./dist`), `assets.not_found_handling` (`404-page`), and `assets.html_handling` (`auto-trailing-slash`).
   - **Build command:** `npm run build`
   - **Environment variable:** `NODE_VERSION` = `22`
4. Under **Settings -> Domains & Routes**, attach `malex.tech` and `www.malex.tech` to the Worker. Cloudflare configures DNS + TLS automatically.
