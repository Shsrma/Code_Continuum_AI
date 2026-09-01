Code Continuum AI
Database Design Specification
Project Name: Code Continuum AI
 Tagline: An AI-powered platform for continuing your software legacy.
 Document ID: CC-DB-001
 Version: 1.0
 Status: Baseline
 Document Type: Database Design Specification
Related Documents
Document
Description
01_PRODUCT_REQUIREMENTS.md
Product Requirements
02_FUNCTIONAL_REQUIREMENTS.md
Functional Requirements
03_NON_FUNCTIONAL_REQUIREMENTS.md
Non-Functional Requirements
04_USER_PERSONAS.md
User Personas
05_USER_STORIES.md
User Stories
06_USE_CASES.md
Use Cases
07_BUSINESS_LOGIC.md
Business Logic
08_ACCEPTANCE_CRITERIA.md
Acceptance Criteria
09_SYSTEM_ARCHITECTURE.md
System Architecture
10_COMPONENT_ARCHITECTURE.md
Component Architecture
11_DATA_ARCHITECTURE.md
Data Architecture


Table of Contents
Purpose
Database Design Objectives
Database Design Principles
Database Architecture Overview
Polyglot Persistence Strategy
Primary Database
Relational Database Responsibilities
Core Entities
Entity Relationship Overview
Organizations Table
Users Table
Organization Members Table
Projects Table
Project Members Table
Repositories Table
Repository Branches Table
Commits Table
Source Files Table
Source File Versions Table
Code Symbols Table
Code Relationships Table
Dependencies Table
Dependency Relationships Table
Documentation Table
Documentation Versions Table
Business Rules Table
Business Rule Evidence Table
Test Suites Table
Test Cases Table
Test Executions Table
Findings Table
Finding Evidence Table
Risks Table
Knowledge Items Table
Knowledge Versions Table
Knowledge Relationships Table
AI Models Table
Prompt Templates Table
AI Analysis Runs Table
AI Analysis Results Table
AI Evidence Table
AI Evaluation Datasets Table
AI Evaluation Cases Table
AI Evaluation Results Table
Agents Table
Agent Versions Table
Agent Executions Table
Agent Actions Table
Human Reviews Table
Approval Requests Table
Continuity Assessments Table
Knowledge Gaps Table
Audit Logs Table
Integration Connections Table
Synchronization Jobs Table
Background Jobs Table
Notifications Table
Reports Table
Object Storage Metadata
Vector Database Metadata
Database Indexing Strategy
Primary Keys
Foreign Keys
Constraints
Soft Deletion
Data Versioning
Tenant Isolation
Database Security
Encryption
Secret Management
Database Transactions
Concurrency
Data Consistency
Database Migration Strategy
Backup Strategy
Disaster Recovery
Database Monitoring
Database Performance
Scalability
Data Archival
Data Retention
Data Deletion
Database Failure Scenarios
Example Queries
Database Acceptance Criteria
Future Database Evolution
Final Database Principles

1. Purpose
The purpose of this document is to define the database architecture and data model required by Code Continuum AI.
Code Continuum AI is designed to preserve and explain the technical knowledge surrounding software systems. Consequently, the database must manage considerably more than conventional application data.
The database must maintain relationships between:
Organizations
Users
Projects
Repositories
Git commits
Source files
Code structures
Dependencies
Documentation
Business rules
Tests
Findings
Risks
Engineering knowledge
AI analyses
AI models
AI agents
Agent executions
Human verification
Continuity assessments
Audit events
The database therefore acts as the structured metadata, knowledge, provenance, and transactional foundation of Code Continuum AI.
Large source files, repository archives, embeddings, generated reports, and other specialized artifacts should not necessarily be stored directly inside the primary relational database.

2. Database Design Objectives
The database shall satisfy the following objectives:
Provide a reliable source of truth for application state.
Maintain strong relationships between project entities.
Support multi-tenant organization and project isolation.
Preserve historical versions of important engineering knowledge.
Maintain provenance for AI-generated information.
Support human verification and approval workflows.
Track AI model and agent execution history.
Support large software repositories without requiring every artifact to be stored relationally.
Provide efficient querying for dashboards and reports.
Support incremental repository synchronization.
Support auditability of important actions.
Support backup, recovery, and long-term continuity.
Allow specialized databases to be introduced without changing the core data model.
Prevent secrets from becoming part of ordinary application data.
Allow the platform to scale from individual developers to organizations.

3. Database Design Principles
The following principles apply throughout the database architecture.
3.1 Source of Truth
Every important piece of transactional information must have a clearly defined authoritative storage location.
Derived systems such as search indexes and vector stores must not become the sole source of truth.
3.2 Referential Integrity
Relationships between important entities should be enforced through foreign keys or equivalent mechanisms.
3.3 Least Duplication
Data should not be unnecessarily duplicated.
Controlled denormalization may be introduced where it provides a measurable performance benefit.
3.4 Version Awareness
Engineering knowledge and other entities that change over time should preserve historical versions where required.
3.5 Tenant Isolation
Every tenant-owned resource must be associated with an organization and/or project.
3.6 Auditability
Important changes must be traceable to an actor and timestamp.
3.7 AI Provenance
AI-generated results should retain information about:
Model
Prompt
Input
Context
Evidence
Analysis run
3.8 Rebuildability
Derived data should be rebuildable from authoritative sources whenever practical.

