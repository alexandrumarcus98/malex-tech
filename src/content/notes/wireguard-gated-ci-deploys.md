---
title: "Deploying to a Private VPS Without Opening Public SSH"
summary: "How to keep port 22 closed to the internet while still letting GitHub Actions deploy safely over WireGuard and a forced-command SSH key."
date: "2026-11-14"
tags: ["wireguard", "ci-cd", "security"]
draft: false
---

Leaving TCP port `22` open to `0.0.0.0/0` creates constant scanner noise, and opening firewall holes for dynamic GitHub Actions runner IPs is brittle.

A cleaner approach is making the CI runner join your **WireGuard** network briefly during the deploy job:

1. **Create a dedicated CI WireGuard peer** (e.g. `10.8.0.250/32`) with firewall rules allowing SSH only on `wg0`.
2. **Pin the SSH key in `authorized_keys`** with `from="10.8.0.250"` and `command="/path/to/deploy.sh --ssh"` so the key can *only* trigger a deploy of a commit verified to exist on `origin/main`.
3. **Teardown cleanly:** Bring `wg-quick down` and delete the ephemeral key/config in an `if: always()` step.

```yaml
- name: Join WireGuard
  run: sudo wg-quick up wg-ci

- name: Trigger forced-command deploy
  run: ssh -i ~/.ssh/deploy_key deploy@10.8.0.1 "$GITHUB_SHA"

- name: Clean up VPN and credentials
  if: always()
  run: sudo wg-quick down wg-ci || true
```

This keeps your VPS invisible to SSH brute-force bots while keeping automated `main`-branch deploys fast and auditable.

