# Design.md

## UI/UX Design System, Visual Guidelines & Component Specifications

> **Don't follow this use your own creativity (This is AI slop)**

---

## 1. Design Philosophy & UX Principles

The Client Portal and Internal Operations Platform are designed around three fundamental principles:

- **Clarity**
- **Trust**
- **Speed**

The interface is tailored to two primary user groups while maintaining a consistent design language across all products.

---

### Primary User Personas

#### Students & Academic Researchers

Primary Goals:

- Quick project inquiry submission
- Real-time project tracking
- Mobile-friendly experience
- Fast milestone payments
- Technical mentorship access

Design Priorities:

- Mobile-first
- Simple navigation
- Minimal friction
- Clear progress indicators

---

#### SME Executives & Commercial Clients

Primary Goals:

- Project review
- Contract approval
- Invoice management
- Staging previews
- Business reporting

Design Priorities:

- Professional appearance
- Information density
- Desktop optimization
- Trust and transparency

---

### Design Philosophy

```text
                     DESIGN PHILOSOPHY

                              │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼

 TRUST & TRANSPARENCY     SPEED & EFFICIENCY    ACCESSIBILITY

 • Clear Workflow         • <2 Second Loads     • WCAG 2.1 AA
 • Live Status            • Mobile First        • High Contrast
 • Transparent Pricing    • Minimal Clicks      • Keyboard Support
 • GST Visibility         • Fast Payments       • Screen Readers
```

---

## 2. Color System

The design language emphasizes engineering precision through a modern neutral palette with blue accent colors.

---

### Primary Color Tokens

| Design Token            | Hex Value   | Purpose                                         |
| ----------------------- | ----------- | ----------------------------------------------- |
| `--color-primary-900` | `#0F172A` | Primary Background (Dark), Primary Text (Light) |
| `--color-primary-800` | `#1E293B` | Cards & Containers                              |
| `--color-brand-500`   | `#3B82F6` | Primary Brand Color, CTA Buttons                |
| `--color-accent-400`  | `#06B6D4` | Secondary Accent                                |
| `--color-neutral-100` | `#F8FAFC` | Background (Light Mode)                         |
| `--color-neutral-300` | `#CBD5E1` | Borders & Dividers                              |
| `--color-success-500` | `#10B981` | Success States                                  |
| `--color-warning-500` | `#F59E0B` | Warning States                                  |
| `--color-error-500`   | `#EF4444` | Error States                                    |

---

### Semantic Color Usage

| State           | Color        |
| --------------- | ------------ |
| Primary Actions | Brand Blue   |
| Success         | Green        |
| Warning         | Amber        |
| Error           | Red          |
| Information     | Cyan         |
| Disabled        | Neutral Gray |

---

## 3. Typography System

Typography prioritizes readability, consistency, and accessibility.

---

### Font Families

#### Primary UI Font

```text
Inter
-apple-system
BlinkMacSystemFont
Segoe UI
Roboto
sans-serif
```

---

#### Monospace Font

```text
JetBrains Mono
Fira Code
Consolas
monospace
```

---

### Type Scale

| Style      | Size | Weight | Line Height | Usage                 |
| ---------- | ---- | ------ | ----------- | --------------------- |
| Display    | 36px | 700    | 1.2         | Landing Hero          |
| Heading 1  | 30px | 600    | 1.25        | Dashboard Title       |
| Heading 2  | 24px | 600    | 1.3         | Section Heading       |
| Heading 3  | 20px | 500    | 1.4         | Card Titles           |
| Body Large | 18px | 400    | 1.5         | Lead Text             |
| Body       | 16px | 400    | 1.5         | Standard Content      |
| Caption    | 14px | 400    | 1.4         | Helper Text           |
| Code       | 14px | 500    | 1.4         | API & Terminal Output |

---

## 4. Layout System

The application follows a responsive **12-column grid system**.

---

### Responsive Breakpoints

| Prefix  | Width    | Devices    | Layout          |
| ------- | -------- | ---------- | --------------- |
| `sm`  | ≥640px  | Mobile     | Single Column   |
| `md`  | ≥768px  | Tablets    | Two Column      |
| `lg`  | ≥1024px | Laptops    | 12 Column Grid  |
| `xl`  | ≥1280px | Desktop    | Centered Layout |
| `2xl` | ≥1536px | Ultra-wide | Expanded Layout |

