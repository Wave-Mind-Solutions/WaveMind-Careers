import axios from 'axios';

// In development: Vite proxy routes /api → http://localhost:5000/api
// In production (Render/Vercel deployed): use the full backend URL from env
const rawApiUrl = import.meta.env.VITE_API_URL || '';
const cleanApiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

const BASE_URL = cleanApiUrl
  ? `${cleanApiUrl}/api`
  : '/api';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Global response error handler — logs 400/401/500 clearly in console
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status code
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      // Request made but no response (network disconnected, server down)
      console.error('[API Error] No response received — check your internet or backend server.', error.message);
    } else {
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getMe = () => API.get('/auth/me');

// ── Jobs ──────────────────────────────────────────────────────────────────────
export const getJobs = () => API.get('/jobs');
export const getAdminJobs = () => API.get('/jobs/admin');
export const createJob = (jobData) => API.post('/jobs', jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

// ── Candidates ────────────────────────────────────────────────────────────────
export const applyJob = (formData) =>
  API.post('/candidates/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getCandidates = (params) => API.get('/candidates', { params });
export const updateCandidateStatus = (id, data) => API.put(`/candidates/${id}/status`, data);
export const getStats = () => API.get('/candidates/stats');

// ── Interviews ────────────────────────────────────────────────────────────────
export const getInterviews = () => API.get('/interviews');
export const scheduleInterview = (data) => API.post('/interviews', data);

// ── Settings ──────────────────────────────────────────────────────────────────
export const getSettings = () => API.get('/settings');
export const updateSettings = (data) => API.put('/settings', data);

export default API;
