import { Router, Request, Response } from "express";
import { Resend } from "resend";
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
// Two options, checked in this order. Neither is required — with nothing set,
// the form still validates and stores submissions, it just won't email you.
//
// Option A: Resend (recommended). Just needs RESEND_API_KEY + CONTACT_TO_EMAIL —
// no 2FA or app password required, unlike Gmail.
// Option B: SMTP via nodemailer (Gmail, Outlook, etc), for anyone who'd rather
// use their own mailbox and already has 2FA / an app password set up.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for port 465 (SSL), false for 587 (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

const emailConfigured = Boolean((resend && CONTACT_TO_EMAIL) || transporter);

if (!emailConfigured) {
  console.warn(
    "[contact] No email delivery configured — messages will be logged/stored only. " +
      "Set RESEND_API_KEY + CONTACT_TO_EMAIL (recommended) or SMTP_HOST/SMTP_USER/SMTP_PASS in backend/.env."
  );
}

async function sendContactEmail(clean: ContactPayload): Promise<boolean> {
  const subject = `New portfolio message from ${clean.name}`;
  const text = `From: ${clean.name} <${clean.email}>\n\n${clean.message}`;
  const html = `<p><strong>From:</strong> ${clean.name} (${clean.email})</p><p>${clean.message.replace(/\n/g, "<br/>")}</p>`;

  if (resend && CONTACT_TO_EMAIL) {
    try {
      await resend.emails.send({
        // Resend's shared test domain — swap for "you@yourverifieddomain.com"
        // once you verify a domain at https://resend.com/domains.
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: CONTACT_TO_EMAIL,
        reply_to: clean.email,
        subject,
        text,
        html,
      });
      return true;
    } catch (err) {
      console.error("[contact] Resend send failed:", err);
      // Fall through to try SMTP if it's also configured, otherwise give up below.
    }
  }

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${SMTP_USER}>`,
        to: CONTACT_TO_EMAIL || SMTP_USER,
        replyTo: `"${clean.name}" <${clean.email}>`,
        subject,
        text,
        html,
      });
      return true;
    } catch (err) {
      console.error("[contact] SMTP send failed:", err);
    }
  }

  return false;
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
  const emailed = await sendContactEmail(clean);

  const entry = { ...clean, receivedAt: new Date().toISOString(), emailed };
  submissions.push(entry);
  console.log("[contact] New submission:", entry);

  return res.status(201).json({ message: "Thanks for reaching out — I'll get back to you soon." });
});

// Simple endpoint to inspect submissions during local development
// (useful as a fallback if email isn't configured yet).
router.get("/", (_req: Request, res: Response) => {
  res.json({ count: submissions.length, emailConfigured, submissions });
});

export default router;