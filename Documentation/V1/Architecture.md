# Architecture.md

## System Architecture, Cloud Infrastructure & File Structure

---

## 1. High-Level System Architecture

The platform follows a **cloud-native**, **modular monolith** architecture with a clear migration path toward microservices. It is designed for high availability, security, maintainability, and scalability while supporting both external client-facing applications and internal engineering operations.

---

### 1.1 Technology Stack Layers

#### Presentation Layer

Responsible for delivering the user interface to both clients and administrators.

**Technology Stack**

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

Features:

- Client Portal
- Admin Dashboard
- Responsive Design
- Progressive Web App (Future)

---

#### API Gateway & Routing Layer

Acts as the unified entry point for all incoming requests.

Responsibilities:

- TLS Termination
- Reverse Proxy
- API Routing
- Rate Limiting
- Request Logging
- CORS Enforcement
- Security Headers

**Technology**

- Nginx
- Cloudflare
- Let's Encrypt
- Cloudflare WAF

---

#### Backend Services Layer

##### Core Business Service

Responsible for:

- CRM
- Project Workflow
- Client Management
- Invoice Generation
- Authentication
- Notifications

Technology

- Node.js
- Express.js
- TypeScript

---

##### AI & MLOps Service

Responsible for:

- Dataset Processing
- AI Inference
- Benchmarking
- Model Deployment
- Compliance Screening

Technology

- Python
- FastAPI
- PyTorch
- Scikit-learn
- HuggingFace
- Celery

---

#### Data & Storage Layer

Persistent storage infrastructure.

##### PostgreSQL

Stores:

- Users
- Projects
- Milestones
- Contracts
- Invoices
- Audit Logs

---

##### Redis

Used for:

- Session Cache
- API Rate Limiting
- Background Jobs
- Temporary Storage

---

##### Amazon S3

Stores:

- Contracts
- Documents
- Deliverables
- Reports
- Invoice PDFs
- Client Uploads

---

## 2. Cloud Infrastructure & MLOps Architecture

---

### 2.1 AWS Infrastructure

#### Compute Layer

Service:

- Amazon ECS
- AWS Fargate

Responsibilities:

- Container Orchestration
- Auto Scaling
- Zero Server Management

---

#### Database Layer

Service:

- Amazon RDS PostgreSQL

Configuration

- Multi-AZ
- Automated Backups
- Point-in-Time Recovery
- Automatic Failover

---

#### Object Storage

Service:

Amazon S3

Features

- AES-256 Encryption
- Lifecycle Policies
- Versioning
- Pre-Signed URLs

---

#### CDN

Service

Amazon CloudFront

Provides

- Low Latency
- Global Edge Delivery
- Asset Caching

---

#### Monitoring

Services

- Amazon CloudWatch
- Sentry

Monitors

- Errors
- Performance
- Infrastructure Health
- Application Logs
- Alerts

---

## 2.2 MLOps Infrastructure

---

### Model Hosting

Inference APIs deployed using:

- FastAPI
- Docker
- EC2 GPU/CPU Instances

Supports:

- REST Inference
- Batch Jobs
- Async Processing

---

### CI/CD Pipeline

Deployment Pipeline

```text
GitHub
    │
    ▼
GitHub Actions
    │
    ▼
Docker Build
    │
    ▼
Container Registry
    │
    ▼
AWS ECS Deployment
```

---

### Data Processing Pipeline

```text
Raw Dataset
      │
      ▼
Validation
      │
      ▼
Cleaning
      │
      ▼
Tokenization
      │
      ▼
Feature Engineering
      │
      ▼
Model Training
      │
      ▼
Evaluation
      │
      ▼
Deployment
```

---

## 3. API Architecture & Design Specifications

---

### 3.1 API Standards

Every API request must include:

```http
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

---

#### Response Format

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

#### Error Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request."
  }
}
```

---

## 3.2 Core API Modules

| API Module     | Endpoint             | Responsibility    | Access                 |
| -------------- | -------------------- | ----------------- | ---------------------- |
| Authentication | `/api/v1/auth`       | Login & Identity  | Public / Authenticated |
| Client Intake  | `/api/v1/intake`     | Lead Capture      | Client / Operations    |
| Projects       | `/api/v1/projects`   | Project Lifecycle | Authenticated          |
| Invoices       | `/api/v1/invoices`   | Billing & GST     | Operations / CEO       |
| MLOps          | `/api/v1/mlops`      | AI Jobs           | Architect / System     |

