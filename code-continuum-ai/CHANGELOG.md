# Changelog — Code Continuum AI

All notable changes to Code Continuum AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-09-01

### Added
- Implemented **Phase 2: Authentication & User Management**.
- Added SQLAlchemy models for `User`, `Organization`, and `OrganizationMember` in `services/api/app/models/`.
- Implemented password hashing (`pbkdf2_sha256` / `bcrypt`) and JWT token creation/decoding in `services/api/app/core/security.py`.
- Added authentication API endpoints: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, and `GET /api/v1/auth/me`.
- Implemented `get_current_user` FastAPI dependency enforcing Bearer token validation and active user checks.
- Added comprehensive unit test suite in `services/api/tests/test_auth.py` verifying registration, duplicate email rejection, login authentication, invalid credential rejection, and protected `/me` profile retrieval.
- Implemented React `AuthContext` state management, `AuthModal` login/register dialogs, and top bar user profile status in `apps/web`.

---

## [0.1.0] - 2026-09-01

### Added
- Created operational AI control layer documents: `AGENTS.md`, `CLAUDE.md`, `MASTER_SPECIFICATION.md`, `CURRENT_TASK.md`, `PROGRESS.md`, `CHANGELOG.md`, `TECHNICAL_DEBT.md`, and `AI_HANDOFF_PROTOCOL.md`.
- Created target project directory structure following `No-Code Continuum AI - Project Structure.md`.
- Initialized FastAPI backend service in `services/api` with health check endpoints (`GET /api/v1/health` and `GET /health`).
- Initialized frontend React/TypeScript/Vite application in `apps/web`.
- Added Docker Compose configuration (`docker-compose.yml`) for local development.
