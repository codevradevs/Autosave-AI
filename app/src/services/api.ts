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
  register: (data: Record<string, unknown>) => api.post('/users/register', data),
  login: (data: Record<string, unknown>) => api.post('/users/login', data),
  getMe: () => api.get('/users/me'),
  updateProfile: (data: Record<string, unknown>) => api.patch('/users/me', data),
};

export const walletAPI = {
  get: () => api.get('/wallet'),
  unlock: (amount: number) => api.post('/wallet/unlock', { amount }),
};

export const transactionAPI = {
  list: (params?: Record<string, unknown>) => api.get('/transactions', { params }),
};

export const mpesaAPI = {
  deposit: (amount: number) => api.post('/mpesa/deposit', { amount }),
  withdraw: (amount: number) => api.post('/mpesa/withdraw', { amount }),
};

export const autosaveAPI = {
  insights: () => api.get('/autosave/insights'),
  trigger: () => api.post('/autosave/trigger'),
  toggle: () => api.patch('/autosave/toggle'),
  setPreference: (preference: string) => api.patch('/autosave/preference', { preference }),
};

export const goalsAPI = {
  list: () => api.get('/goals'),
  create: (data: Record<string, unknown>) => api.post('/goals', data),
  contribute: (id: string, amount: number) => api.post(`/goals/${id}/contribute`, { amount }),
  withdraw: (id: string, amount: number) => api.post(`/goals/${id}/withdraw`, { amount }),
  delete: (id: string) => api.delete(`/goals/${id}`),
};

export default api;
