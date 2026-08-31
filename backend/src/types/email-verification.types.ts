export interface CreateEmailVerificationData {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface EmailVerificationData {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}