import { motion } from "framer-motion";
import { Profile } from "../types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="container-px py-24 sm:py-32 border-b border-line">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="section-heading"
          >
            Grounded in architecture, not just output.
          </motion.h2>
        </div>

        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl leading-relaxed text-text-muted max-w-2xl"
          >
            {profile.summary} Every build starts with the same question: what breaks at scale, and how do I design
            around it before it does.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid sm:grid-cols-2 gap-6"
          >
            {profile.education.map((edu) => (
              <motion.div
                key={edu.school}
                whileHover={{ y: -4, borderColor: "#4FD1C5" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card p-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-link mb-2">{edu.period}</p>
                <h3 className="font-display font-semibold text-lg text-text">{edu.school}</h3>
                <p className="text-sm text-text-muted mt-1">{edu.degree}</p>
                <p className="font-mono text-xs text-text-faint mt-3">{edu.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
