import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types";

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card relative w-full max-w-xl max-h-[85vh] overflow-y-auto p-7 sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full border border-line text-text-muted hover:border-link hover:text-link transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.links.live ? "bg-link" : project.status === "in-progress" ? "bg-signal" : "bg-text-faint"
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-wide text-text-faint">
                {project.links.live ? "Live" : project.status === "in-progress" ? "In progress" : "Shipped"}
              </span>
            </div>

            <h3 className="font-display font-semibold text-3xl text-text pr-10">{project.name}</h3>
            <p className="text-text-muted mt-1">{project.tagline}</p>

            <p className="text-text-muted leading-relaxed text-sm mt-6">{project.description}</p>

            <div className="mt-7 grid grid-cols-3 gap-3 font-mono">
              {project.metrics.map((m) => (
                <div key={m.label} className="border-t border-line pt-3">
                  <p className="text-base text-signal font-medium leading-snug break-words">{m.value}</p>
                  <p className="text-[10px] text-text-faint uppercase tracking-wide mt-1.5 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-wide text-text-faint mb-3">Full stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-4">
              {project.links.github && (
                <a
                  href={withProtocol(project.links.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-surface2 border border-line text-text text-xs font-mono uppercase tracking-wide px-4 py-2.5 rounded-full hover:border-link hover:text-link transition-colors"
                >
                  View code
                </a>
              )}
              {project.links.live && (
                <a
                  href={withProtocol(project.links.live)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-signal text-ink text-xs font-mono font-medium uppercase tracking-wide px-4 py-2.5 rounded-full hover:brightness-110 transition"
                >
                  View live
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}