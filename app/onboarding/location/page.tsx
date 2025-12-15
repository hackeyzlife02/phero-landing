'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { US_STATES } from '@/lib/shared';
import { APP_NAME } from '@/lib/constants/app';

export default function LocationPage() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState({ city: '', state: '' });

  useEffect(() => {
    const savedCity = localStorage.getItem('onboarding_city');
    const savedState = localStorage.getItem('onboarding_state');
    if (savedCity) setCity(savedCity);
    if (savedState) setState(savedState);
  }, []);

  const handleContinue = () => {
    const newErrors = { city: '', state: '' };

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!state) {
      newErrors.state = 'Please select a state';
    }

    setErrors(newErrors);

    if (newErrors.city || newErrors.state) {
      return;
    }

    localStorage.setItem('onboarding_city', city.trim());
    localStorage.setItem('onboarding_state', state);

    router.push('/onboarding/photos');
  };

  const handleBack = () => {
    router.push('/onboarding/name');
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
          <span className="font-body text-[13px] text-[#6E6E73]">Step 2 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={2} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Where are you based?
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              This helps us connect you with clients in your area
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                City *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                placeholder="e.g., Los Angeles"
              />
              {errors.city && <p className="text-brand-red text-sm mt-2">{errors.city}</p>}
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                State *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
              >
                <option value="">Select a state...</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-brand-red text-sm mt-2">{errors.state}</p>}
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
            <MapPin className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Local connections
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            We&apos;ll match you with clients looking for stylists in your area.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 2 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
