# Code Continuum AI — Master Specification

**Document Version**: 1.0  
**Status**: Baseline MVP Specification  
**Derived From**: 24 Primary Specification Documents in `docs/`  

---

## 1. Product Overview & Purpose
**Code Continuum AI** is an AI-powered software engineering continuity, code understanding, quality engineering, documentation, and knowledge-preservation platform.

### Core Problem Solved
When key developers leave or transition off a project, organizations lose undocumented architectural context, implicit business logic, and operational knowledge. Code Continuum AI analyzes repositories to capture architectural relationships, extract business logic, detect risks, generate test suites, create documentation, and calculate project continuity scores.

### Target Audience & Demo Scenario
Designed for engineering managers, software architects, QA engineers, and developers. The immediate goal is a **demonstrable MVP** suitable for a software engineering interview showcase.

---

## 2. Primary MVP User Journey
```
User -> Register / Login -> Create Project -> Import Repository (GitHub URL / ZIP) 
     -> Trigger Static & AI Analysis -> Explore Code & Dependency Architecture 
     -> Ask AI Questions (RAG with file citations) -> Generate Test Scenarios 
     -> Generate Documentation -> Generate Project Continuity Report
```

---

## 3. Core Functional Capabilities (MVP Scope)

### Module 1: Project & Repository Management
- Create, list, view, and delete projects.
- Ingest repositories via GitHub URL or ZIP upload.
- Validate repository structure, filter `.git`, `node_modules`, binary files, and enforce size limits.

### Module 2: Code Analysis Engine (Deterministic + AI)
- Deterministic extraction: languages, frameworks, dependencies, files, AST symbols (classes, functions, methods, imports, routes, database models).
- Supported languages priority: Python, JavaScript, TypeScript, Java.
- AI interpretation: module summary, architectural intent, risk identification.

### Module 3: AI Assistant & Grounded RAG
- Grounded Q&A over ingested codebase.
- RAG Pipeline: Code Extraction -> Logical Chunking -> Vector Embeddings -> pgvector Similarity Search -> Grounded Prompting -> Citations.
- Prevents cross-project context mixing by tagging every chunk with `project_id`.

### Module 4: Quality Engineering & Test Generation
- Given function, API route, or module context, generate multi-category test candidates:
  - Positive / Happy path cases
  - Negative / Error cases
  - Edge & Boundary cases
  - Security & Input validation cases
- Outputs structured test objects with Test ID, Category, Inputs, Expected Results, and Rationale.

### Module 5: Automated Documentation Generation
- Produces Project Overview, Architecture Breakdown, Module Docs, API Specification, and Onboarding Guides.
- Distinguishes explicitly between `OBSERVED`, `INFERRED`, and `UNKNOWN`.

### Module 6: Software Continuity Report
- Calculates heuristic **Continuity Score (0-100)** based on documentation coverage, test density, knowledge concentration, and architectural complexity.
- Highlights high-risk modules, single points of knowledge failure, and missing documentation.

### Module 7: Experimental AI Authorship Analysis
- Identifies AI assistance indicators (e.g. uniform comment styles, repeated boilerplate patterns) with explicit probabilistic warnings.

---

## 4. System & Data Architecture

### Modular Monolith Layout
```
code-continuum-ai/
├── apps/
│   └── web/            # React + TypeScript + Vite + Tailwind CSS
├── services/
│   ├── api/            # FastAPI REST API
│   ├── analyzer/       # Code parser & AST graph extractor
│   ├── worker/         # Background processing worker tasks
│   └── rag/            # Vector indexing & RAG retrieval engine
├── packages/           # Shared logging, security, evaluation types
├── agents/             # Modular AI agents (Analysis, QE, Docs, Continuity)
├── docs/               # 24 authoritative specification documents
└── tests/              # End-to-end integration & evaluation tests
```

### Relational Database Schema (PostgreSQL / SQLite Fallback)
Key entities:
- `organizations` (id, name, slug, plan, status, created_at)
- `users` (id, email, password_hash, display_name, status, created_at)
- `projects` (id, organization_id, name, primary_language, continuity_score, health_score, status)
- `repositories` (id, project_id, provider, url, default_branch, sync_status)
- `source_files` (id, repository_id, path, filename, extension, language, size_bytes)
- `code_symbols` (id, source_file_id, symbol_type, name, start_line, end_line, signature)
- `test_scenarios` (id, project_id, title, category, priority, input_data, expected_result)
- `documentation_records` (id, project_id, doc_type, content, status)
- `continuity_reports` (id, project_id, score, summary, risk_level, generated_at)

---

## 5. Security & Prompt Injection Defense
- Passwords hashed with Argon2id or bcrypt.
- JWT-based authentication (`Bearer` tokens).
- Repository files treated strictly as **untrusted data**.
- System prompts explicitly enforce separation between System Instructions, User Commands, and Retrieved Source Context to resist prompt injection.

---

## 6. AI Evaluation & Governance Framework
- Benchmark dataset (`evaluation/`) evaluating RAG retrieval precision/recall, context grounding, hallucination rate, and test scenario quality.
