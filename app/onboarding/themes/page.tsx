'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Palette, Check } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { STYLE_THEME_CONSTRAINTS } from '@/lib/shared';
import { APP_NAME } from '@/lib/constants/app';

const STYLE_THEMES = [
  'Minimalist',
  'Maximalist',
  'Vintage',
  'Streetwear',
  'Preppy',
  'Bohemian',
  'Classic',
  'Edgy',
  'Romantic',
  'Sporty',
  'Glamorous',
  'Casual',
  'Business',
  'Eclectic',
  'Y2K',
  'Coastal',
  'Grunge',
  'Cottagecore',
  'Dark Academia',
  'Athleisure',
];

export default function ThemesPage() {
  const router = useRouter();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedThemes = localStorage.getItem('onboarding_themes');
    if (savedThemes) {
      try {
        setSelectedThemes(JSON.parse(savedThemes));
      } catch (e) {
        console.error('Failed to parse saved themes:', e);
      }
    }
  }, []);

  const toggleTheme = (theme: string) => {
    setError('');
    setSelectedThemes((prev) => {
      if (prev.includes(theme)) {
        return prev.filter((t) => t !== theme);
      }
      if (prev.length >= STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT) {
        return prev;
      }
      return [...prev, theme];
    });
  };

  const handleContinue = () => {
    if (selectedThemes.length !== STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT) {
      setError(`Please select exactly ${STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT} style themes`);
      return;
    }

    localStorage.setItem('onboarding_themes', JSON.stringify(selectedThemes));
    router.push('/onboarding/questions/select');
  };

  const handleBack = () => {
    router.push('/onboarding/photos');
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
          <span className="font-body text-[13px] text-[#6E6E73]">Step 4 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={4} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              What&apos;s your style?
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Select {STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT} themes that best represent your
              aesthetic
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {STYLE_THEMES.map((theme) => {
              const isSelected = selectedThemes.includes(theme);
              const isDisabled =
                !isSelected && selectedThemes.length >= STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT;

              return (
                <button
                  key={theme}
                  onClick={() => toggleTheme(theme)}
                  disabled={isDisabled}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-brand text-white'
                      : isDisabled
                        ? 'bg-[#F5F5F7] text-[#C7C7C7] cursor-not-allowed'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5E7]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  {theme}
                </button>
              );
            })}
          </div>

          <p className="text-sm text-[#6E6E73] text-center mb-8">
            {selectedThemes.length}/{STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT} selected
          </p>

          <div className="flex gap-3">
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

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Palette className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Define your aesthetic
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Your style themes help clients find stylists that match their vibe.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 4 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
