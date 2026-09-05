export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const verificationUrl =
    `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

  console.log(`Verification email for: ${email}`);
  console.log(`Verification URL: ${verificationUrl}`);
};

export const sendPasswordResetOTP = async (email: string, otp: string) => {
  console.log(`Verification email for: ${email}`);
  console.log(`Your OTP is: ${otp}`);
}