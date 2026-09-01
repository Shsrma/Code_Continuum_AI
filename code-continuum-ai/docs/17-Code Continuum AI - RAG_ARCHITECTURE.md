Code Continuum AI
Retrieval-Augmented Generation (RAG) Architecture
Project: Code Continuum AI
 Tagline: An AI-powered platform for continuing your software legacy.
 Document ID: CC-RAG-001
 Version: 1.0
 Status: Baseline
 Document Type: Retrieval-Augmented Generation Architecture

Document Control
Field
Value
Project Name
Code Continuum AI
Document ID
CC-RAG-001
Version
1.0
Status
Baseline
Architecture Layer
AI / RAG
Primary Purpose
Project knowledge retrieval and evidence grounding

Related Documents
01_PRODUCT_REQUIREMENTS.md
02_FUNCTIONAL_REQUIREMENTS.md
03_NON_FUNCTIONAL_REQUIREMENTS.md
04_USER_PERSONAS.md
05_USER_STORIES.md
06_USE_CASES.md
07_BUSINESS_LOGIC.md
08_ACCEPTANCE_CRITERIA.md
09_SYSTEM_ARCHITECTURE.md
10_COMPONENT_ARCHITECTURE.md
11_DATA_ARCHITECTURE.md
12_DATABASE_DESIGN.md
13_API_SPECIFICATION.md
14_SECURITY_ARCHITECTURE.md
15_AI_ARCHITECTURE.md
16_AGENT_ARCHITECTURE.md
18_AI_EVALUATION.md
19_AI_GOVERNANCE.md

Table of Contents
Purpose
RAG Objectives
Why RAG Is Required
RAG Design Principles
RAG Architecture Overview
Knowledge Sources
Source Classification
Repository Ingestion
Source Code Ingestion
Documentation Ingestion
Git History Ingestion
Configuration Ingestion
Database Schema Ingestion
API Ingestion
Business Knowledge Ingestion
Test Ingestion
Infrastructure Ingestion
Knowledge Extraction
Document Processing Pipeline
File Filtering
Language Detection
Code Parsing
AST-Based Processing
Semantic Chunking
Chunking Strategy
Code Chunk Metadata
Documentation Chunk Metadata
Git Commit Metadata
Embeddings
Embedding Strategy
Vector Database
Metadata Database
Knowledge Graph
Hybrid Retrieval
Keyword Search
Vector Search
Graph Search
Metadata Filtering
Query Understanding
Query Classification
Query Expansion
Retrieval Pipeline
Candidate Generation
Reranking
Context Assembly
Evidence Selection
Context Window Management
Citation and Provenance
Confidence Scoring
Agent Integration
Agent-Specific Retrieval
Code Search
Architecture Search
Business Logic Search
Historical Search
Dependency Search
Security Search
Test Search
Knowledge Freshness
Incremental Indexing
Change Detection
Stale Knowledge Detection
Knowledge Versioning
RAG Cache
Query Cache
Retrieval Cache
Security and Access Control
Secret Handling
Repository Isolation
Prompt Injection Protection
Retrieval Safety
Hallucination Prevention
Failure Handling
Retrieval Fallbacks
RAG Observability
RAG Audit Logging
RAG Evaluation
Retrieval Metrics
Generation Metrics
Quality Gates
Performance Requirements
Cost Management
Scalability
Disaster Recovery
Data Retention
Privacy
Example Query
Example Knowledge Flow
Example Change Analysis
Production Architecture
Future Enhancements
Final Architecture

1. Purpose
The purpose of this document is to define the Retrieval-Augmented Generation (RAG) architecture for Code Continuum AI.
Code Continuum AI must analyze large software repositories containing:
Source code
Documentation
Configuration
Tests
Git history
API specifications
Database schemas
Architecture decisions
Business rules
Infrastructure
Deployment information
Engineering notes
An AI model cannot reliably process an entire software system within a single context window.
Therefore, Code Continuum AI uses RAG to retrieve the most relevant and trustworthy project knowledge before an agent generates an answer or makes a decision.
Core Principle
The AI should answer from the project's evidence, not from assumptions about the project.

2. RAG Objectives
The RAG system shall:
Index project knowledge.
Preserve relationships between code and documentation.
Retrieve relevant information for AI agents.
Support semantic and exact code search.
Support historical Git analysis.
Preserve evidence and provenance.
Detect stale information.
Respect project permissions.
Reduce hallucinations.
Provide citations for important claims.
Support multiple repositories and projects.
Support incremental updates.
Work with large codebases.
Provide context appropriate to each agent.

