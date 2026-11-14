---
title: "Muuvies — Async Media Search & Control Plane"
summary: "FastAPI + SQLite FTS5 control plane bridging remote indexers, headless challenge solving, and encrypted SFTP streaming over multiplexed SSH tunnels."
year: "2026"
stack: ["Python", "FastAPI", "SQLite FTS5", "Docker", "WebAuthn"]
featured: true
order: 1
---

A unified web control plane built with **FastAPI**, **async SQLite (WAL + FTS5)**, and **Alpine.js** to search, rank, and manage remote media pipelines cleanly from a single interface.

### Key Engineering Decisions

- **SQLite WAL + FTS5 local mirror:** Synchronizes remote library state into a local full-text index so search queries resolve in milliseconds without hammering upstream APIs.
- **Isolated HTTP connection pools:** Separates latency-sensitive search requests from background telemetry/health checks so slow upstream indexers never stall the UI.
- **Scoped authentication & secrets:** Supports passkeys (WebAuthn), session cookies, and Fernet-encrypted credentials stored alongside automated consistent online SQLite backups.
- **Zero public tunnel exposure:** Upstream services stay bound to internal container bridge networks and `autossh` tunnels—only the hardened reverse proxy is reachable externally.
