export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  last_login: Date | null;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  last_login: Date | null;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

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