3. Why RAG Is Required
Consider a repository containing:
500,000+ lines of code
2,000+ files
100+ dependencies
500+ commits
300+ tests
100+ documentation files
Sending the entire repository to an AI model would be:
Expensive
Slow
Impractical
Noisy
Difficult to maintain
Instead, Code Continuum AI uses targeted retrieval.
                   User Question
                          │
                          ▼
                ┌──────────────────┐
                │ Understand Query │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Search Knowledge │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Retrieve Evidence│
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │  Rank Evidence   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Build Context    │
                └────────┬─────────┘
                         │
                         ▼
                    AI Agent
                         │
                         ▼
                 Verified Answer

4. RAG Design Principles
4.1 Evidence First
Retrieved project evidence takes priority over model assumptions.
4.2 Source Awareness
Every knowledge item must have an identifiable source.
4.3 Provenance
The system must be able to determine:
Where did this information come from?
When was it indexed?
Which version was indexed?
Which file contains it?
Which commit contains it?
4.4 Freshness
Changed code should eventually result in updated knowledge.
4.5 Least Privilege
Users and agents may retrieve only information they are authorized to access.
4.6 Hybrid Retrieval
Code search must not depend exclusively on vector similarity.
4.7 Verification
Important claims should be verified against source evidence.

5. RAG Architecture Overview
5.1 Query / Retrieval Architecture
                        USER / AGENT
                              │
                              ▼
                    ┌──────────────────┐
                    │ Query Processor  │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
       Vector Search    Keyword Search   Graph Search
             │               │               │
             └───────────────┼───────────────┘
                             │
                             ▼
                      Candidate Results
                             │
                             ▼
                         Reranker
                             │
                             ▼
                    Evidence Selection
                             │
                             ▼
                     Context Assembler
                             │
                             ▼
                      AI Agent / LLM
                             │
                             ▼
                    Verified Response
5.2 Knowledge Ingestion Architecture
                        Repository
                              │
                              ▼
                     ┌────────────────┐
                     │Ingestion Engine│
                     └───────┬────────┘
                             │
                             ▼
                          Parser
                             │
                             ▼
                          Chunker
                             │
                             ▼
                     Metadata Extractor
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
             Embeddings          Knowledge Graph
                  │                     │
                  ▼                     ▼
              Vector DB              Graph DB
                  │
                  ▼
             Metadata Store

6. Knowledge Sources
Code Continuum AI may ingest:
Source Code
Documentation
README files
Git History
Commit Messages
Pull Requests
Issues
API Specifications
Database Schemas
Tests
Configuration
Infrastructure
CI/CD Pipelines
Architecture Decisions
Business Rules
Engineering Notes
Deployment Documentation

7. Source Classification
Each source must be classified.
SOURCE_CODE
DOCUMENTATION
TEST
CONFIGURATION
GIT_COMMIT
GIT_BRANCH
API_SPECIFICATION
DATABASE_SCHEMA
INFRASTRUCTURE
BUSINESS_RULE
ARCHITECTURE_DECISION
Classification affects retrieval priority.
For example:
Question:
What does the API actually do?
Potential priority:
API Implementation
       ↓
API Tests
       ↓
API Specification
       ↓
Documentation
The exact priority can depend on the query type.

8. Repository Ingestion
The ingestion engine begins by analyzing the repository.
Repository
    │
    ▼
Detect Project Type
    │
    ▼
Detect Languages
    │
    ▼
Detect Frameworks
    │
    ▼
Detect Build System
    │
    ▼
Detect Tests
    │
    ▼
Detect Configuration
    │
    ▼
Begin Indexing
The ingestion process must not assume a particular programming language.

9. Source Code Ingestion
Source code should be parsed rather than treated exclusively as plain text.
Example:
public User getUserById(String id) {
    return repository.findById(id);
}
The system should identify:
Language:
Java

Class:
UserService

Method:
getUserById

Parameter:
id

Return Type:
User

Dependency:
UserRepository
This provides better retrieval capabilities than simple text chunking.

10. Documentation Ingestion
Supported documentation may include:
README.md
Markdown
PDF
DOCX
HTML
TXT
Architecture documents
API documentation
Documentation should preserve:
Title
Heading
Section
Paragraph
List
Table
Code block
Source location

