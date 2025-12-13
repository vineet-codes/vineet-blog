export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  details?: string;
}

export interface Publication {
  title: string;
  url?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface BlogPost {
  slug: string; // filename without extension
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string; // The markdown content
}

export interface TravelEntry {
  year: string;
  city: string;
  country: string;
  lat: string;
  lng: string;
  tags: string[];
}