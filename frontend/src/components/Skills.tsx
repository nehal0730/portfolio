import { motion } from "framer-motion";
import { Code2, LayoutGrid, Server, Database, Wrench, type LucideIcon } from "lucide-react";
import { SkillGroup } from "../types";

const ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: LayoutGrid,
  Backend: Server,
  Data: Database,
  Tooling: Wrench,
};

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="container-px py-12 sm:py-16 border-b border-line">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-4"
      >
        Toolbox
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="section-heading mb-8"
      >
        The stack, by role.
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((group, i) => {
          const Icon = ICONS[group.category] ?? Code2;
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-6 sm:p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface2 border border-line text-link">
                  <Icon size={17} strokeWidth={1.75} />
                </span>
                <h3 className="font-display font-medium text-text">{group.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-line text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}