# Todo

-[x] configure edge case for middleware
-[] searching and filtering (strict client side)
-[] implement useTransition in dark mode toggling
-[] UI Dashboard & responsiveness
-[] loading skeletons
-[] more robust form validation using zod & maybe react hook form
-[]

# Welcome to Country Explorer 🌍

A beautiful, responsive country explorer dashboard built with **Next.js App Router**, TypeScript, and Jotai. Users can browse countries, filter/search, view detailed information, and manage favorite countries.

## 🔧 How to set up the project

1. Clone the repo and install it using `pnpm` package manager. (use `npm install -g pnpm` to install it)

2. Run locally (commands below)

```bash
git clone https://github.com/matheusromeus/country-explorer.git
cd country-explorer
pnpm install
pnpm dev
```

The app should now be running on http://localhost:3000

## 🔐 Mock Login Credentials

- username - admin
- password - admin12345

## Design choices & System Architecture

- Initialized the project with `pnpm` as the package manager. It is faster than `npm` and also lower on disk storage used. If needed, `pnpm` gives excellent support for monorepos as well.
