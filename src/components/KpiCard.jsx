export default function KpiCard({ title, value, subtitle, color = 'bg-blue-500' }) {
  return <div className="card"><div className="flex items-center gap-3"><div className={`w-2 h-10 rounded ${color}`}></div><div><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-bold">{value}</p><p className="text-xs text-slate-500">{subtitle}</p></div></div></div>;
}
