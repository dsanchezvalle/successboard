![SuccessBoard Logo](public/logo-light.png)

A modern B2B Customer Success dashboard built with Next.js 15, React 19, and TypeScript. Provides Customer Success teams with a unified view of account health, customer interactions, documents, and actionable insights through a cohesive design-system-driven UI.

---

## Product & UX Principles

- **Design-system-first**: Semantic tokens (colors, typography, spacing, motion) and reusable primitives (`Heading`, `Text`, `Container`, `Section`) ensure visual consistency across all views
- **Typed-first domain modeling**: All API entities, view models, and service boundaries are strongly typed with TypeScript
- **Accessibility by default**: WCAG AA color contrast, semantic HTML, ARIA labels, keyboard navigation, and focus management built into core components
- **Backend-agnostic architecture**: Clean separation between UI, service layer, and data fetching enables integration with any REST backend
- **Responsive and themeable**: Mobile-first layouts with tablet/desktop breakpoints; light/dark mode with system preference detection

---

## Key Capabilities

- **Dashboard Overview**: KPIs (Total Customers, ARR, Avg Health Score, At-Risk Accounts), health distribution visualization, accounts needing attention
- **Customers Hub**: Searchable, sortable customer table with segment filtering, health badges, and lifecycle indicators
- **Customer Detail**: Health gauge (0-100), key metrics, interactions timeline, documents section, risk indicators
- **Document Viewer**: Sectioned content with outline navigation and AI assistant panel (presentational)
- **Theming**: Light/dark mode toggle with localStorage persistence and system preference detection

---

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Framework     | Next.js 16.0.7 (App Router)                    |
| Runtime       | React 19.2.0 + React Compiler                  |
| Language      | TypeScript 5                                   |
| Styling       | TailwindCSS 4, tw-animate-css                  |
| UI Components | shadcn/ui (generates Radix-based primitives)   |
| Icons         | Lucide React                                   |
| Utilities     | clsx, tailwind-merge, class-variance-authority |
| Linting       | ESLint 9                                       |

---

## Architecture

### Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router (RSC + Client Components)               │
│  ├── src/app/           → Routes & Pages                    │
│  ├── src/features/      → Feature-specific components       │
│  ├── src/modules/       → Domain logic & API services       │
│  ├── src/components/    → Shared UI (shadcn + custom)       │
│  └── src/design-system/ → Tokens & primitives               │
├─────────────────────────────────────────────────────────────┤
│  Service Layer (src/modules/api/)                           │
│  ├── mockapi.ts         → HTTP client                       │
│  ├── types.ts           → Domain type definitions           │
│  ├── mappers.ts         → View model transformations        │
│  └── *-service.ts       → Data aggregation & filtering      │
├─────────────────────────────────────────────────────────────┤
│                   REST Backend (MockAPI.io)                  │
└─────────────────────────────────────────────────────────────┘
```

### Module Map

| Path                            | Purpose                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| `src/app/`                      | Next.js App Router pages                                                    |
| `src/components/ui/`            | shadcn/ui generated components (Badge, Card, DropdownMenu, Tooltip)         |
| `src/components/shared/`        | Layout components (AppShell, Sidebar, Topbar)                               |
| `src/design-system/tokens/`     | Design tokens (colors, typography, spacing, shadows, motion, focus, states) |
| `src/design-system/primitives/` | Semantic primitives (Heading, Text, Container, Section, VisuallyHidden)     |
| `src/modules/api/`              | API client, domain types, mappers, service functions                        |
| `src/modules/overview/`         | Dashboard components and data                                               |
| `src/modules/customers/`        | Customer detail components                                                  |
| `src/modules/customers-hub/`    | Customers list/table                                                        |
| `src/modules/theme/`            | Theme context, provider, switcher                                           |
| `src/features/documents/`       | Document detail view                                                        |
| `tools/`                        | MockAPI seed data and validation                                            |
| `docs/mockapi/`                 | API documentation                                                           |

---

## Backend / Data Layer

### MockAPI.io Integration

The application consumes a MockAPI.io backend configured via environment variable. All endpoints return JSON and follow REST conventions.

**Resources & Endpoints**

| Resource     | Endpoint        | Operations                                     |
| ------------ | --------------- | ---------------------------------------------- |
| Customers    | `/customers`    | GET (list), GET/:id, POST, PUT/:id, DELETE/:id |
| Documents    | `/documents`    | GET, GET/:id, POST, PUT/:id                    |
| Interactions | `/interactions` | GET, GET/:id, POST                             |
| Frameworks   | `/frameworks`   | GET, GET/:id                                   |
| Templates    | `/templates`    | GET, GET/:id                                   |
| Metrics      | `/metrics`      | GET (overview summary)                         |

**Domain Models**

- **Customer**: Central entity with `id`, `name`, `companyName`, `customerType`, `tier`, `mrr`, `arr`, `lifecycleStage`, `healthScore`, `healthTrend`, `riskFlags[]`, `keyContacts[]`, `csmName`, `renewalDate`, `npsScore`
- **Document**: `id`, `title`, `documentType`, `status`, `customerId`, `templateId`, `content`
- **Interaction**: `id`, `customerId`, `type`, `channel`, `title`, `description`, `owner`, `occurredAt`
- **Framework**: `id`, `name`, `description`, `type`, `criteria`, `matchingCustomerCount`
- **MetricsSummary**: `totalCustomers`, `totalArr`, `avgHealthScore`, `atRiskCount`, `healthDistribution`

### Demo Fallback Behavior

When `NEXT_PUBLIC_MOCKAPI_BASE_URL` is not set or the API is unreachable:

- The app automatically falls back to built-in demo data
- A banner is displayed: "Using demo data — Configure NEXT_PUBLIC_MOCKAPI_BASE_URL to connect to your backend"
- All features remain functional with realistic sample data

### Seeds & Validation

```
tools/
├── mockapi-seeds/
│   ├── customers.json
│   ├── documents.json
│   ├── interactions.json
│   ├── frameworks.json
│   ├── templates.json
│   └── metrics.json
└── validate-seeds.ts    # Validates seed data integrity
```

---

## Frontend

### Routing (App Router)

| Route             | Description                         |
| ----------------- | ----------------------------------- |
| `/`               | Overview dashboard                  |
| `/customers`      | Customers hub (list with filtering) |
| `/customers/[id]` | Customer detail                     |
| `/documents`      | Documents list                      |
| `/documents/[id]` | Document detail with viewer         |

### UI System

**Design Tokens** (`src/design-system/tokens/`)

- `colors.ts` — Semantic color palette with WCAG AA contrast ratios documented
- `typography.ts` — Font scales, weights, line heights
- `spacing.ts` — Consistent spacing scale
- `shadows.ts` — Elevation system
- `motion.ts` — Animation durations and easings
- `focus.ts` — Focus ring styles
- `states.ts` — Interactive state styles

**Primitives** (`src/design-system/primitives/`)

- `Heading` — Semantic headings with visual level override
- `Text` — Typography component with variants
- `Container` — Max-width content wrapper
- `Section` — Semantic section wrapper
- `VisuallyHidden` — Accessibility helper for screen readers

**shadcn/ui Components** (`src/components/ui/`)

Generated via shadcn/ui CLI (`components.json` config), built on Radix UI primitives:

- `Badge` — Status and category indicators
- `Card` — Content containers
- `DropdownMenu` — Action menus (Radix DropdownMenu)
- `Tooltip` — Hover information (Radix Tooltip)

### Theming

- **Light/Dark mode**: Toggle via `ThemeSwitcher` component
- **System preference**: Detects and respects `prefers-color-scheme`
- **Persistence**: Theme choice stored in localStorage
- **Implementation**: CSS custom properties (`--bg-page`, `--text-primary`, `--border-default`, etc.) swap on `.dark` class

### Accessibility

**Implemented**:

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG AA)
- `VisuallyHidden` component for screen reader content
- Theme-aware custom scrollbars

**Gaps (TODO)**:

- Skip navigation links
- Comprehensive focus trapping in modals
- ARIA live regions for dynamic content

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
git clone <repository-url>
cd successboard
npm install
```

### Environment Variables

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

| Variable                       | Required | Description                                                                                      |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_MOCKAPI_BASE_URL` | No       | MockAPI.io base URL (e.g., `https://64abc123.mockapi.io/api/v1`). If not set, demo data is used. |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Script  | Command      | Description              |
| ------- | ------------ | ------------------------ |
| `dev`   | `next dev`   | Start development server |
| `build` | `next build` | Production build         |
| `start` | `next start` | Start production server  |
| `lint`  | `eslint`     | Run ESLint               |

---

## Testing & Quality

| Tool       | Status         |
| ---------- | -------------- |
| ESLint     | ✅ Configured  |
| TypeScript | ✅ Strict mode |
| Unit Tests | 🗓️ Planned     |
| E2E Tests  | 🗓️ Planned     |

---

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_MOCKAPI_BASE_URL` (optional)
3. Deploy

### Manual

```bash
npm run build
npm run start
```

The app runs on port 3000 by default. Configure via `PORT` environment variable if needed.

---

## Roadmap

- 📝 **AI Agent integrations**: Integrate AI agents and tools for intelligent document generation and content assistance
- 📝 **Design System consolidation**: Harden and unify the design system with comprehensive token coverage and component API standardization
- 📝 **Storybook implementation**: Add Storybook for isolated component development, visual documentation, and interaction testing
- 📝 **Onboarding Wizard**: Create an interactive wizard to guide users through app features and maximize value based on their specific needs
- 📝 **Signals & Tasks**: Introduce Signals as first-class entities visible across the platform (not just in documents) and Tasks as actionable units for customer relationship tracking
- 📝 **Framework & Template generation**: Enable dynamic creation of CS frameworks and document templates driven by Signals and Tasks data

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:

- TypeScript strict mode passes
- ESLint reports no errors
- New components follow design-system patterns

---

## Author

**David Sánchez Valle** - [LinkedIn](https://www.linkedin.com/in/dsanchezvalle) | [GitHub](https://github.com/dsanchezvalle)
