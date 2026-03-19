export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string
  valueProp: string
  location: string
  email: string
  linkedin: string
  github: string
  resumeUrl: string
  availability: string
}

export interface ProjectFeature {
  title: string
  description: string
  highlights: string[]
  techStack: string[]
  outcomes: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  role: string
  duration: string
  context: string
  description: string
  highlights: string[]
  techStack: string[]
  outcomes: string[]
  accentColor: string
  features?: ProjectFeature[]
  icon: string | null
  abbreviation: string
  projectType: 'professional' | 'personal'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'testing' | 'tools' | 'mobile'
  level: 'primary' | 'strong' | 'familiar'
  description?: string
}

export interface ExperienceHighlight {
  platform: string
  role: string
  duration: string
  description: string
  contributions: string[]
  impact: string[]
  techStack: string[]
}

export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  description: string
  platforms: ExperienceHighlight[]
}

export interface Metric {
  id: string
  value: string
  label: string
  description: string
  project: string
  color: string
}

export interface ContactInfo {
  email: string
  linkedin: string
  github: string
  resumeUrl: string
  location: string
}

export interface PortfolioData {
  personal: PersonalInfo
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  metrics: Metric[]
  contact: ContactInfo
}

export interface Section {
  id: string
  label: string
  index: number
}
