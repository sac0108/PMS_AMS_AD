import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { user, logout, theme, setTheme, data } = useApp();
  return (
    <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl p-2 border"><Search size={16}/><input className="bg-transparent outline-none text-sm" placeholder="Search tasks, projects, resources..."/></div>
      <div className="flex items-center gap-2">
        <input type="date" className="rounded-lg border px-2 py-1 text-sm bg-white dark:bg-slate-900"/>
        <select className="rounded-lg border px-2 py-1 text-sm bg-white dark:bg-slate-900"><option>All Filters</option><option>High Priority</option><option>Open Risks</option></select>
        <button className="relative p-2 rounded-lg bg-white dark:bg-slate-900 border"><Bell size={16}/><span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">{data.notifications.length}</span></button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg bg-white dark:bg-slate-900 border">{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}</button>
        <div className="text-sm bg-white dark:bg-slate-900 border rounded-lg px-3 py-1">{user?.name} ({user?.role})</div>
        <button className="text-sm text-red-600" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
