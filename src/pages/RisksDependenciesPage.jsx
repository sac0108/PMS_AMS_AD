import KpiCard from '../components/KpiCard';
import DataTable from '../components/DataTable';
import { useApp } from '../context/AppContext';

export default function RisksDependenciesPage() {
  const { data } = useApp();
  return <div className="space-y-4"><div className="grid md:grid-cols-3 gap-3"><KpiCard title="Open Risks" value={data.risks.filter((r)=>r.status==='Open').length} color="bg-risk"/><KpiCard title="High Severity Risks" value={data.risks.filter((r)=>['High','Critical'].includes(r.severity)).length} color="bg-project"/><KpiCard title="Blocked Tasks" value={data.tasks.filter((t)=>t.status==='Blocked').length} color="bg-risk"/></div><div className="grid lg:grid-cols-2 gap-4"><div className="card"><h3 className="font-semibold mb-2">Risk register</h3><DataTable columns={[{key:'title',label:'Title'},{key:'severity',label:'Severity',badge:true},{key:'impact',label:'Impact',badge:true},{key:'status',label:'Status',badge:true},{key:'owner',label:'Owner'}]} rows={data.risks.map((r)=>({...r,owner:data.resources.find((x)=>x.id===r.owner)?.name||r.owner}))} /></div><div className="card"><h3 className="font-semibold mb-2">Dependency matrix</h3><DataTable columns={[{key:'projectId',label:'Project'},{key:'taskId',label:'Task'},{key:'dependsOnTaskId',label:'Depends On'},{key:'type',label:'Type',badge:true},{key:'status',label:'Status',badge:true}]} rows={data.dependencies.map((d)=>({...d,projectId:data.projects.find((p)=>p.id===d.projectId)?.name||d.projectId}))} /></div></div></div>;
}
