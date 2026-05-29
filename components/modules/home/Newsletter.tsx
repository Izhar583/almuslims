'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="bg-emerald-900 p-10 rounded-3xl text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Join our Newsletter</h2>
      {status === 'success' ? (
        <p className="text-emerald-200">JazakAllahu Khayran! You are now subscribed.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="p-3 rounded-lg text-black w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-emerald-500 px-6 py-3 rounded-lg font-bold">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}