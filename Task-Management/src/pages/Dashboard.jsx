import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Pagination,
} from '@mui/material';
import {
  Add,
  Search,
  Logout,
  Assignment,
  CheckCircle,
  PendingActions,
} from '@mui/icons-material';
import TaskCard from '../componnets/TaskCard';
import TaskModal from '../componnets/TaskModal';
import {
  getTasksApi,
  getTaskStatsApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from '../services/taskService';
import {
  setTasks,
  setStats,
  setFilter,
  setSearchQuery,
  updateTask as updateTaskRedux,
  removeTask,
} from '../store/reducers/taskSlice';
import { logout } from '../store/reducers/authSlice';
import { showSuccess, showError } from '../utils/toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { tasks, stats, pagination, filter, searchQuery } = useSelector((state) => state.task);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filter, searchQuery, page]);

  const fetchTasks = async () => {
    setLoading(true);
    const params = {
      status: filter,
      page,
      limit: 10,
      ...(searchQuery && { search: searchQuery }),
    };

    const response = await getTasksApi(params, token, dispatch);
    if (response?.success) {
      dispatch(setTasks(response.data));
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    const response = await getTaskStatsApi(token, dispatch);
    if (response?.success) {
      dispatch(setStats(response.data.stats));
    }
  };

  const handleCreateTask = async (taskData) => {
    const response = await createTaskApi(taskData, token, dispatch);
    if (response?.success) {
      showSuccess(response.message || 'Task created successfully');
      setModalOpen(false);
      fetchTasks();
      fetchStats();
    } else {
      showError(response?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    const response = await updateTaskApi(selectedTask._id, taskData, token, dispatch);
    if (response?.success) {
      showSuccess(response.message || 'Task updated successfully');
      dispatch(updateTaskRedux(response.data.task));
      setModalOpen(false);
      setSelectedTask(null);
      fetchStats();
    } else {
      showError(response?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    const response = await deleteTaskApi(taskId, token, dispatch);
    if (response?.success) {
      showSuccess(response.message || 'Task deleted successfully');
      dispatch(removeTask(taskId));
      fetchStats();
    } else {
      showError(response?.message || 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const response = await updateTaskApi(task._id, { status: newStatus }, token, dispatch);
    if (response?.success) {
      showSuccess(`Task marked as ${newStatus}`);
      dispatch(updateTaskRedux(response.data.task));
      fetchStats();
    } else {
      showError(response?.message || 'Failed to update task status');
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleModalSubmit = (taskData) => {
    if (selectedTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
    setPage(1);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    setPage(1);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Assignment sx={{ fontSize: 36, color: '#667eea' }} />
          <h1>Task Manager</h1>
        </div>
        <div className="user-info">
          <span className="user-name">Welcome, {user?.name}</span>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon total">
            <Assignment />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <PendingActions />
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="tasks-section">
        <div className="tasks-header">
          <h2>My Tasks</h2>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              },
            }}
          >
            New Task
          </Button>
        </div>

        <TextField
          fullWidth
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <div className="tasks-filters">
          <Chip
            label="All"
            onClick={() => handleFilterChange('all')}
            color={filter === 'all' ? 'primary' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Pending"
            onClick={() => handleFilterChange('pending')}
            color={filter === 'pending' ? 'warning' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Completed"
            onClick={() => handleFilterChange('completed')}
            color={filter === 'completed' ? 'success' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <CircularProgress />
          </div>
        ) : tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
            {pagination.pages > 1 && (
              <div className="pagination-container">
                <Pagination
                  count={pagination.pages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>No tasks found</h3>
            <p>Create your first task to get started</p>
          </div>
        )}
      </div>

      <TaskModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        task={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
