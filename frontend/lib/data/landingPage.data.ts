import { ShieldCheck, RefreshCw, Timer, KeyRound, MailCheck, LockKeyhole } from "lucide-react";

export const terminalLines = [
  { method: "POST", path: "/api/auth/signup", status: 201, note: "user created, verification email queued" },
  { method: "POST", path: "/api/auth/verify-email", status: 200, note: "email confirmed" },
  { method: "POST", path: "/api/auth/signin", status: 200, note: "accessToken + refreshToken issued" },
  { method: "POST", path: "/api/auth/refresh", status: 200, note: "access token rotated" },
  { method: "PATCH", path: "/api/auth/change-password", status: 200, note: "existing sessions invalidated" },
  { method: "POST", path: "/api/auth/signin", status: 429, note: "too many attempts, try again in 60s" },
];

export const features = [
  {
    icon: MailCheck,
    title: "Email verification",
    description: "Accounts are unusable until the email is confirmed.",
  },
  {
    icon: KeyRound,
    title: "Refresh token rotation",
    description: "Short-lived access tokens, rotated refresh tokens on every use.",
  },
  {
    icon: Timer,
    title: "Rate limiting",
    description: "Repeated failed attempts get throttled, not silently allowed.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based authorization",
    description: "Routes are gated by permission, checked on every request.",
  },
  {
    icon: RefreshCw,
    title: "Session invalidation",
    description: "Changing your password kills every other active session.",
  },
  {
    icon: LockKeyhole,
    title: "Hardened by default",
    description: "Hashed passwords, signed tokens, no secrets in the client.",
  },
];