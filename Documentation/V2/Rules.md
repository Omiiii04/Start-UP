# Rules.md

## Engineering Standards, Coding Guidelines, Communication Protocols & Operational Rules

---

## 1. Executive Overview & Enforceability

This document establishes the mandatory engineering standards, coding conventions, version control workflows, security policies, communication protocols, and compliance requirements that govern all software development and operational activities within the organization.

These standards are **mandatory** for every project. Any code, documentation, or deliverable that fails to satisfy these requirements **must not** pass Quality Assurance (QA) or be merged into protected branches.

---

## 2. Engineering & Coding Standards

---

### 2.1 Approved Technology Stack

All development shall utilize the organization's approved technology stack.

#### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- TanStack Query

---

#### Backend

- Node.js
- Express.js
- Python
- FastAPI
- PyTorch (AI/ML)

---

#### Database

- PostgreSQL
- Redis

---

#### DevOps & Cloud

- Docker
- AWS ECS
- AWS RDS
- Amazon S3
- GitHub Actions
- Nginx
- Cloudflare

---

## 2.2 Naming Conventions

---

### TypeScript / JavaScript

| Item       | Convention           | Example                 |
| ---------- | -------------------- | ----------------------- |
| Variables  | `camelCase`        | `calculateGstAmount`  |
| Functions  | `camelCase`        | `createInvoice()`     |
| Components | `PascalCase`       | `InvoiceTable`        |
| Interfaces | `PascalCase`       | `ProjectDetails`      |
| Constants  | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE_BYTES` |

---

### Python

| Item      | Convention           | Example                 |
| --------- | -------------------- | ----------------------- |
| Variables | `snake_case`       | `project_status`      |
| Functions | `snake_case`       | `process_dataset()`   |
| Classes   | `PascalCase`       | `PipelineRunner`      |
| Constants | `UPPER_SNAKE_CASE` | `DEFAULT_TIMEOUT_SEC` |

---

### Database

#### Tables

Use plural `snake_case`.

Examples

```text
users
projects
milestones
invoices
```

#### Columns

Use singular `snake_case`.

Examples

```text
user_id

project_id

created_at

workflow_step
```

---

## 2.3 Code Formatting Standards

### JavaScript / TypeScript

Mandatory Tools

- ESLint
- Prettier

Every commit must pass:

```bash
npm run lint

