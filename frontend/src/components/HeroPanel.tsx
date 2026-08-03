// import { motion } from "framer-motion";
// import { Profile } from "../types";

// export default function HeroPanel({ profile, projectCount }: { profile: Profile; projectCount: number }) {
//   const rows: { key: string; value: string; type: "string" | "number" | "array" }[] = [
//     { key: "role", value: `"Full-Stack Developer"`, type: "string" },
//     { key: "focus", value: `["RAG", "fraud detection", "agentic AI"]`, type: "array" },
//     { key: "projects_shipped", value: String(projectCount), type: "number" },
//     { key: "dsa_solved", value: `"600+"`, type: "string" },
//     { key: "cgpa", value: "8.75", type: "number" },
//     { key: "based_in", value: `"${profile.location}"`, type: "string" },
//     { key: "status", value: `"open to work"`, type: "string" },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24, rotate: -1 }}
//       animate={{ opacity: 1, y: 0, rotate: -1 }}
//       transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
//       whileHover={{ rotate: 0, y: -4 }}
//       className="relative w-full max-w-sm"
//     >
//       {/* soft ambient glow behind the panel */}
//       <div className="absolute -inset-4 bg-link/10 blur-3xl rounded-full" aria-hidden="true" />

//       <div className="relative rounded-2xl border border-line bg-surface/90 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
//         <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
//           <span className="relative flex h-1.5 w-1.5">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-link opacity-60" />
//             <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-link" />
//           </span>
//           <span className="font-mono text-[11px] uppercase tracking-wide text-text-faint">profile</span>
//         </div>

//         <div className="p-5 font-mono text-[13px] leading-7">
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4, delay: 0.9 }}
//             className="text-text-faint"
//           >
//             <span className="text-link">const</span> nehal = {"{"}
//           </motion.p>

//           {rows.map((row, i) => (
//             <motion.p
//               key={row.key}
//               initial={{ opacity: 0, x: -6 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4, delay: 1.05 + i * 0.12 }}
//               className="pl-4 whitespace-pre"
//             >
//               <span className="text-signal">{row.key}</span>
//               <span className="text-text-faint">: </span>
//               <span className={row.type === "string" ? "text-link" : "text-text"}>{row.value}</span>
//               <span className="text-text-faint">,</span>
//             </motion.p>
//           ))}

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4, delay: 1.05 + rows.length * 0.12 }}
//             className="text-text-faint"
//           >
//             {"};"}
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2 + rows.length * 0.12 }}
//               className="inline-block w-[7px] h-[14px] ml-1.5 bg-signal align-middle animate-pulse"
//               aria-hidden="true"
//             />
//           </motion.p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import { motion } from "framer-motion";
import { Profile } from "../types";

type Row =
  | { key: string; kind: "string"; value: string }
  | { key: string; kind: "number"; value: string }
  | { key: string; kind: "array"; items: string[] };

export default function HeroPanel({ profile, projectCount }: { profile: Profile; projectCount: number }) {
  const rows: Row[] = [
    { key: "role", kind: "string", value: "Full-Stack Developer" },
    { key: "focus", kind: "array", items: ["RAG", "fraud detection", "agentic AI"] },
    { key: "projects_shipped", kind: "number", value: String(projectCount) },
    { key: "dsa_solved", kind: "string", value: "600+" },
    { key: "cgpa", kind: "number", value: "8.75" },
    { key: "based_in", kind: "string", value: profile.location },
    { key: "status", kind: "string", value: "open to work" },
  ];

  // Rough delay budget so later lines still stagger in even though arrays take up multiple lines.
  let delayIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -4 }}
      className="relative w-full max-w-sm"
    >
      {/* soft ambient glow behind the panel */}
      <div className="absolute -inset-4 bg-link/10 blur-3xl rounded-full" aria-hidden="true" />

      <div className="relative rounded-2xl border border-line bg-surface/90 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-link opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-link" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-text-faint">profile.ts</span>
        </div>

        <div className="p-5 font-mono text-[13px] leading-7 overflow-hidden">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="text-text-faint"
          >
            <span className="text-link">const</span> nehal = {"{"}
          </motion.p>

          {rows.map((row) => {
            if (row.kind === "array") {
              const keyDelay = 1.05 + delayIndex * 0.1;
              delayIndex += 1;
              return (
                <div key={row.key}>
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: keyDelay }}
                    className="pl-4 whitespace-pre"
                  >
                    <span className="text-signal">{row.key}</span>
                    <span className="text-text-faint">: [</span>
                  </motion.p>
                  {row.items.map((item) => {
                    const itemDelay = 1.05 + delayIndex * 0.1;
                    delayIndex += 1;
                    return (
                      <motion.p
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemDelay }}
                        className="pl-8 whitespace-pre"
                      >
                        <span className="text-link">&quot;{item}&quot;</span>
                        <span className="text-text-faint">,</span>
                      </motion.p>
                    );
                  })}
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.05 + delayIndex * 0.1 }}
                    className="pl-4 whitespace-pre text-text-faint"
                  >
                    ],
                  </motion.p>
                </div>
              );
            }

            const rowDelay = 1.05 + delayIndex * 0.1;
            delayIndex += 1;
            return (
              <motion.p
                key={row.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: rowDelay }}
                className="pl-4 whitespace-pre"
              >
                <span className="text-signal">{row.key}</span>
                <span className="text-text-faint">: </span>
                <span className={row.kind === "string" ? "text-link" : "text-text"}>
                  {row.kind === "string" ? `"${row.value}"` : row.value}
                </span>
                <span className="text-text-faint">,</span>
              </motion.p>
            );
          })}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.05 + delayIndex * 0.1 }}
            className="text-text-faint"
          >
            {"};"}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + delayIndex * 0.1 }}
              className="inline-block w-[7px] h-[14px] ml-1.5 bg-signal align-middle animate-pulse"
              aria-hidden="true"
            />
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}