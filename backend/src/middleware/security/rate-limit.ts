import { rateLimit } from 'express-rate-limit';

export const signinLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5
})