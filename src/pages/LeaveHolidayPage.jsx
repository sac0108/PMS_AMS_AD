import { useMemo, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import KpiCard from '../components/KpiCard';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import ChartCard from '../components/ChartCard';
import { useApp } from '../context/AppContext';
import { onLeaveToday } from '../utils/metrics';

export default function LeaveHolidayPage() {
  const { data, addEntity, updateEntity } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ resourceId: 'r1', leaveType: 'Casual', startDate: format(new Date(), 'yyyy-MM-dd'), endDate: format(new Date(), 'yyyy-MM-dd'), days: 1, status: 'Pending', reason: '' });
  const leavesToday = onLeaveToday(data);
  const apply = (e) => { e.preventDefault(); addEntity('leaves', { ...form, id: `l${Date.now()}` }); setOpen(false); };
  const calendar = eachDayOfInterval({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) });

  return <div className="space-y-4">
    <div className="flex justify-between"><div className="grid md:grid-cols-3 gap-3 flex-1"><KpiCard title="People on Leave Today" value={leavesToday.length} color="bg-risk"/><KpiCard title="Upcoming Leaves" value={data.leaves.filter((l)=>l.status!=='Closed').length} color="bg-project"/><KpiCard title="Approved Leaves" value={data.leaves.filter((l)=>l.status==='Approved').length} color="bg-available"/></div><button className="ml-3 bg-blue-600 text-white rounded-lg px-3 py-2" onClick={()=>setOpen(true)}>Apply Leave</button></div>
    <div className="grid lg:grid-cols-2 gap-4"><div className="card"><h3 className="font-semibold mb-2">Upcoming leaves</h3><DataTable columns={[{key:'resourceId',label:'Resource'},{key:'leaveType',label:'Type'},{key:'startDate',label:'Start'},{key:'endDate',label:'End'},{key:'status',label:'Status',badge:true}]} rows={data.leaves.map((l)=>({...l,resourceId:data.resources.find((r)=>r.id===l.resourceId)?.name||l.resourceId}))} actions={(r)=>r.status==='Pending'&&<button className="text-green-700" onClick={()=>updateEntity('leaves',{...data.leaves.find((x)=>x.id===r.id),status:'Approved'})}>Approve</button>} /></div><ChartCard title="Leave distribution"><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={['Casual','Sick','Planned'].map((t)=>({name:t,value:data.leaves.filter((l)=>l.leaveType===t).length}))} dataKey="value">{['#2563eb','#f97316','#7c3aed'].map((c,i)=><Cell key={i} fill={c}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard></div>
    <div className="card"><h3 className="font-semibold mb-2">Calendar month view</h3><div className="grid grid-cols-7 gap-2 text-xs">{calendar.map((d)=><div key={d.toISOString()} className="border rounded p-2 min-h-14"><p className="font-semibold">{format(d,'d')}</p>{data.leaves.filter((l)=>format(new Date(l.startDate),'yyyy-MM-dd')<=format(d,'yyyy-MM-dd')&&format(new Date(l.endDate),'yyyy-MM-dd')>=format(d,'yyyy-MM-dd')).slice(0,2).map((l)=><p key={l.id} className="text-red-600">{data.resources.find((r)=>r.id===l.resourceId)?.name.split(' ')[0]}</p>)}</div>)}</div></div>
    <Modal open={open} title="Apply Leave" onClose={()=>setOpen(false)}><form onSubmit={apply} className="grid grid-cols-2 gap-2">{Object.keys(form).map((k)=><input key={k} className="border rounded p-2" value={form[k]} onChange={(e)=>setForm({...form,[k]:k==='days'?Number(e.target.value):e.target.value})} placeholder={k}/>)}<button className="col-span-2 bg-blue-600 text-white rounded p-2">Submit</button></form></Modal>
  </div>;
}