4. Database Architecture Overview
The recommended database architecture is:
                        CODE CONTINUUM AI
                                |
                 +--------------+--------------+
                 |                             |
                 v                             v
          Primary Database               Object Storage
            PostgreSQL                   Large Artifacts
                 |
        +--------+--------+
        |        |        |
        v        v        v
      Core     AI Data   Audit
      Data               Data
                 |
                 v
           Search Metadata
                 |
        +--------+--------+
        |                 |
        v                 v
   Vector Database    Graph Database
        |                 |
        +--------+--------+
                 |
                 v
              RAG / AI
The architecture separates transactional data from large artifacts and specialized data stores.

5. Polyglot Persistence Strategy
Code Continuum AI should not force every dataset into a single database.
The recommended storage strategy is:
Data
Recommended Storage
Users
PostgreSQL
Organizations
PostgreSQL
Projects
PostgreSQL
Repository metadata
PostgreSQL
Git metadata
PostgreSQL
Findings
PostgreSQL
Approvals
PostgreSQL
Audit logs
PostgreSQL / Dedicated Audit Storage
Source archives
Object Storage
Large reports
Object Storage
Embeddings
Vector Database
Knowledge relationships
PostgreSQL initially / Graph DB later
Search index
Search Engine
Temporary jobs
Redis / Queue
Secrets
Secret Manager

MVP Strategy
The initial MVP should minimize infrastructure complexity.
PostgreSQL can be used for most structured data, while object storage handles large artifacts. Vector and graph infrastructure should be introduced only when required.

6. Primary Database
The recommended primary relational database is:
PostgreSQL
PostgreSQL is selected because it provides:
Strong relational integrity
ACID transactions
JSONB support
Full-text search
Mature indexing
Extension support
Strong ecosystem
Good scalability
Support for complex relationships
PostgreSQL should serve as the primary system of record.

7. Relational Database Responsibilities
PostgreSQL should store:
Identity
Organizations
Projects
Repositories
Git Metadata
Findings
Risks
Business Rules
Tests
Knowledge Metadata
AI Runs
Agent Runs
Approvals
Continuity
Audit Events
PostgreSQL should not be used as the default storage location for:
Huge repository archives
Large binary artifacts
Generated files
Embeddings at scale
Other data better suited to specialized storage

8. Core Entities
The core relational entities are:
Organization
User
OrganizationMember
Project
ProjectMember
Repository
RepositoryBranch
Commit
SourceFile
SourceFileVersion
CodeSymbol
CodeRelationship
Dependency
DependencyRelationship
Document
DocumentVersion
BusinessRule
BusinessRuleEvidence
TestSuite
TestCase
TestExecution
Finding
FindingEvidence
Risk
KnowledgeItem
KnowledgeVersion
KnowledgeRelationship
AIModel
PromptTemplate
AIAnalysisRun
AIAnalysisResult
AIEvidence
AIEvaluationDataset
AIEvaluationCase
AIEvaluationResult
Agent
AgentVersion
AgentExecution
AgentAction
HumanReview
ApprovalRequest
ContinuityAssessment
KnowledgeGap
AuditLog
IntegrationConnection
SyncJob
BackgroundJob
Notification
Report
ObjectStorageFile

9. Entity Relationship Overview
Organization
│
├── Organization Members
│       └── Users
│
└── Projects
    │
    ├── Project Members
    │
    ├── Repositories
    │   ├── Branches
    │   └── Commits
    │       └── Source Files
    │           ├── File Versions
    │           └── Code Symbols
    │               └── Code Relationships
    │
    ├── Dependencies
    │   └── Dependency Relationships
    │
    ├── Documentation
    │   └── Documentation Versions
    │
    ├── Business Rules
    │   └── Business Rule Evidence
    │
    ├── Test Suites
    │   └── Test Cases
    │       └── Test Executions
    │
    ├── Findings
    │   └── Finding Evidence
    │
    ├── Risks
    │
    ├── Knowledge
    │   ├── Knowledge Versions
    │   └── Knowledge Relationships
    │
    ├── AI Analysis
    │   ├── Analysis Results
    │   └── AI Evidence
    │
    ├── Agents
    │   ├── Agent Versions
    │   └── Agent Executions
    │       └── Agent Actions
    │
    ├── Human Reviews
    │
    ├── Approval Requests
    │
    ├── Continuity Assessments
    │
    ├── Knowledge Gaps
    │
    ├── Audit Events
    │
    └── Reports

10. Organizations Table
Table
organizations
Purpose
Represents a company, team, institution, or individual workspace.
Schema
Column
Description
id
Primary identifier
name
Organization name
slug
Unique URL-safe identifier
description
Organization description
plan
Subscription plan
status
Organization status
created_at
Creation timestamp
updated_at
Last modification timestamp
deleted_at
Soft-deletion timestamp

Example
id: org_001
name: Acme Technologies
plan: PRO
status: ACTIVE

11. Users Table
Table
users
Purpose
Stores application-level user information.
Schema
Column
Description
id
Primary identifier
email
User email
display_name
Display name
avatar_url
Profile image URL
status
Account status
last_login_at
Last login timestamp
created_at
Creation timestamp
updated_at
Modification timestamp

Authentication credentials should preferably be handled by a dedicated authentication subsystem.
Passwords must never be stored in plaintext.

