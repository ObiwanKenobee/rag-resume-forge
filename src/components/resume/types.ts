
export interface HeaderData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  location: string;
  workAuthorization: string;
}

export interface SummaryData {
  content: string;
  yearsExperience: string;
  focusAreas: string[];
  achievements: string[];
}

export interface SkillsData {
  programming: string[];
  frameworks: string[];
  ml: string[];
  rag: string[];
  tools: string[];
  cloud: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  dissertationTitle?: string;
  gpa?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  citations?: string;
  link?: string;
  isFirstAuthor: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  impact?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface ResumeData {
  header: HeaderData;
  summary: SummaryData;
  skills: SkillsData;
  experience: ExperienceItem[];
  education: EducationItem[];
  publications: PublicationItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
}

export const initialResumeData: ResumeData = {
  header: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    location: '',
    workAuthorization: ''
  },
  summary: {
    content: '',
    yearsExperience: '',
    focusAreas: [],
    achievements: []
  },
  skills: {
    programming: ['Python', 'PyTorch', 'Shell', 'TensorFlow', 'C++'],
    frameworks: ['HuggingFace Transformers', 'FAISS', 'LangChain', 'OpenAI APIs'],
    ml: ['Deep learning', 'Transformer architectures', 'Self-supervised learning'],
    rag: ['Dense/sparse retrieval', 'Vector databases', 'Hybrid search'],
    tools: ['Git', 'Docker', 'Kubernetes', 'Weights & Biases', 'Ray'],
    cloud: ['AWS', 'GCP', 'Meta in-house stack']
  },
  experience: [],
  education: [],
  publications: [],
  projects: [],
  awards: []
};
