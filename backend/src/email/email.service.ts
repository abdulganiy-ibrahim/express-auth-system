export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const verificationUrl =
    `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

  console.log(`Verification email for: ${email}`);
  console.log(`Verification URL: ${verificationUrl}`);
};