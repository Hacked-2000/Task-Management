import makeApiRequest from "../utils/makeApiRequest";
import { apiUrls } from "../utils/apiEndpoints";

export const createTaskApi = (taskData, token, dispatch) =>
  makeApiRequest(apiUrls.CreateTask, { method: "POST", data: taskData }, null, dispatch, token);

export const getTasksApi = (params, token, dispatch) =>
  makeApiRequest(apiUrls.GetTasks, { method: "GET", params }, null, dispatch, token);

export const getTaskStatsApi = (token, dispatch) =>
  makeApiRequest(apiUrls.GetTaskStats, { method: "GET" }, null, dispatch, token);

export const getTaskByIdApi = (id, token, dispatch) =>
  makeApiRequest(apiUrls.GetTaskById(id), { method: "GET" }, null, dispatch, token);

export const updateTaskApi = (id, taskData, token, dispatch) =>
  makeApiRequest(apiUrls.UpdateTask(id), { method: "PUT", data: taskData }, null, dispatch, token);

export const deleteTaskApi = (id, token, dispatch) =>
  makeApiRequest(apiUrls.DeleteTask(id), { method: "DELETE" }, null, dispatch, token);
