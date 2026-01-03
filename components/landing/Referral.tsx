'use client';

import { useState } from 'react';

export function Referral() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'PHERO',
      text: 'Check out PHERO - never second-guess your outfit again',
      url: typeof window !== 'undefined' ? window.location.href : 'https://pheroapp.com',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User cancelled or error - silently handle
    }
  };

  return (
    <section className="bg-gradient-brand py-16 sm:py-20 px-4 sm:px-7">
      <div className="max-w-[540px] mx-auto text-center">
        <p className="font-headline text-[clamp(1.2rem,2.5vw,1.5rem)] leading-snug mb-6">
          Know someone who spirals before every date?
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-3 px-4 py-2.5 pr-5 bg-[#007AFF] rounded-[20px] rounded-bl-[6px] text-white cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(0,122,255,0.38)] animate-bubble-pulse hover:animate-none shadow-[0_6px_24px_rgba(0,122,255,0.22)]"
          >
          <div className="w-10 h-10 bg-gradient-brand rounded-[10px] flex items-center justify-center font-headline font-bold text-[0.9rem]">
            P
          </div>
          <div className="text-left">
            <div className="text-[0.85rem] font-semibold">
              {copied ? 'Link copied!' : 'Send them PHERO'}
            </div>
            <div className="text-[0.65rem] opacity-70">pheroapp.com</div>
          </div>
          </button>
        </div>
      </div>
    </section>
  );
}
