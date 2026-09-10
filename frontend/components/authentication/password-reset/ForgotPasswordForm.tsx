'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { KeyRound, Loader2 } from 'lucide-react';

type ForgotPasswordFormProps = {
  apiUrl: string;
  onSuccess: (email: string) => void;
};

export default function ForgotPasswordForm({ apiUrl, onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Something went wrong. Please try again.');
      }

      toast.success('OTP sent, check your email.');
      onSuccess(email);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:min-h-0 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <KeyRound className="size-5" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">Forgot your password?</h2>
        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
          No worries. Enter your email and we&apos;ll send you a one-time code to reset it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2.5 border border-border rounded-lg bg-background-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white w-full py-2.5 rounded-full hover:bg-p-bg-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? 'Sending OTP…' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}