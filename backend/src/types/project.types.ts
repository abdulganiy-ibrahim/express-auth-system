export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  createdAt: Date;
}

export interface CreateProjectData {
  userId: string;
  title: string;
  description: string;
  technologies: string[];
}