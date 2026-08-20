export interface PublicUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  last_login: Date;
}