'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Loader2, Eye, EyeOff, Check } from 'lucide-react';

type ResetPasswordFormProps = {
  apiUrl: string;
  email: string;
  resetToken: string;
  onSuccess: () => void;
};

export default function ResetPasswordForm({ apiUrl, email, resetToken, onSuccess }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requirements = [
    { label: 'At least 8 characters', met: newPassword.length >= 8 },
    { label: 'One number', met: /\d/.test(newPassword) },
    { label: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
  ];

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit = requirements.every((r) => r.met) && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      toast.error('Please meet all password requirements.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Could not reset your password. Please try again.');
      }

      toast.success('Password reset. You can sign in now.');
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not reset your password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:min-h-0 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <Lock className="size-5" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">Set a new password</h2>
        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
          Make it something you haven&apos;t used before.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                autoComplete="new-password"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2.5 pr-10 w-full border border-border rounded-lg bg-background-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="Re-enter the password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2.5 border border-border rounded-lg bg-background-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <span className="text-xs text-red-500">Passwords don&apos;t match.</span>
            )}
          </div>

          <ul className="flex flex-col gap-1.5">
            {requirements.map((req) => (
              <li
                key={req.label}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  req.met ? 'text-foreground' : 'text-foreground-muted'
                }`}
              >
                <span
                  className={`flex size-4 items-center justify-center rounded-full border transition-colors ${
                    req.met ? 'bg-primary border-primary text-white' : 'border-border'
                  }`}
                >
                  {req.met && <Check className="size-3" />}
                </span>
                {req.label}
              </li>
            ))}
          </ul>

          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white w-full py-2.5 rounded-full hover:bg-p-bg-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
}