11. Git History Ingestion
Git history is important because Code Continuum AI is designed to preserve engineering knowledge.
The system may index:
Commit messages
Authors
Dates
Changed files
Diffs
Branches
Tags
Pull requests
Merge relationships
Example:
Commit:
a82f12c

Message:
Fix payment retry behavior

Files:
PaymentService.ts

Reason:
Prevent duplicate transactions
This allows the system to answer questions such as:
Why was this code written this way?

12. Configuration Ingestion
The system may analyze:
.env.example
package.json
pom.xml
requirements.txt
Dockerfile
docker-compose.yml
application.yml
tsconfig.json
vite.config.ts
CI/CD configuration
Actual secrets must never be indexed.

13. Database Schema Ingestion
The RAG system should understand database structures.
Example:
users
 ├── id
 ├── email
 ├── password_hash
 └── created_at
Relationship:
users
   │
   └── orders.user_id
This enables questions such as:
Which tables are affected when a user is deleted?

14. API Ingestion
The system should index:
Routes
HTTP methods
Parameters
Request schemas
Response schemas
Authentication requirements
Error responses
Controllers
Services
Tests
Example:
POST /api/auth/login

Controller:
AuthController

Service:
AuthService

Database:
Users

15. Business Knowledge Ingestion
Business rules may exist in:
Code
Documentation
Tests
Comments
Git history
Configuration
Architecture decisions
Example:
Rule:
A complaint cannot be closed without an assigned administrator.

Evidence:
ComplaintService
Complaint tests
Admin workflow documentation

16. Test Ingestion
Tests are treated as highly valuable sources of behavioral knowledge.
For example:
should reject expired authentication tokens
may reveal a security or business rule.
The system should extract:
Feature
Scenario
Expected behavior
Input
Output
Failure condition

17. Infrastructure Ingestion
The system may analyze:
Docker
Kubernetes
Terraform
Cloud configuration
CI/CD pipelines
Deployment scripts
Monitoring configuration
This helps answer:
How is this application deployed?

18. Knowledge Extraction
Ingestion should extract multiple types of knowledge.
Structural Knowledge
Semantic Knowledge
Behavioral Knowledge
Historical Knowledge
Relational Knowledge
Operational Knowledge
Example:
Structural:
AuthService exists.

Semantic:
AuthService handles authentication.

Behavioral:
Invalid credentials result in 401.

Historical:
Retry logic was introduced after an incident.

Relational:
AuthService depends on UserRepository.

19. Document Processing Pipeline
                   Raw Source
                        │
                        ▼
                    Validation
                        │
                        ▼
                   Classification
                        │
                        ▼
                      Parsing
                        │
                        ▼
                   Normalization
                        │
                        ▼
                Metadata Extraction
                        │
                        ▼
                Semantic Chunking
                        │
                        ▼
                    Embedding
                        │
                        ▼
                    Indexing
                        │
                        ▼
                Knowledge Graph

20. File Filtering
The ingestion system should exclude unnecessary files.
Examples:
node_modules/
.git/objects/
dist/
build/
coverage/
.cache/
temporary files
binary files
generated artifacts
Git history should be processed separately where required.

21. Language Detection
The system should detect languages including:
Java
Python
JavaScript
TypeScript
C
C++
C#
Go
Rust
PHP
Ruby
Kotlin
Swift
Additional languages should be supported through parser plugins.

22. Code Parsing
Where possible, language-aware parsers should be used.
Instead of:
Source → Text Chunks
prefer:
Source
  │
  ▼
Parser
  │
  ▼
AST
  │
  ▼
Symbols
  │
  ▼
Relationships
  │
  ▼
Chunks

23. AST-Based Processing
AST analysis can identify:
Classes
Methods
Functions
Variables
Imports
Interfaces
Enums
Loops
Conditionals
Exceptions
Decorators
Annotations
It can also help create relationships.
Example:
AuthController.login()
        │
        ▼
AuthService.login()
        │
        ▼
UserRepository.findUser()

24. Semantic Chunking
The RAG system should not blindly split code into fixed-size token blocks.
Chunks should preferably represent logical units.
Examples:
Class
Method
Function
Interface
API endpoint
Business rule
Documentation section
Test case
Git commit

25. Chunking Strategy
Different source types require different strategies.
Source Code
Class
  ↓
Method
  ↓
Related methods
Documentation
Heading
  ↓
