'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { ArrowRight, CheckCircle, Key } from 'lucide-react';
import { APP_NAME } from '@/lib/constants/app';

function SetupPasswordContent() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oobCode, setOobCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (!code) {
      setError('Invalid or missing reset code. Please use the link from your email.');
    } else {
      setOobCode(code);
    }
  }, [searchParams]);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oobCode) {
      setError('Invalid reset code');
      return;
    }

    if (!auth) {
      setError('Firebase is not configured');
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Confirm the password reset
      await confirmPasswordReset(auth, oobCode, password);

      // Success! Show success message
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Password setup error:', err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === 'auth/expired-action-code') {
        setError('This link has expired. Please request a new password reset link.');
      } else if (firebaseError.code === 'auth/invalid-action-code') {
        setError('This link is invalid. Please request a new password reset link.');
      } else {
        setError(firebaseError.message || 'Failed to set password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - Content */}
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
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="font-headline text-[clamp(28px,5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-4">
              Password Set Successfully!
            </h1>

            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6] mb-8">
              Your password has been created. Let&apos;s complete your stylist profile.
            </p>

            <Link
              href="/onboarding/welcome"
              className="w-full py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
            >
              Start Onboarding
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right side - Gradient visual */}
        <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
          <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

          <div className="relative z-10 text-center px-12">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="font-headline text-2xl font-semibold text-white mb-3">
              You&apos;re all set!
            </h2>
            <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
              Your account is ready. Complete your profile to start connecting with clients.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              Set Your Password
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Welcome to {APP_NAME}! Create a secure password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
              />
              <p className="text-xs text-[#6E6E73] mt-2">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
                  Set Password & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="w-full mt-8 pt-6 border-t border-[#E5E5E7]">
            <p className="text-sm text-[#6E6E73] text-center">
              After setting your password, you&apos;ll complete your stylist profile.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Key className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Secure your account
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Create a strong password to keep your stylist account safe.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SetupPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
        </div>
      }
    >
      <SetupPasswordContent />
    </Suspense>
  );
}
