'use client';

import { useEffect } from 'react';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

// Detect iOS Safari and add class to html element
function useIOSSafariDetection() {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      document.documentElement.classList.add('ios-safari');
    }
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useIOSSafariDetection();
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
