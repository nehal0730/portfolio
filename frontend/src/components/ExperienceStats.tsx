import { motion } from "framer-motion";

const STATS = [
  { label: "User engagement", value: "+30%" },
  { label: "Support requests", value: "-15%" },
  { label: "Reported technical issues", value: "-20%" },
];

const STACK = ["Shopify", "Liquid", "HTML/CSS", "JavaScript"];

export default function ExperienceStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15 }}
      whileHover={{ y: -4 }}
      className="card p-6"
    >
      <p className="eyebrow mb-5">Impact snapshot</p>

      <div className="space-y-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
            className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-text-muted">{s.label}</span>
            <span className="font-mono text-lg font-medium text-signal shrink-0">{s.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-line">
        <p className="font-mono text-[11px] uppercase tracking-wide text-text-faint mb-3">Stack used</p>
        <div className="flex flex-wrap gap-2">
          {STACK.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}