'use client';

import Link from 'next/link';
import { ArrowRight, Clock, DollarSign, RefreshCw, Star } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: <Clock className="w-5 h-5" strokeWidth={1.75} />,
    title: 'On Your Terms',
    description: 'Work anytime, anywhere'
  },
  {
    icon: <DollarSign className="w-5 h-5" strokeWidth={1.75} />,
    title: 'Get Paid',
    description: 'Weekly payouts'
  },
  {
    icon: <RefreshCw className="w-5 h-5" strokeWidth={1.75} />,
    title: 'Your People',
    description: 'Build a following that returns'
  },
  {
    icon: <Star className="w-5 h-5" strokeWidth={1.75} />,
    title: 'Your Brand',
    description: 'Let your style speak'
  },
];

// Apple-style animation hook using IntersectionObserver
function useScrollAnimation(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
}

export function Stylists() {
  const headerAnimation = useScrollAnimation();
  const cardsAnimation = useScrollAnimation({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="stylists" className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left Content - White background */}
      <div className="bg-white text-black px-7 py-16 md:px-16 md:py-24 lg:px-16 lg:py-[120px] flex flex-col justify-center">
        <div
          ref={headerAnimation.ref}
          style={{
            opacity: headerAnimation.isVisible ? 1 : 0,
            transform: headerAnimation.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 700ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase bg-gradient-brand bg-clip-text text-transparent mb-6">
            For Style Pros
          </div>

          <h2 className="font-headline text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] mb-4">
            <span className="block">You have the eye.</span>
            <em className="block font-serif italic font-normal bg-gradient-brand-text bg-clip-text text-transparent">
              Get paid for it.
            </em>
          </h2>

          <p className="font-body text-[15px] text-[#666666] leading-[1.75] mb-8 max-w-[380px]">
            You&apos;re not just picking outfits. You&apos;re giving them the confidence to walk in ready.
          </p>
        </div>

        {/* Mobile Only: Perk cards on white background */}
        <div
          ref={cardsAnimation.ref}
          className="grid grid-cols-2 gap-3 mb-8 lg:hidden"
        >
          {perks.map((perk, i) => (
            <div
              key={i}
              className="bg-[#F5F5F7] rounded-2xl p-5 flex flex-col gap-3 hover:bg-[#EBEBED] min-h-[120px]"
              style={{
                opacity: cardsAnimation.isVisible ? 1 : 0,
                transform: cardsAnimation.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 120}ms, transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 120}ms`,
              }}
            >
              <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center text-white shrink-0">
                {perk.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-headline text-[15px] font-semibold text-[#1D1D1F] leading-tight">
                  {perk.title}
                </h4>
                <p className="font-body text-[13px] text-[#6E6E73] leading-snug">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaAnimation.ref}
          style={{
            opacity: ctaAnimation.isVisible ? 1 : 0,
            transform: ctaAnimation.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms, transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms',
          }}
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-black text-white font-body text-sm font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] group"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Right Visual - Gradient background with perk cards (desktop only) */}
      <div className="hidden lg:flex bg-gradient-brand px-12 py-16 flex-col justify-center gap-3.5 relative overflow-hidden">
        {/* Radial highlight */}
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        {perks.map((perk, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-[14px] px-6 py-5 flex items-center gap-[18px] transition-all duration-300 hover:bg-white/[0.14] hover:translate-x-1.5 relative z-10"
          >
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0">
              <div className="text-brand-red">
                {perk.icon}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="font-headline text-[15px] font-semibold text-white leading-tight">
                {perk.title}
              </h4>
              <p className="font-body text-[13px] text-white/60 leading-snug">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
