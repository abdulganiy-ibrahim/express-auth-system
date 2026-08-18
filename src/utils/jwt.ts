import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not define');
}

export const generateToken = async (userId: string): Promise<string> => {

  const token = jwt.sign(
    {sub: userId},
    jwtSecret,
    {expiresIn: '15m'}
  )

  return token;
}