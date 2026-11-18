# Copilot code review: malex-tech

Personal developer site. Astro 6, Tailwind CSS v4, deployed on Cloudflare Workers Static Assets. **Pushing `main` deploys automatically**, so treat every PR as going live. Project rules are in `CLAUDE.md`.

## Flag these, most important first

1. **Private details leaking into a public site.** Pages, posts, code, comments and config must not contain IP addresses, internal hostnames, VPN or tunnel details, server usernames or ports, `.env` values, keys or tokens, or details of the private features of other projects. Describe infrastructure in general terms only. This is the most important check.
2. **Build breaks.** Frontmatter that doesn't match the schemas in `src/content.config.ts`, broken imports or internal links, and APIs that don't exist in Astro 6 or Tailwind v4.
3. **Themes.** Both themes must work: dark via `html.dark`, light on `:root`. Colours come from the tokens in `src/styles/global.css`, not raw hex or one-off Tailwind palette colours in components.
4. **Motion.** Animate only `transform` and `opacity`, and gate motion behind `prefers-reduced-motion`.
5. **Mobile.** Nothing may cause horizontal overflow at 390px wide (long words, URLs, code, rows of pills).
6. **Headers.** `public/_headers` keeps its security headers and the immutable cache rule for `/_astro/*`.
7. **Accessibility.** Images need alt text, links need meaningful text, headings stay in order, focus stays visible, text keeps readable contrast in both themes.
8. **Build output.** `dist/` and `.astro/` are generated; flag any PR that edits them.

## Don't comment on

- Formatting, naming or import order.
- Writing style in posts and notes. Do flag factual errors, broken Markdown and obvious typos.
- Rewriting working code for style alone.

## How to comment

- Comment only when you can name a concrete failure: what breaks, where, for whom. Say so when you're unsure.
- One comment per problem; group repeats of the same issue.
- If nothing important is wrong, say that in one line.
