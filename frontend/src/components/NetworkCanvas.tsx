import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "signal" | "link" | "dim";
  pulse: number;
}

const COLORS = {
  signal: "#F2A65A",
  link: "#4FD1C5",
  dim: "#3A4552",
};

// Signature element: a quiet, drifting node graph — a direct visual echo of
// MeshVault's peer-discovery model and the "connect / verify / reason" thread
// that runs through the projects below. Nodes link when close, like peers
// finding each other on a mesh.
export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let animationId: number;

    const NODE_COUNT_BASE = 46;
    const LINK_DIST = 130;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 480;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((NODE_COUNT_BASE * (width * height)) / (1440 * 480));
      nodes = Array.from({ length: Math.max(18, Math.min(count, 70)) }, () => {
        const roll = Math.random();
        const hue: Node["hue"] = roll < 0.12 ? "signal" : roll < 0.4 ? "link" : "dim";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: hue === "dim" ? 1.4 + Math.random() * 1.2 : 2 + Math.random() * 1.6,
          hue,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.015;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.35;
            ctx!.strokeStyle = `rgba(79, 209, 197, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const glow = n.hue !== "dim" ? 0.55 + Math.sin(n.pulse) * 0.25 : 0.5;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = COLORS[n.hue];
        ctx!.globalAlpha = glow;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      step();
      cancelAnimationFrame(animationId!);
    } else {
      step();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
