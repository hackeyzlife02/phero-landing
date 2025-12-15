'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { ArrowLeft, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { APP_NAME } from '@/lib/constants/app';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!auth) {
      setError('Firebase is not configured');
      setLoading(false);
      return;
    }

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/auth/login`,
        handleCodeInApp: false,
      });

      setSuccess(true);
      setEmail('');
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === 'auth/user-not-found') {
        setError('No account found with this email address');
      } else if (firebaseError.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError(firebaseError.message || 'Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col min-h-screen lg:min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="font-headline text-[clamp(28px,5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Reset Password
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Enter your email to receive a password reset link
            </p>
          </div>

          {success ? (
            <div className="w-full space-y-6">
              <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl text-center">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="text-sm text-green-700">
                  Password reset email sent! Check your inbox and click the link to reset your
                  password.
                </p>
              </div>

              <Link
                href="/auth/login"
                className="w-full py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <Link
                href="/auth/login"
                className="w-full py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </form>
          )}

          <div className="w-full mt-8 pt-6 border-t border-[#E5E5E7]">
            <p className="text-sm text-[#6E6E73] text-center">
              Remember your password?{' '}
              <Link href="/auth/login" className="bg-gradient-brand-text bg-clip-text text-transparent font-medium hover:opacity-80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Check your inbox
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            We&apos;ll send you a link to reset your password securely.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-white/20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
