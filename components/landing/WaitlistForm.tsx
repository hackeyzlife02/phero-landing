'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import { CityAutocomplete } from './CityAutocomplete';

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
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
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
        <h2 className="font-headline text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-2">
          Attraction is chemistry.
        </h2>
        <p className="font-headline text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
          Confidence is{' '}
          <em className="font-serif italic font-normal">the catalyst.</em>
        </p>
        <p className="font-body text-sm text-white/50 tracking-[0.1em] uppercase mb-12">
          This is PHERO
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left">
              {error}
            </div>
          )}

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

          {/* Age */}
          <div className="text-left">
            <input
              type="number"
              placeholder="Age"
              min="18"
              max="99"
              {...register('age', {
                required: 'Age is required',
                min: { value: 18, message: 'Must be 18 or older' },
                max: { value: 99, message: 'Please enter a valid age' },
              })}
              className="w-full px-6 py-[18px] bg-white/[0.06] border border-white/12 rounded-full text-white font-body text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
            />
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

          {/* Relationship Status */}
          <div className="text-left">
            <select
              {...register('relationshipStatus', { required: 'Please select an option' })}
              className="w-full px-6 py-[18px] bg-white/[0.06] border border-white/12 rounded-full text-white font-body text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="bg-black text-white/40">
                Relationship status
              </option>
              {RELATIONSHIP_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="bg-black text-white">
                  {status}
                </option>
              ))}
            </select>
            {errors.relationshipStatus && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.relationshipStatus.message}</p>
            )}
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
                Joining...
              </>
            ) : (
              <>
                Join Waitlist
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