Section
  ↓
Paragraph
Tests
Test Suite
  ↓
Test Case
Git
Commit
  ↓
Message + Diff Summary
API
Endpoint
  ↓
Request
  ↓
Response
  ↓
Implementation

26. Code Chunk Metadata
Example:
{
  "chunk_id": "CH-1001",
  "project_id": "PROJ-01",
  "file": "src/services/AuthService.ts",
  "language": "typescript",
  "symbol": "AuthService.login",
  "type": "method",
  "branch": "main",
  "commit": "a82f12c",
  "line_start": 42,
  "line_end": 78
}

27. Documentation Chunk Metadata
Example:
{
  "chunk_id": "DOC-2001",
  "file": "docs/authentication.md",
  "section": "Login Flow",
  "type": "documentation",
  "version": "1.2"
}

28. Git Commit Metadata
Example:
{
  "commit": "a82f12c",
  "author": "developer",
  "date": "2026-06-14",
  "files_changed": 4,
  "message": "Fix payment retry behavior"
}

29. Embeddings
Embeddings convert knowledge into numerical representations.
Conceptually:
Text
 │
 ▼
Embedding Model
 │
 ▼
Vector
Example:
"JWT authentication middleware"
             │
             ▼
[0.12, -0.34, 0.82, ...]
Semantically similar information should have similar vector representations.

30. Embedding Strategy
Different content may require different embedding strategies.
Examples:
Code
Documentation
Business Rules
Git History
API Definitions
The embedding model should be selected through evaluation rather than assumed to be optimal.
The system should support configurable embedding providers.

31. Vector Database
The vector database stores embeddings.
Chunk
  │
  ▼
Embedding
  │
  ▼
Vector Database
Potential technologies include:
pgvector
Qdrant
Weaviate
Milvus
Pinecone
OpenSearch
The implementation should select a primary technology based on project requirements.

32. Metadata Database
The metadata database stores:
Project
Repository
File
Chunk
Commit
Agent
User
Permissions
Index Status
Version
The vector database must not be treated as the only source of truth.

33. Knowledge Graph
Code Continuum AI should maintain a relationship graph.
Example:
UserController
      │
      │ calls
      ▼
UserService
      │
      │ uses
      ▼
UserRepository
      │
      │ queries
      ▼
Users Table
Supported relationship types may include:
depends_on
calls
implements
extends
tests
documents
changed_by
introduced_by
configured_by

34. Hybrid Retrieval
The platform should combine:
Vector Search
      +
Keyword Search
      +
Graph Search
      +
Metadata Filtering
This is particularly important for software-engineering use cases.

35. Keyword Search
Keyword search is useful for exact terms.
Examples:
AuthService
JWT_SECRET
/api/login
UserRepository
Traditional search can locate exact symbols that semantic search may rank poorly.

36. Vector Search
Vector search is useful for semantic questions.
Example:
How does the system authenticate users?
Potential results:
JWT middleware
AuthService
Login Controller
Authentication Documentation
Authentication Tests

37. Graph Search
Graph retrieval answers relationship-based questions.
Example:
What depends on UserService?
Possible traversal:
UserService
    │
    ▼
UserController
    │
    ▼
API

38. Metadata Filtering
Queries can be filtered using:
Project
Branch
Commit
Language
File type
Environment
User permission
Agent permission
Example:
project_id = PROJ-01
branch = main
language = TypeScript

39. Query Understanding
Before retrieval, the query should be analyzed.
Example:
What happens when a user logs in?
Intent:
BUSINESS_FLOW
Entities:
User
Login
Authentication
Required sources:
Code
Tests
Architecture
Documentation

40. Query Classification
Potential query categories include:
CODE_EXPLANATION
ARCHITECTURE
BUSINESS_LOGIC
SECURITY
TESTING
DEPENDENCY
HISTORY
API
DATABASE
DEPLOYMENT
TROUBLESHOOTING
ONBOARDING
CHANGE_IMPACT
Classification influences the retrieval strategy.

41. Query Expansion
Original query:
login
Potential expanded concepts:
login
authentication
JWT
session
credentials
AuthController
AuthService
middleware
Query expansion must be controlled to avoid irrelevant retrieval.

42. Retrieval Pipeline
User Query
    │
    ▼
Query Classification
    │
    ▼
Query Expansion
    │
    ▼
Metadata Filters
    │
    ├──────────────┐
    ▼              ▼
