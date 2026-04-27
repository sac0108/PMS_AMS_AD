import { seedData } from '../data/seed';

const KEY = 'rcpm_suite_data_v1';
const AUTH = 'rcpm_auth_user_v1';
const THEME = 'rcpm_theme_v1';

export const loadData = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(raw);
};

export const saveData = (data) => localStorage.setItem(KEY, JSON.stringify(data));
export const loadAuth = () => JSON.parse(localStorage.getItem(AUTH) || 'null');
export const saveAuth = (user) => localStorage.setItem(AUTH, JSON.stringify(user));
export const clearAuth = () => localStorage.removeItem(AUTH);
export const loadTheme = () => localStorage.getItem(THEME) || 'light';
export const saveTheme = (mode) => localStorage.setItem(THEME, mode);
