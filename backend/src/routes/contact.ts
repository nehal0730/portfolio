import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const router = Router();

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// Kept as an in-memory backup/log even when email is configured, so nothing is
// ever silently lost if a send fails. Swap for a real DB if you want persistence
// across server restarts.
const submissions: (ContactPayload & { receivedAt: string; emailed: boolean })[] = [];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Email delivery setup ---
// Reads SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL from .env
// (see .env.example). If any are missing, the form still validates and stores
// submissions — it just won't attempt to send an email, so you don't get a crash
// from an unconfigured transporter.
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

const emailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for port 465 (SSL), false for 587 (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

if (!emailConfigured) {
  console.warn(
    "[contact] SMTP env vars not set — contact form messages will be logged/stored only, not emailed. " +
      "Fill in SMTP_HOST/SMTP_USER/SMTP_PASS/CONTACT_TO_EMAIL in backend/.env to enable real delivery."
  );
}

router.post("/", async (req: Request, res: Response) => {
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

  const clean = { name: name.trim(), email: email.trim(), message: message.trim() };
  let emailed = false;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${SMTP_USER}>`,
        to: CONTACT_TO_EMAIL,
        replyTo: `"${clean.name}" <${clean.email}>`,
        subject: `New portfolio message from ${clean.name}`,
        text: `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
        html: `<p><strong>From:</strong> ${clean.name} (${clean.email})</p><p>${clean.message.replace(/\n/g, "<br/>")}</p>`,
      });
      emailed = true;
    } catch (err) {
      // Don't fail the request just because email delivery failed — the message
      // is still safely stored below and logged for manual follow-up.
      console.error("[contact] Failed to send email:", err);
    }
  }

  const entry = { ...clean, receivedAt: new Date().toISOString(), emailed };
  submissions.push(entry);
  console.log("[contact] New submission:", entry);

  return res.status(201).json({ message: "Thanks for reaching out — I'll get back to you soon." });
});

// Simple endpoint to inspect submissions during local development
// (useful as a fallback if SMTP isn't configured yet).
router.get("/", (_req: Request, res: Response) => {
  res.json({ count: submissions.length, emailConfigured, submissions });
});

export default router;