import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const [form, setForm] = useState({ email: 'admin@company.com', password: '123456' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (!res.ok) return setError(res.message);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form onSubmit={submit} className="card max-w-md w-full">
        <h1 className="text-xl font-bold mb-1">RESOURCE CAPACITY & PROJECT MANAGEMENT SUITE</h1>
        <p className="text-sm text-slate-500 mb-4">Use demo users: admin@company.com / lead@company.com / user@company.com (123456)</p>
        <input className="w-full border rounded-lg p-2 mb-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded-lg p-2 mb-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <button className="w-full rounded-lg bg-blue-600 text-white p-2">Login</button>
      </form>
    </div>
  );
}
