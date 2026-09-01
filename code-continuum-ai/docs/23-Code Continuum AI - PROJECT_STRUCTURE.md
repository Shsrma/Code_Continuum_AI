CODE CONTINUUM AI

23 — Project Structure

Field

Details

Document

23_PROJECT_STRUCTURE.md

Project

Code Continuum AI

Version

1.0

Status

Approved for MVP Development

Document Type

Repository Structure / Engineering Organization

Audience

Software Engineers, AI Engineers, QE Engineers, DevOps Engineers, AI Coding Agents

# Code Continuum AI
# 23 — Project Structure

**Document:** 23_PROJECT_STRUCTURE.md
**Project:** Code Continuum AI
**Version:** 1.0
**Status:** Approved for MVP Development
**Document Type:** Repository Structure / Engineering Organization
**Audience:** Software Engineers, AI Engineers, QE Engineers, DevOps Engineers, AI Coding Agents

---

# 1. Purpose

This document defines the standard repository structure for Code Continuum AI.

The structure is designed for:

- Maintainability
- Scalability
- Clear separation of responsibilities
- AI-assisted development
- Automated testing
- Security
- RAG and AI workflows
- Agent orchestration
- Future team collaboration
- Easy onboarding of new developers
- Long-term project continuity

The structure must be treated as an architectural constraint.

AI coding agents must not arbitrarily reorganize the repository.

Any structural change should be justified and documented.

---

# 2. Repository Architecture

The project will use a modular monorepo structure.

