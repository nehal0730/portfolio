export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  links: { github?: string; live?: string };
  status: "live" | "in-progress";
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  points: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
}

export const projects: Project[] = [
  {
    id: "finsight-ai",
    name: "FinSight AI",
    tagline: "Explainable fraud intelligence over financial documents",
    description:
      "An end-to-end financial intelligence platform that turns uploaded documents into structured risk insights. A multi-stage RAG pipeline combines OCR extraction, document parsing, FAISS vector search, and LLM reasoning to generate explainable fraud analysis reports, backed by a hybrid fraud-scoring engine that blends rule-based heuristics with an IsolationForest model.",
    stack: ["React.js", "Node.js", "MongoDB", "FastAPI", "FAISS", "HuggingFace", "Groq LLM", "OCR"],
    metrics: [
      { label: "Transactions analyzed", value: "10,000+" },
      { label: "Fraud indicators", value: "28" },
      { label: "Contextual retrieval", value: "Top-5 evidence" },
    ],
    links: { github: "https://github.com/nehal0730/FinSight-AI", live: "https://finsight-ai-frontend-ify3.onrender.com" },
    status: "live",
  },
  {
    id: "meshvault",
    name: "MeshVault",
    tagline: "Decentralized comms for zero-connectivity environments",
    description:
      "A decentralized communication platform built on WebRTC DataChannels and WebSocket signaling, designed for disaster-response settings with intermittent or no internet. Persistent identities orchestrate device discovery and session continuity, backed by a resilient store-and-forward workflow with chunked file transfers for deferred delivery after reconnection.",
    stack: ["JavaScript", "Node.js", "React.js", "WebRTC", "WebSockets"],
    metrics: [
      { label: "Concurrent nodes", value: "10+" },
      { label: "Stable peer connections", value: "90%+" },
      { label: "Delivery reliability gain", value: "+40%" },
    ],
    links: { github: "https://github.com/nehal0730/MeshVault", live: "https://meshvault.onrender.com" },
    status: "live",
  },
  {
    id: "wanderlust",
    name: "WanderLust",
    tagline: "Airbnb-style booking platform, built MVC-first",
    description:
      "A full-featured property listing and booking platform with secure authentication via Passport.js, structured on an MVC architecture. Cloudinary handles image storage and delivery, with flash messaging layered in for a responsive, trustworthy user experience.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "EJS"],
    metrics: [
      { label: "Session reliability", value: "95%" },
      { label: "Faster load time", value: "+30%" },
      { label: "Maintainability gain", value: "+40%" },
    ],
    links: { github: "https://github.com/nehal0730/WanderLust", live: "https://wanderlust-ucd0.onrender.com/listings" },
    status: "live",
  },
  {
    id: "candidatesync",
    name: "CandidateSync",
    tagline: "Deterministic candidate-profile merging across five source types",
    description:
      "A multi-source candidate data transformer that merges a recruiter CSV export, an ATS JSON export, resumes (PDF/DOCX), and recruiter notes (TXT) into a single confidence-scored, provenance-tracked profile. Fully deterministic — no LLMs — using strict identity-matching precedence (email, then phone, then name+company) and a source-priority merge policy, with a runtime-configurable output schema and CLI.",
    stack: ["Python", "pdfplumber", "python-docx", "Regex/rule-based parsing", "CLI"],
    metrics: [
      { label: "Source formats merged", value: "5" },
      { label: "Approach", value: "Deterministic" },
      { label: "Output", value: "Scored & traced" },
    ],
    links: { github: "https://github.com/nehal0730/CandidateSync" },
    status: "live",
  },
  {
    id: "emotrack",
    name: "EmoTrack",
    tagline: "Real-time facial emotion detection, entirely in the browser",
    description:
      "A browser-based facial emotion recognition tool built on face-api.js, detecting faces and classifying expressions live over webcam with no server round-trip — all inference runs client-side. Placed 2nd at Spark'24, JIIT's technical exhibition hosted by CICE.",
    stack: ["JavaScript", "face-api.js", "TensorFlow.js", "HTML5", "CSS3"],
    metrics: [
      { label: "Inference", value: "Client-side" },
      { label: "Recognition", value: "Real-time" },
      { label: "Award", value: "2nd, Spark'24" },
    ],
    links: { github: "https://github.com/nehal0730/EmoTrack" },
    status: "live",
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "blackbytt",
    org: "BlackBytt",
    role: "Software Developer Intern",
    period: "Apr 2025 — Jul 2025",
    points: [
      "Engineered customized, branded Shopify storefronts using Liquid, HTML/CSS, and JavaScript, increasing user engagement by 30% and reducing customer support requests by 15%.",
      "Designed interactive tutorial walkthroughs blended into the storefront, reducing user-reported technical issues by 20% through guided onboarding.",
    ],
  },
];

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["C++", "Java", "JavaScript", "TypeScript", "Python", "SQL", "C", "HTML", "CSS", "PHP"] },
  { category: "Frontend", items: ["React.js", "Tailwind CSS", "Bootstrap", "EJS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "FastAPI", "Passport.js", "WebRTC", "LangChain"] },
  { category: "Data", items: ["MongoDB", "Mongoose", "SQL", "Redis"] },
  { category: "Tooling", items: ["Git", "GitHub", "Postman", "Docker", "VS Code", "Cloudinary", "NumPy", "Pandas"] },
];

export const achievements: Achievement[] = [
  { id: "dsa", title: "600+ DSA problems solved", detail: "Across LeetCode, Codeforces, and other platforms" },
  { id: "sih", title: "Institute Finalist — Smart India Hackathon 2024", detail: "National-level innovation challenge" },
  { id: "emotrack", title: "2nd place — \u201cEmoTrack\u201d, Spark\u201924", detail: "Exhibition held by CICE, JIIT" },
  { id: "gdsc", title: "Generative AI Study Jams 2023", detail: "Certified by Google Developer Student Clubs, JIIT" },
];

export const profile = {
  name: "Nehal Jain",
  role: "Full Stack Developer & AI Systems Builder",
  summary:
    "I'm drawn to problems where getting it wrong actually costs something — a fraud model that misses the one transaction that mattered, a network that drops a message it can never retry. That's what pulled me toward systems work over one-off scripts, and toward building things end-to-end rather than stopping at a demo — because that's usually where the real problems, and the real learning, show up.",
  location: "Noida, India",
  email: "nehaljain0730@gmail.com",
  phone: "+91-9599797061",
  links: {
    linkedin: "https://www.linkedin.com/in/nehal-jain-541679284/",
    github: "https://github.com/nehal0730",
    leetcode: "https://leetcode.com/u/nehal0730/",
  },
  education: [
    {
      school: "Jaypee Institute of Information Technology",
      degree: "B.Tech, Computer Science and Engineering",
      period: "2023 — Present",
      detail: "CGPA: 8.75",
    },
    {
      school: "St. Paul's Academy",
      degree: "Senior Secondary",
      period: "2022 — 2023",
      detail: "97%",
    },
  ],
};
