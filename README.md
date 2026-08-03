# Nehal Jain — Portfolio

A full-stack portfolio site: **React + TypeScript** frontend (Vite, Tailwind CSS, Framer Motion) and an **Express + TypeScript** backend that serves your profile/project data and handles the contact form.

**Design direction:** dark "systems" aesthetic — ink-navy background, amber "signal" + teal "link" accents, Space Grotesk / Inter / JetBrains Mono type. The hero features a custom animated node-graph canvas (built from scratch, no libraries) that echoes the mesh-networking and connection theme running through your projects.

```
nehal-portfolio/
├── backend/     Express + TypeScript API (project data, contact form)
└── frontend/    React + TypeScript + Vite + Tailwind + Framer Motion
```

## Quick start

You need [Node.js](https://nodejs.org) 18+ installed. Open two terminals.

**Terminal 1 — backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
API runs at `http://localhost:4000`.

**Terminal 2 — frontend**
```bash
cd frontend
npm install
npm run dev
```
Site runs at `http://localhost:5173`. Vite proxies `/api/*` requests to the backend, so the contact form and live project data work immediately — no CORS setup needed in dev.

Open **http://localhost:5173** in your browser.

## What's inside

- **Backend (`/backend/src`)**
  - `data/portfolio.ts` — single source of truth for your profile, projects, experience, skills, and achievements. Edit this to update the site content.
  - `routes/portfolio.ts` — `GET /api/portfolio/all` (and per-resource endpoints) serve that data as JSON.
  - `routes/contact.ts` — `POST /api/contact` validates and stores contact-form submissions (logged to console; swap in `nodemailer`/a database when you're ready to go live).
  - Rate-limited, CORS-scoped, TypeScript throughout.

- **Frontend (`/frontend/src`)**
  - `data/content.ts` — a static mirror of the backend data. The page renders instantly from this, then silently reconciles with the live API — so the site never has a loading spinner and still works if you deploy the frontend without the backend.
  - `components/NetworkCanvas.tsx` — the signature hero animation, plain Canvas API, respects `prefers-reduced-motion`.
  - `components/` — one file per section (Hero, About, Experience, Projects, Skills, Achievements, Contact, Footer), all animated on scroll with Framer Motion.
  - Fully responsive, keyboard-focus visible, dark theme only (matches the brief).

## Customize

- **Content:** edit `backend/src/data/portfolio.ts` (and mirror in `frontend/src/data/content.ts` if you want the offline fallback to match).
- **Links:** replace the `#` placeholders in `profile.links` and each project's `links.github` / `links.live` with your real GitHub/LinkedIn/LeetCode/deployed-project URLs.
- **Resume download:** `frontend/public/Nehal_Jain_Resume.pdf` is wired to the "Resume ↓" button — swap the file to update it.
- **Colors/type:** all design tokens live in `frontend/tailwind.config.js` and `frontend/src/index.css`.

## Production build

```bash
# backend
cd backend && npm run build && npm start

# frontend
cd frontend && npm run build   # outputs static files to frontend/dist
```
Deploy `frontend/dist` to any static host (Vercel, Netlify, GitHub Pages) and `backend` to any Node host (Render, Railway, Fly.io). Set `CLIENT_ORIGIN` in the backend's `.env` to your deployed frontend URL, and point the frontend's fetch calls at your deployed API URL (or keep the Vite proxy for same-origin deployments behind a reverse proxy).