```text
code-continuum-ai/
│
├── apps/
├── services/
├── packages/
├── agents/
├── infrastructure/
├── docs/
├── scripts/
├── tests/
├── data/
├── config/
├── .github/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── README.md
├── LICENSE
│
├── AGENTS.md
├── CLAUDE.md
├── MASTER_SPECIFICATION.md
├── CURRENT_TASK.md
├── PROGRESS.md
├── CHANGELOG.md
├── TECHNICAL_DEBT.md
└── AI_HANDOFF_PROTOCOL.md

3. Top-Level Directory Responsibilities

DirectoryResponsibility



apps/

User-facing applications

services/

Backend and processing services

packages/

Shared libraries and utilities

agents/

AI agent implementations

infrastructure/

Docker, deployment and infrastructure

docs/

Product and technical documentation

scripts/

Developer and automation scripts

tests/

Cross-system tests

data/

Local development/test data

config/

Configuration templates

.github/

CI/CD workflows

Root files

Project-wide configuration and AI instructions

4. Complete MVP Structure

The recommended MVP structure is:

code-continuum-ai/
│
├── apps/
│   │
│   └── web/
│       ├── public/
│       │
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── features/
│       │   ├── hooks/
│       │   ├── layouts/
│       │   ├── lib/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── stores/
│       │   ├── types/
│       │   └── utils/
│       │
│       ├── tests/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── README.md
│
├── services/
│   │
│   ├── api/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── core/
│   │   │   ├── db/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── main.py
│   │   │
│   │   ├── tests/
│   │   ├── alembic/
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   └── README.md
│   │
│   ├── analyzer/
│   │   ├── src/
│   │   │   ├── parsers/
│   │   │   ├── analyzers/
│   │   │   ├── extractors/
│   │   │   ├── graphs/
│   │   │   ├── models/
│   │   │   └── pipeline/
│   │   ├── tests/
│   │   └── README.md
│   │
│   ├── worker/
│   │   ├── src/
│   │   │   ├── jobs/
│   │   │   ├── queues/
│   │   │   ├── tasks/
│   │   │   └── worker.py
│   │   ├── tests/
│   │   └── README.md
│   │
│   └── rag/
│       ├── src/
│       │   ├── ingestion/
│       │   ├── chunking/
│       │   ├── embeddings/
│       │   ├── retrieval/
│       │   ├── reranking/
│       │   ├── context/
│       │   └── pipeline/
│       ├── tests/
│       └── README.md
│
├── packages/
│   │
│   ├── shared-types/
│   ├── shared-config/
│   ├── logging/
│   ├── security/
│   └── evaluation/
│
├── agents/
│   │
│   ├── base/
│   │   ├── agent.py
│   │   ├── state.py
│   │   ├── tools.py
│   │   └── prompts/
│   │
│   ├── analysis/
│   │   ├── architecture_agent.py
│   │   ├── business_logic_agent.py
│   │   └── code_explanation_agent.py
│   │
│   ├── qe/
│   │   ├── test_generation_agent.py
│   │   ├── edge_case_agent.py
│   │   └── test_review_agent.py
│   │
│   ├── documentation/
│   │   ├── documentation_agent.py
│   │   └── onboarding_agent.py
│   │
│   ├── continuity/
│   │   ├── continuity_agent.py
│   │   ├── knowledge_gap_agent.py
│   │   └── risk_agent.py
│   │
│   └── prompts/
│       ├── system/
│       ├── analysis/
│       ├── qe/
│       ├── documentation/
│       └── continuity/
│
├── infrastructure/
│   ├── docker/
│   ├── deployment/
│   ├── monitoring/
│   └── scripts/
│
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── ai/
│   ├── security/
│   ├── testing/
│   ├── operations/
│   └── decisions/
│
├── scripts/
│   ├── setup/
│   ├── development/
│   ├── testing/
│   ├── database/
│   └── deployment/
│
├── tests/
│   ├── integration/
│   ├── e2e/
│   ├── security/
│   ├── ai/
│   ├── rag/
│   └── fixtures/
│
├── data/
│   ├── sample/
│   ├── fixtures/
│   └── .gitkeep
│
├── config/
│   ├── development/
│   ├── testing/
│   └── production/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── security.yml
│       └── deploy.yml
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── README.md
├── LICENSE
│
├── AGENTS.md
├── CLAUDE.md
├── MASTER_SPECIFICATION.md
├── CURRENT_TASK.md
├── PROGRESS.md
├── CHANGELOG.md
├── TECHNICAL_DEBT.md
└── AI_HANDOFF_PROTOCOL.md

5. Frontend Structure

The frontend is located at:

apps/web/

It will use:

React
TypeScript
Vite
Tailwind CSS

6. Frontend src Structure

apps/web/src/

├── app/
├── components/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── services/
├── stores/
├── types/
└── utils/

7. app/

Responsible for application initialization.

app/
├── App.tsx
├── router.tsx
├── providers.tsx
└── config.ts

Responsibilities:

Application initialization

Routing

Global providers

Global configuration

8. components/

Contains reusable UI components.

Example:

components/

├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Spinner.tsx
│
├── navigation/
│   ├── Navbar.tsx
│   └── Sidebar.tsx
│
└── feedback/
    ├── ErrorState.tsx
    ├── EmptyState.tsx
    └── LoadingState.tsx

Components should remain reusable.

Business logic should not be placed inside generic UI components.

9. features/

Feature-specific frontend code belongs here.

Example:

features/

├── auth/
├── projects/
├── repositories/
├── analysis/
├── chat/
├── testing/
├── documentation/
└── continuity/

Each feature may contain:

feature/
├── components/
├── hooks/
├── services/
├── types.ts
└── index.ts

10. Backend Structure

Backend code is located under:

services/api/

The backend uses:

FastAPI
SQLAlchemy
Alembic
PostgreSQL
Redis

11. Backend app Structure

services/api/app/

├── api/
├── core/
├── db/
├── middleware/
├── models/
├── repositories/
├── schemas/
├── services/
├── utils/
└── main.py

12. api/

API routes.

api/
├── v1/
│   ├── auth.py
│   ├── users.py
│   ├── projects.py
│   ├── repositories.py
│   ├── analysis.py
│   ├── chat.py
│   ├── tests.py
│   ├── documentation.py
│   └── continuity.py
│
└── router.py

Routes should:

Validate requests

Authenticate requests

Call services

Return responses

Routes should not contain large business logic.

13. core/

Core application configuration.

core/
├── config.py
├── security.py
├── logging.py
├── exceptions.py
└── constants.py

14. db/

Database infrastructure.

db/
├── session.py
├── base.py
└── initialization.py

Responsibilities:

Database connection

Sessions

Transaction management

Model registration

15. models/

Database models.

Example:

models/

├── user.py
├── project.py
├── repository.py
├── analysis.py
├── code_file.py
├── code_symbol.py
├── embedding.py
├── test_scenario.py
├── documentation.py
├── agent_execution.py
├── evaluation.py
└── audit_log.py

Models represent persistent application data.

16. schemas/

Pydantic request and response schemas.

Example:

schemas/

├── auth.py
├── user.py
├── project.py
├── repository.py
├── analysis.py
├── chat.py
├── testing.py
├── documentation.py
└── continuity.py

Database models and API schemas must remain separate.

17. repositories/

Database access layer.

Example:

repositories/

├── user_repository.py
├── project_repository.py
├── repository_repository.py
├── analysis_repository.py
└── evaluation_repository.py

Responsibilities:

Database queries

Persistence

Retrieval

Transactions

18. services/

Business logic.

Example:

services/

├── auth_service.py
├── project_service.py
├── repository_service.py
├── analysis_service.py
├── ai_service.py
├── testing_service.py
├── documentation_service.py
└── continuity_service.py

Business logic should primarily live here.

19. Code Analyzer Structure

The analyzer is responsible for understanding source code.

services/analyzer/

├── src/
│   ├── parsers/
│   ├── analyzers/
│   ├── extractors/
│   ├── graphs/
│   ├── models/
│   └── pipeline/
│
└── tests/

20. Parsers

parsers/
├── python_parser.py
├── javascript_parser.py
├── typescript_parser.py
├── java_parser.py
└── parser_factory.py

The parser layer converts source code into structured representations.

21. Extractors

extractors/
├── symbol_extractor.py
├── dependency_extractor.py
├── api_extractor.py
├── model_extractor.py
└── metadata_extractor.py

22. Graphs

The graph system represents relationships.

graphs/
├── dependency_graph.py
├── call_graph.py
├── module_graph.py
└── graph_builder.py

23. Analysis Pipeline

pipeline/
├── ingestion.py
├── parsing.py
├── extraction.py
├── graph_generation.py
├── knowledge_generation.py
└── pipeline.py

The complete pipeline:

Repository
 ↓
Files
 ↓
Parser
 ↓
AST
 ↓
Symbols
 ↓
Dependencies
 ↓
Graphs
 ↓
Knowledge

24. RAG Structure

RAG code lives under:

services/rag/

Structure:

rag/

├── ingestion/
├── chunking/
├── embeddings/
├── retrieval/
├── reranking/
├── context/
└── pipeline/

25. RAG Ingestion

Responsible for converting repository knowledge into retrievable information.

ingestion/
├── document_loader.py
├── code_loader.py
└── metadata_builder.py

26. Chunking

chunking/
├── code_chunker.py
├── document_chunker.py
└── chunk_metadata.py

Code should preferably be chunked based on logical structures such as:

Class
Function
Module
Configuration
Documentation section

rather than blindly splitting every N characters.

27. Embeddings

embeddings/
├── embedding_provider.py
├── embedding_service.py
└── embedding_cache.py

The provider should be abstracted.

This allows the project to switch AI providers later.

28. Retrieval

retrieval/
├── vector_search.py
├── keyword_search.py
├── hybrid_search.py
└── retrieval_service.py

The MVP may initially use vector retrieval.

Hybrid retrieval can be added later.

29. Agents Structure

AI agents live under:

agents/

Agents must be modular.

30. Base Agent

agents/base/

├── agent.py
├── state.py
├── tools.py
└── prompts/

The base agent defines common behavior.

Possible interface:

Agent
├── initialize()
├── plan()
├── execute()
├── validate()
└── finalize()

31. Analysis Agents

agents/analysis/

├── architecture_agent.py
├── business_logic_agent.py
└── code_explanation_agent.py

Responsibilities:

Architecture explanation

Business logic identification

Code explanation

32. QE Agents

agents/qe/

├── test_generation_agent.py
├── edge_case_agent.py
└── test_review_agent.py

Responsibilities:

Generate tests

Identify edge cases

Review generated tests

33. Documentation Agents

agents/documentation/

├── documentation_agent.py
└── onboarding_agent.py

Responsibilities:

Documentation generation

Developer onboarding information

34. Continuity Agents

agents/continuity/

├── continuity_agent.py
├── knowledge_gap_agent.py
└── risk_agent.py

Responsibilities:

Generate continuity reports

Detect missing knowledge

Identify risks

35. Prompt Structure

Prompts must be version-controlled.

agents/prompts/

├── system/
├── analysis/
├── qe/
├── documentation/
└── continuity/

Example:

agents/prompts/qe/

├── test_generation_v1.txt
├── edge_case_v1.txt
└── test_review_v1.txt

Never hide important production prompts inside random source files.

36. Worker Structure

Long-running operations should be processed asynchronously.

services/worker/

├── src/
│   ├── jobs/
│   ├── queues/
│   ├── tasks/
│   └── worker.py
│
└── tests/

Example jobs:

repository_analysis
embedding_generation
documentation_generation
test_generation
continuity_report

37. Shared Packages

Shared functionality belongs in:

packages/

Examples:

packages/

├── shared-types/
├── shared-config/
├── logging/
├── security/
└── evaluation/

Only genuinely shared code belongs here.

Do not create shared packages simply to move code somewhere else.

38. Infrastructure

Infrastructure belongs under:

infrastructure/

Structure:

infrastructure/

├── docker/
├── deployment/
├── monitoring/
└── scripts/

39. Docker

infrastructure/docker/

├── backend.Dockerfile
├── frontend.Dockerfile
├── worker.Dockerfile
└── analyzer.Dockerfile

The root:

docker-compose.yml

will be used for local development.

40. Deployment

infrastructure/deployment/

├── development/
├── staging/
└── production/

The MVP may initially have only:

development/
production/

41. Documentation Structure

All project documentation belongs under:

docs/

Recommended:

docs/

├── requirements/
├── architecture/
├── ai/
├── security/
├── testing/
├── operations/
└── decisions/

42. Requirements Documentation

Move the requirements documents into:

docs/requirements/

Example:

docs/requirements/

01_PRODUCT_REQUIREMENTS.md
02_FUNCTIONAL_REQUIREMENTS.md
03_NON_FUNCTIONAL_REQUIREMENTS.md
04_USER_PERSONAS.md
05_USER_STORIES.md
06_USE_CASES.md
07_BUSINESS_LOGIC.md
08_ACCEPTANCE_CRITERIA.md

43. Architecture Documentation

docs/architecture/

09_SYSTEM_ARCHITECTURE.md
10_COMPONENT_ARCHITECTURE.md
11_DATA_ARCHITECTURE.md
12_DATABASE_DESIGN.md
13_API_SPECIFICATION.md
14_SECURITY_ARCHITECTURE.md

44. AI Documentation

docs/ai/

15_AI_ARCHITECTURE.md
16_AGENT_ARCHITECTURE.md
17_RAG_ARCHITECTURE.md
18_AI_EVALUATION.md
19_AI_GOVERNANCE.md

Additional future documents:

AI_PROMPT_STRATEGY.md
AI_PROVIDER_STRATEGY.md
AI_COST_MANAGEMENT.md
AI_FAILURE_HANDLING.md

45. Testing Documentation

docs/testing/

21_TESTING_STRATEGY.md

Future:

TEST_PLAN.md
AI_TEST_PLAN.md
RAG_EVALUATION_PLAN.md
SECURITY_TEST_PLAN.md
PERFORMANCE_TEST_PLAN.md

46. Operations Documentation

Future documents:

docs/operations/

DEPLOYMENT.md
MONITORING.md
TROUBLESHOOTING.md
BACKUP_AND_RECOVERY.md
INCIDENT_RESPONSE.md

47. Architecture Decision Records

Important architectural decisions must be recorded.

docs/decisions/

ADR-001-monorepo.md
ADR-002-postgresql.md
ADR-003-fastapi.md
ADR-004-rag-architecture.md
ADR-005-agent-architecture.md

Each ADR should contain:

Context
Decision
Alternatives
Reason
Consequences

48. Tests Structure

Testing is distributed by responsibility.

tests/

├── integration/
├── e2e/
├── security/
├── ai/
├── rag/
└── fixtures/

Unit tests should remain close to the code they test.

For example:

services/api/tests/
services/analyzer/tests/
services/rag/tests/
agents/*/tests/

49. Integration Tests

Integration tests validate multiple components.

Example:

API
 ↓
Service
 ↓
Database

or:

Repository
 ↓
Analyzer
 ↓
Database

50. E2E Tests

End-to-end tests validate complete user workflows.

Example:

Login
 ↓
Create Project
 ↓
Import Repository
 ↓
Analyze
 ↓
Ask Question
 ↓
Generate Tests
 ↓
Generate Documentation

51. AI Tests

AI tests should validate:

Correctness
Grounding
Hallucination
Consistency
Structured Output
Safety

Example:

tests/ai/

├── test_architecture_agent.py
├── test_qe_agent.py
├── test_documentation_agent.py
└── test_continuity_agent.py

52. RAG Tests

tests/rag/

├── test_chunking.py
├── test_retrieval.py
├── test_ranking.py
├── test_grounding.py
└── test_context.py

53. Security Tests

tests/security/

├── test_authentication.py
├── test_authorization.py
├── test_upload_security.py
├── test_prompt_injection.py
├── test_ssrf.py
└── test_rate_limiting.py

54. Data Structure

Local development data:

data/

├── sample/
├── fixtures/
└── .gitkeep

Never commit:

.env
real credentials
private repositories
production data
personal information
API keys
access tokens

55. Environment Configuration

The root should contain:

.env.example

Example:

DATABASE_URL=
REDIS_URL=

JWT_SECRET=

AI_PROVIDER=
AI_API_KEY=

EMBEDDING_PROVIDER=
EMBEDDING_API_KEY=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

Real values must never be committed.

56. GitHub Actions

.github/workflows/

├── ci.yml
├── security.yml
└── deploy.yml

CI should run:

Install
 ↓
Lint
 ↓
Type Check
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Build

57. Root-Level AI Control Files

The following files are extremely important because multiple AI coding tools will work on this project.

AGENTS.md
CLAUDE.md
MASTER_SPECIFICATION.md
CURRENT_TASK.md
PROGRESS.md
CHANGELOG.md
TECHNICAL_DEBT.md
AI_HANDOFF_PROTOCOL.md

These files should be treated as project control documents.

58. MASTER_SPECIFICATION.md

Contains the consolidated project specification.

It should reference:

Product Requirements
Functional Requirements
Architecture
Database
API
Security
AI
Agents
RAG
Testing
Governance
Roadmap

This becomes the primary context document for AI coding agents.

59. AGENTS.md

Defines rules for AI coding agents.

Examples:

Read documentation before coding.

Do not change architecture without approval.

Do not delete tests.

Do not disable failing tests to make CI pass.

Do not expose secrets.

Do not invent APIs.

Do not modify unrelated files.

Run tests after implementation.

Update PROGRESS.md.

60. CLAUDE.md

Contains Claude-specific project instructions.

Claude Code should read this before implementing tasks.

It should reference:

MASTER_SPECIFICATION.md
AGENTS.md
CURRENT_TASK.md
PROGRESS.md

61. CURRENT_TASK.md

Contains exactly what the AI agent should work on now.

Example:

# Current Task

Implement Project CRUD API.

Requirements:
- Follow 02_FUNCTIONAL_REQUIREMENTS.md
- Follow 12_DATABASE_DESIGN.md
- Follow 13_API_SPECIFICATION.md

Do not:
- Modify authentication
- Modify frontend
- Add new dependencies unless required

Required:
- Implementation
- Unit tests
- API tests
- Documentation update

This prevents AI agents from attempting to build the entire project at once.

62. PROGRESS.md

Tracks completed work.

Example:

Phase 1 — Foundation
[ x ] Backend
[ x ] Frontend
[ x ] Docker
[ x ] CI

Phase 2 — Authentication
[ x ] User model
[ x ] Registration
[ x ] Login
[ ] Refresh tokens

Phase 3 — Repository
[ ] GitHub ingestion
[ ] ZIP ingestion
[ ] File filtering

63. CHANGELOG.md

Every significant release or feature should be recorded.

Example:

## 0.2.0

Added:
- Project management
- Repository ingestion

Changed:
- Improved authentication

Fixed:
- Token refresh issue

64. TECHNICAL_DEBT.md

Tracks known shortcuts.

AI agents must add technical debt rather than silently leaving incomplete implementations.

65. AI_HANDOFF_PROTOCOL.md

Defines how work is transferred between AI tools.

Example:

VS Code AI
    ↓
Update files
    ↓
Run tests
    ↓
Update CURRENT_TASK.md
    ↓
Update PROGRESS.md
    ↓
Commit
    ↓
Google Antigravity
    ↓
Continue

66. Naming Conventions

Python

Use:

snake_case

Example:

repository_service.py

Classes:

PascalCase

Example:

RepositoryService

67. TypeScript

Files:

PascalCase.tsx

for React components.

Example:

ProjectCard.tsx

Utilities:

camelCase.ts

68. API Naming

Use REST-style endpoints.

Example:

GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/{id}
PATCH  /api/v1/projects/{id}
DELETE /api/v1/projects/{id}

69. Import Rules

Avoid circular dependencies.

Preferred dependency direction:

API
 ↓
Service
 ↓
Repository
 ↓
Database

Not:

Database
 ↓
API

or:

Service
 ↔
API

70. AI Dependency Rules

AI-specific code must not be tightly coupled to one provider.

Bad:

application
    ↓
OpenAI SDK directly

Preferred:

Application
    ↓
AI Service
    ↓
Provider Interface
    ↓
OpenAI / Anthropic / Gemini / Local Model

This allows providers to be changed later.

71. Agent Dependency Rules

Agents should not directly manipulate the database unless explicitly required.

Preferred:

Agent
 ↓
Tool
 ↓
Service
 ↓
Repository
 ↓
Database

This creates controlled boundaries.

72. Repository Ingestion Security Rule

Imported source code is untrusted input.

Therefore:

Repository
≠
Trusted Code

The system must never automatically execute arbitrary repository code without an isolated sandbox.

This is especially important for:

Tests

Build scripts

Package installation

Setup scripts

Shell commands

73. Secrets Rule

Never store:

API keys
JWT secrets
Passwords
Database credentials
GitHub tokens
Cloud credentials

inside:

source code
documentation
prompts
tests
Git history

Use environment variables or a proper secret manager.

74. Generated Files

Generated artifacts should not clutter source directories.

Use:

generated/

or an object-storage/database-backed artifact system.

Examples:

generated/
├── reports/
├── documentation/
├── analysis/
└── test-plans/

For the MVP, generated files may be stored outside Git.

75. Logs

Application logs should not be committed.

Use:

logs/

locally if necessary.

Production logs should be handled by the deployment environment.

76. Temporary Files

Temporary processing files must use:

tmp/

and should be cleaned automatically.

Do not use repository directories for temporary AI processing.

77. Future Scaling Structure

When the project grows, additional services may be introduced:

services/

├── api/
├── analyzer/
├── worker/
├── rag/
├── agent-orchestrator/
├── execution-sandbox/
├── notification/
└── evaluation/

Do not create these services during the MVP unless required.

78. MVP vs Future Structure

MVP

web
api
analyzer
worker
rag
agents

Future

web
api-gateway
auth-service
project-service
repository-service
analysis-service
rag-service
agent-service
execution-service
evaluation-service
notification-service

The architecture should allow this evolution without requiring it now.

79. AI Agent Rules for Repository Structure

AI coding agents MUST:

Read AGENTS.md.

Read MASTER_SPECIFICATION.md.

Read CURRENT_TASK.md.

Inspect the existing implementation.

Follow the existing directory structure.

Avoid unnecessary file movement.

Avoid unnecessary dependencies.

Add tests.

Run relevant tests.

Update progress documentation.

80. AI Agent Prohibited Actions

AI agents must not:

Delete the repository
Delete tests
Rewrite unrelated modules
Replace the architecture without approval
Hard-code credentials
Disable security controls
Ignore failing tests
Silence errors
Modify package versions unnecessarily
Create duplicate implementations

81. Definition of Done for a New Module

A new module is complete only when:

Source Code
+
Tests
+
Documentation
+
Error Handling
+
Logging
+
Security Validation

are appropriately implemented.

82. Example Feature Structure

For a feature such as repository analysis:

features/analysis/

Frontend:

components/
hooks/
services/
types.ts

Backend:

api/
schemas/
services/
repositories/
models/

Analyzer:

parsers/
extractors/
pipeline/

AI:

agents/analysis/

RAG:

services/rag/

Tests:

tests/integration/
tests/ai/
tests/rag/

This separation keeps the feature understandable.

83. Documentation-to-Code Mapping

Every major requirement should map to implementation.

Example:

Requirement
    ↓
Functional Requirement
    ↓
Use Case
    ↓
API
    ↓
Service
    ↓
Database
    ↓
Test
    ↓
Acceptance Criteria

This traceability is important for Code Continuum AI itself because the product is intended to understand software systems and their requirements.

84. Traceability

Each major feature should have an identifier.

Example:

AUTH-001
PROJ-001
REPO-001
ANALYSIS-001
RAG-001
QE-001
DOC-001
CONT-001

These IDs can be referenced by:

Requirements
Issues
Tests
Pull Requests
Documentation
AI tasks

85. Git Branching

Recommended MVP strategy:

main
  │
  ├── develop
  │
  ├── feature/auth
  ├── feature/repository-analysis
  ├── feature/rag
  └── feature/qe-agent

For a solo developer, a simpler approach is acceptable:

main
 ↓
feature/*

Avoid unnecessary Git complexity.

86. Commit Convention

Use meaningful commits.

Examples:

feat: add project CRUD API
feat: add repository ingestion
feat: add code symbol extraction
feat: add RAG retrieval

fix: resolve authentication token issue

test: add repository ingestion tests

docs: update architecture documentation

refactor: separate AI provider interface

87. Final Repository Structure

The final conceptual architecture is:

                    Code Continuum AI
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       Frontend          Backend           AI
          │                │                │
       React            FastAPI          Agents
          │                │                │
          │          ┌─────┴─────┐      ┌───┴───┐
          │          │           │      │       │
          │       Analyzer      RAG    QE   Continuity
          │          │           │
          │          └─────┬─────┘
          │                │
          └──────────── Database ────────────┐
                           │                 │
                       PostgreSQL          Redis

88. Final Principle

The project structure must support the central purpose of Code Continuum AI:

A software project should remain understandable and maintainable even when the people who originally built it are no longer available.

Therefore, the repository itself must demonstrate:

Clear Structure
+
Clear Responsibilities
+
Traceable Architecture
+
Testable Components
+
Documented Decisions
+
AI-Friendly Context
+
Human-Friendly Organization

The repository should not merely contain code.

It should contain enough structured information for another developer—or another AI coding agent—to understand:

WHAT the system does
WHY it exists
WHERE functionality lives
HOW components interact
HOW to test it
HOW to deploy it
WHAT is known
WHAT is unknown
WHAT remains unfinished

That principle is the foundation of Code Continuum AI.


### Next document

The next logical document is:

**`24_DEVELOPMENT_WORKFLOW.md`**

This one is especially important for your setup because you're planning to work sequentially