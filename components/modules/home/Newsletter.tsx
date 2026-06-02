'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        // Trigger celebration confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C18742', '#042A1E', '#D99141', '#10B981', '#FCD34D']
        });
      }
      else setStatus('error');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="w-full bg-[#042A1E] border-y border-emerald-900/40 relative overflow-hidden">
      {/* Optional faint background texture overlay could go here */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          
          {/* Text and Icon */}
          <div className="flex items-center gap-5 w-full lg:w-auto">
            {/* Custom Envelope SVG */}
            <div className="flex-shrink-0 drop-shadow-md hidden sm:block">
              <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back Flap */}
                <path d="M12 28L32 14L52 28V48C52 49.1046 51.1046 50 50 50H14C12.8954 50 12 49.1046 12 48V28Z" fill="#A86A28"/>
                {/* White Letter */}
                <path d="M18 15H46V35H18V15Z" fill="#F9FAFB"/>
                {/* Letter Content Lines */}
                <path d="M24 20H40" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 25H36" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 30H30" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                {/* Envelope Front Left & Right */}
                <path d="M12 28L28 40L12 50V28Z" fill="#CA863A"/>
                <path d="M52 28L36 40L52 50V28Z" fill="#CA863A"/>
                {/* Envelope Front Bottom */}
                <path d="M12 50L32 36L52 50H12Z" fill="#D99141"/>
                {/* Inner Shadows/Lines */}
                <path d="M12 28L28 40" stroke="#B1722D" strokeWidth="1" strokeLinecap="round"/>
                <path d="M52 28L36 40" stroke="#B1722D" strokeWidth="1" strokeLinecap="round"/>
                <path d="M12 50L32 36L52 50" stroke="#B1722D" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-white text-[1.35rem] lg:text-[1.5rem] font-serif font-medium leading-tight mb-1">
                Join 10,000+ Muslims Learning & Growing Together
              </h2>
              <p className="text-emerald-50/80 text-[13px] lg:text-[14px]">
                Subscribe to our newsletter and get beneficial content delivered to your inbox.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto flex-shrink-0 flex justify-center lg:justify-end">
            {status === 'success' ? (
              <div className="flex items-center justify-center w-full sm:w-[450px] bg-emerald-800/40 px-6 py-3.5 rounded-md text-emerald-100 border border-emerald-500/30 font-medium">
                <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                JazakAllahu Khayran! You are subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full sm:w-[450px]">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-5 py-3.5 rounded-l-md text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#C18742]/50 placeholder-gray-400 text-[15px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-[#C18742] hover:bg-[#A97538] text-white px-6 sm:px-8 py-3.5 rounded-r-md font-medium text-[15px] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Wait...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}