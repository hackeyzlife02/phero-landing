'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Close on escape key and handle keyboard
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle visual viewport resize (keyboard open/close)
    const handleViewportResize = () => {
      if (window.visualViewport) {
        const keyboardVisible = window.visualViewport.height < window.innerHeight * 0.75;
        setKeyboardOpen(keyboardVisible);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportResize);
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex p-4 transition-all duration-200 ${
        keyboardOpen ? 'items-start pt-24' : 'items-center justify-center'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl w-full max-w-[400px] p-8 animate-modal-in mx-auto ${
          keyboardOpen ? 'mt-0' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/40 hover:text-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-brand rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-headline text-xl font-semibold text-black mb-2">
              You&apos;re in!
            </h3>
            <p className="text-black/60 text-sm">
              We&apos;ll let you know when PHERO launches in NYC.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-headline text-xl font-semibold text-black mb-2 text-center">
              Get Early Access
            </h3>
            <p className="text-black/60 text-[0.8rem] text-center mb-6 whitespace-nowrap">
              Be first to experience PHERO in NYC.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-black/[0.04] border border-black/10 rounded-full text-black text-[0.9rem] placeholder:text-black/40 focus:outline-none focus:border-black/25 focus:bg-black/[0.06] transition-all"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-brand text-white font-headline text-[0.9rem] font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm text-center mt-3">{error}</p>
            )}

            <p className="text-black/40 text-xs text-center mt-4">
              We&apos;ll only email you about launch updates.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
