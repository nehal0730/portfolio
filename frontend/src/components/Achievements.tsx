import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Achievement } from "../types";

// Pulled out as a short, punchy headline stat per achievement — the real
// title/detail still renders as the caption underneath, this is purely the
// oversized visual anchor.
const STATS: Record<string, string> = {
  dsa: "600+",
  sih: "Finalist",
  emotrack: "2nd",
  gdsc: "2023",
};

const ACCENTS = ["signal", "link", "signal", "link"] as const;

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
        className="section-heading mb-12 sm:mb-16"
      >
        Milestones along the way.
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
        {achievements.map((a, i) => (
          <AchievementStat key={a.id} achievement={a} index={i} />
        ))}
      </div>
    </section>
  );
}

function AchievementStat({ achievement, index }: { achievement: Achievement; index: number }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const accent = ACCENTS[index % ACCENTS.length];
  const accentClass = accent === "signal" ? "text-signal" : "text-link";
  const underlineClass = accent === "signal" ? "bg-signal" : "bg-link";
  const underlineTrackClass = accent === "signal" ? "bg-signal/25" : "bg-link/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <div className="relative inline-block">
        <span
          className={`font-display font-semibold text-6xl sm:text-7xl leading-none tracking-tight ${accentClass} transition-transform duration-300 group-hover:-translate-y-1`}
        >
          {STATS[achievement.id] ?? "\u2726"}
        </span>

        {/* track, always visible once scrolled into view */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className={`absolute left-0 -bottom-2 h-[3px] w-full rounded-full overflow-hidden opacity-40 group-hover:opacity-80 transition-opacity duration-300 ${underlineTrackClass}`}
        >
          {/* bright sweep — only moves when this block is hovered */}
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: hovered ? "300%" : "-100%" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-y-0 left-0 w-1/3 rounded-full ${underlineClass}`}
          />
        </motion.span>
      </div>

      <p className="mt-6 text-sm font-medium text-text leading-snug">{achievement.title}</p>
      <p className="text-xs text-text-faint mt-1.5">{achievement.detail}</p>
    </motion.div>
  );
}