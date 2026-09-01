# Code Continuum AI

> **An AI-Powered Software Engineering Continuity, Code Understanding, Quality Engineering, Documentation, and Knowledge-Preservation Platform.**

---

## 1. Overview

**Code Continuum AI** helps organizations understand, maintain, test, document, and continue software systems even when original developers or development teams are unavailable.

The platform analyzes software repositories to produce structured understanding across:
- System Architecture & Component Dependencies
- Source Code Structure & Symbols (AST)
- Business Logic & Business Rules
- Database Models & API Specifications
- Test Requirements & Quality Engineering Gaps
- Continuity Scores & Technical Risks

---

## 2. Quickstart & Local Setup

### Prerequisites
- **Python 3.11+**
- **Node.js 18+** & `npm`
- **Docker** & **Docker Compose** (Optional for local PostgreSQL + pgvector)

---

### Running the Backend Service (`services/api`)

1. Navigate to the backend directory:
   ```bash
   cd services/api
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

5. Verify healthcheck in your browser or curl:
   ```bash
   curl http://localhost:8000/api/v1/health
   ```
   Open API documentation available at: `http://localhost:8000/api/v1/docs`

---

### Running the Frontend Dashboard (`apps/web`)

1. Navigate to the web application directory:
   ```bash
   cd apps/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser. The dashboard will automatically ping `http://localhost:8000/api/v1/health` and display real-time connection status.

---

### Running via Docker Compose

To start the complete multi-container stack (FastAPI Backend, React Frontend, PostgreSQL with `pgvector`, Redis):
```bash
docker-compose up -d
```

---

## 3. Running Automated Tests

Run backend Pytest suite:
```bash
pytest services/api/tests
```

---

## 4. Operational & Governance Documentation

This repository follows strict AI agent governance and documentation protocols:
- `docs/`: 24 authoritative product, architectural, security, and testing specifications.
- `AGENTS.md`: Mandatory AI agent coding rules, governance, and security guidelines.
- `CLAUDE.md`: Quick instructions for Claude Code and AI coding tools.
- `MASTER_SPECIFICATION.md`: Condensed product baseline summary.
- `CURRENT_TASK.md`: Detailed specification for active work phase.
- `PROGRESS.md`: Phase status tracking board.
- `CHANGELOG.md`: Versioned change log.
- `TECHNICAL_DEBT.md`: Explicit registry of MVP tradeoffs.
- `AI_HANDOFF_PROTOCOL.md`: Protocol for seamless AI agent transitions.
