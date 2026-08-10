// import { motion } from "framer-motion";
// import { Profile } from "../types";

// export default function About({ profile }: { profile: Profile }) {
//   return (
//     <section id="about" className="container-px py-12 sm:py-16 border-b border-line">
//       <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
//         <div className="lg:col-span-4">
//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6 }}
//             className="eyebrow mb-4"
//           >
//             About
//           </motion.p>
//           <motion.h2
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, delay: 0.05 }}
//             className="section-heading"
//           >
//             Grounded in architecture, not just output.
//           </motion.h2>
//         </div>

//         <div className="lg:col-span-8">
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-lg sm:text-xl leading-relaxed text-text-muted max-w-2xl"
//           >
//             {profile.summary} Every build starts with the same question: what breaks at scale, and how do I design
//             around it before it does.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mt-12 grid sm:grid-cols-2 gap-6"
//           >
//             {profile.education.map((edu) => (
//               <motion.div
//                 key={edu.school}
//                 whileHover={{ y: -4, borderColor: "#4FD1C5" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 22 }}
//                 className="card p-6"
//               >
//                 <p className="font-mono text-[11px] uppercase tracking-wide text-link mb-2">{edu.period}</p>
//                 <h3 className="font-display font-semibold text-lg text-text">{edu.school}</h3>
//                 <p className="text-sm text-text-muted mt-1">{edu.degree}</p>
//                 <p className="font-mono text-xs text-text-faint mt-3">{edu.detail}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }




import { motion } from "framer-motion";
import { Profile } from "../types";

export default function About({ profile }: { profile: Profile }) {
  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Studying", value: profile.education[0]?.degree ?? "" },
    { label: "Open to", value: "Full-stack & applied-AI roles" },
  ];

  return (
    <section id="about" className="container-px py-12 sm:py-16 border-b border-line">
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

          <div className="mt-10 space-y-4 max-w-xs">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3 border-t border-line pt-4 first:border-0 first:pt-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0 mt-1.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{fact.label}</p>
                  <p className="text-sm text-text mt-1">{fact.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-5 max-w-2xl">
            {profile.summary.split("\n\n").map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="text-lg sm:text-xl leading-relaxed text-text-muted"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="relative mt-12 max-w-2xl">
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-line" />
            {profile.education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <span className="absolute left-0 top-1.5 w-[9px] h-[9px] rounded-full bg-ink border-2 border-link" />
                <p className="font-mono text-[11px] uppercase tracking-wide text-link mb-1">{edu.period}</p>
                <h3 className="font-display font-semibold text-lg text-text">{edu.school}</h3>
                <p className="text-sm text-text-muted mt-1">
                  {edu.degree} <span className="text-text-faint">· {edu.detail}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}