12. Organization Members Table
Table
organization_members
Purpose
Associates users with organizations and defines organization-level permissions.
Schema
Column
Description
id
Primary identifier
organization_id
Organization reference
user_id
User reference
role
Organization role
status
Membership status
joined_at
Membership start
created_at
Creation timestamp
updated_at
Modification timestamp

Roles
OWNER
ADMIN
MEMBER
AUDITOR
VIEWER

13. Projects Table
Table
projects
Purpose
Represents a software system managed by Code Continuum AI.
Schema
Column
Description
id
Primary identifier
organization_id
Owning organization
name
Project name
slug
URL-safe identifier
description
Project description
primary_language
Primary programming language
technology_stack
Technology metadata
status
Project status
continuity_score
Current continuity score
health_score
Current project health score
created_by
Creating user
created_at
Creation timestamp
updated_at
Modification timestamp
deleted_at
Soft-deletion timestamp


14. Project Members Table
Table
project_members
Purpose
Defines project-level membership and permissions.
Schema
Column
Description
id
Primary identifier
project_id
Project reference
user_id
User reference
role
Project role
permissions
Additional permissions
created_at
Creation timestamp
updated_at
Modification timestamp

Roles
PROJECT_OWNER
TECH_LEAD
DEVELOPER
REVIEWER
AUDITOR
VIEWER

15. Repositories Table
Table
repositories
Purpose
Stores metadata for source-code repositories connected to projects.
Schema
Column
Description
id
Primary identifier
project_id
Project reference
provider
Git provider
external_id
Provider-specific repository ID
name
Repository name
default_branch
Default branch
visibility
Repository visibility
url
Repository URL
last_synced_commit
Last synchronized commit
sync_status
Synchronization status
created_at
Creation timestamp
updated_at
Modification timestamp


16. Repository Branches Table
Table
repository_branches
Schema
Column
Description
id
Primary identifier
repository_id
Repository reference
name
Branch name
commit_hash
Current commit
is_default
Whether branch is default
is_protected
Whether branch is protected
last_synced_at
Last synchronization
created_at
Creation timestamp
updated_at
Modification timestamp


17. Commits Table
Table
commits
Schema
Column
Description
id
Primary identifier
repository_id
Repository reference
hash
Git commit hash
branch_id
Branch reference
author_name
Commit author
author_email
Commit author email
message
Commit message
committed_at
Commit timestamp
parent_hash
Parent commit
created_at
Record creation time

Constraint
A commit hash must be unique within its repository.

18. Source Files Table
Table
source_files
Purpose
Represents logical source files within a repository.
Schema
Column
Description
id
Primary identifier
repository_id
Repository reference
path
Full repository path
filename
File name
extension
File extension
language
Programming language
file_type
File classification
current_hash
Current content hash
size_bytes
File size
is_generated
Generated file indicator
is_binary
Binary file indicator
created_at
Creation timestamp
updated_at
Modification timestamp

Example:
src/auth/AuthService.java

19. Source File Versions Table
Table
source_file_versions
Schema
Column
Description
id
Primary identifier
source_file_id
Source file reference
commit_id
Commit reference
content_hash
Content hash
object_storage_key
Object storage reference
size_bytes
Content size
analysis_status
Analysis status
created_at
Creation timestamp

Storage Rule
The actual source content may be stored in object storage.
The relational database stores metadata and references.

20. Code Symbols Table
Table
code_symbols
Purpose
Represents structural elements extracted from source code.
Supported Symbols
Class
Function
Method
Interface
Variable
Constant
Enum
Schema
Column
Description
id
Primary identifier
source_file_id
Source file reference
parent_symbol_id
Parent symbol
symbol_type
Symbol type
name
Symbol name
qualified_name
Fully qualified name
start_line
Starting line
end_line
Ending line
signature
Function/method signature
visibility
Visibility
language
Programming language
created_at
Creation timestamp
updated_at
Modification timestamp


21. Code Relationships Table
Table
code_relationships
Schema
Column
Description
id
Primary identifier
source_symbol_id
Source symbol
target_symbol_id
Target symbol
relationship_type
Relationship
confidence
Confidence score
created_at
Creation timestamp

Relationship Types
CALLS
IMPORTS
EXTENDS
IMPLEMENTS
USES
DEPENDS_ON
OVERRIDES

22. Dependencies Table
Table
dependencies
Schema
Column
Description
id
Primary identifier
project_id
Project reference
name
Dependency name
ecosystem
npm, Maven, PyPI, etc.
version
Installed version
latest_known_version
Latest known version
license
License information
is_direct
Direct dependency indicator
vulnerability_status
Security status
created_at
Creation timestamp
updated_at
Modification timestamp


23. Dependency Relationships Table
Table
dependency_relationships
Schema
Column
Description
id
Primary identifier
project_id
Project reference
source_dependency_id
Source dependency
target_dependency_id
Target dependency
relationship_type
Relationship type
created_at
Creation timestamp


24. Documentation Table
Table
documents
Schema
Column
Description
id
Primary identifier
project_id
Project reference
type
Document type
title
Document title
path
Storage/repository path
status
Document status
author_type
Human or AI
created_by
Creator
created_at
Creation timestamp
updated_at
Modification timestamp

