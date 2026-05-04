import axios from 'axios';

const API = axios.create({ baseURL: 'https://wavemind-careers-backend.onrender.com/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Jobs
export const getJobs = () => API.get('/jobs');
export const getAdminJobs = () => API.get('/jobs/admin');
export const createJob = (jobData) => API.post('/jobs', jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

// Candidates
export const applyJob = (formData) => API.post('/candidates/apply', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getCandidates = (params) => API.get('/candidates', { params });
export const updateCandidateStatus = (id, data) => API.put(`/candidates/${id}/status`, data);
export const getStats = () => API.get('/candidates/stats');

// Interviews
export const getInterviews = () => API.get('/interviews');
export const scheduleInterview = (data) => API.post('/interviews', data);

// Settings
export const getSettings = () => API.get('/settings');
export const updateSettings = (data) => API.put('/settings', data);

export default API;
