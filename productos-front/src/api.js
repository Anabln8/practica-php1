import axios from "axios";

const URL_BASE = "http://34.238.117.203/"; // Cambia por tu backend

const api = axios.create({
  baseURL: URL_BASE,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
