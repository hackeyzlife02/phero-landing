'use client';

import { useRef, useEffect, useState } from 'react';

export function AnnouncementBanner() {
  const text = "First 200 NYC users get founding member pricing.";
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Measure the width of one set of items
  useEffect(() => {
    const measureWidth = () => {
      if (trackRef.current) {
        const firstSet = trackRef.current.children[0] as HTMLElement;
        if (firstSet) {
          setScrollWidth(firstSet.offsetWidth);
        }
      }
    };

    measureWidth();
    // Small delay to ensure fonts are loaded
    const timeout = setTimeout(measureWidth, 100);
    window.addEventListener('resize', measureWidth);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001] bg-black py-2 overflow-hidden">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{
          animation: scrollWidth ? 'marquee-px 15s linear infinite' : 'none',
          willChange: 'transform',
          ['--scroll-width' as string]: `${scrollWidth}px`,
        }}
      >
        {/* First set */}
        <div className="flex flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="font-headline text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.03em] text-white mx-8"
            >
              {text}
            </span>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex flex-shrink-0" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span
              key={`dup-${i}`}
              className="font-headline text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.03em] text-white mx-8"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
