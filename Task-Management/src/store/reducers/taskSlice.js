import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
  },
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
  },
  loading: false,
  filter: 'all',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setLoading,
  setTasks,
  setStats,
  addTask,
  updateTask,
  removeTask,
  setFilter,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;
