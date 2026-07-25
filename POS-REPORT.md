# Mega-Aide POS System — Complete Technical Report

**Generated:** July 25, 2026  
**Version:** 0.1.0  
**Live URL:** https://mega-aide-pos.vercel.app  
**Repository:** https://github.com/SyndromeIdeas/Mega-Aide-POS  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Database Schema](#5-database-schema)
6. [Pages & Routes](#6-pages--routes)
7. [Components](#7-components)
8. [API Endpoints](#8-api-endpoints)
9. [Features](#9-features)
10. [PWA Configuration](#10-pwa-configuration)
11. [Deployment](#11-deployment)
12. [Environment Variables](#12-environment-variables)

---

## 1. Executive Summary

Mega-Aide POS is a full-stack Point of Sale web application built with **Next.js 14 (App Router)**, **Prisma ORM**, **PostgreSQL (Supabase)**, and **shadcn/ui**. It provides a complete retail management experience including product inventory, transaction processing, analytics dashboards, and thermal receipt printing. The app is deployed as a **Progressive Web App (PWA)** on **Vercel** with offline support.

**Core Capabilities:**
- Product CRUD with 4 categories (Electronics, Drinks, Food, Fashion)
- POS transaction flow (cart → checkout → receipt)
- Real-time inventory tracking with restock functionality
- Analytics: product sales, favorite products, income/profit breakdown
- Thermal receipt printing (80mm)
- Dark/Light theme toggle
- PWA with offline fallback
- Currency: **GH₵ (Ghanaian Cedi)**
- Configurable store name and tax rate

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 14.2.3 |
| **Language** | TypeScript | 5.4.5 |
| **UI Library** | React | 18.x |
| **Styling** | Tailwind CSS | 3.4.1 |
| **UI Components** | shadcn/ui (New York style) | — |
| **Animations** | Framer Motion | 11.1.8 |
| **Database** | PostgreSQL (Supabase) | — |
| **ORM** | Prisma | 5.14.0 |
| **Charts** | ApexCharts (react-apexcharts) | 1.9.0 / 3.54.1 |
| **Forms** | react-hook-form + Zod | — |
| **HTTP Client** | Axios | 1.6.8 |
| **Theming** | next-themes | — |
| **Icons** | Lucide React + Tabler Icons | — |
| **Toasts** | react-toastify | — |
| **Print** | react-to-print | — |
| **Date Utils** | date-fns | — |
| **Fonts** | Inter (Google Fonts) | — |
| **Analytics** | Vercel Analytics + Speed Insights | — |
| **Code Quality** | ESLint + Prettier | — |
| **PWA** | Custom Service Worker + manifest.json | — |
| **Container** | Docker (node:lts-alpine) | — |

---

## 3. Project Structure

```
pos-system/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (Inter font, ThemeProvider, PWA meta)
│   ├── page.tsx                      # Landing page (typewriter animation)
│   ├── globals.css                   # Global CSS (CSS variables, ApexCharts dark mode)
│   ├── error.tsx                     # Global error boundary
│   ├── (root)/                       # Route group (dashboard shell)
│   │   ├── layout.tsx                # Dashboard layout (sidebar + header + breadcrumbs)
│   │   ├── home/page.tsx             # Home dashboard (BentoGrid)
│   │   ├── orders/page.tsx           # POS Orders page
│   │   ├── product/page.tsx          # Product management page
│   │   ├── records/page.tsx          # Transaction records page
│   │   ├── records/[id]/page.tsx     # Transaction detail/receipt page
│   │   ├── analytics/                # Analytics pages
│   │   │   ├── page.tsx              # Analytics hub
│   │   │   ├── product/page.tsx      # Product analytics hub
│   │   │   ├── product/sales/page.tsx
│   │   │   ├── product/favorites/page.tsx
│   │   │   └── income/page.tsx
│   │   ├── settings/page.tsx         # Store settings
│   │   └── technologies/page.tsx     # Tech showcase
│   └── api/                          # 14 API route handlers
│       ├── dashboard/route.ts
│       ├── product/route.ts
│       ├── product/[id]/route.ts
│       ├── storage/route.ts
│       ├── transactions/route.ts
│       ├── transactions/[id]/route.ts
│       ├── onsale/route.ts
│       ├── onsale/[id]/route.ts
│       ├── shopdata/route.ts
│       ├── shopdata/[id]/route.ts
│       ├── profit/route.ts
│       ├── productsale/route.ts
│       ├── favorite/route.ts
│       ├── restock/route.ts
│       └── restock/[id]/route.ts
├── components/                       # 74+ React components
│   ├── ui/                           # shadcn/ui primitives (28 files)
│   ├── dashboard/                    # Navbar, breadcrumb, mobile sheet
│   ├── bento/                        # Bento grid home dashboard
│   ├── charts/                       # 4 ApexCharts visualizations
│   ├── order/                        # POS order management
│   ├── tableproduct/                 # Product table CRUD
│   ├── tablerecords/                 # Transaction records table
│   ├── card/                         # Dashboard stats cards
│   ├── setting/                      # Settings cards
│   ├── skeleton/                     # Loading skeletons
│   ├── clock/                        # Digital clock widget
│   ├── date/                         # Date display widget
│   ├── weather/                      # Weather widget
│   ├── networkspeed/                 # Network speed widget
│   ├── fullscreen/                   # Fullscreen toggle
│   ├── search/                       # Debounced search input
│   ├── scrollarea/                   # Collapsible analytics menu
│   ├── paginations/                  # Smart pagination
│   ├── darkmode/                     # Theme toggle dropdown
│   ├── toaster/                      # Error boundary
│   ├── sw-registration.tsx           # Service Worker registration
│   └── theme-provider.tsx            # ThemeProvider wrapper
├── constant/                         # Navigation items
│   ├── navbarMenu.tsx
│   └── chartList.tsx
├── data/                             # Data fetching layer
│   ├── product.ts
│   ├── records.ts
│   └── stock.ts
├── lib/                              # Utilities
│   ├── utils.ts                      # cn() helper + pagination range
│   ├── db.ts                         # Prisma singleton
│   ├── even.ts                       # EventEmitter event bus
│   └── charts.ts                     # ApexCharts options
├── schema/                           # Zod validation
│   └── index.ts
├── types/                            # TypeScript types
│   ├── Navbar.ts
│   ├── paginations.ts
│   └── transaction.ts
├── prisma/                           # Database
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── styles/
│   └── skeleton.css
├── public/                           # Static assets
│   ├── manifest.json
│   ├── sw.js
│   ├── offline.html
│   └── icons/
├── Dockerfile
├── .npmrc
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── components.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 4. Design System

### 4.1 Color Palette

#### CSS Variables — Light Mode

| Variable | HSL Value | Hex Equivalent | Usage |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#FFFFFF` | Page background |
| `--foreground` | `240 10% 3.9%` | `#0A0A0B` | Primary text |
| `--primary` | `142.1 76.2% 36.3%` | `#22C55E` | Primary actions (green) |
| `--primary-foreground` | `355.7 100% 97.3%` | `#FEF2F2` | Text on primary |
| `--secondary` | `240 4.8% 95.9%` | `#F3F4F6` | Secondary backgrounds |
| `--secondary-foreground` | `240 5.9% 10%` | `#1A1A1C` | Text on secondary |
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Delete/error actions |
| `--muted` | `240 4.8% 95.9%` | `#F3F4F6` | Muted backgrounds |
| `--muted-foreground` | `240 3.8% 46.1%` | `#737373` | Muted text |
| `--accent` | `240 4.8% 95.9%` | `#F3F4F6` | Accent backgrounds |
| `--accent-foreground` | `240 5.9% 10%` | `#1A1A1C` | Text on accent |
| `--card` | `0 0% 100%` | `#FFFFFF` | Card backgrounds |
| `--card-foreground` | `240 10% 3.9%` | `#0A0A0B` | Card text |
| `--popover` | `0 0% 100%` | `#FFFFFF` | Popover backgrounds |
| `--popover-foreground` | `240 10% 3.9%` | `#0A0A0B` | Popover text |
| `--border` | `240 5.9% 90%` | `#E5E7EB` | Border color |
| `--input` | `240 5.9% 90%` | `#E5E7EB` | Input borders |
| `--ring` | `142.1 76.2% 36.3%` | `#22C55E` | Focus ring (green) |
| `--radius` | `1rem` | `16px` | Base border radius |

#### CSS Variables — Dark Mode

| Variable | HSL Value | Hex Equivalent | Usage |
|---|---|---|---|
| `--background` | `20 14.3% 4.1%` | `#0C0A09` | Page background |
| `--foreground` | `0 0% 95%` | `#F3F4F6` | Primary text |
| `--primary` | `142.1 70.6% 45.3%` | `#34D399` | Primary actions (brighter green) |
| `--primary-foreground` | `144.9 80.4% 10%` | `#052E16` | Text on primary |
| `--secondary` | `240 3.7% 15.9%` | `#262626` | Secondary backgrounds |
| `--secondary-foreground` | `0 0% 98%` | `#FAFAFA` | Text on secondary |
| `--destructive` | `0 62.8% 30.6%` | `#7F1D1D` | Delete/error (muted red) |
| `--muted` | `240 3.7% 15.9%` | `#262626` | Muted backgrounds |
| `--muted-foreground` | `240 5% 64.9%` | `#A3A3A3` | Muted text |
| `--accent` | `12 6.5% 15.1%` | `#292524` | Warm dark accent |
| `--accent-foreground` | `0 0% 98%` | `#FAFAFA` | Text on accent |
| `--card` | `24 9.8% 10%` | `#1C1917` | Warm dark cards |
| `--card-foreground` | `0 0% 95%` | `#F3F4F6` | Card text |
| `--border` | `240 3.7% 15.9%` | `#262626` | Border color |
| `--input` | `240 3.7% 15.9%` | `#262626` | Input borders |
| `--ring` | `142.4 71.8% 29.2%` | `#16A34A` | Focus ring |

#### Custom Tailwind Colors

| Name | Hex | Usage |
|---|---|---|
| `chartbody` | `#0F0F0F` | Dark chart backgrounds |
| `body` | `#64748B` | Gray body text |
| `bodydark` | `#AEB7C0` | Light text (dark mode) |
| `bodydark1` | `#DEE4EE` | Lighter text (dark mode) |
| `primarychart` | `#3C50E0` | Blue for charts |
| `secondarychart` | `#80CAEE` | Light blue for charts |
| `stroke` | `#E2E8F0` | Light border stroke |
| `strokedark` | `#2E3A47` | Dark border stroke |
| `gr` | `#EFF4FB` | Light gray background |
| `whiter` | `#F5F7FD` | Near-white background |
| `meta-4` | `#313D4A` | Dark mode header |
| `boxdark` | `#24303F` | Dark mode box |
| `de` | `0px 8px 13px -3px rgba(0,0,0,0.07)` | Box shadow |
| `ca` | `rgba(0,0,0,0.12)` | Box shadow |

#### PWA Theme Color

| Name | Hex | Usage |
|---|---|---|
| `theme_color` | `#F68B1E` | Orange — browser theme, status bar, PWA header |

#### Chart Colors

| Chart | Colors | Type |
|---|---|---|
| Chart One (Product Sales) | `#80CAEE` (fill) / `#3C50E0` (stroke) | Area chart |
| Chart Two (Favorites) | `#3C50E0` | Bar chart |
| Chart Three (Product Sales Alt) | `#3C50E0` | Bar chart |
| Chart Four (Income) | `#3f4` (net income), `#DC143C` (tax), `#80CAEE` (gross) | Line chart |

### 4.2 Typography

| Property | Value |
|---|---|
| **Primary Font** | Inter (Google Fonts, via `next/font/google`) |
| **Chart Font** | Satoshi (declared in ApexCharts options) |
| **Font Weights Used** | 400 (regular), 500 (medium), 600 (semibold), 700 (bold) |

### 4.3 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `1rem` (16px) | Base radius |
| `lg` | `var(--radius)` | Large radius (16px) |
| `md` | `calc(var(--radius) - 2px)` | Medium radius (14px) |
| `sm` | `calc(var(--radius) - 4px)` | Small radius (12px) |

### 4.4 Animations

| Name | Duration | Usage |
|---|---|---|
| `accordion-down` | 0.2s ease-out | Collapsible sections open |
| `accordion-up` | 0.2s ease-out | Collapsible sections close |
| `shimmer` | 1.5s infinite | Skeleton loading effect |
| `metallic` | 1.5s infinite | Metallic gradient animation |
| Framer Motion | Variable | Card hover, page transitions, skeleton transitions |

### 4.5 Custom Tailwind Plugins

- **bg-grid** — SVG grid pattern backgrounds (large)
- **bg-grid-small** — SVG grid pattern backgrounds (small)
- **bg-dot** — SVG dot pattern backgrounds
- **addVariablesForColors** — Generates CSS custom properties for all Tailwind colors

---

## 5. Database Schema

### 5.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│  ProductStock │──1:N──│   Product    │──1:N──│  OnSaleProduct   │──N:1──│  Transaction │
│              │       │              │       │                  │       │              │
│ id (PRD-xxx) │       │ id (cuid)    │       │ id (cuid)        │       │ id (TRS-xxx) │
│ name         │       │ productId FK │       │ productId FK     │       │ totalAmount  │
│ imageProduct │       │ sellprice    │       │ quantity         │       │ createdAt    │
│ price (buy)  │       │              │       │ saledate         │       │ isComplete   │
│ stock        │       │              │       │ transactionId FK │       │              │
│ cat (enum)   │       │              │       │                  │       │              │
└──────────────┘       └──────────────┘       └──────────────────┘       └──────────────┘

┌──────────────┐       ┌──────────────┐
│  ShopData    │       │    User      │
│ (singleton)  │       │              │
│ id (cuid)    │       │ id (cuid)    │
│ tax (0-100)  │       │ name         │
│ name (store) │       │ username     │
│              │       │ email        │
│              │       │ password     │
│              │       │ role (enum)  │
│              │       │ image        │
└──────────────┘       └──────────────┘
```

### 5.2 Models Detail

#### ProductStock (Inventory Master)

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, unique, `PRD-{uuid8}` | Product identifier |
| `name` | String | required | Product name |
| `imageProduct` | String? | optional | Image URL |
| `price` | Float | required | Buy/cost price |
| `stock` | Float | required | Current stock quantity |
| `cat` | CatProduct | enum | Category |
| `Product` | Product[] | relation | Linked sell-price records |

#### Product (Sell Price Record)

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, cuid | Internal ID |
| `productId` | String | FK → ProductStock, unique | Links to inventory |
| `sellprice` | Float | required | Selling price |
| `OnSaleProduct` | OnSaleProduct[] | relation | Transaction line items |

#### OnSaleProduct (Transaction Line Item)

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, cuid | Line item ID |
| `productId` | String | FK → Product | Product reference |
| `quantity` | Int | required | Quantity sold |
| `saledate` | DateTime | default: now() | Sale timestamp |
| `transactionId` | String | FK → Transaction | Parent transaction |

#### Transaction

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, `TRS-{uuid8}` | Transaction ID |
| `totalAmount` | Decimal? | optional | Total sale amount |
| `createdAt` | DateTime | default: now() | Creation time |
| `isComplete` | Boolean | default: false | Checkout status |
| `products` | OnSaleProduct[] | relation | Line items |

#### ShopData (Singleton Config)

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, cuid | Config ID |
| `tax` | Int? | 0–100 | Tax percentage |
| `name` | String? | — | Store name |

#### User

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | String | PK, cuid | User ID |
| `name` | String | required | Display name |
| `username` | String | required | Login username |
| `email` | String? | unique | Email address |
| `emailVerified` | DateTime? | — | Verification timestamp |
| `image` | String? | — | Avatar URL |
| `password` | String? | — | Hashed password |
| `role` | UserRole | enum, default: UNKNOW | Access level |

### 5.3 Enums

| Enum | Values |
|---|---|
| `UserRole` | `OWNER`, `WORKER`, `UNKNOW` |
| `CatProduct` | `ELECTRO`, `DRINK`, `FOOD`, `FASHION` |

### 5.4 Migrations Applied

15 total migrations in chronological order, covering initial schema through shop data.

---

## 6. Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Typewriter animation: "Optimizing your business with the best Solution" → links to /home |
| `/home` | Dashboard Home | BentoGrid: Clock, Weather, Date, Dashboard Stats (stock/amount/quantity), Network Speed |
| `/orders` | POS Orders | Create transaction → add products to cart → adjust quantities → checkout → receipt print |
| `/product` | Products | Product table with search, pagination, add/edit/restock/delete modals |
| `/records` | Records | Transaction history table with search, pagination, status badges |
| `/records/[id]` | Transaction Detail | Full receipt view with print (80mm thermal format) |
| `/analytics` | Analytics Hub | Two cards: Product Analytics, Income Analytics |
| `/analytics/product` | Product Analytics | Links to Sales and Favorites charts |
| `/analytics/product/sales` | Product Sales Chart | Area chart with date range picker (daily quantity sold) |
| `/analytics/product/favorites` | Top 5 Favorites | Bar chart of best-selling products |
| `/analytics/income` | Income Chart | Line chart: Net Income (green), Tax (crimson), Gross (blue) with date range |
| `/settings` | Settings | Edit store name + tax rate (0–100%) |
| `/technologies` | Tech Showcase | Hover cards linking to Aceternity UI, Shadcn, Next.js, Prisma, AWS, Vercel |

### Navigation Menu

| Icon | Title | Route |
|---|---|---|
| Home | Home | `/home` |
| ShoppingCart | Orders | `/orders` |
| Package | Product | `/product` |
| Archive | Records | `/records` |
| Settings | Settings | `/settings` |
| Star | Technologies | `/technologies` |

### Analytics Sub-Menu (Sidebar Scroll)

| Icon | Title | Route |
|---|---|---|
| Activity | Total Products Sales | `/analytics/product/sales` |
| Crown | Favorite Products | `/analytics/product/favorites` |
| HandCoins | Income | `/analytics/income` |

---

## 7. Components

### 7.1 shadcn/ui Primitives (28 components)

`accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `button`, `calendar`, `card`, `checkbox`, `command`, `dialog`, `dropdown-menu`, `form`, `hover-card`, `input`, `label`, `menubar`, `navigation-menu`, `popover`, `progress`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `sonner`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `tooltip`

### 7.2 Layout & Navigation

| Component | File | Description |
|---|---|---|
| DashboardSidebar | `components/dashboard/Dashboard-Sidebar.tsx` | Desktop sidebar with logo, nav items, analytics sub-menu |
| DashboardHeader | `components/dashboard/Dashboard-Header.tsx` | Top header with breadcrumbs, search, theme toggle, clock, fullscreen |
| NavbarSheet | `components/dashboard/NavbarSheet.tsx` | Mobile hamburger menu (slide-out sheet) |
| Breadcrumbs | `components/dashboard/Breadcrumb.tsx` | Auto-generated breadcrumbs from pathname |

### 7.3 POS & Transactions

| Component | File | Description |
|---|---|---|
| OrderCard | `components/order/` | Full POS order flow: product selection, quantity, cart management, checkout |
| TransactionDetail | `app/(root)/records/[id]/page.tsx` | Receipt display with print button |
| TableBody (Records) | `components/tablerecords/` | Transaction history table rows |

### 7.4 Products

| Component | File | Description |
|---|---|---|
| ProductTable | `components/tableproduct/` | Product CRUD table with search, pagination |
| TableBody (Products) | `components/tableproduct/components/TableBody.tsx` | Product rows with edit/restock/delete actions |
| AddProductDialog | `components/tableproduct/` | Modal for creating new products |
| EditProductDialog | `components/tableproduct/` | Modal for editing existing products |
| RestockDialog | `components/tableproduct/` | Modal for adding stock to products |

### 7.5 Dashboard Widgets

| Component | File | Description |
|---|---|---|
| BentoGrid | `components/bento/` | Grid layout for home dashboard |
| ClockWidget | `components/clock/` | Real-time digital clock with rotation animation |
| DateWidget | `components/date/` | Current date display |
| WeatherWidget | `components/weather/` | OpenWeatherMap integration (error-suppressed) |
| NetworkSpeedWidget | `components/networkspeed/` | Browser network speed detection |
| DashboardCard | `components/card/` | Stats cards (total stock, total amount, total quantity) |
| FullscreenButton | `components/fullscreen/` | Toggle browser fullscreen mode |

### 7.6 Charts

| Component | File | Description |
|---|---|---|
| ChartOne | `components/charts/chartone.tsx` | Product sales area chart (daily quantity) |
| ChartTwo | `components/charts/charttwo.tsx` | Top 5 favorite products bar chart |
| ChartThree | `components/charts/chartthree.tsx` | Product sales bar chart variant |
| ChartFour | `components/charts/chartfour.tsx` | Income line chart (net, tax, gross) |

### 7.7 Utilities

| Component | File | Description |
|---|---|---|
| SearchInput | `components/search/` | Debounced search with ClearButton |
| Pagination | `components/paginations/` | Smart pagination (prev, pages, next) |
| ThemeToggle | `components/darkmode/` | Light/Dark/System dropdown selector |
| SkeletonLoader | `components/skeleton/` | Loading placeholders for products and records |
| SWRegistration | `components/sw-registration.tsx` | Registers service worker for PWA |
| ErrorBoundary | `components/toaster/ErrorBoundary.tsx` | Class-based error boundary |

---

## 8. API Endpoints

### 8.1 Dashboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Aggregate stats: total stock, total amount, total quantity |

### 8.2 Products

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/product` | Create product (auto-generates `PRD-{uuid8}` ID) |
| `PATCH` | `/api/product/[id]` | Update product (name, stock, price, category, sell price) |
| `DELETE` | `/api/product/[id]` | Delete product (cascades to Product) |

### 8.3 Storage (Inventory)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/storage` | Fetch all ProductStock records with sell prices |

### 8.4 Transactions

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/transactions` | Create new transaction (auto-generates `TRS-{uuid8}`) |
| `GET` | `/api/transactions/[id]` | Fetch transaction with all OnSaleProducts + product details |
| `PATCH` | `/api/transactions/[id]` | Checkout: deduct stock, set totalAmount, mark isComplete |
| `DELETE` | `/api/transactions/[id]` | Delete transaction |

### 8.5 Cart (OnSale)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/onsale` | Add product to cart (or increment quantity if already in cart) |
| `PATCH` | `/api/onsale/[id]` | Update cart item quantity |
| `DELETE` | `/api/onsale/[id]` | Remove cart item |

### 8.6 Shop Data

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/shopdata` | Fetch store name + tax rate |
| `PATCH` | `/api/shopdata/[id]` | Update store name OR tax rate |

### 8.7 Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profit?start=&end=` | Income analytics: net income, tax, gross by date range |
| `GET` | `/api/productsale?start=&end=` | Product sales: daily quantity by date range |
| `GET` | `/api/favorite` | Top 5 best-selling products (by total quantity) |

### 8.8 Restock

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/restock` | Bulk restock: add stock to ALL products |
| `PATCH` | `/api/restock/[id]` | Restock single product |

---

## 9. Features

### 9.1 Point of Sale

- **Transaction Flow:** Create transaction → Add products → Adjust quantities → Checkout
- **Cart Logic:** Adding same product increments quantity (no duplicates)
- **Stock Deduction:** Automatic on checkout (PATCH `/api/transactions/[id]`)
- **Receipt Printing:** 80mm thermal receipt format via `react-to-print`
- **Transaction IDs:** Custom format `TRS-{uuid8}`

### 9.2 Product Management

- **CRUD Operations:** Create, Read, Update, Delete products
- **4 Categories:** Electronics, Drinks, Food, Fashion
- **Dual Pricing:** Buy price (cost) and Sell price — enforced sell > buy
- **Stock Tracking:** Real-time inventory levels
- **Search & Pagination:** Debounced search across product names
- **Product IDs:** Custom format `PRD-{uuid8}`

### 9.3 Inventory

- **Individual Restock:** Add stock to specific products
- **Bulk Restock:** Add stock to all products simultaneously
- **Stock Alerts:** Displayed on dashboard cards

### 9.4 Analytics

- **Product Sales:** Daily quantity sold over date range (area chart)
- **Top 5 Favorites:** Best-selling products by total quantity (bar chart)
- **Income Breakdown:**
  - Net Income = Sell Price - Buy Price (per unit, aggregated)
  - Tax Income = Sell Price × Tax Rate
  - Gross Income = Sell Price + Tax
  - Date range selection with daily granularity

### 9.5 Transaction Records

- **History Table:** All transactions with status badges (Complete/Pending)
- **Detail View:** Full receipt with product names, quantities, prices
- **Search:** Filter by transaction ID or product names

### 9.6 Settings

- **Store Name:** Configurable display name
- **Tax Rate:** 0–100% (applied to all sales in analytics)

### 9.7 UI/UX

- **Dark/Light/System Theme:** Toggle via dropdown
- **Responsive Design:** Desktop sidebar → Mobile hamburger sheet
- **Breadcrumbs:** Auto-generated from URL path
- **Loading Skeletons:** Shimmer animation for products and records
- **Search:** Debounced with clear button
- **Pagination:** Smart page range with prev/next
- **Fullscreen Mode:** Toggle for kiosk-style use
- **Digital Clock:** Real-time with rotation animation
- **Weather Widget:** OpenWeatherMap integration
- **Network Speed Widget:** Browser network speed detection
- **Framer Motion Animations:** Card hover effects, page transitions

---

## 10. PWA Configuration

### 10.1 manifest.json

```json
{
  "name": "POS - Point of Sale",
  "short_name": "POS",
  "description": "Point of Sale system for managing products, inventory, and transactions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#F68B1E",
  "orientation": "any",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "apple-touch-icon": "/icons/apple-touch-icon.png",
  "categories": ["business", "utilities"]
}
```

### 10.2 Service Worker (sw.js)

- **Strategy:** Cache-first with network fallback
- **Cache Name:** `pos-cache-v1`
- **Cached Assets:** `/`, `/offline`, icon files
- **Offline Fallback:** Custom `/offline.html` page
- **Auto-update:** Skips waiting, claims clients on activate

### 10.3 PWA Icons

| File | Size | Purpose |
|---|---|---|
| `icon-192x192.png` | 192×192 | Android home screen |
| `icon-512x512.png` | 512×512 | Splash screen |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `favicon.png` | 32×32 | Browser tab |

### 10.4 Registration

Service worker is registered via `components/sw-registration.tsx` and mounted in the root layout.

---

## 11. Deployment

### 11.1 Vercel

| Property | Value |
|---|---|
| **Platform** | Vercel |
| **Region** | Washington D.C. (iad1) |
| **Branch** | main |
| **Build Command** | `npm run build` |
| **Framework** | Next.js 14.2.3 |
| **Node Version** | LTS |
| **Root Directory** | `/` (repo root) |

### 11.2 Docker

```dockerfile
FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

### 11.3 Database (Supabase)

| Property | Value |
|---|---|
| **Provider** | Supabase (PostgreSQL) |
| **Project ID** | `idkrsqpdamsetgybvehy` |
| **Region** | AWS `eu-west-1` |
| **Direct Connection** | `db.awlhcmwvixzquxonqelr.supabase.co:5432` |
| **Pooler (Runtime)** | `aws-0-eu-west-1.pooler.supabase.com:6543` |
| **ORM** | Prisma 5.14.0 |
| **Migrations** | 15 applied |

---

## 12. Environment Variables

| Variable | Value | Usage |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres.idkrsqpdamsetgybvehy:[password]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true` | Prisma runtime queries (port 6543, pgbouncer) |
| `DIRECT_URL` | `postgresql://postgres.idkrsqpdamsetgybvehy:[password]@db.awlhcmwvixzquxonqelr.supabase.co:5432/postgres` | Prisma migrations (port 5432, direct) |
| `WEATHER_API` | *(placeholder)* | OpenWeatherMap API key |

---

## Validation Schemas (Zod)

| Schema | Fields | Rules |
|---|---|---|
| `productSchema` | productName, buyPrice, sellPrice, stockProduct, category | name ≥ 2 chars, buyPrice ≥ GH₵0.05, sellPrice ≥ GH₵0.01, stock ≥ 1, sell > buy |
| `onsaleSchema` | productId, qTy, transactionId | All required, qTy ≥ 1 |
| `orderSchema` | qTy | qTy ≥ 1 |
| `taxSchema` | tax | 0 ≤ tax ≤ 100 |
| `shopnameSchema` | storeName | ≥ 2 chars |
| `restockSchema` | stock | stock ≥ 1 |

---

*Report generated by Mega-Aide POS codebase analysis — July 25, 2026*
