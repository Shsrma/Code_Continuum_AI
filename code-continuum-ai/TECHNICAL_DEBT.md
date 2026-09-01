# Technical Debt & MVP Limitations — Code Continuum AI

This document explicitly records intentional tradeoffs, architectural decisions, deferred features, and technical debt accepted for the MVP release. 

Technical debt must be visible and documented rather than hidden.

---

## 1. Intentional MVP Tradeoffs

| Category | MVP Implementation | Enterprise Target | Rationale for MVP |
|---|---|---|---|
| **Database** | SQLite fallback / Single PostgreSQL instance | Distributed HA PostgreSQL cluster | Enables instant local development & simple test execution without external services. |
| **Vector Storage** | `pgvector` extension in PostgreSQL | Dedicated Pinecone / Qdrant cluster | Minimizes infrastructure complexity and external cloud dependencies for interview demos. |
| **Supported Languages** | Python, JavaScript, TypeScript, Java | 20+ programming languages | Focuses on deep extraction quality for top enterprise languages. |
| **Analysis Queue** | In-process background tasks / Redis queue | Distributed Celery / Temporal workflow cluster | Keeps demo footprint lightweight while maintaining async processing capabilities. |
| **Authentication** | Local JWT with password hashing (Argon2id) | OAuth2 + OIDC + Enterprise SAML SSO | Fast local user onboarding and protected routes without external OAuth provider setup. |
| **AI Authorship Analysis**| Heuristic rule-based indicators + LLM evaluation | Deep ML code stylometry model | Avoids false positives and heavy local model hosting; keeps analysis probabilistic and transparent. |

---

## 2. Technical Debt Registry

### TD-001: SQLite Fallback in Backend Tests
- **Impact**: Unit tests run against SQLite using mock engine rather than full PostgreSQL + `pgvector`.
- **Mitigation**: Integration and E2E tests run against PostgreSQL via Docker Compose.
- **Planned Fix Phase**: Phase 14 (Deployment).

### TD-002: In-Memory AI Service Mocking
- **Impact**: Default test environment uses mock AI responses instead of live LLM API calls.
- **Mitigation**: Ensures zero-cost, deterministic, fast test execution without network dependency or secret exposure.
- **Planned Fix Phase**: By design for unit testing; live API keys supported via `.env`.

---

## 3. Review & Remediation Guidelines
Technical debt items must be reviewed before transitioning the codebase from MVP to Production release.
