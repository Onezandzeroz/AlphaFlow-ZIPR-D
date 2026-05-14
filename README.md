<p align="center">
  <img src="public/logo-clean.png" alt="AlphaFlow" width="180" />
</p>

<h1 align="center">AlphaFlow</h1>

<p align="center">
  <strong>Intelligent Accounting for Danish Small Businesses</strong><br/>
  Multi-tenant, AI-assisted bookkeeping — fully compliant with the Danish Bookkeeping Act (Bogføringsloven)
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Prisma-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Bun-Runtime-F9A825?logo=bun" alt="Bun" />
  <img src="https://img.shields.io/badge/PWA-Installable-5D3FD3" alt="PWA" />
  <img src="https://img.shields.io/badge/Multi_Tenant-✓-16a34a" alt="Multi-Tenant" />
</p>

---

## Why AlphaFlow?

Managing bookkeeping for a Danish small business means navigating VAT codes, SAF-T exports, OIOUBL invoicing, and strict retention laws — all while just trying to run your company. AlphaFlow handles the complexity so you don't have to:

- **Full bookkeeping cycle** — from daily transaction entry to guided year-end closing
- **Danish compliance built-in** — FSR chart of accounts, 10 VAT codes, SAF-T & Peppol exports, 5-year backup retention
- **AI-assisted reconciliation** — 3-level matching engine (rule-based → fuzzy → LLM) for bank statements
- **Multi-company** — run multiple entities with role-based team access from a single login
- **Works everywhere** — installable PWA, offline support, Danish/English UI, dark/light themes

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Onezandzeroz/AlphaFlow-Postgres.git
cd AlphaFlow-Postgres

# 2. Install (auto-generates Prisma Client via postinstall)
bun install

# 3. Set up your database
cp .env.example .env
# Edit .env — set your PostgreSQL DATABASE_URL (e.g. Neon, Supabase, or local Postgres)
bun run db:push

# 4. Start developing
bun run dev
```

Open **http://localhost:3000** and create your first account.

> The dev server uses Webpack mode (`--webpack`) which is required for Prisma compatibility with Next.js 16. The startup script handles port checks automatically.

### First Steps After Login

1. **Set up your company** — Go to Settings → Company Profile. Add your CVR number, bank details, and invoice settings.
2. **Seed the chart of accounts** — Go to Chart of Accounts → "Create standard Danish chart" (38 FSR-standard accounts).
3. **Add contacts** — Register your customers and suppliers under Contacts.
4. **Start bookkeeping** — Create transactions, journal entries, or invoices.

Or load **demo data** from the dashboard to explore all features with realistic sample data for "Nordisk Erhverv ApS".

---

## Feature Overview

### Core Accounting

| | Feature | Details |
|---|---|---|
| 📒 | **Double-Entry Bookkeeping** | Full debit/credit posting with ±0.005 balance validation |
| 📊 | **Chart of Accounts** | 38 FSR-standard accounts + custom accounts across 5 types, 18 groups |
| 🧾 | **Invoicing** | Line items, auto VAT, sequential numbering (`PREFIX-YEAR-SEQ`), PDF download |
| 💰 | **VAT Reporting** | 10 Danish VAT codes — S25/S12/S0/SEU (output) + K25/K12/K0/KEU/KUF (input) |
| 👥 | **Contacts** | Customers & suppliers with CVR numbers, type classification, linked invoices |
| 📈 | **Financial Reports** | Income statement, balance sheet, general ledger, aging reports, cash flow |
| 🏦 | **Bank Reconciliation** | 3-level matching engine — rule-based → fuzzy (Levenshtein) → LLM-assisted |
| 📋 | **Journal Entries** | Draft/Posted/Cancelled workflow with debit/credit balance validation |
| 🔄 | **Recurring Entries** | Daily/weekly/monthly/quarterly/yearly templates with one-click execution |
| 🎯 | **Budgets** | Monthly budgets per account with actual-vs-budget variance tracking |
| 🔒 | **Fiscal Periods** | Open/closed periods — locking prevents posting to closed months |
| 📅 | **Year-End Closing** | Guided closing that resets P&L accounts and locks all periods automatically |
| 📸 | **Receipt Scanning** | Tesseract.js OCR — auto-extracts amount, date, and VAT from receipts |
| 💱 | **Multi-Currency** | DKK, EUR, USD, GBP, SEK, NOK with exchange rate tracking |

### Compliance & Exports

| | Feature | Details |
|---|---|---|
| 📤 | **SAF-T Export** | Danish Financial Schema v1.0 XML with pre/post validation |
| 📨 | **OIOUBL/Peppol** | BIS Billing 3.0 e-invoice XML with 11-category pre-validation |
| 🔐 | **Audit Trail** | Immutable log — 13+ action types, before/after values, IP & user-agent |
| 🛡️ | **Soft Delete** | Financial data is never physically deleted per Bogføringsloven |
| 💾 | **Backup System** | ZIP with SHA-256, per-tenant auto-scheduling, up to 60-month retention |
| 📦 | **Tenant Export/Import** | Upload & restore from ZIP — transactional with pre-restore safety backup |

### Multi-Tenant & Collaboration

| | Feature | Details |
|---|---|---|
| 🏢 | **Multi-Company** | Belong to multiple companies, switch instantly from sidebar |
| 🔑 | **RBAC** | 5 roles (Owner, Admin, Accountant, Viewer, Auditor) with 20+ permissions |
| ✉️ | **Team Invitations** | Email-based with 7-day expiring tokens and acceptance tracking |
| 👁️ | **Oversight Mode** | SuperDev read-only cross-tenant access for auditing |

### Open Banking

| | Feature | Details |
|---|---|---|
| 🏦 | **Bank Connections** | Demo Bank, Tink, Nordea, Danske Bank, Jyske Bank |
| 🔐 | **OAuth2 + SCA** | Full Strong Customer Authentication consent flow |
| 🔄 | **Auto Sync** | Scheduled transaction synchronization with detailed history |

### AI & Smart Features

| | Feature | Details |
|---|---|---|
| 🤖 | **AI Bank Reconciliation** | LLM-powered level-3 matching with confidence scoring |
| 🏷️ | **Smart Categorization** | 8 keyword groups mapping descriptions to chart accounts |
| ⚡ | **Auto-Post** | Matches above 95% confidence post automatically; 80–95% require approval |

### Dashboard & UX

| | Feature | Details |
|---|---|---|
| 📊 | **19 Dashboard Widgets** | KPIs, charts, forecasts — reorderable, toggleable, per-company defaults |
| ⌨️ | **Command Palette** | `Cmd+K` / `Ctrl+K` quick navigation and actions |
| 🎹 | **Keyboard Shortcuts** | `Alt+N` (new), `Alt+I` (invoices), `Alt+R` (reports), `Alt+V` (VAT) |
| 💚 | **Financial Health Score** | 0–100 composite score analyzing trends, ratios, compliance |
| 🌙 | **Dark/Light Theme** | System-aware with manual override |
| 🇩🇰 | **Danish/English UI** | ~360+ translation keys, one-click switching |
| 📱 | **Responsive Design** | Desktop, tablet, and mobile with bottom nav, FAB, and swipe gestures |
| 📲 | **PWA** | Installable, offline caching via service worker |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser (PWA)                          │
│                                                               │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────────────┐    │
│  │ Zustand  │  │  React   │  │  shadcn/ui (31 comps)    │    │
│  │  Stores  │  │  State   │  │  Recharts · Cmd Palette  │    │
│  │ (6)      │  │          │  │  Mobile Nav · PWA        │    │
│  └────┬─────┘  └────┬─────┘  └──────────────────────────┘    │
│       │              │                                         │
├───────┼──────────────┼─────────────────────────────────────────┤
│       │    REST API (77 route files)                           │
│  ┌────▼──────────────▼──────────────────────────────────┐     │
│  │  Next.js 16 API Routes (App Router, Webpack mode)     │     │
│  │                                                        │     │
│  │  ┌────────────┐ ┌─────────┐ ┌──────────────────────┐ │     │
│  │  │  Session   │ │  RBAC   │ │  Audit Logger        │ │     │
│  │  │  Auth      │ │ 5 roles │ │  (Immutable)         │ │     │
│  │  │ (7-day     │ │ 20+ perm│ │  Rate Limiter        │ │     │
│  │  │  sliding)  │ │         │ │                      │ │     │
│  │  └─────┬──────┘ └─────────┘ └──────────────────────┘ │     │
│  └────────┼──────────────────────────────────────────────┘     │
│           │                                                    │
│  ┌────────▼──────────────────────────────────────────────┐     │
│  │  Prisma ORM → PostgreSQL                               │     │
│  │  23 models · 15 enums · Multi-tenant isolation         │     │
│  └───────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **SPA architecture** — Single route (`/`) with 21 views managed by React state + hash-based routing
- **Multi-tenant isolation** — Every query scoped to `companyId` via `tenantFilter()` in RBAC middleware
- **Session-based auth** — HTTP-only cookie, 7-day sliding expiry, stored in DB with `activeCompanyId`
- **Webpack mode** — Next.js 16 runs with `--webpack` flag for Prisma compatibility (not Turbopack)
- **Immutable audit trail** — All mutations logged, never deletable per Bogføringsloven
- **Soft-delete only** — Financial data is never physically deleted

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | [Bun](https://bun.sh/) | JavaScript runtime, package manager, script runner |
| **Framework** | [Next.js 16](https://nextjs.org/) | React SSR/SSG with App Router (Webpack mode) |
| **UI** | [React 19](https://react.dev/) + [shadcn/ui](https://ui.shadcn.com/) | 31 Radix-based components, New York style |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Static type checking |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS with dark mode |
| **Database** | [PostgreSQL](https://www.postgresql.org/) via [Prisma 6](https://www.prisma.io/) | Relational database with type-safe ORM |
| **State** | [Zustand 5](https://zustand.docs.pmnd.rs/) | Client state (auth, sidebar, language, scanner, widgets) |
| **Forms** | [React Hook Form 7](https://react-hook-form.com/) + [Zod 4](https://zod.dev/) | Form handling & validation |
| **Charts** | [Recharts 2](https://recharts.org/) | Data visualization |
| **PDF** | [pdf-lib](https://pdf-lib.js.org/) | Server-side invoice PDF generation |
| **OCR** | [Tesseract.js 7](https://tesseract.projectnaptha.com/) | Client-side receipt scanning |
| **XML** | [xmlbuilder2](https://github.com/oozcitak/xmlbuilder2) | SAF-T and OIOUBL generation |
| **AI** | [z-ai-web-dev-sdk](https://www.npmjs.com/package/z-ai-web-dev-sdk) | LLM-powered bank reconciliation (level 3) |
| **Email** | [Nodemailer 8](https://nodemailer.com/) | SMTP with jsonTransport dev fallback |
| **Backup** | [Archiver](https://www.npmjs.com/package/archiver) + [JSZip](https://stuk.github.io/jszip/) | ZIP creation and extraction |
| **Scheduling** | [node-cron 4](https://www.npmjs.com/package/node-cron) | Per-tenant automated backup scheduling |
| **Process** | [PM2](https://pm2.keymetrics.io/) + [Caddy](https://caddyserver.com/) | Production process management & HTTPS |

---

## Database

PostgreSQL with **23 models** and **15 enums**, fully multi-tenant:

```
Company (tenant boundary)
 ├── UserCompany (role-based junction)
 ├── Invitation (7-day expiring tokens)
 ├── Account (chart of accounts)
 ├── Transaction (sales, purchases, salaries, etc.)
 ├── JournalEntry → JournalEntryLine (double-entry)
 ├── Invoice (with line items, PDF, OIOUBL)
 ├── Contact (customers, suppliers)
 ├── FiscalPeriod (open/closed months)
 ├── BankStatement → BankStatementLine (reconciliation)
 ├── BankConnection → BankConnectionSync (open banking)
 ├── RecurringEntry (automated templates)
 ├── Budget → BudgetEntry (monthly planning)
 ├── Document (attachments)
 ├── Backup (ZIP archives with SHA-256)
 ├── AuditLog (immutable, 13+ action types)
 └── EmailLog (delivery tracking)

