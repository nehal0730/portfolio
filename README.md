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

## Contact form email delivery

By default, `POST /api/contact` validates and **stores** submissions server-side (logged to the console and viewable at `GET /api/contact`) but does **not** email you — nothing is configured out of the box.

**Recommended: Resend** (no 2FA or app password needed)
1. Sign up free at https://resend.com and grab an API key from the dashboard.
2. Add to `backend/.env`:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=nehaljain0730@gmail.com
   ```
3. Restart `npm run dev` in `backend/`. Messages will send from Resend's shared test domain (`onboarding@resend.dev`) — fine for now; verify your own domain later at https://resend.com/domains if you want it to send from your own address.

**Alternative: Gmail (or another SMTP provider)**
Gmail requires 2-Step Verification to be turned on before it will even offer an App Password — that's a Google account policy, not something this code can bypass. If 2FA isn't an option for you, use Resend above instead. If it is:
1. Turn on 2-Step Verification: https://myaccount.google.com/security
2. Generate an App Password: https://myaccount.google.com/apppasswords → choose "Mail"
3. Add to `backend/.env`:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   CONTACT_TO_EMAIL=nehaljain0730@gmail.com
   ```

Either way: the route emails you **and** keeps a backup copy in memory, so even if a send fails, nothing's lost — check the server console or hit `GET /api/contact`. If both `RESEND_API_KEY` and SMTP vars are set, Resend is tried first with SMTP as a fallback.

## Deploying

The two halves deploy separately: the backend to a Node host, the frontend to a static host. Recommended combo — **Render** for the backend, **Vercel** for the frontend — but any equivalent pair works the same way.

**0. Push to GitHub** — both platforms deploy by connecting to a repo.

**1. Deploy the backend (Render)**
1. https://render.com → New → Web Service → connect your repo.
2. Root directory: `backend`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables (Render's dashboard, not a committed `.env`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CLIENT_ORIGIN` (leave this as a placeholder for now — you'll set it for real in step 3).
6. Deploy. Copy the resulting URL, e.g. `https://nehal-portfolio-api.onrender.com`.

**2. Deploy the frontend (Vercel)**
1. https://vercel.com → New Project → import the same repo.
2. Root directory: `frontend`
3. Framework preset: Vite (auto-detected). Build command `npm run build`, output directory `dist` (defaults, shouldn't need changing).
4. Add environment variable `VITE_API_URL` = the backend URL from step 1 (e.g. `https://nehal-portfolio-api.onrender.com`).
5. Deploy. Copy the resulting URL, e.g. `https://nehal-jain.vercel.app`.

**3. Connect the two**
Go back to the backend's env vars on Render and set `CLIENT_ORIGIN` to the real frontend URL from step 2, then redeploy the backend (Render usually does this automatically on env var changes; trigger a manual redeploy if not). This is what makes CORS allow the frontend to actually call the API.

**4. Test it**
Open the deployed frontend URL, check that project data loads (confirms the API connection) and submit the contact form (confirms email delivery + CORS are both working).

**Custom domain:** add it in Vercel's project settings (Vercel handles the DNS/SSL instructions); no backend changes needed unless you also want a custom domain on the API, in which case update `CLIENT_ORIGIN` and `VITE_API_URL` to match.

**Note on Render's free tier:** free web services spin down after inactivity and take ~30–60s to wake on the next request — the first project-data load or contact-form submission after idle time may feel slow. Fine for a portfolio; upgrade the plan if that matters to you.

### Alternative: everything on Render as one service

If you'd rather not manage two platforms, the backend can serve the built frontend directly — one Render service, no CORS to configure, no `VITE_API_URL` needed.

1. https://render.com → New → Web Service → connect your repo.
2. Root directory: leave **blank** (repo root) — the build needs access to both `frontend/` and `backend/`.
3. Build command:
   ```bash
   cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build
   ```
4. Start command:
   ```bash
   cd backend && npm start
   ```
5. Environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `SERVE_FRONTEND=true` (this last one tells the backend to serve `frontend/dist` instead of just the API).
6. Deploy. The one resulting URL serves both the site and the API — no `CLIENT_ORIGIN`/`VITE_API_URL` wiring needed, since everything's same-origin.

Trade-off versus the two-service setup: any change means redeploying the whole thing together rather than independently, and you lose Vercel's edge-network speed for the static frontend. For a portfolio this is a fine trade for the simplicity.

## Local development vs. production — how the API URL works

Locally, `frontend/src/App.tsx` and `Contact.tsx` call a small `apiUrl()` helper (`frontend/src/lib/api.ts`) instead of hardcoding `/api/...`. With no `VITE_API_URL` set, it resolves to a relative path, which `vite.config.ts`'s dev proxy forwards to `http://localhost:4000` — so local dev needs zero configuration. In production there's no such proxy, so setting `VITE_API_URL` (step 2 above) points those same calls at your deployed backend directly.