
export interface Project {
  title: string;
  role: string;
  type: string;
  description: string;
  details: string[];
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
}

export interface Skill {
  category: string;
  items: string[];
  proficiency?: number[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}
