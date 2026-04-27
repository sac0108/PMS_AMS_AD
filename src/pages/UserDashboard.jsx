import KpiCard from '../components/KpiCard';
import { useApp } from '../context/AppContext';
import DataTable from '../components/DataTable';

export default function UserDashboard() {
  const { data, user } = useApp();
  const myTasks = data.tasks.filter((t) => t.assignedTo === user.resourceId);
  const todayHours = myTasks.filter((t) => t.status !== 'Completed').reduce((a, t) => a + t.hours, 0) % 8;
  const myLeaves = data.leaves.filter((l) => l.resourceId === user.resourceId);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <KpiCard title="My Tasks" value={myTasks.length} color="bg-ams" />
        <KpiCard title="Logged Hours Today" value={todayHours} color="bg-project" />
        <KpiCard title="Remaining Capacity" value={`${Math.max(0, 8 - todayHours)}h`} color="bg-available" />
        <KpiCard title="My Leaves" value={myLeaves.length} color="bg-strategic" />
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">My tasks</h3>
        <DataTable columns={[{ key: 'workItem', label: 'Work Item' }, { key: 'description', label: 'Description' }, { key: 'status', label: 'Status', badge: true }, { key: 'hours', label: 'Hours' }]} rows={myTasks} />
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Quick entry</h3>
        <p className="text-sm text-slate-500">Use Project Activity Tracker to add full entries. This panel provides quick personal overview.</p>
      </div>
    </div>
  );
}
