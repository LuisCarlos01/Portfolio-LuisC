export interface BaseResumeItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Education extends BaseResumeItem {
  achievements?: string[];
  certificateUrl?: string;
}

export interface Experience extends BaseResumeItem {
  location: string;
  achievements: string[];
  technologies: string[];
  isCurrent?: boolean;
  url?: string;
}

export interface Certification extends BaseResumeItem {
  issuedBy: string;
  certificateUrl: string;
  expirationDate?: string;
}

export type ResumeItemType = Education | Experience | Certification;
