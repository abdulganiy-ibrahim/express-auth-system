import { rateLimit } from 'express-rate-limit';

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  keyGenerator: (req) => {
    const email = req.body?.email;

    return email?.trim().toLowerCase() || req.ip;
  }
});

export const verifyEmailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5
})

export const signinLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,

  keyGenerator: (req) => {
    const email = req.body?.email;

    return email?.trim().toLowerCase() || req.ip;
  }
});

export const signoutLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
})

export const resendEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,

  keyGenerator: (req) => {
    const email = req.body?.email;

    return email?.trim().toLowerCase() || req.ip;
  }
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,

  keyGenerator: (req) => {
    const email = req.body?.email;

    return email?.trim().toLowerCase() || req.ip;
  }
})

export const verifyPasswordOTPLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
});

export const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
})

export const changePasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,

  keyGenerator: (req) => {
    const userId = req.userId;

    if (userId) {
      return userId;
    }

    return req.ip ?? 'unknown';
  }
})