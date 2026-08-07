# SDD.md

## Software Design Document (SDD)

---

## 1. System Architecture & Component Strategy

### 1.1 Architecture Overview

The Client Portal and Internal Operations Platform is designed as a **decoupled, modular monolith** with a clear evolution path toward a **microservices architecture**. The platform supports:

- Web Clients
- Mobile Clients
- Internal Administrative Dashboard
- Engineering Operations Portal

The frontend follows a **Single Page Application (SPA)** architecture built with **React** and **TypeScript**, communicating with backend services through RESTful APIs and WebSockets.

The backend consists of:

- **Node.js + Express.js** (Business APIs)
- **Python + FastAPI** (AI/ML Services)

The storage layer combines:

- **PostgreSQL** for transactional data
- **Amazon S3** for object storage
- **Redis** (optional) for caching and session management

---

### High-Level Architecture

```text
                     +---------------------------+
                     |     Web / Mobile Client   |
                     |    React + TypeScript     |
                     +-------------+-------------+
                                   |
                          HTTPS / WebSocket
                                   |
                     +-------------v-------------+
                     |     API Gateway Layer     |
                     | JWT • RBAC • Validation   |
                     +-------------+-------------+
                                   |
        +--------------------------+---------------------------+
        |                          |                           |
        v                          v                           v

+----------------+      +--------------------+      +----------------------+
| CRM & Intake   |      | Sprint Engine      |      | Payment & Invoice    |
| Module         |      | Project Workflow   |      | GST Engine           |
+----------------+      +--------------------+      +----------------------+
        |                          |                           |
        +--------------------------+---------------------------+
                                   |
                     +-------------v-------------+
                     | PostgreSQL Database       |
                     +-------------+-------------+
                                   |
                     +-------------v-------------+
                     | Amazon S3 Object Storage  |
                     +---------------------------+
```

---

### 1.2 System Component Breakdown

#### Client Presentation Layer

Provides a responsive web interface allowing clients to:

- Submit project requirements
- Track milestones
- View staging previews
- Download invoices
- Access project documentation

---

#### Operations & Engineering Dashboard

Internal administrative interface used by:

- Om
- Somnath
- Falguni
- Divya

Features include:

- CRM Management
- Quotation Generation
- Sprint Tracking
- Build Verification
- Financial Dashboard
- Deployment Monitoring

---

#### API Gateway & Middleware Layer

Responsible for:

- JWT Authentication
- RBAC Authorization
- Request Validation
- Response Serialization
- CORS
- Rate Limiting
- API Logging
- Audit Trails

---

### Core Application Modules

#### Intake & CRM Module

**Owner:** Divya

Responsibilities:

- Lead Management
- Requirement Collection
- Feasibility Routing
- CRM Status
- Client Communication

---

#### Architecture & Sprint Engine

**Owners:** Om & Somnath

Responsibilities:

- Technical Planning
- Sprint Generation
- Architecture Review
- Environment Provisioning
- Sprint Lifecycle

---

#### QA & Build Pipeline

**Owner:** Falguni

Responsibilities:

- Unit Testing
- Integration Testing
- Build Verification
- Deployment Validation
- Staging Environment

---

#### Invoicing & Payments Engine

Responsibilities:

- GST Calculation
- Invoice Generation
- Payment Gateway Integration
- Payment Verification
- Milestone Unlocking

---

#### UGC Mentorship Guardrail Engine

Responsible for:

- Academic Integrity Validation
- Request Screening
- Mentorship Verification
- Compliance Enforcement

---

## 2. Data Models & Database Schema

---

### Database Technology

- PostgreSQL 16+
- UUID Primary Keys
- ACID Transactions
- Foreign Key Constraints
- Soft Delete Support

---

## 2.1 Schema Entities

---

### users

Stores every authenticated platform user.

| Column                     | Type         | Constraints   | Description           |
| -------------------------- | ------------ | ------------- | --------------------- |
| `user_id`                  | UUID         | PK            | Unique User ID        |
| `email`                    | VARCHAR(255) | UNIQUE        | Login Email           |
| `password_hash`            | VARCHAR(255) | NOT NULL      | Argon2id Hash         |
| `full_name`                | VARCHAR(100) | NOT NULL      | User Name             |
| `role`                     | ENUM         | NOT NULL      | User Role             |
| `client_category`          | ENUM         | Nullable      | Student / SME etc.    |
| `institution_or_company`   | VARCHAR(255) | Nullable      | Institution / Company |
| `created_at`               | TIMESTAMPTZ  | DEFAULT NOW() | Registration Time     |

#### User Roles

```text
client
admin_ceo
admin_backend
admin_qa
admin_ops
```

---

### projects

Stores all client projects.

| Column            | Type         | Description           |
| ----------------- | ------------ | --------------------- |
| project_id        | UUID         | Primary Key           |
| client_id         | UUID         | FK → Users            |
| title             | VARCHAR(255) | Project Name          |
| service_tier      | ENUM         | Service Category      |
| workflow_step     | INTEGER      | Current Workflow Step |
| agreed_budget_inr | NUMERIC      | Budget                |
| gst_amount_inr    | NUMERIC      | GST Amount            |
| sac_code          | VARCHAR(10)  | GST SAC               |
| repository_url    | TEXT         | Internal Repository   |
| staging_url       | TEXT         | Client Preview        |
| created_at        | TIMESTAMP    | Submission Date       |

#### Service Tiers

```text
micro_debug

research_support

mvp_development

enterprise_ai
```

---

### milestones

Tracks payment milestones.

