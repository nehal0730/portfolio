/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0F14",
          soft: "#0F151C",
        },
        surface: "#131922",
        surface2: "#1A222D",
        line: "#232C38",
        text: {
          DEFAULT: "#E8ECEF",
          muted: "#8B96A5",
          faint: "#5B6672",
        },
        signal: {
          DEFAULT: "#F2A65A",
          soft: "#F2A65A33",
        },
        link: {
          DEFAULT: "#4FD1C5",
          soft: "#4FD1C533",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(#232C38 1px, transparent 1px), linear-gradient(90deg, #232C38 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
