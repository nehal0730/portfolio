// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import NetworkCanvas from "./NetworkCanvas";
// import HeroPanel from "./HeroPanel";
// import { Profile } from "../types";

// const container = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.12, delayChildren: 0.15 },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 18 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
// };

// export default function Hero({ profile, projectCount }: { profile: Profile; projectCount: number }) {
//   const sectionRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
//   const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   return (
//     <section
//       ref={sectionRef}
//       id="hero"
//       className="relative min-h-screen flex items-center overflow-hidden border-b border-line pt-16"
//     >
//       <div className="absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)] opacity-40" />
//       <NetworkCanvas />
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink pointer-events-none" />

//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="show"
//         style={{ y: contentY, opacity: contentOpacity }}
//         className="relative container-px w-full py-20 grid lg:grid-cols-12 gap-10 items-center"
//       >
//         <div className="lg:col-span-7">
//         <motion.p variants={item} className="eyebrow mb-6 inline-flex items-center gap-2">
//           <span className="relative flex h-1.5 w-1.5">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
//             <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
//           </span>
//           Full Stack Development · Applied AI Systems
//         </motion.p>

//         <motion.h1
//           variants={item}
//           className="font-display font-semibold text-[15vw] sm:text-7xl lg:text-8xl leading-[0.98] tracking-tight"
//         >
//           Nehal Jain
//         </motion.h1>

//         <motion.p
//           variants={item}
//           className="mt-4 font-display font-medium text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-text-muted max-w-2xl"
//         >
//           Building systems that{" "}
//           <span className="relative inline-block text-signal">
//             connect
//             <motion.span
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
//               style={{ transformOrigin: "left" }}
//               className="absolute left-0 -bottom-1 h-[2px] w-full bg-signal/50 rounded-full"
//             />
//           </span>
//           ,{" "}
//           <span className="relative inline-block text-link">
//             verify
//             <motion.span
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
//               style={{ transformOrigin: "left" }}
//               className="absolute left-0 -bottom-1 h-[2px] w-full bg-link/50 rounded-full"
//             />
//           </span>
//           , and reason.
//         </motion.p>

//         <motion.p variants={item} className="mt-8 max-w-xl text-text-muted text-base sm:text-lg leading-relaxed">
//           Final-year Computer Science student at JIIT, currently interning at BlackBytt. I build things meant to
//           hold up under real conditions — a fraud-detection model tested against 10,000+ transactions, a mesh
//           network engineered to keep working when the internet doesn't. Open to full-stack and applied-AI roles.
//         </motion.p>

//         <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
//           <motion.a
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             href="#projects"
//             className="inline-flex items-center gap-2 bg-signal text-ink font-mono text-sm font-medium uppercase tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition"
//           >
//             View projects
//           </motion.a>
//           <motion.a
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             href="#contact"
//             className="inline-flex items-center gap-2 border border-line text-text font-mono text-sm uppercase tracking-wide px-6 py-3 rounded-full hover:border-link hover:text-link transition"
//           >
//             Get in touch
//           </motion.a>
//         </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="hidden lg:flex lg:col-span-5 justify-center"
//         >
//           <HeroPanel profile={profile} projectCount={projectCount} />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }


import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";
import HeroPanel from "./HeroPanel";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-line pt-16"
    >
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)] opacity-40" />
      <NetworkCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative container-px w-full py-20 grid lg:grid-cols-12 gap-10 items-center"
      >
        <div className="lg:col-span-7">
        <motion.p variants={item} className="eyebrow mb-6 inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          Full Stack Development · Applied AI Systems
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-semibold text-[15vw] sm:text-7xl lg:text-8xl leading-[0.98] tracking-tight"
        >
          Nehal Jain
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-display font-medium text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-text-muted max-w-2xl"
        >
          Building reliable products, from <span className="text-signal">interface</span> to{" "}
          <span className="text-link">intelligence</span>.
        </motion.p>

        <motion.p variants={item} className="mt-8 max-w-xl text-text-muted text-base sm:text-lg leading-relaxed">
          Final-year Computer Science student at JIIT, focused on full-stack development and applied AI. I enjoy
          turning complex problems into practical, end-to-end products — from intuitive interfaces and scalable
          backends to intelligent systems.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            className="inline-flex items-center gap-2 bg-signal text-ink font-mono text-sm font-medium uppercase tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition"
          >
            View projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-2 border border-line text-text font-mono text-sm uppercase tracking-wide px-6 py-3 rounded-full hover:border-link hover:text-link transition"
          >
            Get in touch
          </motion.a>
        </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:flex lg:col-span-5 justify-center"
        >
          <HeroPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}