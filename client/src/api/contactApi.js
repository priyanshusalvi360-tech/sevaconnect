// api/contactApi.js — API calls for Contact Inquiries
import api from './axiosInstance';

export const submitContact = (data) => api.post('/contacts', data);
export const fetchContacts = (params = {}) => api.get('/contacts', { params });
export const updateContactStatus = (id, status) => api.put(`/contacts/${id}/status`, { status });
export const deleteContact = (id) => api.delete(`/contacts/${id}`);
