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

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export interface Profile {
  name: string;
  role: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  links: { linkedin: string; github: string; leetcode: string };
  education: EducationItem[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  achievements: Achievement[];
}
