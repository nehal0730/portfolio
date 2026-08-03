import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../types";

// Guards against bare domains like "meshvault.onrender.com" being saved without
// a scheme — those render as relative links (localhost:5173/meshvault.onrender.com)
// instead of pointing off-site.
function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  // The badge now reflects whether a live URL is actually set, not the "status"
  // field — so a finished-but-undeployed project reads "Shipped" instead of "Live".
  const isDeployed = Boolean(project.links.live);
  const badgeLabel = isDeployed ? "Live" : project.status === "in-progress" ? "In progress" : "Shipped";
  const badgeDot = isDeployed ? "bg-link" : project.status === "in-progress" ? "bg-signal" : "bg-text-faint";

  // Only show the "read more" dots if the description is actually being clamped —
  // short descriptions that already fit in 5 lines don't need the affordance.
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    function checkTruncation() {
      const el = descRef.current;
      if (!el) return;
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    }
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [project.description]);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group card relative shrink-0 snap-start w-[86vw] sm:w-[420px] p-7 sm:p-8 flex flex-col overflow-hidden hover:border-link/60"
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 -right-2 font-display font-semibold text-[88px] leading-none text-line/40 select-none group-hover:text-link/20 transition-colors duration-500"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${badgeDot}`} />
            <span className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{badgeLabel}</span>
          </div>
          <h3 className="font-display font-semibold text-2xl text-text group-hover:text-link transition-colors">
            {project.name}
          </h3>
          <p className="text-text-muted text-sm mt-1">{project.tagline}</p>
        </div>
      </div>

      <div className="relative">
        <p ref={descRef} className="text-text-muted leading-relaxed text-sm line-clamp-5">
          {project.description}
        </p>
        {isTruncated && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Read more about ${project.name}`}
            title="Read more"
            className="absolute bottom-0 right-0 flex items-center h-[1.375rem] pl-8 pr-0.5 bg-gradient-to-l from-surface via-surface/95 to-transparent text-text-faint hover:text-link transition-colors"
          >
            <DotsIcon />
          </button>
        )}
      </div>

      <div className="relative mt-auto pt-6">
        <div className="grid grid-cols-3 gap-3 font-mono">
          {project.metrics.map((m) => (
            <div key={m.label} className="border-t border-line pt-3">
              <p className="text-base text-signal font-medium leading-snug break-words">{m.value}</p>
              <p className="text-[10px] text-text-faint uppercase tracking-wide mt-1.5 leading-snug">{m.label}</p>
            </div>
          ))}
        </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="pill">
            {s}
          </span>
        ))}
        {project.stack.length > 5 && (
          <button type="button" onClick={onOpen} className="pill hover:border-link hover:text-link transition-colors">
            +{project.stack.length - 5}
          </button>
        )}
      </div>

      <div className="relative mt-6 flex gap-3">
        {project.links.github && (
          <a
            href={withProtocol(project.links.github)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-text-muted hover:text-link transition-colors"
          >
            <GithubIcon /> Code
          </a>
        )}
        {project.links.live && (
          <a
            href={withProtocol(project.links.live)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} live demo`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-text-muted hover:text-signal transition-colors"
          >
            <ArrowIcon /> Live
          </a>
        )}
      </div>
      </div>
    </motion.article>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="4" cy="12" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="20" cy="12" r="2.2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .32.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}