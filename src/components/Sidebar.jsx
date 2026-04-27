import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, CalendarDays, FileBarChart2, AlertTriangle, Database, Settings, Users, ClipboardList, Radar, FolderKanban } from 'lucide-react';

const items = [
  ['/', 'Dashboard', LayoutDashboard], ['/executive-summary', 'Executive Summary', FileBarChart2], ['/resource-capacity', 'Resource Capacity', Users], ['/project-activity', 'Project Activity Tracker', ClipboardList], ['/project-portfolio', 'Project Portfolio', FolderKanban], ['/leave-holiday', 'Leave & Holiday', CalendarDays], ['/forecast-allocation', 'Forecast & Allocation', Radar], ['/risks-dependencies', 'Risks & Dependencies', AlertTriangle], ['/reports', 'Reports', FileBarChart2], ['/data-entry', 'Data Entry', Database], ['/settings', 'Settings', Settings],
];

export default function Sidebar() {
  return <aside className="w-72 bg-navy text-slate-200 min-h-screen p-4 hidden md:block"><h1 className="font-bold text-lg mb-4">RESOURCE CAPACITY &<br/>PROJECT MANAGEMENT SUITE</h1><nav className="space-y-1">{items.map(([to, label, Icon]) => <NavLink key={to} to={to} end className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/15 text-white' : 'hover:bg-white/10'}`}><Icon size={16}/>{label}</NavLink>)}</nav></aside>;
}
