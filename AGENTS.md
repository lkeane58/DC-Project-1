# Agent Guidelines & Workflow Rules

This document outlines the workflow, branching strategy, and safety protocols for AI agents working within this repository.

## Git & Branching Rules

### 1. Never Push Directly to `main`
- **Strict Rule:** Direct pushes to the `main` branch are strictly prohibited during development and modifications.
- Never commit or push directly to `main`.

### 2. Push Only to Specified Branches
- Work must always be done on a dedicated branch.
- **Only push to the specific branch explicitly designated by the user.** If no branch was specified, ask for clarification before pushing any remote changes.

### 3. Merging via Pull / Merge Requests
- All integrations into `main` must be performed through Pull Requests / Merge Requests (PRs/MRs).
- Once work on the designated branch is complete and verified, prepare or open a pull/merge request for review before merging into `main`.

---

## Pre-Push Checklist for Agents
- [ ] Confirm active branch with `git branch --show-current` (ensure it is NOT `main`).
- [ ] Confirm the target remote branch matches the branch requested by the user.
- [ ] Verify that working files build/execute cleanly before pushing.

