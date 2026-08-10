import { useMemo } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiPhp,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiMysql,
  SiJsonwebtokens,
  // SiVisualstudiocode,
  SiCloudinary,
} from "react-icons/si";
import { Code2, Workflow, Shield, Radio, FileCode } from "lucide-react";
import { SkillGroup } from "../types";

// Real brand icons where a reliable one exists; a handful of skills (Java, C,
// WebRTC, REST APIs, etc.) don't have a clean Simple Icons match, so those get
// a themed generic icon instead rather than guessing at a wrong logo.
const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  "C++": SiCplusplus,
  PHP: SiPhp,
  HTML: SiHtml5,
  CSS: SiCss,
  "React.js": SiReact,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  Mongoose: SiMongodb,
  Redis: SiRedis,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Postman: SiPostman,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  FastAPI: SiFastapi,
  SQL: SiMysql,
  "JWT Auth": SiJsonwebtokens,
  // "VS Code": SiVisualstudiocode,
  Cloudinary: SiCloudinary,
  Java: Code2,
  C: Code2,
  EJS: FileCode,
  "REST APIs": Workflow,
  "Passport.js": Shield,
  WebRTC: Radio,
  LangChain: Workflow,
};

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  const allSkills = useMemo(() => {
    const seen = new Set<string>();
    const flat: string[] = [];
    skills.forEach((group) =>
      group.items.forEach((item) => {
        if (!seen.has(item)) {
          seen.add(item);
          flat.push(item);
        }
      })
    );
    return flat;
  }, [skills]);

  const mid = Math.ceil(allSkills.length / 2);
  const rowA = allSkills.slice(0, mid);
  const rowB = allSkills.slice(mid);

  return (
    <section id="skills" className="py-12 sm:py-16 border-b border-line overflow-hidden">
      <div className="container-px">
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
          className="section-heading"
        >
          The stack.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-10 space-y-4"
      >
        <MarqueeRow items={rowA} direction="left" />
        <MarqueeRow items={rowB} direction="right" />
      </motion.div>
    </section>
  );
}

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  // Duplicate the list so the track can loop seamlessly at -50% translate.
  const loop = [...items, ...items];

  return (
    <div className="marquee-row relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-ink to-transparent z-10" />

      <div className={`flex w-max gap-3 ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}>
        {loop.map((skill, i) => {
          const Icon = ICONS[skill] ?? Code2;
          return (
            <div
              key={`${skill}-${i}`}
              className="group flex items-center gap-2.5 shrink-0 rounded-full border border-line bg-surface px-4 py-2.5 hover:border-link/60 transition-colors"
            >
              <Icon className="w-[18px] h-[18px] text-text-muted group-hover:text-link transition-colors shrink-0" />
              <span className="text-sm text-text-muted group-hover:text-text transition-colors whitespace-nowrap">
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}