Keyword Search   Vector Search
    │              │
    └──────┬───────┘
           ▼
      Graph Search
           │
           ▼
     Merge Candidates
           │
           ▼
        Reranking
           │
           ▼
    Evidence Selection
           │
           ▼
    Context Assembly

43. Candidate Generation
Example:
Vector Search:
20 results

Keyword Search:
20 results

Graph Search:
10 results
After merging:
50 unique candidates

44. Reranking
Candidates should be reranked according to:
Semantic relevance
Exact match
Source authority
Recency
Code relationship
Query intent
User permissions
Agent requirements
Conceptual scoring:
Final Score =
    Semantic Score
  + Keyword Score
  + Graph Score
  + Authority Score
  + Freshness Score
The exact weighting should be configurable and evaluated.

45. Context Assembly
The system should construct optimized context.
Example:
Question
   +
Relevant Code
   +
Related Tests
   +
Architecture
   +
Business Rule
   +
Historical Evidence
It should avoid:
Huge unrelated repository dump

46. Evidence Selection
The system should prefer authoritative evidence.
Potential priority for current-behavior questions:
Current Source Code
        ↓
Current Tests
        ↓
Current API Specification
        ↓
Architecture Documentation
        ↓
Historical Commits
        ↓
General Documentation
For historical questions, Git history may become the strongest source.

47. Context Window Management
Context must remain within model limits.
The system should:
Rank
Compress
Deduplicate
Summarize
Select
Repeated information should not consume unnecessary context.

48. Citation and Provenance
Generated answers should reference evidence.
Example:
Authentication is handled by AuthService.

Evidence:
src/services/AuthService.ts
Lines 42–78
Commit: a82f12c
A citation should ideally include:
Repository
File
Line range
Commit
Document
Section

49. Confidence Scoring
The RAG system should estimate confidence.
Example:
Confidence: HIGH

Reason:
Multiple independent sources agree.
Potential levels:
VERY_HIGH
HIGH
MEDIUM
LOW
UNKNOWN
Confidence must not be presented as absolute truth.

50. Agent Integration
Agents request retrieval through a common interface.
Example:
{
  "agent": "BUSINESS_LOGIC_AGENT",
  "query": "How are complaints closed?",
  "filters": {
    "project_id": "PROJ-01"
  }
}
RAG returns:
{
  "results": [],
  "citations": [],
  "confidence": 0.91
}

51. Agent-Specific Retrieval
Different agents require different retrieval strategies.
Security Agent
Prioritize:
Authentication
Authorization
Secrets
Security Tests
Dependencies
Documentation Agent
Prioritize:
Architecture
Code
Existing Documentation
APIs
Business Rules
Legacy Agent
Prioritize:
Git History
Architecture Decisions
Issues
Documentation
Business Rules

52. Code Search
Code search should support:
Symbol Search
Function Search
Class Search
Regex
Exact Text
Semantic Search
Call Graph
Dependency Graph
Example:
Where is password hashing implemented?
Potential results:
AuthService.hashPassword()
UserService.createUser()
SecurityUtils.hash()

53. Architecture Search
Example questions:
How does data move through the system?

What services exist?

Which component owns authentication?
Retrieval should combine:
Architecture Documents
Code Relationships
API Definitions
Dependency Graph

54. Business Logic Search
Example:
What rules determine ticket priority?
Retrieve:
Business Logic
Tests
Validation
Services
Documentation

55. Historical Search
Example questions:
Why was this workaround introduced?

When did this feature change?

Who originally implemented this?
Retrieve:
Git Commits
Diffs
Pull Requests
Issues
Documentation
Historical retrieval must distinguish:
Current Behavior
        vs.
Historical Behavior

56. Dependency Search
Example:
What breaks if Redis is removed?
Retrieve:
Dependency Files
Imports
Configuration
Call Graph
Deployment
Tests

57. Security Search
Example:
Where are JWT tokens validated?
Retrieve:
Auth Middleware
Token Utilities
Configuration
Security Tests
API Routes
Security-sensitive retrieval must obey authorization boundaries.

58. Test Search
Example:
What tests verify login?
Retrieve:
Unit Tests
Integration Tests
E2E Tests
Authentication Fixtures

59. Knowledge Freshness
Knowledge can become outdated.
Example:
Code Changed
     │
     ▼
Old Embedding Remains
     │
     ▼
