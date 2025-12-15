'use client';

import Link from 'next/link';
import { CheckCircle, Smartphone, Calendar, ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants/app';

export default function ApprovedPage() {
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
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="font-headline text-[clamp(28px,5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-4">
            You&apos;re Approved!
          </h1>

          <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6] mb-8">
            Congratulations! Your profile has been approved and you&apos;re now an official {APP_NAME}{' '}
            stylist. Get ready to connect with clients!
          </p>

          <div className="w-full space-y-4 mb-8">
            <div className="bg-[#F5F5F7] rounded-2xl p-5 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-[#1D1D1F] mb-1">Download the App</h3>
                  <p className="text-sm text-[#6E6E73]">
                    Get the {APP_NAME} app to manage your bookings and connect with clients
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-5 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-[#1D1D1F] mb-1">Set Your Schedule</h3>
                  <p className="text-sm text-[#6E6E73]">
                    Configure your availability and start accepting bookings
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <button
              type="button"
              className="w-full py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
            >
              Download {APP_NAME} App
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="w-full py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center justify-center gap-2"
            >
              Return to Home
            </Link>
          </div>
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
            Welcome to the team!
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            You&apos;re now part of an exclusive network of professional stylists.
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
