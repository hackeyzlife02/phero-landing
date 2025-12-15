'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { FeedbackBanner } from '@/components/FeedbackBanner';
import { useOnboardingContext } from '@/lib/context/OnboardingContext';
import { NAME_CONSTRAINTS } from '@/lib/shared';
import { APP_NAME } from '@/lib/constants/app';

export default function NamePage() {
  const router = useRouter();
  const { hasFieldFeedback, getFieldFeedback, isFieldModified, markFieldAsModified } =
    useOnboardingContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [initialName, setInitialName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('onboarding_name');
    if (savedName) {
      setName(savedName);
      setInitialName(savedName);
    }
  }, []);

  const handleContinue = () => {
    setError('');

    if (name.trim().length < NAME_CONSTRAINTS.MIN_LENGTH) {
      setError(`Name must be at least ${NAME_CONSTRAINTS.MIN_LENGTH} characters`);
      return;
    }

    if (name.trim().length > NAME_CONSTRAINTS.MAX_LENGTH) {
      setError(`Name must be at most ${NAME_CONSTRAINTS.MAX_LENGTH} characters`);
      return;
    }

    localStorage.setItem('onboarding_name', name.trim());

    if (name.trim() !== initialName) {
      markFieldAsModified('preferred_name');
    }

    router.push('/onboarding/location');
  };

  const handleBack = () => {
    router.push('/onboarding/welcome');
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
          <span className="font-body text-[13px] text-[#6E6E73]">
            Step 1 of 7
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={1} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              What should we call you?
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              This is how clients will see your name on your profile
            </p>
          </div>

          {/* Feedback banner */}
          {hasFieldFeedback('preferred_name') && (
            <FeedbackBanner
              feedback={getFieldFeedback('preferred_name') || ''}
              isModified={isFieldModified('preferred_name')}
            />
          )}

          {/* Previous value reference */}
          {hasFieldFeedback('preferred_name') && initialName && (
            <div className="mb-6 p-4 bg-[#F5F5F7] rounded-xl">
              <p className="text-xs text-[#6E6E73] mb-1">Current value:</p>
              <p className="text-sm text-[#1D1D1F] font-medium">{initialName}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                Preferred Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] text-lg placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                placeholder="e.g., Jane, J.D., Jane Doe"
                autoFocus
              />
              {error && (
                <p className="text-brand-red text-sm mt-2">{error}</p>
              )}
              <p className="mt-2 text-sm text-[#6E6E73]">
                {name.length}/{NAME_CONSTRAINTS.MAX_LENGTH} characters
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            First impressions matter
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Your name is the first thing clients see. Make it memorable.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 1 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
