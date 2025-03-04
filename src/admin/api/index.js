import axios from "axios";
import { store } from "store";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { auth } = store.getState();
  if (auth.user) {
    config.headers.Authorization = `Bearer ${auth.user.token}`;
  }
  return config;
});

export default api;
