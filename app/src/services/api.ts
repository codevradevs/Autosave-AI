import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.patch('/users/me', data),
};

export const walletAPI = {
  get: () => api.get('/wallet'),
  unlock: (amount) => api.post('/wallet/unlock', { amount }),
};

export const transactionAPI = {
  list: (params) => api.get('/transactions', { params }),
};

export const mpesaAPI = {
  deposit: (amount) => api.post('/mpesa/deposit', { amount }),
  withdraw: (amount) => api.post('/mpesa/withdraw', { amount }),
};

export const autosaveAPI = {
  insights: () => api.get('/autosave/insights'),
  trigger: () => api.post('/autosave/trigger'),
  toggle: () => api.patch('/autosave/toggle'),
  setPreference: (preference) => api.patch('/autosave/preference', { preference }),
};

export const goalsAPI = {
  list: () => api.get('/goals'),
  create: (data) => api.post('/goals', data),
  contribute: (id, amount) => api.post(`/goals/${id}/contribute`, { amount }),
  withdraw: (id, amount) => api.post(`/goals/${id}/withdraw`, { amount }),
  delete: (id) => api.delete(`/goals/${id}`),
};

export default api;
