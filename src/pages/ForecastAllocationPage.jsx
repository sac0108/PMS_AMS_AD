import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../components/ChartCard';
import KpiCard from '../components/KpiCard';
import { useApp } from '../context/AppContext';
import { computeResourceRows } from '../utils/metrics';

export default function ForecastAllocationPage() {
  const { data } = useApp();
  const rows = computeResourceRows(data);
  const teamCapacity = data.resources.length * 8 * 10;
  const approvedLeaves = data.leaves.filter((l) => l.status === 'Approved').reduce((a, b) => a + b.days * 8, 0);
  const committed = data.tasks.reduce((a, b) => a + b.hours, 0) * 2;
  const futureCapacity = teamCapacity - approvedLeaves - committed;
  const [size, setSize] = useState('Small');
  const demand = { Small: 120, Medium: 240, Large: 400 }[size];
  return <div className="space-y-4"><div className="grid md:grid-cols-4 gap-3"><KpiCard title="Team Capacity (2 weeks)" value={`${teamCapacity}h`} /><KpiCard title="Approved Leave Impact" value={`${approvedLeaves}h`} color="bg-risk"/><KpiCard title="Committed Hours" value={`${committed}h`} color="bg-project"/><KpiCard title="Future Capacity" value={`${futureCapacity}h`} color="bg-available"/></div><div className="grid lg:grid-cols-2 gap-4"><ChartCard title="Capacity vs Demand"><ResponsiveContainer width="100%" height={260}><BarChart data={[{name:'Capacity',hours:futureCapacity},{name:'Demand',hours:demand}]}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="hours" fill="#2563eb"/></BarChart></ResponsiveContainer></ChartCard><div className="card space-y-2"><h3 className="font-semibold">Simulation panel</h3><select className="border rounded p-2" value={size} onChange={(e)=>setSize(e.target.value)}><option>Small</option><option>Medium</option><option>Large</option></select><p>Required team capacity: <b>{demand}h</b></p><p>Can start new project? <b className={futureCapacity>=demand?'text-green-600':'text-red-600'}>{futureCapacity>=demand?'YES':'NO'}</b></p><p className="font-semibold mt-3">Suggested available resources</p><ul className="text-sm list-disc pl-5">{rows.sort((a,b)=>b.availableHours-a.availableHours).slice(0,5).map((r)=><li key={r.id}>{r.name} ({r.availableHours}h/day)</li>)}</ul></div></div></div>;
}
