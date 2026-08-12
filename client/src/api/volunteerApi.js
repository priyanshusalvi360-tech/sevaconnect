// api/volunteerApi.js — API calls for Volunteers
import api from './axiosInstance';

export const submitVolunteer = (data) => api.post('/volunteers', data);
export const fetchVolunteers = (params = {}) => api.get('/volunteers', { params });
export const updateVolunteerStatus = (id, status) => api.put(`/volunteers/${id}/status`, { status });
export const deleteVolunteer = (id) => api.delete(`/volunteers/${id}`);
