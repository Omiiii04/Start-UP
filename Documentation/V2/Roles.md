# Roles.md

## Organizational Governance, Team Responsibilities & Ownership Matrix

---

## 1. Executive Summary & Leadership Framework

This document defines the organizational structure, governance framework, role ownership, operational authority, decision-making responsibilities, and cross-functional accountability within the company.

The objective is to:

- Establish clear ownership boundaries.
- Eliminate operational bottlenecks.
- Reduce single points of failure.
- Standardize engineering and operational workflows.
- Ensure accountability across every stage of the project lifecycle.

---

## 2. Executive Leadership & Core Functional Roles

### 2.1 Om — Founder & Chief Executive Officer (CEO)

#### Core Mandate

Corporate vision, strategic planning, AI/ML leadership, cloud infrastructure, software architecture, and enterprise consulting.

#### Primary Responsibilities

- Define long-term business strategy.
- Lead AI/ML and MLOps initiatives.
- Design cloud infrastructure (AWS/GCP).
- Approve technical architecture.
- Conduct enterprise client consultations.
- Review complex project requirements.
- Approve Master Service Agreements (MSA).
- Approve Statements of Work (SOW).
- Ensure UGC compliance.
- Drive research and innovation.

#### Ownership Domains

- AI & Machine Learning
- Cloud Infrastructure
- System Architecture
- Legal & Compliance
- Business Strategy

---

### 2.2 Somnath — Co-Founder & Lead Systems Engineer

#### Core Mandate

Backend architecture, full-stack engineering, APIs, databases, infrastructure automation, and DevOps.

#### Primary Responsibilities

- Backend application development.
- REST API design.
- Database architecture.
- PostgreSQL schema design.
- Docker environments.
- CI/CD pipeline maintenance.
- Infrastructure automation.
- Performance optimization.
- Security hardening.
- Technical feasibility reviews.

#### Ownership Domains

- Backend Engineering
- API Development
- Database Systems
- DevOps
- Infrastructure Automation

---

### 2.3 Falguni — Lead Full-Stack Engineer & Quality Assurance

#### Core Mandate

Frontend engineering, full-stack feature implementation, software testing, QA automation, deployment verification, and UI consistency.

#### Primary Responsibilities

- React frontend development.
- Feature integration.
- UI/UX implementation.
- Automated testing.
- Regression testing.
- Accessibility verification.
- Cross-browser compatibility.
- Staging verification.
- Deployment QA.

#### Ownership Domains

- Frontend Engineering
- Quality Assurance
- Testing Automation
- User Experience
- Deployment Verification

---

### 2.4 Divya — Head of Operations, Management & Marketing

#### Core Mandate

Operations management, CRM, finance coordination, documentation, marketing, and customer success.

#### Primary Responsibilities

- Client onboarding.
- Requirement intake.
- CRM administration.
- Project scheduling.
- Quotation preparation.
- GST invoicing.
- Timeline coordination.
- Marketing campaigns.
- Social media.
- Documentation management.

#### Ownership Domains

- Operations
- CRM
- Finance Coordination
- Marketing
- Documentation

---

## 3. Operational RACI Governance Matrix

### RACI Definitions

| Code        | Meaning                            |
| ----------- | ---------------------------------- |
| **R** | Responsible (Executes the task)    |
| **A** | Accountable (Final decision maker) |
| **C** | Consulted (Provides expertise)     |
| **I** | Informed (Receives updates)        |

---

### Operational Responsibility Matrix

| Activity                       |      Om      |    Somnath    |    Falguni    |     Divya     |
| ------------------------------ | :-----------: | :-----------: | :-----------: | :-----------: |
| Inquiry Screening & UGC Review |       C       |       I       |       I       | **R/A** |
| Technical Feasibility Review   |  **A**  |  **R**  |       C       |       I       |
| Scope Definition & Quotation   |       A       |       C       |       C       |  **R**  |
| MSA & SOW Approval             |  **A**  |       I       |       I       |       R       |
| Invoice Generation             |       I       |       I       |       I       | **R/A** |
| Architecture Planning          | **R/A** |       R       |       C       |       I       |
| Sprint Development             |       C       | **R/A** |       R       |       I       |
| Frontend Development           |       I       |       R       | **R/A** |       I       |
| QA Verification                |       C       |       C       | **R/A** |       I       |
| Client Demonstration           |       A       |       R       |       I       |  **R**  |
| Final Payment Collection       |       I       |       I       |       I       | **R/A** |
| Source Code Handover           |  **A**  |       R       |       R       |       I       |
| Post-Delivery Support          |       C       |       R       | **R/A** |       I       |

---

## 4. Documentation Ownership Matrix

Every repository document has a designated owner responsible for maintenance and periodic review.

