import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Profile } from "../types";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setFeedback(data.message || "Thanks — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Couldn't reach the server. Is the backend running?");
    }
  }

  return (
    <section id="contact" className="container-px py-12 sm:py-16">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="section-heading mb-6"
          >
            Open to full-stack &amp; applied-AI roles.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-muted leading-relaxed mb-8 max-w-sm"
          >
            Have a role, a project, or just a system worth talking through? The form goes straight to my inbox via
            the API below.
          </motion.p>

          <div className="space-y-3 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-text hover:text-link link-underline w-fit">
              {profile.email}
            </a>
            <p className="text-text-muted">{profile.location}</p>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="lg:col-span-7 card p-7 sm:p-9"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="input"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Message">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you building?"
                className="input resize-none"
              />
            </Field>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-signal text-ink font-mono text-sm font-medium uppercase tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <AnimatePresence mode="wait">
              {feedback && (
                <motion.p
                  key={feedback}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm font-mono ${status === "success" ? "text-link" : "text-signal"}`}
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wide text-text-faint mb-2 block">{label}</span>
      {children}
    </label>
  );
}
