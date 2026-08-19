import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

type AuthTokenPayload = {
  sub: string;
}

export const generateToken = (userId: string): string => {

  const token = jwt.sign(
    {sub: userId},
    jwtSecret,
    {expiresIn: '15m'}
  )

  return token;
}

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    jwtSecret
  ) as AuthTokenPayload;

  return decoded;
}