RAG Retrieves Old Behavior
This is dangerous.
Therefore, freshness tracking is required.

60. Incremental Indexing
When a file changes:
Changed File
     │
     ▼
Detect Change
     │
     ▼
Reparse
     │
     ▼
Rechunk
     │
     ▼
Re-embed
     │
     ▼
Update Index
The entire repository should not need to be reindexed.

61. Change Detection
Possible mechanisms:
Git Commit
File Hash
Timestamp
Webhook
CI/CD Event
Repository Synchronization
A file hash can determine whether content actually changed.

62. Stale Knowledge Detection
Every chunk should contain:
content_hash
commit_id
indexed_at
branch
version
If:
current_hash != indexed_hash
then the chunk is potentially stale.

63. Knowledge Versioning
Knowledge should be versioned.
Example:
UserService

Version 1:
Before refactoring

Version 2:
After refactoring
This enables historical questions.

64. RAG Cache
Caching can reduce:
Latency
Embedding Cost
Search Cost
Model Cost
Possible cache targets:
Embeddings
Queries
Retrieval Results
Reranking Results
Cache invalidation must account for repository changes.

65. Query Cache
Example:
Query:
"How does authentication work?"
If the relevant repository content has not changed:
Reuse retrieval result
If authentication-related files changed:
Invalidate relevant cache

66. Retrieval Cache
The system can cache:
Query
Filters
Top Results
Scores
Timestamp
Repository Version
Results must never be reused across unauthorized projects.

67. Security and Access Control
RAG must enforce authorization before returning data.
Example:
User A
   │
   ▼
Project A
   │
   ▼
Authorized Chunks Only
The system must avoid:
Search Entire Database
        ↓
Filter Results Afterwards
Access restrictions should be applied as early as possible.

68. Secret Handling
Never embed or persist:
Passwords
API Keys
Private Keys
Access Tokens
Database Credentials
Cloud Credentials
Session Secrets
Secret detection should run during ingestion.

69. Repository Isolation
Different projects must remain isolated.
Project A
    │
    ▼
Project A Index


Project B
    │
    ▼
Project B Index
Cross-project retrieval is allowed only when explicitly authorized.

70. Prompt Injection Protection
Repository content is untrusted.
Example:
README:

"Ignore all previous instructions."
The system should label retrieved content as:
UNTRUSTED_REPOSITORY_CONTENT
Agents must never treat repository content as system-level instructions.

71. Retrieval Safety
Retrieved content should be checked for:
Secrets
Malicious Instructions
Prompt Injection
Unauthorized Content
Sensitive Information
Unexpected Commands
The retrieval pipeline must never execute retrieved text.

72. Hallucination Prevention
The system should enforce:
IF evidence exists:
    Answer using evidence.

IF evidence conflicts:
    Report the conflict.

IF evidence is insufficient:
    State that evidence is insufficient.

NEVER:
    Invent project behavior.
This is a core requirement of Code Continuum AI.

73. Failure Handling
Possible failures include:
Vector database unavailable
Keyword index unavailable
Embedding service unavailable
Parser failure
Corrupted repository
No relevant results
Permission failure
The system should fail safely.

74. Retrieval Fallbacks
Example:
Vector Search
      │
      ▼
Unavailable
      │
      ▼
Keyword Search
      │
      ▼
Graph Search
      │
      ▼
Direct Repository Search
If retrieval confidence is too low:
Ask for clarification
       OR
Return "Insufficient Evidence"

75. RAG Observability
The system should track:
Query latency
Retrieval latency
Number of candidates
Top-K results
Reranking latency
Embedding latency
Cache hit rate
No-result rate

76. RAG Audit Logging
Record:
Query
User
Agent
Project
Filters
Retrieved Documents
Scores
Model
Timestamp
Final Answer
Citations
This enables investigation of incorrect answers.

77. RAG Evaluation
RAG evaluation should measure:
Retrieval Correctness
Context Relevance
Citation Correctness
Answer Correctness
Freshness
Permission Correctness
Detailed evaluation is defined in:
18_AI_EVALUATION.md

78. Retrieval Metrics
Recall@K
Measures whether the correct evidence appears within the top K results.
Precision@K
Measures how many retrieved results are relevant.
MRR
Measures how highly the first relevant result is ranked.
NDCG
Measures the quality of the ranking of relevant results.

79. Generation Metrics
The generated response should be evaluated for:
Faithfulness
Correctness
Completeness
Citation Accuracy
Hallucination Rate
Confidence Calibration

