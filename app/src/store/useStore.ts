import { create } from 'zustand';
import { authAPI, walletAPI, autosaveAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  autoSaveEnabled: boolean;
  savingPreference: 'low' | 'medium' | 'aggressive';
}

interface Wallet {
  balance: number;
  lockedBalance: number;
  totalSaved: number;
  totalDeposited: number;
  totalWithdrawn: number;
}

interface Insights {
  todaySaved: number;
  weekSaved: number;
  monthSaved: number;
  totalSaved: number;
  dailySavingCapacity: number;
  canSaveNow: boolean;
}

interface AppStore {
  user: User | null;
  wallet: Wallet | null;
  insights: Insights | null;
  token: string | null;
  isLoading: boolean;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setWallet: (wallet: Wallet) => void;
  setNotification: (n: AppStore['notification']) => void;
  clearNotification: () => void;
  logout: () => void;

  fetchMe: () => Promise<void>;
  fetchInsights: () => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  user: null,
  wallet: null,
  insights: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  notification: null,

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  setUser: (user) => set({ user }),
  setWallet: (wallet) => set({ wallet }),

  setNotification: (notification) => {
    set({ notification });
    setTimeout(() => set({ notification: null }), 4000);
  },

  clearNotification: () => set({ notification: null }),

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, wallet: null, token: null, insights: null });
  },

  fetchMe: async () => {
    try {
      const res = await authAPI.getMe();
      set({ user: res.data.user, wallet: res.data.wallet });
    } catch {}
  },

  fetchInsights: async () => {
    try {
      const res = await autosaveAPI.insights();
      set({ insights: res.data });
    } catch {}
  },
}));
