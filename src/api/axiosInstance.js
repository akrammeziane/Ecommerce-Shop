import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
API.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.token = token;
  }
  return config;
});
export default API;
