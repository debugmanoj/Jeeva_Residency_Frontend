import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/v1",
  timeout: 10000,
});

// Optional: Auth token interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Optional: Global error interceptor
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("API Error:", err.response || err.message);
//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
