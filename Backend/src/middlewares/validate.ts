import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { sendError } from '../utils/errorHandler';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details[0].message;
      return sendError(res, 400, errorMessage);
    }

    next();
  };
};
