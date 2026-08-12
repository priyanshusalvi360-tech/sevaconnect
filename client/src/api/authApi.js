// api/authApi.js — API calls for Admin Authentication
import api from './axiosInstance';

export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');