---

## 4. Repository Structure

The project is maintained as a **monorepo**, enabling centralized dependency management, shared libraries, and unified CI/CD workflows.

```text
startup-platform/
│
├── apps/
│   ├── web-client/              # Client Portal (React)
│   ├── admin-portal/            # Internal Dashboard
│   ├── core-api/                # Express Backend
│   └── ml-service/              # FastAPI AI Service
│
├── packages/
│   ├── ui-components/           # Shared React Components
│   ├── database-schema/         # ORM & Migrations
│   └── shared-types/            # Shared TypeScript Types
│
├── config/
│   ├── nginx.conf
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── .env.example
│
├── docs/
│   ├── README.md
│   ├── BusinessPlan.md
│   ├── SRS.md
│   ├── SDD.md
│   ├── Architecture.md
│   ├── Workflow.md
│   ├── Pricing.md
│   ├── Rules.md
│   ├── SOP.md
│   ├── Roadmap.md
│   ├── QA.md
│   ├── Legal.md
│   ├── Design.md
│   ├── Roles.md
│   ├── TechStack.md
│   ├── RiskManagement.md
│   ├── BrandGuide.md
│   ├── Memory.md
│   └── ProjectRequirements.md
│
├── scripts/
├── .github/
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 5. Security & Environment Isolation

---

### 5.1 Environment Strategy

#### Development

Environment

- Local Docker
- Mock Data
- Test APIs

Purpose

- Feature Development
- Unit Testing
- Integration Testing

---

#### Staging

Environment

AWS Sandbox

Purpose

- Client Demonstrations
- QA Verification
- User Acceptance Testing (UAT)

---

#### Production

Environment

AWS Production Cluster

Characteristics

- Private Networking
- Auto Scaling
- Monitoring
- Backup Strategy
- Disaster Recovery

---

## 5.2 Network Security

### Infrastructure Security

- Private VPC
- Private Subnets
- Security Groups
- Network ACLs

Database servers are never exposed directly to the public Internet.

---

### Storage Security

Amazon S3 uses:

- AES-256 Encryption
- Versioning
- Object Lifecycle Rules
- Pre-Signed URLs
- Bucket Policies

---

### Authentication

- JWT Access Tokens
- Refresh Tokens
- HTTP-Only Cookies
- Multi-Factor Authentication
- Role-Based Access Control (RBAC)

---

### Compliance Engine

Every student and researcher submission passes through the **UGC Compliance Engine** before reaching production workflows.

Processing Flow

```text
Client Submission
        │
        ▼
UGC Screening Engine
        │
        ▼
Allowed?
   │         │
 YES        NO
   │         │
   ▼         ▼

Project     Flag &
Created     Review Required
```

---

## 6. High-Level Deployment Architecture

```text
                  Internet
                      │
                      ▼
              Cloudflare CDN/WAF
                      │
                      ▼
                   Nginx Proxy
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼

     Express API   FastAPI AI   Static Assets

          │           │
          └──────┬────┘
                 ▼

          PostgreSQL (RDS)

                 │
          ┌──────┴──────┐
          ▼             ▼

        Redis         Amazon S3
```

---

## 7. Design Principles

- Cloud-Native Architecture
- Modular Monolith
- API-First Design
- Domain-Driven Design (DDD)
- SOLID Principles
- Secure by Default
- Infrastructure as Code Ready
- CI/CD Friendly
- Horizontal Scalability
- Microservice Migration Ready
- High Availability
- Disaster Recovery Prepared

---

### Document Information

| Property                | Value                                                                   |
| ----------------------- | ----------------------------------------------------------------------- |
| **Document Name**       | System Architecture & Cloud Infrastructure                              |
| **Version**             | 1.0                                                                     |
| **Status**              | Draft                                                                   |
| **Primary Owner**       | Om (CEO & Infrastructure)                                               |
| **Contributors**        | Somnath (Backend & DevOps), Falguni (Frontend & QA), Divya (Operations) |
| **Last Updated**        | August 2026                                                             |
