export interface PublicUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  last_login: Date;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  created_at: Date;
}

export interface CreateProjectData {
  userId: string;
  title: string;
  description: string;
  technologies: string[];
}