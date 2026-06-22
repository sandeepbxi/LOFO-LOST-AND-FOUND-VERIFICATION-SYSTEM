import { create } from 'zustand';
import api from '../utils/api';

const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  userRole: localStorage.getItem('userRole') || 'user',
  token: localStorage.getItem('token') || null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', user.role);
    set({ user, userRole: user.role });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    set({ user: null, userRole: 'user', token: null });
  },

  items: [],
  fetchItems: async () => {
    try {
      const res = await api.get('/items/items');
      set({ items: res.data });
    } catch (err) {
      get().addToast('Failed to fetch items', 'error');
    }
  },

  claims: [],
  fetchClaims: async () => {
    try {
      const res = await api.get('/claims');
      set({ claims: res.data });
    } catch (err) {
      get().addToast('Failed to fetch claims', 'error');
    }
  },

  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 3000);
  }
}));

export default useStore;
