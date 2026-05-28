import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController';
import { protect } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import {
  registerSchema,
  loginSchema,
  taskSchema,
  updateTaskSchema,
} from '../utils/customValidation';

const router = Router();

router.post('/auth/register', validate(registerSchema), register);
router.post('/auth/login', validate(loginSchema), login);
router.get('/auth/profile', protect, getProfile);

router.post('/tasks', protect, validate(taskSchema), createTask);
router.get('/tasks', protect, getTasks);
router.get('/tasks/stats', protect, getTaskStats);
router.get('/tasks/:id', protect, getTaskById);
router.put('/tasks/:id', protect, validate(updateTaskSchema), updateTask);
router.delete('/tasks/:id', protect, deleteTask);

export default router;