Document Types
README
ARCHITECTURE
API
RUNBOOK
ADR
TROUBLESHOOTING
DEPLOYMENT
TECHNICAL_NOTE
OTHER

25. Documentation Versions Table
Table
document_versions
Schema
Column
Description
id
Primary identifier
document_id
Document reference
version_number
Version number
content_object_key
Object storage reference
content_hash
Content hash
author_type
Human or AI
author_id
Author
created_at
Creation timestamp


26. Business Rules Table
Table
business_rules
Purpose
Stores business logic extracted from code, tests, documentation, humans, or AI.
Schema
Column
Description
id
Primary identifier
project_id
Project reference
rule_code
Unique rule identifier
title
Rule title
description
Rule description
category
Rule category
priority
Priority
confidence
Confidence
status
Rule status
origin_type
Rule origin
created_at
Creation timestamp
updated_at
Modification timestamp

Origin Types
CODE
TEST
DOCUMENTATION
HUMAN
AI_INFERENCE

27. Business Rule Evidence Table
Table
business_rule_evidence
Purpose
Connects business rules with evidence sources.
Schema
Column
Description
id
Primary identifier
business_rule_id
Business rule
evidence_type
Evidence type
source_id
Source entity
source_reference
Source reference
confidence
Evidence confidence
created_at
Creation timestamp

A business rule may have multiple supporting evidence sources.

28. Test Suites Table
Table
test_suites
Schema
Column
Description
id
Primary identifier
project_id
Project reference
name
Suite name
framework
Test framework
path
Suite location
description
Description
created_at
Creation timestamp
updated_at
Modification timestamp


29. Test Cases Table
Table
test_cases
Schema
Column
Description
id
Primary identifier
test_suite_id
Test suite
name
Test name
description
Description
type
Test type
target_component
Component under test
expected_behavior
Expected behavior
created_at
Creation timestamp
updated_at
Modification timestamp


30. Test Executions Table
Table
test_executions
Schema
Column
Description
id
Primary identifier
test_case_id
Test case
commit_id
Associated commit
status
Execution status
duration_ms
Duration
error_message
Error details
executed_at
Execution timestamp
environment
Execution environment

Status Values
PASSED
FAILED
SKIPPED
ERROR

31. Findings Table
Table
findings
Purpose
Represents issues discovered through AI, static analysis, security scanners, tests, or humans.
Schema
Column
Description
id
Primary identifier
project_id
Project reference
type
Finding type
severity
Severity
title
Finding title
description
Description
status
Finding status
source_type
Finding source
confidence
Confidence
created_at
Creation timestamp
updated_at
Modification timestamp
resolved_at
Resolution timestamp


32. Finding Evidence Table
Table
finding_evidence
Schema
Column
Description
id
Primary identifier
finding_id
Finding reference
evidence_type
Evidence type
source_reference
Source reference
file_id
Related file
commit_id
Related commit
line_start
Starting line
line_end
Ending line
description
Evidence description
created_at
Creation timestamp

This table is critical for explaining AI-generated findings.

33. Risks Table
Table
risks
Schema
Column
Description
id
Primary identifier
project_id
Project reference
category
Risk category
title
Risk title
description
Risk description
likelihood
Likelihood
impact
Impact
severity
Overall severity
confidence
Confidence
status
Risk status
owner_id
Assigned owner
created_at
Creation timestamp
updated_at
Modification timestamp


34. Knowledge Items Table
Table
knowledge_items
Purpose
Represents persistent engineering knowledge.
Schema
Column
Description
id
Primary identifier
project_id
Project reference
type
Knowledge type
title
Knowledge title
summary
Knowledge summary
importance
Importance
confidence
Confidence
origin_type
Knowledge origin
status
Knowledge status
created_at
Creation timestamp
updated_at
Modification timestamp

Knowledge Types
ARCHITECTURE
BUSINESS_RULE
OPERATION
TROUBLESHOOTING
SECURITY
DEPLOYMENT
DECISION
DOMAIN
SYSTEM_BEHAVIOR

35. Knowledge Versions Table
Table
knowledge_versions
Schema
Column
Description
id
Primary identifier
knowledge_item_id
Knowledge item
version_number
Version
content
Knowledge content
content_hash
Content hash
origin_type
Origin
created_by
Creator
created_at
Creation timestamp


36. Knowledge Relationships Table
Table
knowledge_relationships
Schema
Column
Description
id
Primary identifier
source_knowledge_id
Source knowledge
target_knowledge_id
Target knowledge
relationship_type
Relationship
confidence
Confidence
created_at
Creation timestamp

Relationship Types
DEPENDS_ON
RELATED_TO
CONTRADICTS
EXPLAINS
REQUIRES
SUPERSEDES

37. AI Models Table
Table
ai_models
Schema
Column
Description
id
Primary identifier
provider
AI provider
model_name
Model name
model_version
Model version
capabilities
Model capabilities
context_window
Context capacity
status
Model status
created_at
Creation timestamp

The architecture must remain provider-agnostic and must not be hard-coded around a single AI provider.

38. Prompt Templates Table
Table
prompt_templates
Schema
Column
Description
id
Primary identifier
name
Prompt name
purpose
Prompt purpose
version
Prompt version
template
Prompt content
model_requirements
Required model capabilities
status
Status
created_by
Creator
created_at
Creation timestamp
updated_at
Modification timestamp

Prompts must be version-controlled.

