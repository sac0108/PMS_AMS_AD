import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import { useApp } from '../context/AppContext';
import { avgCompletion, computeResourceRows } from '../utils/metrics';

export default function ReportsPage() {
  const { data } = useApp();
  const rows = computeResourceRows(data);
  const util = Math.round(rows.reduce((a, b) => a + b.utilization, 0) / rows.length);
  const capacity = Math.round((rows.reduce((a, b) => a + b.availableHours, 0) / (rows.length * 8)) * 100);
  const billable = Math.round((data.tasks.filter((t) => t.billable).length / data.tasks.length) * 100);
  const slippage = data.projects.filter((p) => p.health !== 'Good').length;

  return <div className="space-y-4"><div className="grid md:grid-cols-6 gap-3"><KpiCard title="Utilization %" value={`${util}%`} color="bg-project"/><KpiCard title="Capacity %" value={`${capacity}%`} color="bg-available"/><KpiCard title="Billable %" value={`${billable}%`}/><KpiCard title="Avg completion days" value={avgCompletion(data.tasks)} /><KpiCard title="Open risks" value={data.risks.filter((r) => r.status === 'Open').length} color="bg-risk"/><KpiCard title="Project slippage" value={slippage} color="bg-strategic"/></div><div className="grid lg:grid-cols-2 gap-4"><ChartCard title="Resource ranking"><ResponsiveContainer width="100%" height={250}><BarChart data={[...rows].sort((a, b) => b.utilization - a.utilization).slice(0, 8)}><XAxis dataKey="name" hide/><YAxis/><Tooltip/><Bar dataKey="utilization" fill="#7c3aed"/></BarChart></ResponsiveContainer></ChartCard><ChartCard title="Effort trends"><ResponsiveContainer width="100%" height={250}><LineChart data={Array.from({ length: 8 }).map((_, i) => ({ week: `W${i + 1}`, hours: data.tasks.slice(i * 3, i * 3 + 3).reduce((a, b) => a + b.hours, 0) }))}><XAxis dataKey="week"/><YAxis/><Tooltip/><Line dataKey="hours" stroke="#2563eb"/></LineChart></ResponsiveContainer></ChartCard><ChartCard title="Project health"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={['Good', 'At Risk', 'Critical'].map((h) => ({ name: h, value: data.projects.filter((p) => p.health === h).length }))} dataKey="value">{['#16a34a', '#f97316', '#dc2626'].map((c, i) => <Cell key={i} fill={c} />)}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard><ChartCard title="Leave impact"><ResponsiveContainer width="100%" height={250}><BarChart data={data.resources.slice(0, 10).map((r) => ({ name: r.name.split(' ')[0], days: data.leaves.filter((l) => l.resourceId === r.id).reduce((a, b) => a + b.days, 0) }))}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="days" fill="#f97316"/></BarChart></ResponsiveContainer></ChartCard></div></div>;
}
