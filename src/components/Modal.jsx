export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl p-5">
        <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-lg">{title}</h3><button onClick={onClose}>✕</button></div>
        {children}
      </div>
    </div>
  );
}
