import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoUsers } from '../data/seed';
import { clearAuth, loadAuth, loadData, loadTheme, saveAuth, saveData, saveTheme } from '../utils/storage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(loadData());
  const [user, setUser] = useState(loadAuth());
  const [theme, setTheme] = useState(loadTheme());

  useEffect(() => saveData(data), [data]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  const updateEntity = (entity, item) => setData((p) => ({ ...p, [entity]: p[entity].map((x) => (x.id === item.id ? item : x)) }));
  const addEntity = (entity, item) => setData((p) => ({ ...p, [entity]: [item, ...p[entity]] }));
  const removeEntity = (entity, id) => setData((p) => ({ ...p, [entity]: p[entity].filter((x) => x.id !== id) }));

  const login = (email, password) => {
    const match = demoUsers.find((u) => u.email === email && u.password === password);
    if (!match) return { ok: false, message: 'Invalid credentials' };
    setUser(match);
    saveAuth(match);
    return { ok: true };
  };

  const logout = () => { setUser(null); clearAuth(); };
  const value = useMemo(() => ({ data, user, theme, setTheme, login, logout, updateEntity, addEntity, removeEntity, setData }), [data, user, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
