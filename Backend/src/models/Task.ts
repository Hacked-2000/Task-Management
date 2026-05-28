import mongoose, { Schema } from 'mongoose';
import { ITask } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ userId: 1, status: 1 });

export const Task = mongoose.model<ITask>('Task', taskSchema);
