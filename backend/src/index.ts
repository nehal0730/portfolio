import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import rateLimit from "express-rate-limit";
import portfolioRoutes from "./routes/portfolio";
import contactRoutes from "./routes/contact";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Basic abuse protection on the contact form.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many messages sent — please try again later." },
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);

// --- Single-service deployment mode ---
// If SERVE_FRONTEND=true, this backend also serves the built frontend
// (frontend/dist) directly, so the whole app is one Render (or similar) service:
// no CORS to configure, no VITE_API_URL to set, one deploy instead of two.
// Leave this unset for local dev (Vite's own dev server + proxy handles that)
// or if you're deploying frontend/backend as separate services elsewhere.
if (process.env.SERVE_FRONTEND === "true") {
  const FRONTEND_DIST = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(FRONTEND_DIST));

  // Anything that isn't an /api route falls through to the SPA's index.html —
  // this is a single-page site (anchor-link navigation, no router), so this
  // just covers direct hits on "/" plus any unexpected deep links gracefully.
  app.get(/^(?!\/api).*/, (_req: Request, res: Response) => {
    res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});