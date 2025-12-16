'use client';

import { useEffect, useState } from 'react';

/**
 * Detects iOS 26 Safari which has a floating address bar that overlaps content.
 * The floating bar requires extra bottom padding (~80px) on full-height sections.
 *
 * iOS 26 Safari UA example:
 * Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15
 * (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1
 */
export function useIOS26Safari() {
  const [isIOS26Safari, setIsIOS26Safari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    // Check for Safari Version 26.x (iOS 26)
    // Must have both "Version/26." and "Safari" to avoid false positives
    const isSafari26 = /Version\/26\.\d+.*Safari/i.test(ua);
    setIsIOS26Safari(isSafari26);
  }, []);

  return isIOS26Safari;
}

/**
 * Extra bottom padding value for iOS 26 Safari floating address bar.
 * The floating bar is approximately 60-80px, so we use 5rem (80px) as safe value.
 */
export const IOS26_BOTTOM_PADDING = '5rem';
