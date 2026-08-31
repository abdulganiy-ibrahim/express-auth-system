export interface CreateEmailVerificationData {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface EmailVerificationData {
  id: string;
  user_id: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}