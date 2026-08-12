// api/axiosInstance.js — Centralized Axios instance with base URL and auth interceptor
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

/**
 * Request interceptor — automatically attach JWT token to protected requests.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sevaconnect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor — handle 401 globally (token expired/invalid).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale token and redirect to admin login
      localStorage.removeItem('sevaconnect_token');
      localStorage.removeItem('sevaconnect_admin');
      if (window.location.pathname.startsWith('/admin') &&
          !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
