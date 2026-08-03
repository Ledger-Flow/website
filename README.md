# LedgerFlow ⚡

> **From Invoice to Insight.**  
> A modern, smart financial management & invoicing platform built specifically for African & Nigerian SMEs.

---

## 📌 Project Overview

**LedgerFlow** is an all-in-one business management platform designed to help Small and Medium Enterprises (SMEs) streamline their daily operations. By unifying invoicing, inventory management, local tax tracking, and AI-driven business intelligence into a cohesive dashboard, LedgerFlow enables business owners to turn raw transactional data into actionable growth insights.

---

## 💥 Problems Solved

Small and medium-sized businesses in emerging markets—particularly Nigeria—face several operational friction points:

1. **Manual & Unprofessional Invoicing**: Business owners spend unnecessary time crafting invoices manually, leading to calculation errors, missing payment tracking, and inconsistent branding.
2. **Inventory Disconnect**: Lack of real-time stock visibility leads to unexpected stockouts, loss of sales, or capital tied up in overstocked goods.
3. **Tax Compliance Headaches**: Calculating local tax obligations (such as Nigeria's 7.5% Value Added Tax and Withholding Tax) manually creates compliance risks and filing stress.
4. **Lack of Financial Intelligence**: Most SMEs operate without dedicated accountants or financial analysts, making it difficult to understand sales trends, top customers, or stock velocity.

---

## 💡 How LedgerFlow Solves It

LedgerFlow provides a centralized, easy-to-use digital workspace:

- 🧾 **Automated Invoice Generation & PDF Export**: Create, customize, and issue professional invoices in seconds. Includes automatic tax/discount calculations and one-click PDF downloading with custom business logos and signatures (`jsPDF`).
- 📦 **Smart Inventory & SKU Tracking**: Track stock levels in real-time with automatically generated SKUs (`cuid2`) based on business and product names, paired with low-stock warnings.
- 🇳🇬 **Built-In Nigerian Tax Calculations**: Pre-configured with local tax regulations (default 7.5% VAT), filing history tracking, status flags (filed/pending), and exportable tax summaries.
- 🤖 **AI-Powered Business Assistant**: Interactive chat interface where business owners can query their data using natural language (e.g., *"Summarize my sales this month"*, *"Calculate VAT for last month"*, *"Which items are low in stock?"*).
- 👥 **Team & Role Delegation**: Invite staff members (Admins, Managers, Sales Reps) to generate invoices and manage operations with granular permissions.
- 📊 **Interactive Analytics & KPIs**: Real-time sales charts (`Recharts`), total revenue metrics, customer activity highlights, and performance summaries.
- 💳 **Credit System**: Integrated credit tracking for managing AI query quotas and premium action usage.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`, `clsx`, `tailwind-merge`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/) (`@radix-ui/react-*`) & [Lucide React Icons](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)

### **Backend & Database Integrations**
- **Database / Backend**: [Supabase](https://supabase.com/) (PostgreSQL pooler & direct connection, Supabase Auth via `@supabase/ssr` & `@supabase/supabase-js`)
- **ORM**: [Prisma](https://www.prisma.io/) (`@prisma/client`, `@prisma/adapter-pg`)
- **State & Data Fetching**: React Context API + `useReducer`, [TanStack React Query](https://tanstack.com/query/latest) (`@tanstack/react-query`), Axios

### **Utilities & Tools**
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **ID & SKU Generation**: [@paralleldrive/cuid2](https://github.com/paralleldrive/cuid2)
- **Date Handling**: `date-fns`
- **Toasts & Notifications**: [Sonner](https://sonner.emilkowal.si/)

---

## 📁 Code Structure

```text
frontend/
├── src/
│   ├── api/                 # API service functions (e.g., Supabase Auth APIs)
│   ├── app/                 # Next.js App Router structure
│   │   ├── (website)/       # Public marketing landing pages (Hero, Features, Pricing, etc.)
│   │   ├── auth/            # Authentication flow (Sign-in / Sign-up)
│   │   └── dashboard/       # Main SaaS application layout & navigation
│   │       ├── (pages)/     # Functional module routes:
│   │       │   ├── ai/        # AI Business Assistant chat view
│   │       │   ├── credit/    # Credit balance & transaction history
│   │       │   ├── customers/ # Customer management directory & details
│   │       │   ├── inventory/ # Stock management & SKU generator
│   │       │   ├── invoices/  # Invoice creation, viewing & PDF export
│   │       │   ├── profile/   # Business profile & branding settings
│   │       │   ├── tax/       # Tax compliance & VAT tracking
│   │       │   └── team/      # Team member management & roles
│   │       ├── components/  # Dashboard-specific components & onboarding flow
│   │       ├── page.tsx     # Main analytics overview dashboard
│   │       └── DashboardProvider.tsx # Dashboard wrapper with sidebar & state
│   ├── components/          # Reusable shared UI primitives (Buttons, Cards, Dialogs, Tables)
│   ├── constant/            # Application constants, mock initial states & defaults
│   ├── context/             # React Context Providers (Invoice, Inventory, Customer, Profile, Team)
│   ├── data/                # Mock datasets for analytics, credit, and KPIs
│   ├── hooks/               # Custom React hooks (useAuth, useToggle, useMobile, useScrollY)
│   ├── lib/                 # Third-party integrations (Supabase client/server/proxy helpers)
│   ├── types/               # TypeScript type definitions (Invoice, Customer, Member, Profile)
│   └── utils/               # Business logic (PDF generator, SKU builder, Tax math, Formatters)
├── public/                  # Static assets (logos, icons, hero images)
├── .env                     # Environment variables (Supabase & Database connection strings)
├── package.json             # Node dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Current Stage of the Project

The project is currently in the **MVP / Beta Stage**:

- ✅ **Completed**:
  - Full responsive UI/UX for all core modules (Invoices, Inventory, Tax, AI Chat, Team, Customers, Profile, Credit).
  - Client-side dynamic PDF invoice compilation with custom branding and tax calculations.
  - Multi-context state management layer (`InvoiceProvider`, `CustomerProvider`, `InventoryProvider`, `ProfileProvider`, `TeamProvider`).
  - Supabase authentication integration & database environment setup.
  - Marketing landing page and interactive onboarding sequence.

- ⏳ **In Progress / Next Steps**:
  - **Live AI Engine Integration**: Connect the AI Assistant UI to LLM API endpoints (e.g., Gemini API via Firebase AI Logic or OpenAI) for real data querying.
  - **Full Persistence Migration**: Sync all local React Context stores directly to Supabase PostgreSQL database tables using Prisma ORM.
  - **Payment Gateway Integration**: Add Paystack / Flutterwave integration for online invoice payments and automated credit top-ups.
  - **Automated Tax Export**: Generate official tax return PDF/CSV exports compatible with FIRS (Federal Inland Revenue Service) reporting standards.

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** / **yarn** / **pnpm** / **bun**
- **Supabase Account** (for authentication and database connection)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/LedgerFlow.git
   cd LedgerFlow/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create or verify `.env` in the `frontend` directory:
   ```env
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   DIRECT_URL="postgresql://postgres:[password]@[host]:6543/postgres"

   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   SUPABASE_SECRET_KEY=your-supabase-secret-key

   NEXT_PUBLIC_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the Application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 License

This project is proprietary and developed for SME business management. All rights reserved.