| Repository Document        | Purpose                       | Primary Owner | Reviewer |
| -------------------------- | ----------------------------- | ------------- | -------- |
| `README.md`              | Repository Overview           | Om            | Divya    |
| `BusinessPlan.md`        | Business Strategy             | Om            | Divya    |
| `SRS.md`                 | Software Requirements         | Om            | Somnath  |
| `SDD.md`                 | Software Design               | Somnath       | Falguni  |
| `Architecture.md`        | Cloud & System Architecture   | Om            | Somnath  |
| `ProjectRequirements.md` | Requirement Standards         | Divya         | Om       |
| `Roles.md`               | Governance & RACI             | Divya         | Om       |
| `Rules.md`               | Engineering Standards         | Somnath       | Falguni  |
| `Phases.md`              | Development Roadmap           | Divya         | Om       |
| `Design.md`              | UI/UX Guidelines              | Falguni       | Divya    |
| `Memory.md`              | Technical Knowledge Base      | Om            | Somnath  |
| `Workflow.md`            | Project Lifecycle             | Divya         | Om       |
| `SOP.md`                 | Standard Operating Procedures | Divya         | Om       |
| `Pricing.md`             | Pricing & Billing             | Divya         | Om       |
| `TechStack.md`           | Approved Technologies         | Somnath       | Om       |
| `RiskManagement.md`      | Risk Register                 | Divya         | Om       |
| `QA.md`                  | Testing Standards             | Falguni       | Somnath  |
| `Legal.md`               | Contracts & Compliance        | Om            | Divya    |
| `BrandGuide.md`          | Branding Guidelines           | Divya         | Falguni  |
| `Roadmap.md`             | Corporate Roadmap             | Om            | Divya    |

---

## 5. System Access Control & Role-Based Permissions (RBAC)

### Infrastructure Permission Matrix

| Platform Asset       |          Om          |   Somnath   |  Falguni  |        Divya        |
| -------------------- | :------------------: | :----------: | :--------: | :------------------: |
| AWS Console          |         Full         |    Admin    |  Staging  |      Read Only      |
| Production Database  |     Read / Write     | Read / Write | No Access |      No Access      |
| GitHub Organization  |        Owner        |    Admin    | Maintainer |        Member        |
| Payment Gateway      |        Owner        |   API Read   | No Access |   Operations Admin   |
| GST & Banking Portal | Authorized Signatory |  No Access  | No Access | Financial Controller |
| CRM / AppFlowy       |        Admin        |    Editor    |   Editor   |   Workspace Owner   |

---

## 6. Decision-Making Authority

| Decision                | Final Authority            |
| ----------------------- | -------------------------- |
| Business Strategy       | Om                         |
| Technical Architecture  | Om                         |
| Backend Implementation  | Somnath                    |
| Frontend Implementation | Falguni                    |
| QA Approval             | Falguni                    |
| Operations              | Divya                      |
| Financial Approval      | Om & Divya                 |
| Contract Approval       | Om                         |
| Production Release      | Om + Somnath + QA Approval |
| Hiring Decisions        | Om                         |

---

## 7. Delegation & Contingency Protocols

### Engineering Capacity

If engineering workload exceeds available capacity:

- Om reallocates technical tasks.
- Sprint priorities are reassessed.
- Non-critical work is deferred.

---

### Operations Continuity

If Divya is unavailable:

- Om assumes responsibility for:
  - Client communication
  - Quotation approval
  - Payment acknowledgement
  - Operational escalations

Target response time remains **within 24 hours**.

---

### Production Release Authorization

Production deployment requires:

1. QA Approval (Falguni)
2. Technical Approval (Somnath or Om)
3. Final Architecture Sign-Off (Om)

No production deployment may occur without satisfying all three conditions.

---

## 8. Organizational Principles

Every member of the organization follows these operating principles:

- Accountability over ownership.
- Documentation-first culture.
- Security by default.
- Client-first communication.
- Transparent project management.
- Architecture before implementation.
- Quality before delivery.
- Legal and ethical compliance.
- Continuous improvement.
- Collaborative decision-making.

---

## 9. Organizational Structure

```text
                           Founder & CEO
                               (Om)
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼

 Lead Systems Engineer     Lead Full-Stack & QA    Head of Operations
      (Somnath)                (Falguni)               (Divya)

          │                       │                       │
          └─────────────── Project Delivery ──────────────┘
                           Client Success Team
```

---

### Document Information

| Property                | Value                                                               |
| ----------------------- | ------------------------------------------------------------------- |
| **Document Name** | Organizational Governance, Team Responsibilities & Ownership Matrix |
| **Version**       | 2.0                                                                 |
| **Status**        | Final                                                               |
| **Primary Owner** | Divya (Operations)                                                  |
| **Reviewers**     | Om, Somnath, Falguni                                                |
| **Last Updated**  | August 2026                                                         |
