import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 50 characters',
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

export const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim().required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must not exceed 100 characters',
  }),
  description: Joi.string().min(5).max(500).trim().required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 5 characters long',
    'string.max': 'Description must not exceed 500 characters',
  }),
  status: Joi.string().valid('pending', 'completed').optional().messages({
    'any.only': 'Status must be either pending or completed',
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim().optional().messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must not exceed 100 characters',
  }),
  description: Joi.string().min(5).max(500).trim().optional().messages({
    'string.min': 'Description must be at least 5 characters long',
    'string.max': 'Description must not exceed 500 characters',
  }),
  status: Joi.string().valid('pending', 'completed').optional().messages({
    'any.only': 'Status must be either pending or completed',
  }),
}).min(1);
