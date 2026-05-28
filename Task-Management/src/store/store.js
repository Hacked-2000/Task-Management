import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import taskReducer from './reducers/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});