---

### Layout Principles

- Maximum Content Width: **1440px**
- Responsive Containers
- 8px Spacing System
- Consistent Margins & Padding
- Sticky Navigation (Desktop)
- Bottom Navigation (Future Mobile)

---

## 5. Component Library

---

### 5.1 Project Lifecycle Stepper

Purpose

Visual representation of the organization's **15-step project workflow**.

#### States

| State     | Appearance                 |
| --------- | -------------------------- |
| Completed | Green + Check Icon         |
| Current   | Brand Blue + Animated Ring |
| Upcoming  | Neutral Gray               |

---

#### Workflow Visualization

```text
●──●──●──●──●──○──○──○──○──○──○──○──○──○──○

Completed      Active         Upcoming
```

---

### 5.2 Form Components

Features

- Floating Labels
- Inline Validation
- Required Indicators
- Contextual Helper Text
- Accessible Error Messages

---

#### Validation Rules

Validation occurs:

- On Blur
- Before Submit

Error Styling

- Red Border
- Helper Text
- Error Icon

---

#### Student Intake

Additional Requirements

- Academic Integrity Checkbox
- UGC Compliance Declaration
- Mandatory Consent before Submission

---

### 5.3 Milestone & Invoice Table

Displays:

- Subtotal
- CGST (9%)
- SGST (9%)
- IGST (18%)
- Grand Total

---

#### Primary Actions

Primary Button

```text
Pay Milestone
```

Secondary Button

```text
Download Invoice PDF
```

---

### 5.4 Buttons

#### Primary

- Filled
- Brand Blue
- White Text

Used For

- Submit
- Save
- Pay
- Continue

---

#### Secondary

- Outline
- Neutral Border

Used For

- Cancel
- Download
- View Details

---

#### Danger

- Red

Used For

- Delete
- Reject
- Remove

---

## 6. Accessibility Standards

All UI components must satisfy **WCAG 2.1 AA** requirements.

---

### Color Contrast

Minimum ratio

```text
4.5 : 1
```

---

### Keyboard Navigation

Every interactive element must support:

- Tab Navigation
- Visible Focus Ring
- Logical Focus Order

Recommended focus style

```css
ring-2 ring-brand-500
```

---

### Screen Reader Support

Every non-text element must include:

- `aria-label`
- `aria-describedby`
- `role`
- Accessible button names

---

### Forms

Every input requires:

- Label
- Helper Text
- Error Message
- Accessible Validation

---

## 7. Iconography

Preferred Library

- Lucide React

Guidelines

- Consistent Stroke Width
- 20–24px Default Size
- Semantic Icons Only
- Avoid Decorative Overuse

---

## 8. Motion & Animation

Animations should enhance usability without distracting users.

---

### Transition Duration

```text
150ms–300ms
```

---

### Allowed Animations

- Fade
- Slide
- Scale
- Skeleton Loading
- Progress Indicators

---

### Avoid

- Excessive Motion
- Continuous Flashing
- Long Delays
- Distracting Effects

---

## 9. Design Quality Checklist

Every interface must satisfy the following before release.

- Responsive Layout
- Accessible Components
- Cross-Browser Compatibility
- Dark & Light Theme Support
- Mobile Optimization
- Loading States
- Empty States
- Error States
- Consistent Spacing
- Typography Compliance

---

## 10. Design Principles

Every interface should embody the following principles:

- Simplicity
- Consistency
- Accessibility
- Performance
- Transparency
- Minimal Cognitive Load
- Predictable Navigation
- Responsive Design
- Professional Aesthetics
- User-Centered Experience

---

### Document Governance

#### Primary Owner

**Falguni**
Lead Full-Stack Engineer & QA (UI/UX Lead)

#### Secondary Reviewer

**Divya**
Head of Operations & Marketing

---

### Document Information

| Property                | Value                                                             |
| ----------------------- | ----------------------------------------------------------------- |
| **Document Name** | UI/UX Design System, Visual Guidelines & Component Specifications |
| **Version**       | 2.0                                                               |
| **Status**        | Final                                                             |
| **Primary Owner** | Falguni                                                           |
| **Reviewer**      | Divya                                                             |
| **Last Updated**  | August 2026                                                       |
