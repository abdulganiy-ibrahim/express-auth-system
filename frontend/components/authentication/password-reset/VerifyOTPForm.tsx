'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { MailCheck, Loader2, ArrowLeft } from 'lucide-react';

type VerifyOTPFormProps = {
  apiUrl: string;
  email: string;
  onSuccess: (resetToken: string) => void;
  onBack: () => void;
};

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyOTPForm({ apiUrl, email, onSuccess, onBack }: VerifyOTPFormProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const code = digits.join('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length !== OTP_LENGTH) {
      toast.error(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/verify-password-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "That code didn't work. Please try again.");
      }

      toast.success('Code verified.');
      onSuccess(data?.resetToken ?? '');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "That code didn't work. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await fetch(`${apiUrl}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Could not resend the code. Please try again.');

      toast.success('New code sent.');
      setCooldown(RESEND_COOLDOWN);
      setDigits(Array(OTP_LENGTH).fill(''));
      focusInput(0);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not resend the code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:min-h-0 px-6 py-12">
      <div className="w-full max-w-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Change email
        </button>

        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <MailCheck className="size-5" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">Check your email</h2>
        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
          We sent a {OTP_LENGTH}-digit code to{' '}
          <span className="font-medium text-foreground">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                autoFocus={index === 0}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-12 text-center text-xl font-semibold border border-border rounded-lg bg-background-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white w-full py-2.5 rounded-full hover:bg-p-bg-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? 'Verifying…' : 'Verify code'}
          </button>
        </form>

        <p className="mt-6 text-sm text-foreground-muted text-center">
          Didn't get a code?{' '}
          {cooldown > 0 ? (
            <span>Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-primary hover:underline underline-offset-4 disabled:opacity-60"
            >
              {isResending ? 'Sending…' : 'Resend code'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}