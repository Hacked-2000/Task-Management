import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET as string;
  
  return jwt.sign({ id: userId }, secret, {
    expiresIn: (process.env.JWT_EXPIRE || '7d') as any,
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
