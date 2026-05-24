'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);

  async function addToCart(productId) {
    if (!token) {
      alert('Please login first. Demo user: user@ayanmart.com / user123');
      location.href = '/login';
      return;
    }

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity: 1 })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Failed');
    alert('Added to cart');
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>Full Stack E-Commerce Platform</h1>
        <p>Next.js, Prisma, SQLite, JWT Auth, Cart, Orders, Admin Panel and stock-safe checkout.</p>
      </section>

      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <span className="badge">{p.category}</span>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p className="price">₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <button className="btn" onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}