npm run format
```

---

### Python

Mandatory Tools

- Black
- Flake8
- isort

Every commit must satisfy:

- PEP 8
- Static analysis
- Formatting rules

---

### Documentation Standards

Code should be **self-documenting** wherever possible.

Documentation is mandatory for:

- Public APIs
- Complex algorithms
- AI/ML pipelines
- Mathematical calculations
- Database migrations

API documentation shall use:

- OpenAPI
- Swagger

---

## 3. Version Control & Git Workflow

---

### 3.1 Branching Strategy

> **This is imp**

| Branch        | Purpose                   | Push Permission | Merge Requirement      |
| ------------- | ------------------------- | --------------- | ---------------------- |
| `main`      | Production                | Restricted      | Om or Somnath Approval |
| `staging`   | QA & Client Demo          | Restricted      | QA Approval            |
| `feature/*` | Feature Development       | Developers      | Pull Request           |
| `hotfix/*`  | Critical Production Fixes | Restricted      | Emergency Approval     |

---

### Git Workflow

```text
feature/*
      │
      ▼
Pull Request
      │
      ▼
Code Review
      │
      ▼
Automated Tests
      │
      ▼
staging
      │
      ▼
QA Approval
      │
      ▼
main
```

---

### 3.2 Commit Message Standards

The project follows the **Conventional Commits Specification**.

#### Types

```text
feat:

fix:

docs:

style:

refactor:

test:

chore:
```

---

#### Examples

```text
feat(auth): implement JWT refresh tokens

fix(invoice): correct GST rounding

docs(api): update OpenAPI specification

refactor(project): simplify milestone service

test(auth): add login integration tests

chore(deps): upgrade express
```

---

### 3.3 Pull Request Policy

#### Mandatory Rules

- Direct pushes to `main` are prohibited.
- Direct pushes to `staging` are prohibited.
- Every Pull Request requires at least one technical review.
- CI/CD must pass before merge.
- QA approval is mandatory before production release.

---

## 4. Security & Credential Hygiene

---

### 4.1 Secret Management

#### Never Commit

- API Keys
- Database Passwords
- AWS Credentials
- JWT Secrets
- Private Certificates

---

#### Approved Storage

- `.env.local`
- AWS Secrets Manager
- GitHub Secrets
- Environment Variables

---

#### Incident Policy

If credentials are accidentally committed:

1. Immediately revoke credentials.
2. Rotate secrets.
3. Remove Git history.
4. Notify engineering leadership.

---

## 4.2 Secure Development Standards

### SQL Injection Prevention

Only use:

- ORM
- Parameterized Queries

Never concatenate SQL strings.

---

### Input Validation

Every user input must be validated on:

- Client
- Server

Protection required against:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Command Injection

---

### Secure File Access

Client assets stored in S3 must be accessed only through:

- Pre-Signed URLs
- Time-Limited Tokens

---

## 5. Client Communication & Operational Rules

---

### 5.1 Communication Ownership

#### Official Communication

Handled by:

- Divya
- Official Company Email
- Official Communication Channels

---

#### Engineering Communication

Developers participate only in:

- Technical Discussions
- Architecture Reviews
- Staging Demonstrations
- Technical Feasibility Calls

Commercial discussions remain the responsibility of:

- Divya
- Om

---

#### Response SLA

| Activity                | SLA                |
| ----------------------- | ------------------ |
| Initial Inquiry         | Within 24 Hours    |
| Technical Clarification | Within 48 Hours    |
| Bug Response            | Within 24 Hours    |
| Critical Issue          | Immediate Priority |

---

## 5.2 Financial & Delivery Rules

---

### No Unfunded Work

Development begins **only after**:

- Contract Approval
- Advance Payment
- Invoice Generation

---

### Source Code Release

Source code is transferred only after:

- Final Payment
- Final Acceptance
- Financial Clearance

---

### Scope Change Process

Any request outside the approved Statement of Work (SOW) requires:

1. Change Request
2. Technical Evaluation
3. Revised Estimate
4. Client Approval

---

## 6. Academic Integrity & UGC Compliance

All academic engagements must comply with the **University Grants Commission (UGC) Regulations, 2018**.

---

### Prohibited Services

The organization does **not** provide:

- Assignment Writing
- Coursework Completion
- Thesis Writing
- Ghostwriting
- Proxy Project Submission
- Fabrication of Research Results

---

### Permitted Services

The organization provides:

- Technical Mentorship
- Code Reviews
- Debugging
- Architecture Guidance
- Infrastructure Engineering
- MLOps
- Dataset Preprocessing
- Open-Source Software Development

---

### Mandatory Academic Declaration

Before onboarding, every academic client must digitally acknowledge the organization's Academic Integrity Declaration.

---

## 7. Audit & Compliance Protocols

---

### Weekly Engineering Review

**Frequency**

Every Monday

**Led By**

- Om
- Somnath

Agenda

- Sprint Progress
- Code Reviews
- Technical Debt
- Infrastructure Status

---

### QA Release Audit

Conducted before every milestone release.

Led by:

- Falguni

Verification includes:

- Functional Testing
- Regression Testing
- Acceptance Criteria
- Performance Validation

---

### Financial & Tax Audit

**Frequency**

Monthly

Led by:

- Divya
- Om

Verification includes:

- GST Compliance
- Invoice Records
- Payment Reconciliation
- Financial Reports

---

## 8. Engineering Principles

Every engineer follows these principles:

- Clean Code First
- Security by Design
- Documentation First
- API-First Development
- Test Before Merge
- Automate Wherever Possible
- Fail Fast, Recover Faster
- Keep Systems Observable
- Minimize Technical Debt
- Build for Scalability

---

## 9. Code Review Checklist

Before approving a Pull Request, reviewers must verify:

- Code compiles successfully.
- Linting passes.
- Tests pass.
- No hardcoded secrets.
- Documentation updated.
- Security best practices followed.
- Naming conventions respected.
- No unnecessary complexity introduced.
- Performance impact reviewed.
- Backward compatibility maintained.

---

## 10. Merge Requirements

A Pull Request may be merged only when all of the following conditions are satisfied:

- ✅ CI/CD pipeline passes
- ✅ Linting passes
- ✅ Unit tests pass
- ✅ Code review approved
- ✅ QA verification completed (where applicable)
- ✅ Documentation updated
- ✅ No security violations detected

---

### Document Information

| Property                | Value                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **Document Name** | Engineering Standards, Coding Guidelines, Communication Protocols & Operational Rules |
| **Version**       | 2.0                                                                                   |
| **Status**        | Final                                                                                 |
| **Primary Owner** | Somnath (Lead Systems Engineer)                                                       |
| **Reviewers**     | Falguni, Om, Divya                                                                    |
| **Last Updated**  | August 2026                                                                           |
