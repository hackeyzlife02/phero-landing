'use client';

import { useEffect, useRef, useState } from 'react';

const beforeItems = [
  '"What if I\'m overdressed?"',
  '"Nothing looks right."',
  '"I\'ve changed three times."',
];

const afterItems = [
  'This is the one.',
  'I nailed it.',
  'They\'ll notice.',
];

export function Transformation() {
  const [isVisible, setIsVisible] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (arrowRef.current) {
      observer.observe(arrowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 px-7 md:px-[72px] bg-black border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">
            The Switch
          </div>
          <h2 className="font-headline text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-4">
            First impressions happen{' '}
            <em className="font-serif italic font-normal">before you speak.</em>
          </h2>
          <p className="font-body text-base text-white/50 max-w-[480px] mx-auto leading-[1.7]">
            You&apos;ve tried three outfits. Nothing feels right. Your friend texts &quot;looks fine.&quot; That doesn&apos;t help.
          </p>
        </div>

        {/* Transformation Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-start max-w-[1000px] mx-auto min-h-[450px]">
          {/* Before State */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-7 md:p-8 md:self-start">
            <div className="font-headline text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-5 pb-4 border-b border-white/[0.08]">
              Apprehension
            </div>
            <div className="flex flex-col gap-2.5">
              {beforeItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.04] text-white/50 rounded-xl font-body text-sm"
                >
                  <span className="w-[22px] h-[22px] bg-white/[0.08] rounded-full flex items-center justify-center text-[10px] shrink-0">
                    ?
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow (desktop only) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] pointer-events-none">
            <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9A1B1B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7B2D9E" />
                </linearGradient>
              </defs>
              <path
                d="M 15 25 Q 70 25, 70 70 Q 70 115, 125 115"
                fill="none"
                stroke="url(#arrow-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polygon points="125,115 112,108 112,122" fill="#7B2D9E" />
            </svg>
          </div>

          {/* Mobile Curved Arrow - animates on scroll */}
          <div ref={arrowRef} className="flex md:hidden justify-center py-2 -my-4">
            <svg viewBox="0 0 60 120" className="w-[60px] h-[120px]">
              <defs>
                <linearGradient id="arrow-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9A1B1B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7B2D9E" />
                </linearGradient>
              </defs>
              {/* Curved squiggly path */}
              <path
                d="M 30 5
                   Q 45 25, 30 45
                   Q 15 65, 30 85"
                fill="none"
                stroke="url(#arrow-gradient-mobile)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: isVisible ? 0 : 120,
                }}
              />
              {/* Arrow head */}
              <polygon
                points="30,105 22,88 38,88"
                fill="#7B2D9E"
                className="transition-opacity duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '800ms',
                }}
              />
            </svg>
          </div>

          {/* After State */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-7 md:p-8 md:self-end">
            <div className="font-headline text-[11px] font-semibold tracking-[0.15em] uppercase mb-5 pb-4 border-b border-white/[0.08] bg-gradient-brand bg-clip-text text-transparent">
              Anticipation
            </div>
            <div className="flex flex-col gap-2.5">
              {afterItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5 bg-gradient-brand text-white font-medium rounded-xl font-body text-sm"
                >
                  <span className="w-[22px] h-[22px] bg-white text-brand-red rounded-full flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