39. AI Analysis Runs Table
Table
ai_analysis_runs
Schema
Column
Description
id
Primary identifier
project_id
Project reference
analysis_type
Analysis type
model_id
AI model
prompt_template_id
Prompt template
status
Execution status
started_at
Start time
completed_at
Completion time
input_hash
Input hash
context_hash
Context hash
token_usage
Token usage
cost_estimate
Estimated cost
created_at
Creation timestamp

Analysis Types
CODE_ANALYSIS
BUSINESS_LOGIC
SECURITY
TEST_GENERATION
DOCUMENTATION
ARCHITECTURE
CONTINUITY
AI_DETECTION

40. AI Analysis Results Table
Table
ai_analysis_results
Schema
Column
Description
id
Primary identifier
analysis_run_id
Analysis run
result_type
Result type
title
Result title
content
Result content
confidence
Confidence
status
Result status
created_at
Creation timestamp


41. AI Evidence Table
Table
ai_evidence
Schema
Column
Description
id
Primary identifier
analysis_result_id
Analysis result
evidence_type
Evidence type
source_reference
Source reference
file_id
Related file
commit_id
Related commit
line_start
Starting line
line_end
Ending line
relevance_score
Relevance
created_at
Creation timestamp

AI conclusions should be connected to evidence whenever possible.

42. AI Evaluation Datasets Table
Table
ai_evaluation_datasets
Schema
Column
Description
id
Primary identifier
name
Dataset name
description
Dataset description
version
Dataset version
domain
Dataset domain
status
Dataset status
created_at
Creation timestamp
updated_at
Modification timestamp


43. AI Evaluation Cases Table
Table
ai_evaluation_cases
Schema
Column
Description
id
Primary identifier
dataset_id
Dataset
input
Evaluation input
expected_output
Expected result
evaluation_type
Evaluation method
difficulty
Difficulty
created_at
Creation timestamp


44. AI Evaluation Results Table
Table
ai_evaluation_results
Schema
Column
Description
id
Primary identifier
evaluation_case_id
Evaluation case
model_id
AI model
prompt_template_id
Prompt
actual_output
Actual output
score
Evaluation score
passed
Pass/fail
failure_category
Failure classification
evaluated_at
Evaluation timestamp


45. Agents Table
Table
agents
Schema
Column
Description
id
Primary identifier
project_id
Project
name
Agent name
description
Description
purpose
Agent purpose
risk_level
Risk level
status
Agent status
created_at
Creation timestamp
updated_at
Modification timestamp


46. Agent Versions Table
Table
agent_versions
Schema
Column
Description
id
Primary identifier
agent_id
Agent
version
Agent version
model_id
AI model
system_prompt
System prompt
tool_configuration
Tool configuration
permissions
Agent permissions
status
Version status
created_at
Creation timestamp


47. Agent Executions Table
Table
agent_executions
Schema
Column
Description
id
Primary identifier
agent_version_id
Agent version
project_id
Project
trigger_type
Execution trigger
status
Execution status
started_at
Start time
completed_at
Completion time
input_reference
Input reference
output_reference
Output reference
error_message
Error details
created_at
Creation timestamp


48. Agent Actions Table
Table
agent_actions
Schema
Column
Description
id
Primary identifier
agent_execution_id
Agent execution
action_type
Action
target_resource
Target
parameters_hash
Parameter hash
result_reference
Result
risk_level
Action risk
approval_required
Approval requirement
approved
Approval state
created_at
Creation timestamp

Supported Actions
READ_FILE
WRITE_FILE
CREATE_FILE
DELETE_FILE
RUN_TEST
RUN_ANALYSIS
CREATE_PR
UPDATE_DOCUMENTATION
High-risk actions require approval.

49. Human Reviews Table
Table
human_reviews
Schema
Column
Description
id
Primary identifier
project_id
Project
reviewer_id
Reviewer
resource_type
Reviewed resource
resource_id
Resource identifier
decision
Review decision
comment
Review comment
created_at
Review timestamp

Decisions
APPROVED
REJECTED
MODIFIED
NEEDS_MORE_INFORMATION

50. Approval Requests Table
Table
approval_requests
Schema
Column
Description
id
Primary identifier
project_id
Project
requested_by
Requesting actor
resource_type
Resource type
resource_id
Resource
risk_level
Risk
status
Approval status
approved_by
Approver
requested_at
Request timestamp
resolved_at
Resolution timestamp


51. Continuity Assessments Table
Table
continuity_assessments
Purpose
Stores project continuity assessments.
Schema
Column
Description
id
Primary identifier
project_id
Project
assessment_version
Assessment version
overall_score
Overall score
knowledge_score
Knowledge score
documentation_score
Documentation score
test_score
Testing score
architecture_score
Architecture score
operational_score
Operational score
business_logic_score
Business logic score
risk_score
Risk score
generated_at
Generation timestamp


52. Knowledge Gaps Table
Table
knowledge_gaps
Schema
Column
Description
id
Primary identifier
project_id
Project
category
Gap category
title
Gap title
description
Description
severity
Severity
confidence
Confidence
recommended_action
Recommended action
status
Gap status
created_at
Creation timestamp
updated_at
Modification timestamp

Examples
UNKNOWN_DEPLOYMENT_PROCESS
MISSING_BUSINESS_RULE
UNDOCUMENTED_SERVICE
MISSING_TEST_COVERAGE
UNKNOWN_EXTERNAL_DEPENDENCY

