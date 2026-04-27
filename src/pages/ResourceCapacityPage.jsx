import { useMemo, useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { useApp } from '../context/AppContext';
import { computeResourceRows } from '../utils/metrics';
import { csvExport } from '../utils/helpers';

export default function ResourceCapacityPage() {
  const { data } = useApp();
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('All');
  const rows = computeResourceRows(data);
  const filtered = useMemo(() => rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) && (group === 'All' || r.group === group)), [rows, search, group]);
  return <div className="space-y-4">
    <div className="card flex flex-wrap gap-2 items-center"><input className="border rounded-lg p-2" placeholder="Search resource" value={search} onChange={(e)=>setSearch(e.target.value)}/><select className="border rounded-lg p-2" value={group} onChange={(e)=>setGroup(e.target.value)}><option>All</option><option>Client Services</option><option>Engineering Monitoring</option><option>Shared</option></select><button className="rounded-lg bg-slate-900 text-white px-3 py-2" onClick={()=>csvExport(filtered,'resource-capacity.csv')}>Export CSV</button></div>
    <div className="card"><DataTable columns={[{ key:'name',label:'Name'},{key:'role',label:'Role'},{key:'group',label:'Group'},{key:'amsHours',label:'AMS Hours'},{key:'projectHours',label:'Project Hours'},{key:'leaveHours',label:'Leave Hours'},{key:'availableHours',label:'Available Hours'},{key:'utilization',label:'Utilization %'},{key:'status',label:'Status',badge:true}]} rows={filtered} /></div>
    <div className="grid lg:grid-cols-3 gap-4">
      <ChartCard title="Top available resources"><ResponsiveContainer width="100%" height={220}><BarChart data={[...filtered].sort((a,b)=>b.availableHours-a.availableHours).slice(0,6)}><XAxis dataKey="name" hide/><YAxis/><Tooltip/><Bar dataKey="availableHours" fill="#16a34a"/></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Overutilized resources"><ResponsiveContainer width="100%" height={220}><BarChart data={filtered.filter((r)=>r.utilization>85)}><XAxis dataKey="name" hide/><YAxis/><Tooltip/><Bar dataKey="utilization">{filtered.filter((r)=>r.utilization>85).map((_,i)=><Cell key={i} fill="#dc2626"/>)}</Bar></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Capacity heatmap"><div className="grid grid-cols-5 gap-2">{filtered.slice(0,15).map((r)=><div key={r.id} className={`rounded p-2 text-xs text-white ${r.utilization>90?'bg-red-600':r.utilization>75?'bg-orange-500':r.utilization>50?'bg-blue-500':'bg-green-600'}`}>{r.name.split(' ')[0]} {r.utilization}%</div>)}</div></ChartCard>
    </div>
  </div>;
}
