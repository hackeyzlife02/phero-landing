'use client';

import { OnboardingProvider } from '@/lib/context/OnboardingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
