'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import { CityAutocomplete } from './CityAutocomplete';

const AGE_RANGE_OPTIONS = [
  '18-24',
  '25-34',
  '35-44',
  '45+',
];

const RELATIONSHIP_STATUS_OPTIONS = [
  'Single',
  'Dating',
  'In a Relationship',
  'Engaged',
  'Married',
  'It\'s Complicated',
  'Prefer not to say',
];

type CityData = {
  city: string;
  state: string;
  formatted: string;
};

type WaitlistFormData = {
  name: string;
  email: string;
  age: string;
  relationshipStatus: string;
};

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cityData, setCityData] = useState<CityData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>();

  const onSubmit = async (data: WaitlistFormData) => {
    // Validate city is selected
    if (!cityData) {
      setError('Please select your city');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          city: cityData.city,
          state: cityData.state,
        }),
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
      <section id="waitlist" className="py-32 md:py-44 px-7 md:px-[72px] text-center relative overflow-hidden bg-black">
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(123,45,158,0.2)_0%,rgba(154,27,27,0.15)_40%,transparent_70%)] blur-[60px]" />

        <div className="relative z-10 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-brand rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9A1B1B 0%, #7B2D9E 100%)' }}>
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-headline text-3xl font-semibold mb-4">
            You&apos;re on the list!
          </h2>
          <p className="font-body text-white/50">
            We&apos;ll let you know when PHERO launches in your area.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-32 md:py-44 px-7 md:px-[72px] text-center relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(123,45,158,0.2)_0%,rgba(154,27,27,0.15)_40%,transparent_70%)] blur-[60px]" />

      <div className="relative z-10 max-w-[700px] mx-auto">
        <h2 className="font-headline text-[clamp(28px,4.5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em] mb-4">
          Attraction is chemistry. Confidence is{' '}
          <em className="font-serif italic font-normal">the catalyst.</em>
        </h2>
        <p className="font-body text-base text-white/50 mb-10">
          Get early access when PHERO launches.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left">
              {error}
            </div>
          )}

          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div className="text-left">
              <input
                type="text"
                placeholder="Your name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-6 py-[18px] bg-white/[0.06] border border-white/12 rounded-full text-white font-body text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 ml-4">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder="Email address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email',
                  },
                })}
                className="w-full px-6 py-[18px] bg-white/[0.06] border border-white/12 rounded-full text-white font-body text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-4">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Age + City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Age Range */}
            <div className="text-left">
              <select
                {...register('age', { required: 'Age range is required' })}
                className="w-full px-6 py-[18px] bg-white/[0.06] border border-white/12 rounded-full text-white font-body text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="bg-black text-white/40">
                  Age range
                </option>
                {AGE_RANGE_OPTIONS.map((range) => (
                  <option key={range} value={range} className="bg-black text-white">
                    {range}
                  </option>
                ))}
              </select>
              {errors.age && (
                <p className="text-red-400 text-xs mt-1 ml-4">{errors.age.message}</p>
              )}
            </div>

            {/* City (Google Places Autocomplete) */}
            <div className="text-left">
              {cityData ? (
                <div className="flex items-center justify-between px-6 py-[18px] bg-white/[0.06] border border-white/30 rounded-full">
                  <span className="font-body text-sm text-white">{cityData.formatted}</span>
                  <button
                    type="button"
                    onClick={() => setCityData(null)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <CityAutocomplete
                  value={cityData}
                  onCitySelect={setCityData}
                  placeholder="Search your city"
                />
              )}
            </div>
          </div>

          {/* Relationship Status - Optional */}
          <div className="text-left pt-2">
            <label className="block font-body text-[11px] text-white/40 mb-2 ml-4">
              Optional: where you&apos;re at right now
            </label>
            <select
              {...register('relationshipStatus')}
              className="w-full px-6 py-[16px] bg-white/[0.04] border border-white/8 rounded-full text-white/70 font-body text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" className="bg-black text-white/40">
                Relationship status
              </option>
              {RELATIONSHIP_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="bg-black text-white">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-gradient-brand text-white font-body text-sm font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-gradient disabled:opacity-50 disabled:hover:translate-y-0 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Requesting...
              </>
            ) : (
              <>
                Request Early Access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
