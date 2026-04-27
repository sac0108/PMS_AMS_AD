import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { setData } = useApp();
  return <div className="space-y-4"><div className="card"><h3 className="font-semibold mb-2">Settings</h3><p className="text-sm text-slate-500 mb-3">Demo environment controls.</p><button className="bg-red-600 text-white rounded px-3 py-2" onClick={()=>{localStorage.clear();window.location.reload();}}>Reset all local data</button></div></div>;
}
