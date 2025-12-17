'use client';

import { useEffect, useRef, useState } from 'react';

export function Interruption() {
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
      className={`py-20 md:py-[100px] px-4 sm:px-6 md:px-12 text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <p className="font-serif text-[clamp(24px,4vw,36px)] italic text-white/50">
        First impressions happen in milliseconds.
      </p>
    </section>
  );
}