53. Audit Logs Table
Table
audit_logs
Schema
Column
Description
id
Primary identifier
organization_id
Organization
project_id
Project
actor_type
Actor type
actor_id
Actor identifier
action
Performed action
resource_type
Resource type
resource_id
Resource identifier
result
Operation result
metadata
Additional metadata
created_at
Event timestamp

Audit logs should preferably be append-only.

54. Integration Connections Table
Table
integration_connections
Schema
Column
Description
id
Primary identifier
organization_id
Organization
provider
External provider
external_account_id
External account
status
Connection status
secret_reference
Secret manager reference
created_at
Creation timestamp
updated_at
Modification timestamp

Actual credentials must reside in a dedicated secret manager.

55. Synchronization Jobs Table
Table
sync_jobs
Schema
Column
Description
id
Primary identifier
repository_id
Repository
job_type
Synchronization type
status
Job status
source_commit
Starting commit
target_commit
Target commit
files_processed
Number of processed files
started_at
Start timestamp
completed_at
Completion timestamp
error_message
Error information


56. Background Jobs Table
Table
background_jobs
Schema
Column
Description
id
Primary identifier
job_type
Job type
project_id
Project
status
Job status
priority
Priority
attempts
Attempt count
max_attempts
Maximum attempts
payload_reference
Job payload
started_at
Start timestamp
completed_at
Completion timestamp
error_message
Error information
created_at
Creation timestamp


57. Notifications Table
Table
notifications
Schema
Column
Description
id
Primary identifier
user_id
User
project_id
Project
type
Notification type
title
Notification title
message
Notification content
severity
Severity
read_at
Read timestamp
created_at
Creation timestamp


58. Reports Table
Table
reports
Schema
Column
Description
id
Primary identifier
project_id
Project
report_type
Report type
title
Report title
format
PDF, HTML, etc.
object_storage_key
Storage reference
status
Report status
generated_by
Generator
created_at
Creation timestamp

Report Types
CONTINUITY_REPORT
SECURITY_REPORT
ARCHITECTURE_REPORT
AI_ANALYSIS_REPORT
PROJECT_HANDOVER_REPORT

59. Object Storage Metadata
Table
object_storage_files
Large files should be stored outside PostgreSQL.
Schema
Column
Description
id
Primary identifier
project_id
Project
object_key
Storage object key
content_type
MIME type
size_bytes
Size
content_hash
Integrity hash
storage_provider
Provider
created_at
Creation timestamp

The database stores the reference while the actual artifact resides in object storage.

60. Vector Database Metadata
Each embedding should maintain metadata such as:
Metadata
Purpose
embedding_id
Vector identifier
project_id
Tenant/project
repository_id
Repository
source_file_id
Source file
commit_id
Commit
knowledge_id
Knowledge item
chunk_id
Chunk
embedding_model
Embedding model
embedding_version
Embedding version
created_at
Creation timestamp

The vector database must not become the only source of truth for associated knowledge.

61. Database Indexing Strategy
Indexes should exist for high-frequency lookup fields including:
organization_id
project_id
repository_id
user_id
commit_id
source_file_id
analysis_run_id
finding_id
knowledge_id
created_at
status
Composite indexes should be introduced according to real query patterns.
Example:
CREATE INDEX idx_findings_project_status
ON findings(project_id, status);
Indexes should be continuously evaluated using query performance metrics.

62. Primary Keys
UUID or UUID-compatible identifiers are recommended.
Example:
id UUID PRIMARY KEY
Benefits include:
Global uniqueness
Distributed-system compatibility
Reduced predictability
Independent ID generation
External provider identifiers should be stored separately.

63. Foreign Keys
Important relationships should use foreign keys.
Examples:
projects.organization_id
repositories.project_id
commits.repository_id
source_files.repository_id
findings.project_id
knowledge_items.project_id
ai_analysis_runs.project_id
agents.project_id
Foreign keys should protect critical relationships from orphaned records.

64. Constraints
The database should enforce:
NOT NULL
UNIQUE
FOREIGN KEY
CHECK
Examples:
Organization slug must be unique.
Repository external ID must be unique per provider.
Project membership must reference an existing user.
Required ownership relationships must not be nullable.

65. Soft Deletion
Important user-owned resources may use:
deleted_at
instead of immediate physical deletion.
This provides:
Recovery
Auditability
Accidental-deletion protection
Permanent deletion should occur through explicit retention and deletion workflows.

66. Data Versioning
The following entities require versioning:
Source Files
Documentation
Business Rules
Knowledge
Prompts
AI Models
Agents
Reports
Evaluation Datasets
Example:
Knowledge Version 1
        ↓
Knowledge Version 2
        ↓
Knowledge Version 3
Previous versions should remain available according to the applicable retention policy.

67. Tenant Isolation
All tenant-owned queries must include organization/project context.
Example:
SELECT *
FROM findings
WHERE project_id = :project_id;
Authorization must be enforced server-side.
The system must never rely on frontend filtering for tenant isolation.
Where appropriate, PostgreSQL Row Level Security may be implemented.

68. Database Security
Database security must include:
Strong authentication
Least-privilege access
Network isolation
TLS
Encryption at rest
Audit logging
Role-based access
Connection-pool controls
Application accounts should not have unrestricted database privileges.

