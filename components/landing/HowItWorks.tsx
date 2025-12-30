'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '1',
    title: 'Pick someone with the eye',
    description: 'Browse Style Pros. Find yours.',
  },
  {
    num: '2',
    title: '30 minutes before you go',
    description: 'Text or video.',
  },
  {
    num: '3',
    title: 'Walk in ready',
    description: 'No second-guessing.',
  },
];

export function HowItWorks() {
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
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="how"
      className={`py-20 md:py-[100px] px-4 sm:px-6 md:px-12 border-t border-white/[0.04] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 text-center mb-4">
          How it works
        </div>
        <h1 className="font-headline text-[clamp(28px,4vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-center mb-12">
          Your pre-date protocol
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="font-serif text-4xl italic text-white/35 mb-4">
                {step.num}
              </div>
              <h4 className="font-headline text-[15px] font-semibold mb-2">
                {step.title}
              </h4>
              <p className="font-body text-sm text-white/40">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
