import { badgeClass } from '../utils/helpers';

export default function DataTable({ columns, rows, actions }) {
  return (
    <div className="overflow-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800"><tr>{columns.map((c) => <th key={c.key} className="text-left px-3 py-2">{c.label}</th>)}{actions && <th className="px-3 py-2">Actions</th>}</tr></thead>
        <tbody>
          {rows.map((r) => <tr key={r.id} className="border-t border-slate-200 dark:border-slate-700">{columns.map((c) => <td key={c.key} className="px-3 py-2">{c.badge ? <span className={`badge ${badgeClass(r[c.key])}`}>{r[c.key]}</span> : r[c.key]}</td>)}{actions && <td className="px-3 py-2">{actions(r)}</td>}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
