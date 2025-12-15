'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ProgressBar } from '@/components/ProgressBar';
import { APP_NAME } from '@/lib/constants/app';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  accentTitle?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  accentTitle,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - White content area */}
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
            Stylist Onboarding
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={currentStep} total={totalSteps} variant="light" />
        </div>

        {/* Title section */}
        <div className="mb-8">
          <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
            {title}
            {accentTitle && (
              <em className="block font-serif italic font-normal bg-gradient-brand-text bg-clip-text text-transparent mt-1">
                {accentTitle}
              </em>
            )}
          </h1>
          {subtitle && (
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form content */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      {/* Right side - Gradient visual (hidden on mobile) */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        {/* Radial highlight */}
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        {/* Decorative content */}
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Building your profile
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Help us understand your style so we can connect you with the right clients.
          </p>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-white/20"
                style={{
                  opacity: currentStep > i * (totalSteps / 3) ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
