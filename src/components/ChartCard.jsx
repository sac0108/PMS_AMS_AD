export default function ChartCard({ title, children, action }) {
  return <div className="card"><div className="flex justify-between items-center mb-3"><h3 className="font-semibold">{title}</h3>{action}</div>{children}</div>;
}