User (global identity)
 ├── Session (with activeCompanyId + oversightCompanyId)
 └── Companies[] (via UserCompany junction)
```

### RBAC Roles

| Role | Level | Can Do |
|---|---|---|
| **Owner** | 5 | Full control + ownership transfer + member management |
| **Admin** | 4 | Full control except ownership transfer |
| **Accountant** | 3 | Create/edit all accounting data, no member management |
| **Viewer** | 2 | Read-only access to all accounting data |
| **Auditor** | 1 | Read-only + report exports and audit runs |

---

## API

**77 route files** organized into logical groups. All mutating endpoints require session auth and generate audit log entries.

| Group | Key Endpoints |
|---|---|
| **Auth** | `login`, `register`, `me`, `logout`, `delete-account`, `promote-superdev` |
| **Email Auth** | `send-verification`, `verify-email`, `forgot-password`, `reset-password` |
| **Companies** | `companies`, `companies/[id]/invitations`, `companies/[id]/members` |
| **Accounting** | `accounts`, `transactions`, `journal-entries`, `invoices`, `contacts` |
| **Reports** | `reports`, `ledger`, `vat-register`, `cash-flow`, `profit-loss`, `aging-reports`, `financial-health` |
| **Banking** | `bank-reconciliation`, `bank-connections`, `bank-connections/[id]/consent`, `bank-connections/[id]/sync` |
| **Compliance** | `export-saft`, `fiscal-periods`, `year-end-closing`, `audit-logs`, `backups` |
| **Planning** | `budgets`, `budget-vs-actual`, `recurring-entries` |
| **Smart** | `ai-categorize` |
| **System** | `demo-mode`, `demo-seed`, `oversight`, `widget-settings`, `user/preferences` |

Rate limiting: 5/min for login/register, 1/min for verification emails, 1/5min for password resets.

---

## Danish Bookkeeping Law Compliance

AlphaFlow is built with full **Bogføringslov** compliance:

| Requirement | Implementation |
|---|---|
| **Audit Trail** (§10–12) | Immutable log with timestamp, user, IP, user-agent, and field-level changes |
| **Soft Delete** (§4–8) | Financial entries are cancelled, never physically deleted |
| **Fiscal Periods** | Periods can be locked to prevent posting to closed months |
| **Backup Retention** (§15) | Auto-scheduled ZIP backups with SHA-256, up to 60-month retention |
| **Official Formats** | SAF-T (Danish Financial Schema v1.0) + OIOUBL/Peppol (BIS Billing 3.0) |

---

## Email System

Powered by [Nodemailer](https://nodemailer.com/) with bilingual (Danish/English) HTML templates:

| Flow | Trigger | Token Lifetime |
|---|---|---|
| Email Verification | Registration / re-send | Until used |
| Password Reset | "Forgot password" | 1 hour |
| Team Invitation | Owner/Admin invites | 7 days |
| Owner Notification | System events | — |

**Dev mode** (default): When no SMTP is configured, emails are rendered and logged to console via `jsonTransport` — no emails are actually sent. Perfect for local development.

**Production**: Configure SMTP credentials in `.env` to send real emails.

---

## Backup System

Fully automated per-tenant backup system designed for **Bogføringsloven §15** compliance:

| Feature | Details |
|---|---|
| **Auto-Scheduled Backups** | 4 cron schedules — hourly, daily, weekly, monthly — per tenant |
| **Manual Backups** | On-demand backup creation from the UI at any time |
| **ZIP Snapshots** | Structured JSON files inside a ZIP archive (12 entity types exported) |
| **SHA-256 Checksums** | Every backup is checksummed; verified on restore to detect corruption |
| **Retention Policy** | 24 hourly / 30 daily / 52 weekly / 60 monthly / 999 manual — auto-cleaned daily |
| **Transactional Restore** | Delete + import runs inside a DB transaction — rolls back on failure, no data loss |
| **Pre-Restore Safety** | Automatic safety backup created before any restore operation |
| **Upload & Restore** | Import a backup ZIP from another AlphaFlow instance |
| **First-Data Trigger** | Initial backups created automatically when a tenant first inputs data |
| **Health Monitoring** | Per-tenant scheduler status: idle → pending → healthy/unhealthy |
| **Tenant Isolation** | Each backup contains only one tenant's data; restores never affect other tenants |

**Backup contents** — company settings, chart of accounts, contacts, transactions, invoices, journal entries (with lines & documents), fiscal periods, budgets, recurring entries, bank statements (with lines), bank connections (with syncs), and team members.

**Storage** — organized on disk as `Tenant-Backup/{CompanyName}/{Hourly|Daily|Weekly|Monthly|Manual}/snapshot-*.zip`.

---

## Environment Variables

```env
# ─── Database (REQUIRED) ─────────────────────────────────────────
# PostgreSQL connection string
# Neon:       postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
# Supabase:   postgresql://user:pass@db.xxx.supabase.co:5432/postgres
# Local:      postgresql://user:pass@localhost:5432/alphaflow
DATABASE_URL=

