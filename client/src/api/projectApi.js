// api/projectApi.js — API calls for Projects
import api from './axiosInstance';

export const fetchProjects = (params = {}) => api.get('/projects', { params });
export const fetchProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
