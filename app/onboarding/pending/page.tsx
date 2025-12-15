'use client';

import Link from 'next/link';
import { Clock, Mail, ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants/app';

export default function PendingPage() {
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
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>

          <h1 className="font-headline text-[clamp(28px,5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-4">
            Under Review
          </h1>

          <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6] mb-8">
            Your profile has been submitted and is being reviewed by our team. We&apos;ll notify you
            via email once your profile is approved.
          </p>

          <div className="w-full bg-[#F5F5F7] rounded-2xl p-6 mb-8">
            <p className="text-sm text-[#6E6E73] mb-2">Expected review time</p>
            <p className="font-headline text-2xl font-semibold text-[#1D1D1F]">24-48 hours</p>
          </div>

          <div className="flex items-center gap-2 text-[#6E6E73] mb-8">
            <Mail className="w-4 h-4" />
            <span className="text-sm">
              Questions?{' '}
              <a
                href="mailto:support@stylistonstandby.com"
                className="bg-gradient-brand-text bg-clip-text text-transparent font-medium hover:underline"
              >
                support@stylistonstandby.com
              </a>
            </span>
          </div>

          <Link
            href="/"
            className="w-full py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center justify-center gap-2"
          >
            Return to {APP_NAME}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Clock className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Sit tight!
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Our team is reviewing your profile to ensure the best experience for our clients.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
