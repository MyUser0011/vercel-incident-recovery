'use client';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState('No order placed yet.');
  const [busy, setBusy] = useState(false);

  async function placeOrder() {
    setBusy(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subtotalCents: 10000, weightKg: 8, coupon: 'SAVE20' }),
      });
      const body = await res.json();
      setResult('HTTP ' + res.status + '\n' + JSON.stringify(body, null, 2));
    } catch (e) {
      setResult('Request failed: ' + String(e));
    }
    setBusy(false);
  }

  return (
    <main>
      <h1>Corner Shop</h1>
      <p>Synthetic exercise site. Test basket: 2 items, subtotal $100.00, 8 kg, coupon SAVE20.</p>
      <button onClick={placeOrder} disabled={busy} style={{ padding: '10px 16px', fontSize: 16 }}>
        {busy ? 'Placing order...' : 'Place test order'}
      </button>
      <pre style={{ background: '#f3f3f3', padding: 12, marginTop: 16 }}>{result}</pre>
      <p><a href="/api/diag">Open diagnostics (/api/diag)</a></p>
    </main>
  );
}
