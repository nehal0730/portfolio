import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between h-16">
        <a href="#hero" className="font-display font-semibold text-lg tracking-tight text-text">
          N<span className="text-signal">.</span>Jain
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                className={`relative font-mono text-xs tracking-wide uppercase transition-colors pb-1 ${
                  active === link.id ? "text-signal" : "text-text-muted hover:text-text"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute left-0 -bottom-0 h-px w-full bg-signal"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Nehal_Jain_Resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide border border-line rounded-full px-4 py-2 text-text hover:border-signal hover:text-signal transition-colors"
        >
          Resume ↓
        </a>

        <button
          className="md:hidden text-text p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-px bg-current transition-transform ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-transform ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-ink border-b border-line"
          >
            <ul className="container-px py-4 flex flex-col gap-4">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm uppercase tracking-wide text-text-muted hover:text-signal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/Nehal_Jain_Resume.pdf" download className="font-mono text-sm uppercase tracking-wide text-signal">
                  Resume ↓
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
