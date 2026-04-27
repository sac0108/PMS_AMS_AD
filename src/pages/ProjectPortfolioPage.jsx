import { Gauge, Pie, PieChart, ResponsiveContainer, Tooltip, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProjectPortfolioPage() {
  const { data } = useApp();
  const [selected, setSelected] = useState(null);
  const completed = data.projects.filter((p) => p.status === 'Completed').length;
  const inProgress = data.projects.filter((p) => p.status === 'In Progress').length;
  const notStarted = data.projects.filter((p) => p.status === 'Not Started').length;
  const avgProgress = Math.round(data.projects.reduce((a, b) => a + b.progress, 0) / data.projects.length);
  return <div className="space-y-4">
    <div className="grid md:grid-cols-5 gap-3"><KpiCard title="Total Projects" value={data.projects.length}/><KpiCard title="Completed" value={completed} color="bg-available"/><KpiCard title="In Progress" value={inProgress} color="bg-project"/><KpiCard title="Not Started" value={notStarted}/><KpiCard title="Avg Progress" value={`${avgProgress}%`} color="bg-strategic"/></div>
    <div className="grid lg:grid-cols-3 gap-4"><ChartCard title="Status donut"><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={[{name:'Completed',value:completed},{name:'In Progress',value:inProgress},{name:'Not Started',value:notStarted}]} dataKey="value">{['#16a34a','#f97316','#94a3b8'].map((c,i)=><Cell key={i} fill={c}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard><ChartCard title="Effort by project"><ResponsiveContainer width="100%" height={240}><BarChart data={data.projects.map((p)=>({name:p.name.slice(0,8),effort:data.tasks.filter((t)=>t.projectId===p.id).reduce((a,b)=>a+b.hours,0)}))}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="effort" fill="#2563eb"/></BarChart></ResponsiveContainer></ChartCard><ChartCard title="Progress gauge"><div className="text-center py-12"><div className="text-6xl font-bold text-blue-600">{avgProgress}%</div><p>Portfolio average completion</p></div></ChartCard></div>
    <div className="card"><DataTable columns={[{key:'name',label:'Project'},{key:'type',label:'Type',badge:true},{key:'status',label:'Status',badge:true},{key:'priority',label:'Priority',badge:true},{key:'health',label:'Health',badge:true},{key:'progress',label:'Progress %'}]} rows={data.projects} actions={(r)=><button className="text-blue-600" onClick={()=>setSelected(r)}>Details</button>} /></div>
    <Modal open={!!selected} onClose={()=>setSelected(null)} title="Project Details">{selected && <div className="space-y-2 text-sm"><p><b>Name:</b> {selected.name}</p><p><b>Description:</b> {selected.description}</p><p><b>Owner:</b> {data.resources.find((x)=>x.id===selected.owner)?.name}</p><p><b>Timeline:</b> {selected.startDate} to {selected.endDate}</p><p><b>Budget:</b> ${selected.budget}</p></div>}</Modal>
  </div>;
}
