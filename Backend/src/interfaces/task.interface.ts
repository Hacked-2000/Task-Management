import { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'completed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
