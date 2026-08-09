import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  function updateEdges() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setProgress(max <= 0 ? 1 : el.scrollLeft / max);
  }

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : 400;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }

  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-line overflow-hidden">
      <div className="container-px flex items-end justify-between gap-6 mb-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="section-heading max-w-2xl"
          >
            {projects.length} systems, {projects.length} different failure modes to design around.
          </motion.h2>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous project"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-line text-text-muted hover:border-link hover:text-link disabled:opacity-30 disabled:hover:border-line disabled:hover:text-text-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next project"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-line text-text-muted hover:border-link hover:text-link disabled:opacity-30 disabled:hover:border-line disabled:hover:text-text-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-ink to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 sm:scroll-px-16 pl-6 sm:pl-16 pr-6 sm:pr-16 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActiveProject(p)} />
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      <div className="container-px mt-8 flex items-center gap-4">
        <div className="relative h-[3px] flex-1 rounded-full bg-line overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-link rounded-full"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <span className="font-mono text-[11px] text-text-faint shrink-0 sm:hidden">Swipe to explore →</span>
      </div>
    </section>
  );
}