69. Encryption
Sensitive database storage should use encryption at rest.
All database connections should use TLS.
Particularly sensitive information may additionally use application-level encryption.

70. Secret Management
Database credentials and integration secrets must never be committed to:
Git
Committed .env files
Docker images
AI prompts
Application logs
Database records
Production secrets should be stored in a dedicated secret-management system.
The database should store only a reference such as:
secret_reference
rather than the actual credential.

71. Database Transactions
Transactions should be used when multiple related operations must succeed or fail together.
Example:
BEGIN

Create Finding
        +
Create Finding Evidence
        +
Create Audit Record

COMMIT
If any required operation fails, the transaction should be rolled back where appropriate.

72. Concurrency
The platform must handle concurrent operations such as:
Two users editing documentation
Two agents analyzing the same repository
Repository synchronization during analysis
Multiple AI jobs updating findings
Possible mechanisms include:
Optimistic Locking
Version Numbers
Transactions
Row Locks
Job Deduplication

73. Data Consistency
Consistency requirements depend on the data type.
Strong Consistency
Required for:
Permissions
Approvals
Organization Membership
Project Ownership
Security Settings
Eventual Consistency
Acceptable for:
Embeddings
Search Indexes
Derived Reports
Analytics Dashboards

74. Database Migration Strategy
All schema changes must be managed through version-controlled migrations.
Example:
001_initial_schema.sql
002_add_projects.sql
003_add_ai_analysis.sql
004_add_agents.sql
Possible migration technologies include:
Prisma Migrate
Flyway
Liquibase
Alembic
Knex
The final technology should match the backend implementation.

75. Backup Strategy
Backups should include:
PostgreSQL
Critical Object Storage
Configuration
Audit Data
Recommended strategy:
Automated Daily Backup
        +
Point-in-Time Recovery
        +
Periodic Restore Testing
A backup that has never been restored should not be considered fully validated.

76. Disaster Recovery
Recommended recovery priority:
1. Identity
2. Organizations
3. Projects
4. Repository Metadata
5. Knowledge
6. Findings
7. Audit Data
8. Object Storage
9. Search Indexes
10. Vector Indexes
Search and vector indexes should generally be rebuildable from authoritative data.

77. Database Monitoring
The following metrics should be monitored:
CPU
Memory
Disk
Connections
Query Latency
Slow Queries
Locks
Deadlocks
Replication
Storage Growth
Index Health
Backup Status
Alerts should be configured for abnormal conditions.

78. Database Performance
Performance strategies include:
Proper indexing
Query optimization
Connection pooling
Pagination
Batch inserts
Bulk updates
Partitioning when required
Read replicas when justified
Caching frequently accessed data
The application should avoid loading thousands of source-code records into memory unnecessarily.

79. Scalability
The database architecture must support growth in:
Organizations
Users
Projects
Repositories
Commits
Files
Knowledge Items
AI Runs
Agent Runs
Audit Events
Scaling Stages
Stage 1
Single PostgreSQL

        ↓

Stage 2
PostgreSQL + Redis + Object Storage

        ↓

Stage 3
PostgreSQL + Read Replicas + Vector DB

        ↓

Stage 4
Partitioned PostgreSQL + Distributed Search

        ↓

Stage 5
Dedicated Data Infrastructure
Distributed infrastructure should not be introduced before actual requirements justify the additional complexity.

80. Data Archival
Older data may be moved to lower-cost storage.
Examples include:
Old AI Runs
Old Audit Records
Historical Repository Snapshots
Old Reports
Archived data should remain discoverable when required by organizational policy.

81. Data Retention
Retention periods should be configurable.
Data
Retention
Temporary Jobs
Short
AI Execution Logs
Configurable
Audit Logs
Long
Project Knowledge
Long-term
Source History
Project Policy

Retention requirements may differ between organizations.

82. Data Deletion
Deletion must account for dependent and derived data.
Example:
Delete Project
      ↓
Project Metadata
      ↓
Findings
      ↓
Knowledge
      ↓
AI Analysis
      ↓
Embeddings
      ↓
Object Storage
Sensitive derived information must also be deleted or anonymized according to the organization's retention and deletion policy.

83. Database Failure Scenarios
83.1 PostgreSQL Unavailable
The application should fail gracefully.
No destructive writes should occur while the database is unavailable.
83.2 Vector Database Unavailable
Normal project functionality should remain available.
AI semantic retrieval may become temporarily unavailable.
83.3 Object Storage Unavailable
Large-artifact operations should be queued and retried.
83.4 Connection Pool Exhaustion
The system should:
Reject excess work safely.
Log the condition.
Alert operators.
Recover connections when possible.
83.5 Migration Failure
Production migrations should stop safely and support rollback or forward-recovery procedures.

84. Example Queries
84.1 Find Project Repositories
SELECT *
FROM repositories
WHERE project_id = :project_id;
84.2 Find High-Risk Findings
SELECT *
FROM findings
WHERE project_id = :project_id
  AND severity IN ('HIGH', 'CRITICAL')
  AND status != 'RESOLVED';
84.3 Find Knowledge Gaps
SELECT *
FROM knowledge_gaps
WHERE project_id = :project_id
  AND status = 'OPEN'
