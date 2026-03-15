export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  impact: string;
  duration: string;
  role: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface Metric {
  label: string;
  value: string;
  unit: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  metrics: Metric[];
}
