import { Router, Request, Response } from "express";

const router = Router();

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// Swap this for a real email/DB integration (nodemailer, Resend, a database, etc).
// Kept in-memory here so the project runs out of the box with zero external services.
const submissions: (ContactPayload & { receivedAt: string })[] = [];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", (req: Request, res: Response) => {
  const { name, email, message } = req.body as Partial<ContactPayload>;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are all required." });
  }
  if (name.trim().length < 2) {
    return res.status(400).json({ error: "Please enter your full name." });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: "Message should be at least 10 characters." });
  }

  const entry = { name: name.trim(), email: email.trim(), message: message.trim(), receivedAt: new Date().toISOString() };
  submissions.push(entry);

  console.log("New portfolio contact submission:", entry);

  return res.status(201).json({ message: "Thanks for reaching out — I'll get back to you soon." });
});

// Simple endpoint to inspect submissions during local development.
router.get("/", (_req: Request, res: Response) => {
  res.json({ count: submissions.length, submissions });
});

export default router;
