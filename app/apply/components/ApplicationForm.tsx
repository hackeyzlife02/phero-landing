'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Mail, User, Share2, FileText } from 'lucide-react';
import { APP_NAME, APP_PROGRAM_NAME } from '@/lib/constants/app';
import { ProgressBar } from '@/components/ProgressBar';
import { CityAutocompleteLight, type CityData } from '@/components/CityAutocompleteLight';

type FormData = {
  // Step 1: Email verification
  email: string;
  verificationCode: string;

  // Step 2: Personal info
  fullName: string;
  birthday: string;
  locationCity: string;
  locationState: string;
  phone?: string;

  // Step 3: Social media
  instagramHandle: string;
  tiktokHandle?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;

  // Step 4: About You
  bio: string;
};

const steps = [
  { id: 1, title: 'Email', icon: Mail },
  { id: 2, title: 'Profile', icon: User },
  { id: 3, title: 'Social', icon: Share2 },
  { id: 4, title: 'About', icon: FileText },
  { id: 5, title: 'Review', icon: Check },
];

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState<CityData | null>(null);
  const [locationError, setLocationError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const email = watch('email');

  const sendVerificationCode = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send verification code');
      }

      // Store the token for later verification
      setVerificationToken(result.token);
      setVerificationSent(true);
    } catch (err: unknown) {
      console.error('Send verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const code = watch('verificationCode');
    if (!code || code.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code,
          token: verificationToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.valid) {
        throw new Error(result.error || 'Invalid verification code');
      }

      // Code is valid, proceed to step 2
      setStep(2);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      if (errorMessage.includes('CODE_EXPIRED') || errorMessage.includes('expired')) {
        setError('Verification code has expired. Please request a new one.');
      } else if (errorMessage.includes('INVALID_CODE') || errorMessage.includes('Invalid')) {
        setError('Invalid verification code. Please check and try again.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    try {
      const nameParts = data.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await fetch('/api/apply/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationCode: data.verificationCode,
          verificationToken,
          formData: {
            first_name: firstName,
            last_name: lastName,
            email: data.email,
            instagram_handle: data.instagramHandle.replace('@', ''),
            tiktok_handle: data.tiktokHandle?.replace('@', '') || '',
            other_socials: {
              facebook: data.facebookUrl || '',
              linkedin: data.linkedinUrl || '',
              website: data.websiteUrl || '',
            },
            bio: data.bio,
            experience: '', // Consolidated into bio
            location_city: location?.city || '',
            location_state: location?.state || '',
            location_country: 'US',
            phone: data.phone || '',
            age_confirmed_18plus: true,
            terms_agreed: true,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Submit application error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col justify-center items-center min-h-screen lg:min-h-0">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="font-headline text-3xl font-semibold text-[#1D1D1F] mb-4">
              Application Submitted!
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] mb-8">
              Thank you for applying to be a {APP_PROGRAM_NAME}. We&apos;ll review your
              application and get back to you within 24-48 hours.
            </p>
            <p className="font-body text-sm text-[#6E6E73]/70 mb-8">
              Check your email for confirmation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-headline text-sm font-semibold text-[#1D1D1F] hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
          <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="bg-white px-6 py-6 md:px-12 md:py-8 lg:px-12 lg:py-8 flex flex-col min-h-screen lg:min-h-0 lg:h-screen lg:overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-4">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
          <span className="font-body text-[13px] text-[#6E6E73]">
            Founding Style Pro
          </span>
        </div>

        {/* Progress */}
        <div className="mb-6 lg:mb-4">
          <ProgressBar current={step} total={5} variant="light" />
        </div>

        {/* Step Indicators (Mobile) */}
        <div className="flex gap-2 mb-6 lg:hidden overflow-x-auto pb-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  s.id === step
                    ? 'bg-gradient-brand text-white'
                    : s.id < step
                    ? 'bg-[#E5E5E7] text-[#1D1D1F]'
                    : 'bg-[#F5F5F7] text-[#6E6E73]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {s.title}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Email Verification */}
          {step === 1 && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-[#1D1D1F] mb-2">
                  Let&apos;s verify your email
                </h2>
                <p className="font-body text-[15px] text-[#6E6E73]">
                  We&apos;ll send you a verification code to get started.
                </p>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-brand-red text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              {!verificationSent ? (
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={loading}
                  className="w-full py-4 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              ) : (
                <>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 text-sm font-medium">
                      Verification code sent! Check your email.
                    </p>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      {...register('verificationCode', {
                        required: 'Code is required',
                        minLength: 6,
                        maxLength: 6,
                      })}
                      className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all text-center text-2xl tracking-[0.5em] font-mono"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={verifyCode}
                    disabled={loading}
                    className="w-full py-4 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVerificationSent(false);
                      setValue('verificationCode', '');
                    }}
                    className="w-full py-3 text-[#6E6E73] hover:text-[#1D1D1F] text-sm font-medium transition-colors"
                  >
                    Resend code
                  </button>
                </>
              )}
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-[#1D1D1F] mb-2">
                  Tell us about yourself
                </h2>
                <p className="font-body text-[15px] text-[#6E6E73]">
                  Basic info to get your profile started.
                </p>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Name is required' })}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                  placeholder="Jane Doe"
                />
                {errors.fullName && (
                  <p className="text-brand-red text-sm mt-2">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Birthday *
                </label>
                <input
                  type="date"
                  {...register('birthday', { required: 'Birthday is required' })}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                />
                {errors.birthday && (
                  <p className="text-brand-red text-sm mt-2">{errors.birthday.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Location *
                </label>
                <CityAutocompleteLight
                  value={location}
                  onCitySelect={(cityData) => {
                    setLocation(cityData);
                    setLocationError('');
                  }}
                  placeholder="Search your city"
                  error={locationError}
                />
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Phone Number <span className="text-[#6E6E73]">(Optional)</span>
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!location) {
                      setLocationError('Please select your location');
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Social Media */}
          {step === 3 && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-[#1D1D1F] mb-2">
                  Show us your style
                </h2>
                <p className="font-body text-[15px] text-[#6E6E73]">
                  Share your Instagram so we can see your work.
                </p>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Instagram Handle *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73] font-medium select-none">
                    @
                  </span>
                  <input
                    type="text"
                    {...register('instagramHandle', { required: 'Instagram is required' })}
                    className="w-full pl-8 pr-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                    placeholder="yourusername"
                  />
                </div>
                {errors.instagramHandle && (
                  <p className="text-brand-red text-sm mt-2">{errors.instagramHandle.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  TikTok Handle <span className="text-[#6E6E73] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73] font-medium select-none">
                    @
                  </span>
                  <input
                    type="text"
                    {...register('tiktokHandle')}
                    className="w-full pl-8 pr-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                    placeholder="yourusername"
                  />
                </div>
                {errors.tiktokHandle && (
                  <p className="text-brand-red text-sm mt-2">{errors.tiktokHandle.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#1D1D1F] mb-2">
                  Website <span className="text-[#6E6E73]">(Optional)</span>
                </label>
                <input
                  type="url"
                  {...register('websiteUrl')}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: About You */}
          {step === 4 && (
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-[#1D1D1F] mb-2">
                  What makes you dangerous?
                </h2>
                <p className="font-body text-[15px] text-[#6E6E73]">
                  Not your resume. What do you actually bring to someone's getting-ready moment?
                </p>
              </div>

              <div>
                <textarea
                  {...register('bio', { required: 'Please tell us a bit about yourself', maxLength: 1000 })}
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all h-44 resize-none"
                  placeholder="I make people feel hot. That's it. That's the skill."
                />
                <div className="flex justify-between mt-2">
                  {errors.bio && <p className="text-brand-red text-sm">{errors.bio.message}</p>}
                  <p className="text-[#6E6E73] text-sm ml-auto">{watch('bio')?.length || 0}/1000</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-4 lg:space-y-3 flex-1">
              <div>
                <h2 className="font-headline text-2xl lg:text-xl font-semibold text-[#1D1D1F] mb-1">
                  Review your application
                </h2>
                <p className="font-body text-[15px] lg:text-sm text-[#6E6E73]">
                  Make sure everything looks right before submitting.
                </p>
              </div>

              <div className="space-y-2.5 lg:space-y-2 bg-[#F5F5F7] p-4 lg:p-3 rounded-2xl">
                <div>
                  <p className="text-[#6E6E73] text-[10px] uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-[#1D1D1F] text-sm font-medium">{watch('email')}</p>
                </div>
                <div className="h-px bg-[#E5E5E7]" />
                <div>
                  <p className="text-[#6E6E73] text-[10px] uppercase tracking-wider mb-0.5">Name</p>
                  <p className="text-[#1D1D1F] text-sm font-medium">{watch('fullName')}</p>
                </div>
                <div className="h-px bg-[#E5E5E7]" />
                <div>
                  <p className="text-[#6E6E73] text-[10px] uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-[#1D1D1F] text-sm font-medium">
                    {location?.formatted || `${location?.city}, ${location?.state}`}
                  </p>
                </div>
                <div className="h-px bg-[#E5E5E7]" />
                <div>
                  <p className="text-[#6E6E73] text-[10px] uppercase tracking-wider mb-0.5">Social</p>
                  <p className="text-[#1D1D1F] text-sm font-medium">
                    @{watch('instagramHandle')?.replace('@', '')}
                    {watch('tiktokHandle') && ` • @${watch('tiktokHandle')?.replace('@', '')}`}
                  </p>
                </div>
                <div className="h-px bg-[#E5E5E7]" />
                <div>
                  <p className="text-[#6E6E73] text-[10px] uppercase tracking-wider mb-0.5">About</p>
                  <p className="text-[#1D1D1F] text-sm leading-snug">
                    {watch('bio')?.length > 120 ? `${watch('bio')?.slice(0, 120)}...` : watch('bio')}
                  </p>
                </div>
              </div>

              <div className="p-3 lg:p-2.5 bg-[#F5F5F7] rounded-xl">
                <p className="text-[#6E6E73] text-xs lg:text-[11px] leading-relaxed">
                  By submitting, you confirm you&apos;re 18+, US-based, and agree to our terms. We&apos;ll review within 24-48 hours.
                </p>
              </div>

              <div className="flex gap-3 pt-2 lg:pt-1">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-3 lg:py-2.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 lg:py-2.5 bg-gradient-brand text-white font-headline font-semibold text-sm rounded-full hover:-translate-y-0.5 hover:shadow-gradient transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                  {!loading && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">
            For Style Pros
          </div>

          <h2 className="font-headline text-[clamp(28px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white mb-4">
            <span className="block">You have the eye.</span>
            <em className="block font-serif italic font-normal text-white/80">
              Get paid for it.
            </em>
          </h2>

          <p className="font-body text-[15px] text-white/60 leading-[1.75] max-w-[320px] mx-auto">
            Join our founding cohort of Style Pros and help shape the future of personal styling.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  s.id <= step ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
