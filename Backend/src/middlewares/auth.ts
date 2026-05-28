import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/errorHandler';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Not authorized to access this route');
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return sendError(res, 401, 'Invalid or expired token');
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized to access this route');
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, 'User role is not authorized to access this route');
    }
    next();
  };
};
