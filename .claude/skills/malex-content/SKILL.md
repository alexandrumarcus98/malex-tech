---
name: malex-content
description: Managing site profile data (src/data/site.ts) and Astro Content Collections (src/content/projects/, src/content/notes/), schema validation, and public-repo privacy redaction. Use when adding or editing profile info, project writeups, or technical notes.
---

# malex.tech Content & Privacy Skill

Follow these rules whenever updating profile data, project case studies, or technical notes.

## 1. Content Locations & Schemas
- **Profile & Stack:** Edit `src/data/site.ts` (`SITE.name`, `SITE.bio`, `SITE.status`, `SITE.email`, `SITE.github`, `SITE.linkedin`, `SITE.stack`). Leave `SITE.linkedin` as `''` unless a valid URL is set.
- **Projects (`src/content/projects/*.md`):** Validated by Zod in `src/content.config.ts`:
  - Required: `title` (string), `summary` (string), `year` (string), `stack` (string[])
  - Optional: `repo` (URL), `featured` (boolean, default `true`), `order` (number, default `10`; lower renders first)
- **Notes (`src/content/notes/*.md`):** Validated by Zod in `src/content.config.ts`:
  - Required: `title` (string), `summary` (string), `date` (YYYY-MM-DD)
  - Optional: `tags` (string[], default `[]`), `draft` (boolean, default `false` — set `draft: true` for WIP posts)

## 2. Public-Repo Privacy & Redaction Checklist
This repository is **public** on GitHub and deployed to public edge URLs. Before writing or committing any project writeup or note:
- **Never** include real server IP addresses, SSH ports/users, internal VPN tunnel IPs, internal hostnames or credentials, webhook URLs, API tokens, or `.env` values.
- **Never** include private service internals or non-public routes/hostnames. Describe architecture in general engineering terms instead.
- Check new Markdown before staging: verify all code examples use placeholder hostnames/values (`example.com`, `10.x.x.x` only if generic, or redacted).

## 3. Verification
Run `pnpm check && pnpm build` to ensure Astro's Content Layer Zod schemas and dynamic `[slug]` routes (`projects/[slug]`, `notes/[slug]`) build without warnings or errors.

