'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ForgotPasswordForm from './ForgotPasswordForm';
import VerifyOTPForm from './VerifyOTPForm';
import ResetPasswordForm from './ResetPasswordForm';
import { KeyRound } from 'lucide-react';

type PasswordResetFlowProps = {
  apiUrl: string;
};

type FlowState =
  | { step: 1 }
  | { step: 2; email: string }
  | { step: 3; email: string; resetToken: string };

const PANEL_COPY = {
  1: {
    heading: "Let's get you back in.",
    body: "Enter the email on your account and we'll send a one-time code to reset your password in under a minute.",
  },
  2: {
    heading: 'Almost there.',
    body: "Enter the code we just emailed you. It expires in a few minutes, so grab it while it's fresh.",
  },
  3: {
    heading: 'One last step.',
    body: "Choose a new password and you'll be right back in your account.",
  },
} as const;

export default function PasswordResetFlow({ apiUrl }: PasswordResetFlowProps) {
  const [state, setState] = useState<FlowState>({ step: 1 });
  const router = useRouter();
  const copy = PANEL_COPY[state.step];

  return (
    <section className="min-h-screen w-full lg:grid lg:grid-cols-2 mx-auto">
      <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-12 xl:p-16">
        <div className="flex items-center gap-2 text-sm font-medium">
          <KeyRound className="size-5" />
          <span>Account recovery</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl xl:text-5xl font-semibold leading-tight tracking-tight">
            {copy.heading}
          </h1>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">{copy.body}</p>
        </div>

        <p className="text-sm text-white/60">
          Remembered your password after all?{' '}
          <Link href="/signup" className="text-white underline underline-offset-4 hover:text-white/90">
            Sign in instead
          </Link>
        </p>
      </div>

      {state.step === 1 && (
        <ForgotPasswordForm apiUrl={apiUrl} onSuccess={(email) => setState({ step: 2, email })} />
      )}

      {state.step === 2 && (
        <VerifyOTPForm
          apiUrl={apiUrl}
          email={state.email}
          onBack={() => setState({ step: 1 })}
          onSuccess={(resetToken) => setState({ step: 3, email: state.email, resetToken })}
        />
      )}

      {state.step === 3 && (
        <ResetPasswordForm
          apiUrl={apiUrl}
          email={state.email}
          resetToken={state.resetToken}
          onSuccess={() => router.push('/login')}
        />
      )}
    </section>
  );
}