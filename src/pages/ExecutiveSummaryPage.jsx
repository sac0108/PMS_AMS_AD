import { addDays, format } from 'date-fns';
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import KpiCard from '../components/KpiCard';
import { useApp } from '../context/AppContext';
import { computeResourceRows } from '../utils/metrics';

export default function ExecutiveSummaryPage() {
  const { data } = useApp();
  const rows = computeResourceRows(data);
  const totalCapacity = data.resources.length * 8;
  const used = rows.reduce((a, r) => a + r.amsHours + r.projectHours + r.leaveHours, 0);
  const util = Math.round((used / totalCapacity) * 100);
  const leaves = data.leaves.slice(0, 5);
  const atRisk = data.projects.filter((p) => p.health !== 'Good');
  const utilTrend = Array.from({ length: 14 }).map((_, i) => ({ day: format(addDays(new Date(), -13 + i), 'MM/dd'), util: Math.max(55, Math.min(100, util + (i % 5) - 2)) }));
  const groupData = ['Client Services', 'Engineering Monitoring', 'Shared'].map((g) => {
    const members = rows.filter((r) => r.group === g);
    return { group: g, ams: members.reduce((a, b) => a + b.amsHours, 0), project: members.reduce((a, b) => a + b.projectHours, 0), available: members.reduce((a, b) => a + b.availableHours, 0) };
  });

  return <div className="space-y-4">
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
      <KpiCard title="Total Team Members" value={data.resources.length} color="bg-ams" />
      <KpiCard title="Total Capacity Today" value={`${totalCapacity}h`} color="bg-project" />
      <KpiCard title="Utilization %" value={`${util}%`} color="bg-risk" />
      <KpiCard title="Available Capacity" value={`${totalCapacity - Math.round(used)}h`} color="bg-available" />
      <KpiCard title="Active Projects" value={data.projects.filter((p) => p.status === 'In Progress').length} color="bg-strategic" />
      <KpiCard title="Open Risks" value={data.risks.filter((r) => r.status === 'Open').length} color="bg-risk" />
    </div>
    <div className="grid lg:grid-cols-2 gap-4">
      <ChartCard title="AMS vs Project vs Available"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={[{ name: 'AMS', value: rows.reduce((a,b)=>a+b.amsHours,0), color: '#2563eb' }, { name: 'Project', value: rows.reduce((a,b)=>a+b.projectHours,0), color: '#f97316' }, { name: 'Available', value: rows.reduce((a,b)=>a+b.availableHours,0), color: '#16a34a' }]} dataKey="value" innerRadius={60}>{[{c:'#2563eb'},{c:'#f97316'},{c:'#16a34a'}].map((x,i)=><Cell key={i} fill={x.c}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Utilization Trend (14 Days)"><ResponsiveContainer width="100%" height={250}><LineChart data={utilTrend}><XAxis dataKey="day"/><YAxis/><Tooltip/><Line type="monotone" dataKey="util" stroke="#7c3aed"/></LineChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Project Status Pie"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={['Completed','In Progress','Not Started'].map((s)=>({name:s,value:data.projects.filter((p)=>p.status===s).length}))} dataKey="value">{['#16a34a','#f97316','#94a3b8'].map((c,i)=><Cell key={i} fill={c}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Capacity by Group"><ResponsiveContainer width="100%" height={250}><BarChart data={groupData}><XAxis dataKey="group"/><YAxis/><Tooltip/><Bar dataKey="ams" stackId="a" fill="#2563eb"/><Bar dataKey="project" stackId="a" fill="#f97316"/><Bar dataKey="available" stackId="a" fill="#16a34a"/></BarChart></ResponsiveContainer></ChartCard>
    </div>
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card"><h3 className="font-semibold mb-2">Upcoming leaves</h3><DataTable columns={[{ key: 'resourceId', label: 'Resource' }, { key: 'leaveType', label: 'Type' }, { key: 'startDate', label: 'Start' }, { key: 'status', label: 'Status', badge: true }]} rows={leaves.map((l)=>({ ...l, resourceId: data.resources.find((r)=>r.id===l.resourceId)?.name || l.resourceId }))} /></div>
      <div className="card"><h3 className="font-semibold mb-2">At-risk projects</h3><DataTable columns={[{ key: 'name', label: 'Project' }, { key: 'priority', label: 'Priority', badge: true }, { key: 'health', label: 'Health', badge: true }, { key: 'progress', label: 'Progress %' }]} rows={atRisk} /></div>
    </div>
  </div>;
}
