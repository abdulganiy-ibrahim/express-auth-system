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