import makeApiRequest from "../utils/makeApiRequest";
import { apiUrls } from "../utils/apiEndpoints";

export const registerApi = (credentials, dispatch) =>
  makeApiRequest(apiUrls.Register, { method: "POST", data: credentials }, null, dispatch);

export const loginApi = (credentials, dispatch) =>
  makeApiRequest(apiUrls.Login, { method: "POST", data: credentials }, null, dispatch);

export const getProfileApi = (token, dispatch) =>
  makeApiRequest(apiUrls.Profile, { method: "GET" }, null, dispatch, token);