ORDER BY severity DESC;
84.4 Find Recent AI Analyses
SELECT *
FROM ai_analysis_runs
WHERE project_id = :project_id
ORDER BY created_at DESC
LIMIT 20;
84.5 Find Unverified AI Findings
SELECT *
FROM findings
WHERE project_id = :project_id
  AND source_type = 'AI'
  AND status = 'NEEDS_REVIEW';

85. Database Acceptance Criteria
The database implementation is considered complete when the following requirements are satisfied:
Identity & Tenant Management
[ ] Organizations can be represented.
[ ] Users can be represented.
[ ] Organization membership is supported.
[ ] Projects can be represented.
[ ] Project membership is supported.
[ ] Tenant isolation is enforced.
Repository & Code
[ ] Repositories can be linked to projects.
[ ] Branches can be stored.
[ ] Commits can be stored.
[ ] Source files can be indexed.
[ ] Source file versions can be tracked.
[ ] Code symbols can be represented.
[ ] Code relationships can be represented.
[ ] Dependencies can be stored.
Documentation & Knowledge
[ ] Documentation can be stored.
[ ] Documentation can be versioned.
[ ] Business rules can be stored.
[ ] Business rule evidence can be stored.
[ ] Knowledge items can be stored.
[ ] Knowledge versions can be maintained.
[ ] Knowledge relationships can be maintained.
[ ] Knowledge gaps can be stored.
Testing & Findings
[ ] Test suites can be represented.
[ ] Test cases can be represented.
[ ] Test executions can be recorded.
[ ] Findings can be represented.
[ ] Finding evidence can be stored.
[ ] Risks can be represented.
AI
[ ] AI models can be registered.
[ ] Prompt versions can be tracked.
[ ] AI analysis runs can be recorded.
[ ] AI results can be stored.
[ ] AI evidence can be linked.
[ ] Evaluation datasets can be stored.
[ ] Evaluation cases can be stored.
[ ] Evaluation results can be recorded.
Agents & Human Oversight
[ ] Agents can be represented.
[ ] Agent versions can be tracked.
[ ] Agent executions can be recorded.
[ ] Agent actions can be audited.
[ ] Human reviews can be recorded.
[ ] Approval workflows can be represented.
Operations
[ ] Continuity assessments can be stored.
[ ] Audit logs exist.
[ ] Integration connections can be tracked.
[ ] Synchronization jobs can be tracked.
[ ] Background jobs can be tracked.
[ ] Notifications can be stored.
[ ] Reports can be stored.
[ ] Object-storage references are supported.
[ ] Vector metadata is supported.
Infrastructure
[ ] Appropriate indexes exist.
[ ] Foreign keys protect critical relationships.
[ ] Database migrations are version controlled.
[ ] Backup procedures are implemented.
[ ] Restore procedures are tested.
[ ] Secrets are not stored directly in application tables.
[ ] Data deletion procedures exist.
[ ] Data retention policies are configurable.

86. Future Database Evolution
The initial implementation should prioritize simplicity and maintainability.
Potential future additions include:
Dedicated Graph Database
Distributed Vector Database
Data Warehouse
Event Streaming Platform
Read Replicas
Database Sharding
Time-Series Database
Data Lake
Federated Search
Dedicated Analytics Database
These should be introduced only when justified by:
Scale
Performance
Availability
Compliance
Cost
Query requirements

87. Final Database Principles
The Code Continuum AI database follows five fundamental principles.
Rule 1 — Preserve
Important engineering knowledge must not disappear simply because its original source becomes unavailable.
Rule 2 — Connect
Code, tests, documentation, decisions, risks, and knowledge must remain relationally connected.
Rule 3 — Prove
AI conclusions should be connected to evidence whenever possible.
Rule 4 — Protect
Source code, credentials, business logic, and organizational information must be protected according to their sensitivity.
Rule 5 — Recover
The system must be capable of recovering authoritative information even when derived systems fail.

Final Architecture Summary
The database is not merely an application database.
It is the structured memory layer of Code Continuum AI.
                   CODE CONTINUUM AI
                           │
                           ▼
                 ┌───────────────────┐
                 │    PostgreSQL     │
                 │   System of       │
                 │      Record       │
                 └─────────┬─────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
   Object Storage     Vector Store     Search Layer
   ─────────────     ─────────────     ────────────
   Source Files       Embeddings       Code Search
   Reports            RAG Data         Knowledge
   Archives           AI Retrieval     Discovery
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                    ┌───────────────┐
                    │   AI / RAG    │
                    │    Agents     │
                    └───────┬───────┘
                            │
                            ▼
                    Human Verification
                            │
                            ▼
                    Trusted Knowledge
Core Data Flow
Repository
    │
    ▼
Git Metadata
    │
    ▼
Source Files
    │
    ├──► Code Symbols
    │
    ├──► Dependencies
    │
    ├──► Tests
    │
    └──► Documentation
             │
             ▼
       AI Analysis
             │
       ┌─────┴─────┐
       ▼           ▼
    Findings     Knowledge
       │           │
       ▼           ▼
    Evidence    Knowledge Graph
       │           │
       └─────┬─────┘
             ▼
      Human Verification
             │
             ▼
      Trusted Project Memory
             │
             ▼
      Continuity Assessment
Document Status: Baseline
 Document ID: CC-DB-001
 Version: 1.0
 Purpose: Structured database foundation for preserving software knowledge, evidence, history, and continuity.

