# Point of Sale (POS) Application

This is a full-featured Point of Sale (POS) system built using **Next.js 14**, **Prisma ORM**, and **Supabase** for database management. The system is designed for managing product inventories, transactions, and sales reports, with a user-friendly interface for retail businesses.

## Features

- **Product Management**: Add, edit, and delete products with price, stock, and category information.
- **Inventory Tracking**: Keep track of stock levels and restock as needed.
- **Sales Transactions**: Record sales with real-time calculations for total amounts, taxes, and discounts.
- **Sales Reports**: View daily, weekly, and monthly sales reports.
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices.
- **PWA**: Installable as a Progressive Web App on desktop and mobile.

## Tech Stack

- **Next.js 14**: React framework for building the user interface and server-side rendering.
- **Prisma ORM**: Database ORM for easy interaction with Supabase PostgreSQL database.
- **Supabase**: Hosted PostgreSQL database for handling data storage, authentication, and APIs.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Supabase** account (for database setup)
- **Prisma** installed globally

## Currency / Locale

The app ships with **USD ($)** as the default currency symbol. To switch to **GH₵ (Ghanaian Cedi)**, search and replace the `$` symbol in the following files:

| File | What to change |
|------|---------------|
| `components/card/card.tsx` | Line 91: `<span className="mr-1">$</span>` → `<span className="mr-1">GH₵</span>` |
| `components/order/components/Tbody.tsx` | Lines 41, 49: `$ {price}` → `GH₵ {price}` |
| `components/order/components/detail.tsx` | Lines 210, 221, 225, 229: `${...}` → `GH₵ {...}` |
| `app/(root)/records/[id]/page.tsx` | Lines 178, 187, 191, 195: `${...}` → `GH₵ {...}` |
| `schema/index.ts` | Lines 17, 21: validation messages `$0.05` / `$0.01` |

For proper number formatting, consider using `Intl.NumberFormat`:
```ts
new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount)
```

## PWA Setup

The app is configured as a PWA with a service worker. Placeholder icons are in `public/icons/`. To use your own branding:

1. Replace `public/icons/icon-192x192.svg` with your 192x192 icon
2. Replace `public/icons/icon-512x512.svg` with your 512x512 icon
3. Replace `public/icons/apple-touch-icon.svg` with your 180x180 icon
4. Update `public/manifest.json` with your app name and theme color
