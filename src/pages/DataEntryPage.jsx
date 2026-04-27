import { useState } from 'react';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import { useApp } from '../context/AppContext';

const tabs = { Resources: 'resources', Projects: 'projects', Tasks: 'tasks', Leaves: 'leaves', Risks: 'risks' };

export default function DataEntryPage() {
  const { data, addEntity, updateEntity, removeEntity } = useApp();
  const [tab, setTab] = useState('Resources');
  const entity = tabs[tab];
  const base = data[entity][0] || { id: '' };
  const [form, setForm] = useState(base);
  const [open, setOpen] = useState(false);
  const cols = Object.keys(base).slice(0, 6).map((k) => ({ key: k, label: k, badge: ['status','priority','severity','health','type'].includes(k) }));

  const save = (e) => { e.preventDefault(); const payload = { ...form, id: form.id || `${entity[0]}${Date.now()}` }; data[entity].some((x)=>x.id===payload.id) ? updateEntity(entity, payload) : addEntity(entity, payload); setOpen(false); };
  return <div className="space-y-4"><div className="card flex flex-wrap gap-2">{Object.keys(tabs).map((t)=><button key={t} onClick={()=>{setTab(t);setForm(data[tabs[t]][0]||{id:''});}} className={`px-3 py-2 rounded ${tab===t?'bg-blue-600 text-white':'bg-slate-200 dark:bg-slate-700'}`}>{t}</button>)}<button className="ml-auto bg-green-600 text-white rounded px-3 py-2" onClick={()=>{setForm({...base,id:''});setOpen(true);}}>Add</button></div><div className="card"><DataTable columns={cols} rows={data[entity]} actions={(r)=><div className="space-x-2"><button onClick={()=>{setForm(r);setOpen(true);}}>Edit</button><button className="text-red-600" onClick={()=>removeEntity(entity,r.id)}>Delete</button></div>} /></div><Modal open={open} title={`${form.id?'Edit':'Add'} ${tab}`} onClose={()=>setOpen(false)}><form onSubmit={save} className="grid grid-cols-2 gap-2">{Object.keys(base).map((k)=><input key={k} className="border rounded p-2" placeholder={k} value={form[k] ?? ''} onChange={(e)=>setForm({...form,[k]:e.target.value})}/>) }<button className="col-span-2 bg-blue-600 text-white rounded p-2">Save</button></form></Modal></div>;
}
