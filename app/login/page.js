'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: 'user@ayanmart.com', password: 'user123' });

  async function submit(e) {
    e.preventDefault();
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    location.href = '/';
  }

  return (
    <main className="container">
      <div className="card" style={{maxWidth: 430, margin:'40px auto'}}>
        <h1>{mode === 'login' ? 'Login' : 'Create Account'}</h1>
        <form onSubmit={submit}>
          {mode === 'register' && (
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          )}
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <button className="btn">{mode === 'login' ? 'Login' : 'Register'}</button>
        </form>
        <p>
          <button className="btn light" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
        <p>Admin: admin@ayanmart.com / admin123</p>
        <p>User: user@ayanmart.com / user123</p>
      </div>
    </main>
  );
}