| Column         | Type      |
| -------------- | --------- |
| milestone_id   | UUID      |
| project_id     | UUID      |
| milestone_name | VARCHAR   |
| percentage     | NUMERIC   |
| amount_due_inr | NUMERIC   |
| status         | ENUM      |
| signoff_date   | TIMESTAMP |

#### Status

```text
pending

invoiced

paid

released
```

---

### invoices

Stores GST invoices.

| Column              | Type      |
| ------------------- | --------- |
| invoice_id          | UUID      |
| invoice_number      | VARCHAR   |
| milestone_id        | UUID      |
| subtotal_inr        | NUMERIC   |
| cgst_inr            | NUMERIC   |
| sgst_inr            | NUMERIC   |
| igst_inr            | NUMERIC   |
| payment_gateway_ref | VARCHAR   |
| pdf_storage_path    | TEXT      |
| issued_at           | TIMESTAMP |

---

## Entity Relationship Diagram

```text
Users
   │
   │ 1
   │
   ├──────────────< Projects
                         │
                         │1
                         │
                         ├──────────────< Milestones
                                              │
                                              │1
                                              │
                                              └──────────────< Invoices
```

---

## 3. Detailed Component Specifications

---

### 3.1 UGC Compliance & Mentorship Screener

**Technical Owner**

Om

---

#### Objective

Ensure all student and researcher engagements comply with UGC regulations before quotation generation.

---

#### Processing Logic

```text
Requirement Submitted
          │
          ▼
 NLP Keyword Screening
          │
          ▼
Is Assignment Request?
      │             │
     YES            NO
      │             │
      ▼             ▼

REQUIRES         Continue
RESTRUCTURING    Workflow
      │
      ▼

Notify Operations
```

---

#### Restricted Keywords

Examples:

- Write my assignment
- Complete my thesis
- Finish my final year project
- Proxy submission
- Ghostwrite paper

---

#### Allowed Alternatives

- Code Review
- Mentorship
- Architecture Guidance
- MLOps
- Deployment
- Infrastructure Setup

---

### 3.2 Automated Invoicing Engine

**Owners**

- Divya
- Somnath

---

#### Objective

Automatically generate GST-compliant invoices.

---

#### Tax Logic

```text
Customer State
       │
       ▼

Is Maharashtra?
      │
 ┌────┴─────┐
 │          │
 ▼          ▼

YES         NO

CGST 9%     IGST 18%
SGST 9%
```

---

#### SAC Mapping

| Service              | SAC    |
| -------------------- | ------ |
| Software Development | 998314 |
| Cloud Infrastructure | 998315 |

---

## 4. Data Flow & Execution Sequence

### Client Onboarding Workflow

```text
Client
   │
   ▼
Requirement Submission
   │
   ▼
Operations Review
(Divya)
   │
   ▼
Architecture Review
(Om)
   │
   ▼
Quotation Generation
   │
   ▼
Contract Signing
   │
   ▼
Advance Payment
   │
   ▼
Invoice Generation
   │
   ▼
Sprint Initialization
   │
   ▼
Development
```

---

## 5. Interface & API Specifications

---

### API Design Principles

- RESTful
- JSON
- JWT Authentication
- Versioned APIs
- HTTP Status Codes
- Idempotent Operations

---

### POST `/api/v1/intake/submit`

#### Description

Submit a new project request.

#### Authorization

- Public
- Authenticated Client

#### Request

```json
{
  "client_category": "student",
  "institution_or_company": "JSPM Wagholi",
  "project_title": "AI Image Segmentation",
  "service_tier_requested": "research_support",
  "description": "Need assistance deploying model on AWS.",
  "agreed_to_ugc_disclaimer": true
}
```

#### Response

```json
{
  "status": "success",
  "project_id": "uuid",
  "workflow_step": 1,
  "message": "Requirements submitted successfully."
}
```

---

### POST `/api/v1/invoices/generate`

#### Authorization

- admin_ops
- admin_ceo

#### Request

```json
{
  "project_id": "uuid",
  "milestone_id": "uuid",
  "client_state": "MH",
  "sac_code": "998315"
}
```

#### Response

```json
{
  "status": "success",
  "invoice_number": "INV-2026-084",
  "subtotal_inr": 10000,
  "cgst_inr": 900,
  "sgst_inr": 900,
  "total_due_inr": 11800,
  "pdf_download_url": "https://..."
}
```

---

## 6. Security, Authentication & Access Control

---

### 6.1 RBAC Matrix

| Module              |    Client    | Divya | Engineering |  Om  |
| ------------------- | :----------: | :---: | :---------: | :--: |
| Submit Requirements |      RW      |   R   |      R      |  R  |
| CRM Management      |      ❌      |  RW  |      R      |  RW  |
| Sprint Updates      |      ❌      |   R   |     RW     |  RW  |
| Technical Approval  |  Sign Only  |   R   |      R      | Full |
| Source Code Access  | Staging Only |   R   |     RW     | Full |
| Financial Ledger    |   Own Only   |  RW  |     ❌     | Full |

---

### 6.2 Security Controls

#### Encryption

- TLS 1.3
- AES-256

---

#### Authentication

- JWT Access Token (15 Minutes)
- Refresh Token
- HttpOnly Cookies
- SameSite Protection
- MFA for Administrators

---

#### Database Security

- Parameterized Queries
- ORM-Based Access
- SQL Injection Prevention
- Audit Logging
- Role-Based Permissions

---

## Design Principles

- Modular Monolith
- Domain-Driven Design (DDD)
- Clean Architecture
- SOLID Principles
- Repository Pattern
- Service Layer Architecture
- Event-Driven Extensions
- API-First Design
- Cloud-Native Ready
- Microservice Migration Ready
