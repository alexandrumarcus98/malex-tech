---
title: "Self-Hosted ARM64 VPS & Zero-Trust Ops"
summary: "Multi-service Docker infrastructure on Hetzner ARM64 with WireGuard-gated CI/CD, decoupled Caddy TLS, encrypted Restic off-site backups, and automated watchdog alerts."
year: "2026"
stack: ["Linux", "Docker Compose", "Caddy", "WireGuard", "Restic", "Bash"]
featured: true
order: 2
---

Production-grade personal infrastructure built to run multiple containerized workloads alongside active development environments on a single `8 GB` ARM64 VPS.

### Architecture Highlights

- **Decoupled reverse proxy:** Standalone Caddy instance on an external Docker bridge (`proxy-net`), keeping TLS state and routing independent of individual application deployments.
- **WireGuard-only SSH & CI/CD:** Public port `22` stays closed. GitHub Actions runners join an isolated WireGuard peer and authenticate using an SSH key pinned to a forced deploy command.
- **3-2-1 encrypted backups:** Consistent database snapshots run before daily `restic` encrypted backups to off-site cloud storage, monitored via dead-man's-switch pings and Discord webhooks.
- **Offloaded static edge:** Static sites (including `malex.tech`) live on Cloudflare Pages so VPS maintenance or restarts never affect public availability.
