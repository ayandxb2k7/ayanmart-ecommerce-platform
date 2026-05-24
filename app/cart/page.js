'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');

  async function load(t) {
    const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${t}` } });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    const t = localStorage.getItem('token') || '';
    setToken(t);
    if (t) load(t);
  }, []);

  async function checkout() {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Checkout failed');
    alert('Order placed successfully');
    location.href = '/orders';
  }

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <main className="container">
      <h1>Cart</h1>
      {!token && <p>Please login first.</p>}
      <div className="card">
        {items.map(i => (
          <div className="row" key={i.id}>
            <div>
              <b>{i.product.name}</b>
              <p>₹{i.product.price} x {i.quantity}</p>
            </div>
            <b>₹{i.product.price * i.quantity}</b>
          </div>
        ))}
        <hr/>
        <h2>Total: ₹{total}</h2>
        <button className="btn" disabled={!items.length} onClick={checkout}>Checkout</button>
      </div>
    </main>
  );
}
