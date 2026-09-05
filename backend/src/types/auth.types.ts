export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface NewPasswordData {
  password: string;
  userId: string;
}

export interface CreatePasswordResetOTPData {
  user_id: string;
  hashed_otp: string;
  expires_at: Date;
}

export interface PasswordResetOTPData {
  id: string;
  user_id: string;
  hashed_otp: string;
  expires_at: Date;
  created_at: Date;
  used: boolean;
}

export interface CreatePasswordResetTokenData {
  user_id: string;
  hashed_token: string;
  expires_at: Date;
}

export interface PasswordResetTokenData {
  id: string;
  user_id: string;
  hashed_token: string;
  expires_at: Date;
  created_at: Date;
  used: boolean;
}

export interface ResetPasswordData {
  resetToken: string;
  newPassword: string;
}