'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="waitlist" className="py-20 md:py-[120px] px-4 sm:px-6 md:px-12 text-center border-t border-white/[0.04]">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-brand rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-headline text-3xl font-medium mb-4">
            You&apos;re on the list!
          </h2>
          <p className="font-headline text-white/50">
            We&apos;ll let you know when PHERO launches.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="waitlist"
      className={`py-20 md:py-[120px] px-4 sm:px-6 md:px-12 text-center border-t border-white/[0.04] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <h2 className="font-headline text-[clamp(28px,5vw,44px)] font-medium mb-10">
        Attraction is chemistry. Confidence is <em className="font-serif italic font-normal">the catalyst.</em>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 min-w-0 px-5 sm:px-6 py-4 bg-white/[0.04] border border-white/[0.08] rounded-full text-white font-headline text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-brand text-white font-headline text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(154,27,27,0.25)] disabled:opacity-50 disabled:hover:translate-y-0 group whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Early Access
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}
    </section>
  );
}
