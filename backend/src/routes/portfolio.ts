import { Router, Request, Response } from "express";
import { projects, experience, skills, achievements, profile } from "../data/portfolio";

const router = Router();

router.get("/profile", (_req: Request, res: Response) => {
  res.json(profile);
});

router.get("/projects", (_req: Request, res: Response) => {
  res.json(projects);
});

router.get("/experience", (_req: Request, res: Response) => {
  res.json(experience);
});

router.get("/skills", (_req: Request, res: Response) => {
  res.json(skills);
});

router.get("/achievements", (_req: Request, res: Response) => {
  res.json(achievements);
});

// Convenience endpoint: everything in one call for the frontend's initial load.
router.get("/all", (_req: Request, res: Response) => {
  res.json({ profile, projects, experience, skills, achievements });
});

export default router;