# ─── Email / SMTP (optional — dev mode when not set) ─────────────
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@alphaflow.dk
APP_URL=https://yourdomain.com
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string |
| `SMTP_HOST` | No | — | SMTP server hostname |
| `SMTP_PORT` | No | `587` | SMTP port (587 = TLS, 465 = SSL) |
| `SMTP_USER` | No | — | SMTP username |
| `SMTP_PASS` | No | — | SMTP password or app-specific token |
| `EMAIL_FROM` | No | `noreply@alphaflow.dk` | Sender email address |
| `APP_URL` | No | `http://localhost:3000` | Public base URL for email links |

### Common SMTP Providers

| Provider | Host | Port | Notes |
|---|---|---|---|
| **Gmail** | `smtp.gmail.com` | 587 | Requires App Password (not account password) |
| **Mailgun** | `smtp.mailgun.org` | 587 | Free tier: 1,000 emails/month |
| **SendGrid** | `smtp.sendgrid.net` | 587 | API key as password |
| **Mailtrap** | `smtp.mailtrap.io` | 587 | Testing only — captures emails in sandbox |
| **Amazon SES** | `email-smtp.eu-north-1.amazonaws.com` | 587 | SES SMTP credentials required |

---

## Project Structure

```
AlphaFlow-Postgres/
├── prisma/
│   └── schema.prisma              # 23 models, 15 enums (PostgreSQL)
├── public/
│   ├── logo*.png                  # Brand logos (multiple variants)
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker (3-layer caching)
│   └── VidClips/Onboarding/      # Onboarding images & video
├── scripts/
│   ├── dev-server.ts              # Smart dev starter (port check + Webpack)
│   └── kill-port.ts               # Cross-platform port killer
├── src/
│   ├── app/
│   │   ├── page.tsx               # Root SPA page (auth gate + 21-view router)
│   │   ├── layout.tsx             # Root layout (fonts, PWA, theme, toaster)
│   │   ├── globals.css            # Theme variables, dark mode, animations
│   │   ├── instrumentation.node.ts # Server startup (backup scheduler)
│   │   └── api/                   # 77 API route handlers
│   │       ├── auth/              # Login, register, verify, reset password
│   │       ├── accounts/          # Chart of accounts CRUD + seed
│   │       ├── transactions/      # Transactions + CSV/Peppol export
│   │       ├── journal-entries/   # Double-entry CRUD
│   │       ├── invoices/          # Invoices + PDF + OIOUBL
│   │       ├── contacts/          # Customer/supplier management
│   │       ├── companies/         # Multi-tenant CRUD + invitations + members
│   │       ├── reports/           # Income statement, balance sheet
│   │       ├── bank-reconciliation/ # Import + auto-match + AI
│   │       ├── bank-connections/  # Open Banking (5 providers)
│   │       ├── export-saft/       # SAF-T XML generation
│   │       ├── fiscal-periods/    # Period management + locking
│   │       ├── budgets/           # Budget with variance tracking
│   │       ├── recurring-entries/ # Template management + execution
│   │       ├── year-end-closing/  # Guided year-end process
│   │       ├── backups/           # ZIP backup/restore/scheduler
│   │       ├── audit-logs/        # Immutable audit trail
│   │       └── ...                # And more
│   ├── components/
│   │   ├── ui/                    # 31 shadcn/ui components
│   │   ├── layout/                # AppLayout, Sidebar, CompanySelector
│   │   ├── mobile/                # BottomNav, FAB, SwipeView
│   │   ├── dashboard/             # 19 widget components
│   │   ├── accounting/            # Transaction, invoice, journal forms
│   │   └── shared/                # CommandPalette, NotificationCenter
│   ├── lib/
│   │   ├── db.ts                  # Prisma client singleton
│   │   ├── auth.ts                # Session management + getAuthContext()
│   │   ├── rbac.ts                # Role-based access control + tenantFilter()
│   │   ├── audit.ts               # Immutable audit logger
│   │   ├── email.ts               # Nodemailer with dev/production modes
│   │   ├── email-templates.ts     # Bilingual HTML templates
│   │   ├── saft-xml.ts            # SAF-T XML generation
│   │   ├── oioubl-xml.ts          # OIOUBL/Peppol XML generation
│   │   ├── invoice-pdf.ts         # A4 PDF generation (pdf-lib)
│   │   ├── bank-matching.ts       # 3-level reconciliation engine
│   │   ├── backup-scheduler.ts    # Per-tenant cron scheduling
│   │   └── i18n/                  # ~360+ Danish/English translations
│   └── stores/                    # 6 Zustand stores
│       ├── auth-store.ts          # User, session, company switching
│       ├── sidebar-store.ts       # Sidebar state
│       ├── language-store.ts      # DA/EN toggle
│       ├── scanner-store.ts       # Receipt scanner
│       └── dashboard-widgets.ts   # Widget visibility/ordering
├── .env.example                   # Environment variable template
├── next.config.ts                 # Security headers, caching, PWA config
├── Caddyfile                      # Reverse proxy with HTTPS
├── ecosystem.config.js            # PM2 production config
└── package.json                   # Scripts and dependencies
```

