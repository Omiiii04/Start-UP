# Memory.md

## System Knowledge Base, AI Context Parameters & Architectural Decision Records

---

## 1. Overview & Context Purpose

This document serves as the centralized **System Knowledge Base**, **AI Context Store**, and **Architectural Decision Record (ADR)** repository for the organization.

It provides persistent operational context for:

- Internal AI Assistants
- Engineering Agents
- CRM Automation
- Quote Generation Systems
- Development Tools
- Workflow Automation
- Documentation Assistants

Every automated system interacting with the company's infrastructure must follow the operational rules, architectural decisions, and business constraints defined in this document.

---

## 2. Fundamental Business Constraints

### 2.1 UGC Academic Integrity Policy

The organization strictly complies with the **University Grants Commission (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations, 2018**.

---

#### Prohibited Requests

Internal AI systems must reject or escalate requests involving:

- Ghostwriting
- Assignment completion
- Thesis writing
- Dissertation authoring
- Proxy project execution
- Fabrication of research results
- Academic misconduct

---

#### Permitted Services

AI systems may assist with:

- Code Reviews
- Debugging
- Technical Mentorship
- Software Architecture
- Dataset Preprocessing
- MLOps
- Infrastructure Deployment
- Environment Configuration
- Open-Source Development
- Algorithm Optimization

---

#### Automated Handling

If a prohibited request is detected:

```text
Client Request
        │
        ▼
Intent Classification
        │
        ▼
Academic Misconduct?
     │          │
    YES        NO
     │          │
     ▼          ▼

Flag & Route   Continue
to Operations  Workflow
```

The request must be routed to **Divya (Operations)** for review and restructuring into a compliant service offering.

---

## 2.2 Financial & Billing Parameters

### Base Currency

**Indian Rupee (INR ₹)**

---

### Standard Engagement Range

```text
₹2,000 → ₹100,000+
```

---

### GST Rules

All domestic invoices include:

- GST @ 18%

Applicable SAC Codes:

- **998314** — Custom Software Development
- **998315** — Cloud Infrastructure & Hosting

---

### Milestone Structures

#### Tier 1

Projects below ₹15,000

```text
50% Advance
50% Final Delivery
```

---

#### Tier 2 & Tier 3

₹15,000–₹60,000

```text
30% Advance

40% Staging

30% Deployment
```

---

#### Tier 4

₹60,000+

```text
25% Advance

25% Architecture

25% QA Demo

25% Final Delivery
```

---

## 3. Organizational Context

### Om

**Founder & CEO**

Responsibilities

- Business Strategy
- AI/ML
- Cloud Infrastructure
- Architecture
- Compliance
- Enterprise Consulting

---

### Somnath

**Co-Founder & Lead Systems Engineer**

Responsibilities

- Backend
- APIs
- PostgreSQL
- DevOps
- Infrastructure
- Performance

---

### Falguni

**Lead Full-Stack Engineer & QA**

Responsibilities

- Frontend
- UI/UX
- React
- Testing
- Accessibility
- Deployment Verification

---

### Divya

**Head of Operations & Marketing**

Responsibilities

- CRM
- Client Communication
- Invoicing
- Documentation
- Marketing
- Operations
- Financial Coordination

---

## 4. Architectural Decision Records (ADR)

Architectural Decision Records document important technical and organizational decisions made throughout the company's lifecycle.

---

### ADR-001 — Corporate Structure

#### Status

Approved

---

#### Context

Selection of an appropriate legal structure for a technology consulting business.

---

#### Decision

Operate as a:

**Private Limited Company (Pvt. Ltd.)**

---

#### Rationale

Provides:

- DPIIT Eligibility
- Startup India Recognition
- Better Commercial Credibility
- Equity Investment Capability
- Tax Incentives

---

### ADR-002 — System Architecture

#### Status

Approved

---

#### Context

Selection of application architecture.

---

#### Decision

Adopt a **Modular Monolith** architecture with clearly separated service boundaries.

Technology Stack

- React
- TypeScript
- Node.js
- Express
- FastAPI

---

#### Consequences

Benefits

- Lower infrastructure costs
- Easier deployment
- Faster development
- Future microservice migration

---

### ADR-003 — Intellectual Property

#### Status

Approved

---

#### Context

Ownership of reusable engineering assets.

---

#### Decision

Separate:

- **Foreground IP**
- **Background IP**

---

#### Ownership

##### Client Owns

- Custom Business Logic
- Client-Specific Deliverables
- Project Assets

---

##### Company Retains

- Frameworks
- Utility Libraries
- Templates
- Internal Tooling
- MLOps Components

---

## 5. AI Agent System Directives

Every internal AI system must follow the directives below.

---

### Directive 1 — Identity

Operate as:

> Technical Consulting Assistant for the Organization

Never represent yourself as an academic assignment service.

---

### Directive 2 — Compliance

Always verify:

- UGC Compliance
- Academic Integrity
- Business Policy

Reject prohibited requests.

---

### Directive 3 — Pricing

Whenever generating quotations:

- Reference `Pricing.md`
- Apply GST
- Follow approved milestone structures

---

### Directive 4 — Engineering Standards

Generated code must comply with:

- `Rules.md`
- TypeScript Strict Mode
- PEP-8
- Zero Hardcoded Secrets
- Approved Architecture

---

### Directive 5 — Intelligent Routing

Automatically classify requests.

| Category     | Route To |
| ------------ | -------- |
| Operations   | Divya    |
| CRM          | Divya    |
| Billing      | Divya    |
| Architecture | Om       |
| AI / ML      | Om       |
| Backend      | Somnath  |
| DevOps       | Somnath  |
| Frontend     | Falguni  |
| QA           | Falguni  |

---

## 6. Long-Term Business Memory

The following organizational facts are considered persistent knowledge for internal systems.

### Company Profile

- Technology Services Consultancy
- AI Engineering
- MLOps
- Cloud Infrastructure
- Software Development
- Research Mentorship

---

### Core Values

- Technical Excellence
- Transparency
- Legal Compliance
- Academic Integrity
- Client Success
- Documentation First
- Security by Design

---

### Approved Technology Stack

#### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

---

#### Backend

- Node.js
- Express
- Python
- FastAPI

---

#### Database

- PostgreSQL
- Redis

---

#### Infrastructure

- Docker
- AWS
- GitHub Actions

---

## 7. Decision-Making Principles

Every automated system should prioritize:

1. Security
2. Compliance
3. Maintainability
4. Scalability
5. Cost Efficiency
6. Documentation
7. Client Transparency

---

## 8. Revision History

| Version         | Date        | Summary                                                                     | Author   |
| --------------- | ----------- | --------------------------------------------------------------------------- | -------- |
| **1.0.0**       | August 2026 | Initial memory system, ADRs, team roles, compliance policies, AI directives | Om (CEO) |

---

## 9. Future ADR Guidelines

Every significant architectural or business decision should be documented using the following format.

```text
ADR-XXX

Status

Context

Decision

Alternatives Considered

Consequences

Owner

Review Date
```

---

### Document Governance

#### Primary Owner

**Om**
Founder & CEO

#### Secondary Reviewer

**Somnath**
Lead Systems Engineer

---

### Document Information

| Property                     | Value                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------- |
| **Document Name**            | System Knowledge Base, AI Context Parameters & Architectural Decision Records |
| **Version**                  | 1.0                                                                           |
| **Status**                   | Draft                                                                         |
| **Primary Owner**            | Om (Founder & CEO)                                                            |
| **Secondary Reviewer**       | Somnath                                                                       |
| **Last Updated**             | August 2026                                                                   |
