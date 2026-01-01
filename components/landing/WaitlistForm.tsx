'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

const BASE_COUNT = 131;
const STORAGE_KEY = 'phero_waitlist_count';

function getStoredCount(): { count: number; timestamp: number } {
  if (typeof window === 'undefined') return { count: BASE_COUNT, timestamp: Date.now() };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore localStorage errors
  }

  const initial = { count: BASE_COUNT, timestamp: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Ignore localStorage errors
  }
  return initial;
}

function calculateCurrentCount(): number {
  const { count, timestamp } = getStoredCount();
  const elapsed = Date.now() - timestamp;
  const hoursPassed = elapsed / (1000 * 60 * 60);

  // Add 0-2 people per hour on average
  const additionalPeople = Math.floor(hoursPassed * (Math.random() * 2));
  const newCount = count + additionalPeople;

  // Update stored value
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, timestamp: Date.now() }));
  } catch {
    // Ignore localStorage errors
  }

  return newCount;
}

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(BASE_COUNT);

  useEffect(() => {
    // Initialize count on mount
    setWaitlistCount(calculateCurrentCount());

    // Periodically increment (every 30-90 seconds)
    const interval = setInterval(() => {
      const shouldIncrement = Math.random() > 0.5;
      if (shouldIncrement) {
        setWaitlistCount((prev) => {
          const newCount = prev + 1;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, timestamp: Date.now() }));
          } catch {
            // Ignore localStorage errors
          }
          return newCount;
        });
      }
    }, 30000 + Math.random() * 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to join waitlist');
      }

      setSubmitted(true);
      // Increment counter on successful signup
      setWaitlistCount((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="cta" className="bg-black py-16 sm:py-20 md:py-[100px] px-4 sm:px-7 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-brand rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-semibold mb-4">
            You&apos;re in. We&apos;ll be in touch.
          </h2>
          <p className="text-white/50">
            Thanks for joining the waitlist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="bg-black py-16 sm:py-20 md:py-[100px] px-4 sm:px-7 text-center">
      <div className="max-w-[500px] mx-auto">
        <h2 className="font-headline text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.03em] mb-3.5">
          How you show up <em className="font-serif italic font-normal">matters.</em>
        </h2>

        <p className="text-base opacity-60 mb-8">
          Be first when we launch in NYC.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[400px] mx-auto mb-4">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 min-w-0 px-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-full text-white text-[0.85rem] placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 bg-gradient-brand text-white font-headline text-[0.85rem] font-semibold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              'Join'
            )}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <p className="text-[0.85rem] font-medium text-white mb-2">
          First session half off for early signups.
        </p>

        <p className="text-[0.8rem] opacity-50">
          <span className="text-white opacity-100">{waitlistCount}</span> people on the waitlist
        </p>
      </div>
    </section>
  );
}
