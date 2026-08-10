import { useEffect, useState } from "react";
import { PortfolioData } from "./types";
import { fallbackData } from "./data/content";
import { apiUrl } from "./lib/api";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Renders instantly from local fallback data, then silently reconciles
  // with the live Express API so the page never blocks on a network round trip.
  const [data, setData] = useState<PortfolioData>(fallbackData);

  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl("/api/portfolio/all"))
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json: PortfolioData) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // Backend not running (e.g. static hosting) — fallback data already rendered.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About profile={data.profile} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Achievements achievements={data.achievements} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
}