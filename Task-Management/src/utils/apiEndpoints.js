// ==================== ENVIRONMENT CONFIGURATION ====================

const BASE_URL = "https://task-management-m9k9.onrender.com/api";

// ==================== API ENDPOINTS ====================

export const apiUrls = {
  Register: `${BASE_URL}/auth/register`,
  Login: `${BASE_URL}/auth/login`,
  Profile: `${BASE_URL}/auth/profile`,
  
  CreateTask: `${BASE_URL}/tasks`,
  GetTasks: `${BASE_URL}/tasks`,
  GetTaskStats: `${BASE_URL}/tasks/stats`,
  GetTaskById: (id) => `${BASE_URL}/tasks/${id}`,
  UpdateTask: (id) => `${BASE_URL}/tasks/${id}`,
  DeleteTask: (id) => `${BASE_URL}/tasks/${id}`,
};

export { BASE_URL };


