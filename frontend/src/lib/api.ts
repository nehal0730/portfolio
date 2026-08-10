// In local dev, relative "/api/..." calls work because vite.config.ts proxies
// them to the backend. In production (frontend and backend deployed as separate
// services), there's no such proxy, so we need the full backend URL instead.
// Set VITE_API_URL in the frontend's environment (e.g. Vercel/Netlify project
// settings) to your deployed backend's URL, e.g. https://your-backend.onrender.com
// Leave it unset locally — the empty string keeps requests relative for the dev proxy.
export const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}