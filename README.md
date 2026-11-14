# malex.tech

Personal software developer site built with **Astro + Tailwind CSS** and deployed to **Cloudflare Pages** (`$0`, zero VPS load).

## Local Development

```bash
npm install
npm run dev
# Build static output to ./dist
npm run build
```

Edit profile info & stack in `src/data/site.ts`, projects in `src/content/projects/`, and notes in `src/content/notes/`.

## Deploy to Cloudflare Pages

1. Push this directory to a new GitHub repo (e.g., `alexandrumarcus98/malex-tech`).
2. Move `malex.tech` DNS to Cloudflare Free:
   - Import existing records and **keep `media.malex.tech -> 2.31.71.228` set to "DNS only" (grey cloud)** so Caddy continues handling TLS and large media streams cleanly.
3. In **Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git**:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22` (or `22.22.1`)
4. Under **Custom domains**, add `malex.tech` (and `www.malex.tech` if desired). Cloudflare configures DNS + TLS automatically.
