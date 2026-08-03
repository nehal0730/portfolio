import { motion } from "framer-motion";
import { ExperienceItem } from "../types";

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="container-px py-24 sm:py-32 border-b border-line">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-4"
      >
        Experience
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="section-heading mb-14"
      >
        Where it's been tested in production.
      </motion.h2>

      <div className="relative max-w-3xl">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-10 pb-12 last:pb-0"
          >
            <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-ink border-2 border-signal" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
              <h3 className="font-display font-semibold text-xl text-text">{exp.role}</h3>
              <span className="text-link font-medium">@ {exp.org}</span>
              <span className="font-mono text-xs text-text-faint ml-auto">{exp.period}</span>
            </div>
            <ul className="space-y-2">
              {exp.points.map((p, idx) => (
                <li key={idx} className="text-text-muted leading-relaxed flex gap-3">
                  <span className="text-signal mt-2 shrink-0 w-1 h-1 rounded-full bg-signal" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