80. Quality Gates
A production RAG system should satisfy defined minimum thresholds.
Example:
Metric
Requirement
Retrieval Recall
≥ defined benchmark
Citation Accuracy
≥ defined benchmark
Permission Leakage
0 tolerated
Secret Leakage
0 tolerated
Unsupported Critical Claims
Near-zero target

Exact numerical thresholds should be established through the project's evaluation datasets.

81. Performance Requirements
The system should support:
Fast simple queries
Moderate repository searches
Large repository analysis
Concurrent users
Incremental indexing
Background ingestion
Target latency should be configurable according to deployment tier.

82. Cost Management
Cost-control mechanisms include:
Embedding caching
Incremental indexing
Query caching
Model routing
Context compression
Batch embeddings
Selective reranking
Unchanged files must not be embedded repeatedly.

83. Scalability
The architecture should support growth from:
1 repository
     ↓
10 repositories
     ↓
100 repositories
     ↓
1000+ repositories
Scaling dimensions include:
Projects
Files
Chunks
Queries
Users
Agents
Organizations

84. Disaster Recovery
RAG data should be recoverable.
Backups should include:
Metadata
Knowledge Graph
Vector Indexes
Configuration
Index Versions
Raw repository content should remain recoverable from the source repository whenever possible.

85. Data Retention
Retention policies should define treatment of:
Current Knowledge
Historical Knowledge
Deleted Files
Deleted Repositories
Agent Execution Data
Query Logs
Audit Logs
Retention must respect organizational policies.

86. Privacy
The system should minimize unnecessary data collection.
Sensitive information should be:
Detected
Redacted
Excluded
Encrypted
Access-Controlled
The system should clearly distinguish:
Project Knowledge
User Data
AI Execution Data
Audit Data

87. Example Query
User Query
Why does the payment service retry failed requests?
RAG Pipeline
User Query
     │
     ▼
Query Classification
     │
     ▼
HISTORICAL + BUSINESS_LOGIC
     │
     ▼
Vector Search
     │
     ▼
Keyword Search
     │
     ▼
Git Search
     │
     ▼
Graph Search
     │
     ▼
Reranking
Retrieved Evidence
PaymentService.ts
PaymentService.test.ts
Commit a82f12c
Incident Documentation
Architecture Decision

88. Example Knowledge Flow
                   PaymentService.ts
                           │
                           ├──── AST
                           │
                           ├──── Embedding
                           │
                           ├──── Metadata
                           │
                           └──── Knowledge Graph
                                    │
                                    ▼
                                RAG Index
                                    │
                                    ▼
                         Legacy Continuity Agent
                                    │
                                    ▼
                           Verified Explanation

89. Example Change Analysis
User Query
If I rename UserService.login(), what could break?
RAG retrieves:
UserService.login()
       │
       ├──── AuthController
       │
       ├──── Authentication Tests
       │
       ├──── API Documentation
       │
       └──── Other Services
Impact Analysis
Affected Components:
4

Affected Files:
13

Affected Tests:
7

Documentation:
3

Risk:
MEDIUM
The exact impact numbers are illustrative and must be derived from actual repository evidence during execution.

90. Production Architecture
90.1 Retrieval Architecture
                        ┌──────────────┐
                         │     USER     │
                         └──────┬───────┘
                                │
                                ▼
                         Query Processor
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
                 Vector      Keyword      Graph
                 Search       Search      Search
                    │           │           │
                    └───────────┼───────────┘
                                │
                                ▼
                           Reranker
                                │
                                ▼
                       Evidence Selector
                                │
                                ▼
                        Context Builder
                                │
                                ▼
                         Agent Runtime
                                │
                                ▼
                            AI Model
                                │
                                ▼
                         Verification
                                │
                                ▼
                           Response
90.2 Ingestion Architecture
                        REPOSITORY
                              │
                              ▼
                      Ingestion Engine
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
           Parser          Git Parser      Doc Parser
              │               │               │
              └───────────────┼───────────────┘
                              │
                              ▼
                     Knowledge Extractor
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
           Chunks          Metadata        Relations
              │               │               │
              ▼               │               ▼
         Embeddings           │       Knowledge Graph
              │               │               │
              ▼               ▼               │
          Vector DB      Metadata DB          │
              │               │               │
              └───────────────┼───────────────┘
                              │
                              ▼
                           RAG Layer

