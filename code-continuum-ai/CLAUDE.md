# Claude Code Instructions — Code Continuum AI

This document provides operational instructions for Claude Code and AI coding assistants working on **Code Continuum AI**.

---

## Startup Protocol for Claude Code

Before making substantial code modifications:
1. **Read `AGENTS.md`**: Understand agent governance and strict safety rules.
2. **Read `MASTER_SPECIFICATION.md`**: Review the condensed product, architectural, and database specification.
3. **Read `CURRENT_TASK.md`**: Identify the exact current task, scope, out-of-scope boundaries, and acceptance criteria.
4. **Read `PROGRESS.md`**: Check current phase progress and pending work.

---

## Core Commands

### Backend (`services/api`)
- **Install dependencies**: `pip install -r services/api/requirements.txt`
- **Run dev server**: `uvicorn app.main:app --reload --port 8000` (from `services/api`)
- **Run tests**: `pytest services/api/tests`

### Frontend (`apps/web`)
- **Install dependencies**: `npm install` (from `apps/web`)
- **Run dev server**: `npm run dev` (from `apps/web`)
- **Run build check**: `npm run build` (from `apps/web`)
- **Run tests**: `npm run test` (from `apps/web`)

### Docker Compose
- **Start all services**: `docker-compose up -d`
- **Stop all services**: `docker-compose down`

---

## Critical Operating Principles

- **Preserve 24 Documentation Files**: Never delete, rename, or overwrite any file inside `docs/`.
- **Follow Golden Rule**: Working MVP > Verified Functionality > Tested Code > Documented Code > Clean Architecture > Advanced Features.
- **Mock AI Providers in Tests**: Unit tests must execute fast and offline using mock AI adapters.
- **Update Handoff Documents**: Before completing your session, update `CURRENT_TASK.md`, `PROGRESS.md`, `CHANGELOG.md`, and `AI_HANDOFF_PROTOCOL.md`.
