# Workshop Digest

Workshop Digest is a React + Vite web application for discovering free workshops and subscribing to a daily digest email.

## What this repository contains

This repository contains the **frontend client**:

- Landing page with latest workshops
- Workshops listing with search and source filtering
- Email subscription page
- Navigation and reusable UI components

The app reads and writes data through Supabase (configured via environment variables).

## Tech stack

- React 19
- Vite
- React Router
- TanStack Query
- Supabase JavaScript client
- Zustand
- ESLint

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and set:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start development server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` – start local dev server
- `npm run build` – create production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint
