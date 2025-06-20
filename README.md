# Welcome to Country Explorer 🌍

A beautiful, responsive country explorer dashboard built with **Next.js App Router**, TypeScript, and Jotai. Users can browse countries, filter/search, view detailed information, and manage favorite countries.

## 🔧 How to set up the project locally

1. Clone the repo and install it using `pnpm` package manager (use `npm install -g pnpm` to install it)

2. Run locally (commands below)

```bash
git clone https://github.com/matheusromeus/country-explorer.git
cd country-explorer
pnpm install
pnpm dev
```

The app should now be running on http://localhost:3000
**Or just visit** [https://country-explorer-weld-alpha.vercel.app/](https://country-explorer-weld-alpha.vercel.app/)

## 🔐 Mock Login Credentials

- **Username:** admin
- **Password:** admin12345

## Design Choices, System Architecture & Folder Structure

- Initialized the project with `pnpm` as the package manager. It is faster than `npm` and uses less disk storage. If needed, `pnpm` provides excellent support for monorepos as well.

**Folder Structure**

```
country-explorer/
├── public/                      //  (assets)
├── src/
│ ├── app/
│ │ ├── (auth)/                  // route grouping for auth
│ │ │ └── login/
│ │ │       └── page.tsx
│ │ ├── api/                     // api routes for mock login
│ │ │ └── auth/
│ │ │    ├── logout/
│ │ │          └── route.ts
│ │ │    └── route.ts
│ │ ├── country/
│ │ │ └── [code]/                // dynamic route
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── favorites/
│ │ │ └── page.tsx
│ │ ├── error.tsx                // global error handling
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── not-found.tsx            // global not found page
│ │ └── page.tsx
│ ├── atoms/                     // jotai atoms
│ ├── components/                // components created by the dev
│ │ ├── skeletons/               // skeleton loaders
│ │ └── ui/                      // shadcn components

│ ├── lib/                       // utility functions and constants

│ ├── types/                     // shared types
│ └── middleware.ts              // global middleware
```

**Mock Login**

- The login is mocked via a simple API call to the server-side route at `api/auth`
- This is done for better security. The cookie is also set using `httpOnly`, making it more secure than just a simple boolean value

**Input Runtime Validation**

- Uses Zod schemas for validation

**UI**

- **Framework:** shadcn = tailwind + radix UI, mobile-first tailwind and radix with accessibility (aria labels, keyboard navigation, color contrast)
- **Theme:** Dark theme by shadcn theme provider
- **Animation:** Framer Motion for micro-interactions

**Data Access Layer (DAL)**

In data fetch calls:

- `cache()` for deduplication
- `revalidate: 86400` for correctness
- Batching HTTPS calls for border common names

**Performance Optimization**

- Suspense tag
- `loading.tsx` files
- Skeleton loaders

**Rendering Strategy**

```
Route (app)                                 Size  First Load JS  Revalidate  Expire
┌ ○ /                                    41.8 kB         201 kB          1d      1y
├ ○ /_not-found                            144 B         101 kB
├ ƒ /api/auth                              144 B         101 kB
├ ƒ /api/auth/logout                       144 B         101 kB
├ ƒ /country/[code]                        931 B         151 kB
├ ○ /favorites                           2.11 kB         116 kB
└ ○ /login                               26.8 kB         153 kB
+ First Load JS shared by all             101 kB
  ├ chunks/20-5a703fb8e4d50276.js        45.8 kB
  ├ chunks/40bf5d38-2c30ee9149dd2ad3.js  53.2 kB
  └ other shared chunks (total)          1.92 kB
```

The rendering strategy used here is mainly ISR (Incremental Static Regeneration). Since data from countries rarely changes, this is the optimal approach. The revalidation time period is set to 24 hours.

**Improvements That Could Be Made**

- No sessions implemented - cannot see past user data
- Optimistic UI for favorites button
- GitHub CI pipelines for commit linting
- Prettier config for standard code syntax styling
- Authentication for data layer access calls
