'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name:'', description:'', price:'', stock:'', category:'', image:'Product' });

  async function load() {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function createProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const res = await fetch('/api/admin/products', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Admin only');
    setForm({ name:'', description:'', price:'', stock:'', category:'', image:'Product' });
    load();
  }

  return (
    <main className="container">
      <h1>Admin Panel</h1>
      <p>Login as admin first: admin@ayanmart.com / admin123</p>

      <div className="card">
        <h2>Add Product</h2>
        <form onSubmit={createProduct}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
          <input className="input" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
          <input className="input" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/>
          <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <button className="btn">Add Product</button>
        </form>
      </div>

      <h2>Products</h2>
      <div className="grid">
        {products.map(p => <div className="card" key={p.id}><b>{p.name}</b><p>₹{p.price}</p><p>Stock: {p.stock}</p></div>)}
      </div>
    </main>
  );
}
