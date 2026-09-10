import { PasswordResetFlow } from "@/components/authentication"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {

  if (!apiUrl) {
    console.log('API_URL is not defined');
    return;
  }

  return (
    <main>
      <PasswordResetFlow apiUrl={apiUrl} />
    </main>
  )
}