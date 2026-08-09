import { motion } from "framer-motion";
import { Achievement } from "../types";

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="container-px py-12 sm:py-16 border-b border-line">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-4"
      >
        Recognition
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="section-heading mb-8"
      >
        Milestones along the way.
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card p-6 flex gap-4 items-start hover:border-signal/50 transition-colors"
          >
            <motion.span
              whileHover={{ rotate: 90, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="font-mono text-signal text-lg leading-none mt-0.5"
            >
              ✦
            </motion.span>
            <div>
              <h3 className="font-display font-medium text-text leading-snug">{a.title}</h3>
              <p className="text-sm text-text-muted mt-1">{a.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
