import { SignUpForm } from "@/components/signup";

export default async function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <SignUpForm />
    </div>
  );
}
