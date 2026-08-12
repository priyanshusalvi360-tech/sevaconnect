// api/galleryApi.js — API calls for Gallery
import api from './axiosInstance';

export const fetchGalleryItems = (params = {}) => api.get('/gallery', { params });
export const fetchAlbums = () => api.get('/gallery/albums');
export const addGalleryItem = (data) => api.post('/gallery', data);
export const updateGalleryItem = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);
