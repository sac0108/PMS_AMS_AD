import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Modal from '../components/Modal';
import KpiCard from '../components/KpiCard';
import DataTable from '../components/DataTable';
import ChartCard from '../components/ChartCard';
import { useApp } from '../context/AppContext';

const empty = { id: '', workItem: '', description: '', category: 'Development', status: 'Open', assignedTo: 'r1', projectId: 'p1', hours: 1, startDate: '', dueDate: '', endDate: '', billable: true, notes: '' };

export default function ProjectActivityPage() {
  const { data, addEntity, updateEntity, removeEntity } = useApp();
  const [item, setItem] = useState(empty); const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({ projectId: 'All', assignedTo: 'All', status: 'All' });
  const tasks = useMemo(() => data.tasks.filter((t) => (filter.projectId === 'All' || t.projectId === filter.projectId) && (filter.assignedTo === 'All' || t.assignedTo === filter.assignedTo) && (filter.status === 'All' || t.status === filter.status)), [data.tasks, filter]);
  const save = (e) => { e.preventDefault(); const payload = { ...item, id: item.id || `t${Date.now()}` }; item.id ? updateEntity('tasks', payload) : addEntity('tasks', payload); setOpen(false); setItem(empty); };

  return <div className="space-y-4">
    <div className="flex flex-wrap gap-2"><button className="px-3 py-2 rounded-lg bg-blue-600 text-white" onClick={()=>setOpen(true)}>Add Task</button><select className="border rounded p-2" onChange={(e)=>setFilter({...filter,projectId:e.target.value})}><option>All</option>{data.projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select><select className="border rounded p-2" onChange={(e)=>setFilter({...filter,assignedTo:e.target.value})}><option>All</option>{data.resources.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select><select className="border rounded p-2" onChange={(e)=>setFilter({...filter,status:e.target.value})}><option>All</option><option>Open</option><option>In Progress</option><option>Completed</option><option>Blocked</option></select></div>
    <div className="grid md:grid-cols-4 gap-3"><KpiCard title="Total Activities" value={tasks.length} /><KpiCard title="Total Logged Effort" value={`${tasks.reduce((a,b)=>a+b.hours,0)}h`} color="bg-project"/><KpiCard title="Billable" value={tasks.filter(t=>t.billable).length} color="bg-available"/><KpiCard title="Non-Billable" value={tasks.filter(t=>!t.billable).length} color="bg-risk"/></div>
    <div className="grid lg:grid-cols-2 gap-4"><ChartCard title="Effort by category"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={Object.entries(tasks.reduce((a,t)=>((a[t.category]=(a[t.category]||0)+t.hours),a),{})).map(([name,value])=>({name,value}))} dataKey="value">{['#2563eb','#f97316','#16a34a','#7c3aed','#dc2626','#0ea5e9'].map((c,i)=><Cell key={i} fill={c}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard><ChartCard title="Effort by project"><ResponsiveContainer width="100%" height={250}><BarChart data={data.projects.map((p)=>({name:p.name.slice(0,10),hours:tasks.filter((t)=>t.projectId===p.id).reduce((a,b)=>a+b.hours,0)}))}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="hours" fill="#f97316"/></BarChart></ResponsiveContainer></ChartCard></div>
    <div className="card"><DataTable columns={[{key:'workItem',label:'Work Item'},{key:'description',label:'Description'},{key:'category',label:'Category',badge:true},{key:'status',label:'Status',badge:true},{key:'hours',label:'Hours'},{key:'billable',label:'Billable'}]} rows={tasks.map((t)=>({...t,billable:t.billable?'Yes':'No'}))} actions={(r)=><div className="space-x-2"><button onClick={()=>{setItem(data.tasks.find((t)=>t.id===r.id));setOpen(true);}}>Edit</button><button className="text-red-600" onClick={()=>removeEntity('tasks',r.id)}>Delete</button></div>} /></div>
    <Modal open={open} title={`${item.id?'Edit':'Add'} Task`} onClose={()=>setOpen(false)}><form className="grid grid-cols-2 gap-2" onSubmit={save}>{Object.entries(item).filter(([k])=>k!=='id').map(([k,v])=><input key={k} className="border rounded p-2" placeholder={k} value={v} onChange={(e)=>setItem({...item,[k]:k==='billable'?e.target.value==='true':e.target.value})}/>) }<button className="col-span-2 bg-blue-600 text-white rounded p-2">Save</button></form></Modal>
  </div>;
}