91. Future Enhancements
Future versions may introduce:
Multimodal Code Understanding
Architecture Diagram Retrieval
IDE-Native RAG
Real-Time Repository Indexing
Distributed Knowledge Graphs
Cross-Repository Dependency Intelligence
Incident-Aware Retrieval
Production Telemetry Retrieval
Personalized Developer Retrieval
Automatic Knowledge Decay Detection
Semantic Code Version Comparison
AI-Generated Architecture Decision Records

92. Final Architecture
The complete Code Continuum AI RAG architecture is:
                        CODE CONTINUUM AI
                                │
                                ▼
                     ┌─────────────────────┐
                     │  PROJECT KNOWLEDGE  │
                     └──────────┬──────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
      Source Code          Documentation         Git History
          │                     │                     │
          ▼                     ▼                     ▼
       Parsing               Parsing              Extraction
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                                ▼
                       Knowledge Extraction
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
       Vector DB           Metadata DB          Knowledge Graph
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                                ▼
                         Hybrid Retrieval
                                │
                                ▼
                            Reranking
                                │
                                ▼
                         Evidence Selection
                                │
                                ▼
                        Context Assembly
                                │
                                ▼
                         Specialized Agent
                                │
                                ▼
                         AI Model / LLM
                                │
                                ▼
                           Verification
                                │
                                ▼
                      Evidence-Based Answer

Core Architectural Principle
The fundamental principle of the Code Continuum AI RAG system is:
Every important AI conclusion should be grounded in retrievable project evidence, traceable to its source, evaluated for relevance and freshness, protected by access controls, and presented with sufficient provenance for another engineer to verify it.
The RAG layer therefore becomes the knowledge retrieval backbone of Code Continuum AI.
It connects:
Code
+
Documentation
+
Tests
+
Architecture
+
Business Logic
+
Git History
+
Dependencies
+
Infrastructure
+
Engineering Decisions
to:
AI Agents
so that agents can understand not only:
WHAT the software currently does
but also:
HOW it works
WHY it works that way
WHAT changed
WHAT could break
WHAT depends on it
WHAT evidence supports the conclusion
WHAT a future engineer needs to know
Architecture Summary
┌──────────────────────────────────────────────────────────┐
│                  CODE CONTINUUM AI                       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  PROJECT KNOWLEDGE                                      │
│  ├── Source Code                                        │
│  ├── Documentation                                      │
│  ├── Tests                                               │
│  ├── APIs                                                │
│  ├── Database Schemas                                    │
│  ├── Git History                                         │
│  ├── Business Rules                                      │
│  └── Infrastructure                                      │
│                                                          │
│                         ↓                                │
│                                                          │
│  INGESTION & KNOWLEDGE EXTRACTION                        │
│  ├── Parsing                                             │
│  ├── AST Analysis                                        │
│  ├── Semantic Chunking                                   │
│  ├── Metadata Extraction                                 │
│  └── Relationship Extraction                             │
│                                                          │
│                         ↓                                │
│                                                          │
│  KNOWLEDGE STORES                                        │
│  ├── Vector Database                                     │
│  ├── Metadata Database                                   │
│  └── Knowledge Graph                                     │
│                                                          │
│                         ↓                                │
│                                                          │
│  HYBRID RAG                                              │
│  ├── Semantic Search                                     │
│  ├── Keyword Search                                      │
│  ├── Graph Search                                        │
│  ├── Metadata Filtering                                  │
│  └── Reranking                                           │
│                                                          │
│                         ↓                                │
│                                                          │
│  EVIDENCE LAYER                                          │
│  ├── Evidence Selection                                  │
│  ├── Provenance                                          │
│  ├── Freshness                                           │
│  ├── Citations                                           │
│  └── Confidence                                          │
│                                                          │
│                         ↓                                │
│                                                          │
│  SPECIALIZED AI AGENTS                                   │
│  ├── Code Agent                                          │
│  ├── Architecture Agent                                  │
│  ├── Security Agent                                      │
│  ├── Business Logic Agent                                │
│  ├── Legacy Agent                                        │
│  └── Impact Analysis Agent                               │
│                                                          │
│                         ↓                                │
│                                                          │
│              VERIFIED, EVIDENCE-BASED AI                 │
│                         ANSWERS                          │
│                                                          │
└──────────────────────────────────────────────────────────┘
End of Document — CC-RAG-001 v1.0