---

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server (port check + Webpack mode) |
| `bun run dev:direct` | Start Next.js dev directly (no port check) |
| `bun run build` | Production build |
| `bun run start` | Start production server on port 3000 |
| `bun run start:pm2` | Start with PM2 process manager |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push schema changes to PostgreSQL |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:reset` | Reset database (⚠️ deletes all data) |
| `bun run kill-port` | Kill process on port 3000 |

---

## Deployment

### Production Stack

- **Runtime**: Bun
- **Process Manager**: PM2 (1 instance, auto-restart, 1.5GB memory limit)
- **Reverse Proxy**: Caddy (automatic HTTPS via Let's Encrypt)
- **Database**: PostgreSQL (Neon, Supabase, or self-hosted)

### Deploy to Ubuntu VPS

```bash
# 1. Set up server
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw
curl -fsSL https://bun.sh/install | bash

# 2. Clone and install
git clone https://github.com/Onezandzeroz/AlphaFlow-Postgres.git
cd AlphaFlow-Postgres
bun install

# 3. Configure environment
cp .env.example .env
nano .env  # Set DATABASE_URL, SMTP_*, APP_URL

# 4. Initialize database
bun run db:push

# 5. Build and start
bun run build
mkdir -p logs
bun run start:pm2
pm2 save && pm2 startup

