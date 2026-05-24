'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setOrders(Array.isArray(d) ? d : []));
  }, []);

  return (
    <main className="container">
      <h1>My Orders</h1>
      <table className="table">
        <thead><tr><th>ID</th><th>Total</th><th>Status</th><th>Items</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
              <td>{o.items.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
