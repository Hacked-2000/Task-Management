import { Response } from 'express';
import { Task } from '../models/Task';
import { sendError, sendSuccess } from '../utils/errorHandler';
import { AuthRequest } from '../middlewares/auth';

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      userId: req.user._id,
    });

    sendSuccess(res, 201, 'Task created successfully', { task });
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    const query: any = { userId: req.user._id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Task.countDocuments(query);

    sendSuccess(res, 200, 'Tasks fetched successfully', {
      tasks,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    sendSuccess(res, 200, 'Task fetched successfully', { task });
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    sendSuccess(res, 200, 'Task updated successfully', { task });
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    sendSuccess(res, 200, 'Task deleted successfully', null);
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};

export const getTaskStats = async (req: AuthRequest, res: Response) => {
  try {
    const total = await Task.countDocuments({ userId: req.user._id });
    const completed = await Task.countDocuments({ userId: req.user._id, status: 'completed' });
    const pending = await Task.countDocuments({ userId: req.user._id, status: 'pending' });

    sendSuccess(res, 200, 'Task stats fetched successfully', {
      stats: {
        total,
        completed,
        pending,
      },
    });
  } catch (error: any) {
    sendError(res, 500, error.message || 'Server error');
  }
};