# 6. Set up Caddy reverse proxy
sudo apt install -y caddy
# Edit /etc/caddy/Caddyfile with your domain → localhost:3000
sudo systemctl restart caddy && sudo systemctl enable caddy

# 7. Firewall
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp
sudo ufw enable
```

### Update an Existing Deployment

```bash
cd AlphaFlow-Postgres
git pull
bun install
bun run db:push
bun run build
pm2 restart alphaflow
```

---

## Security

- **Session-based auth** — HTTP-only cookies, 7-day sliding expiry, bcrypt (12 rounds)
- **Rate limiting** — Login/register: 5/min, verification: 1/min, password reset: 1/5min
- **Security headers** — X-Frame-Options, X-Content-Type-Options, HSTS (via Caddy), CSP-ready
- **Tenant isolation** — All data scoped to `companyId` via RBAC middleware
- **Path traversal protection** — Document serving validates paths
- **Anti-enumeration** — Password reset always returns success regardless of email existence

---

## Built With

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript 5 |
| **Database** | PostgreSQL, Prisma 6 |
| **Styling** | Tailwind CSS 4, shadcn/ui, next-themes |
| **State** | Zustand 5, React Hook Form 7 |
| **AI/ML** | z-ai-web-dev-sdk (LLM), Tesseract.js (OCR) |
| **Documents** | pdf-lib (PDF), xmlbuilder2 (SAF-T/OIOUBL) |
| **Infrastructure** | Bun, PM2, Caddy, PWA Service Worker |
| **Communication** | Nodemailer 8 (SMTP) |

---

## License

Private — All rights reserved.
