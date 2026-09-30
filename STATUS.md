# Status — OpenClaw

**Updated:** 2026-09-30 (PT)  
**Visibility:** public  
**Maturity:** abandoned mega-tree / upstream product mirror  
**Role:** Working copy of **OpenClaw** personal AI assistant (`openclaw` / openclaw.ai) — **not** Micap-original IP

## Honest positioning

README, package name (`openclaw` **2026.3.14**), and docs point at upstream `openclaw/openclaw`. GitHub reports ~2GB+ size. `main` tip inspected this wave (`2de2837…`, 2026-03-16).  

**Repo default branch** on GitHub is currently a Dependabot branch (`dependabot/github_actions/docker/build-push-action-7`), not `main` — fix default branch to `main` (or archive). Open PR **#1** (“Initialize Micap Pro Next.js…”) targets that Dependabot branch and is **out of place** — close/re-aim separately; not merged here.

Tai/OpenClaw node backups live elsewhere (`tai-workspace-backup`); do not conflate.

## Workflows

Many `.github/workflows/*` present. This advance **does not** modify workflow files (token lacks `workflow` scope).

## What is **not** claimed

- Micap-original authorship of OpenClaw  
- That this fork is kept current with upstream  
- Metrics / install success from this remote

## Next (owner)

1. Set default branch back to `main` **or** archive the fork  
2. Close or retarget misplaced PR #1  
3. If unused vs upstream, archive to cut inventory noise (very large tree)
