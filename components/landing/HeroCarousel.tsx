'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// Discovery Card - Style Pro browsing (matches DiscoveryScreenFEVR.js)
function DiscoveryCard({ name, age, location, image, tags, specialty, approach }: {
  name: string;
  age: number;
  location: string;
  image: string;
  tags: string[];
  specialty?: { dropdown: string; details: string };
  approach?: { dropdown: string; details: string };
}) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[200px] md:w-[220px] h-[420px] sm:h-[420px] md:h-[460px] bg-black rounded-[24px] overflow-hidden shadow-none pointer-events-none">
      {/* Header with PHERO branding */}
      <div className="px-3 pt-2.5 pb-1.5">
        <span className="font-headline font-bold text-[0.7rem] sm:text-[0.75rem] text-white tracking-wide">PHERO</span>
      </div>

      {/* Photo card with margins - ~55% of remaining height */}
      <div className="px-2">
        <div className="relative h-[210px] sm:h-[210px] md:h-[230px] rounded-[16px] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="220px"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          {/* Photo dots - near top */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-[5px] h-[5px] bg-white rounded-full" />
            <div className="w-[5px] h-[5px] bg-white/50 rounded-full" />
            <div className="w-[5px] h-[5px] bg-white/50 rounded-full" />
            <div className="w-[5px] h-[5px] bg-white/50 rounded-full" />
          </div>

          {/* Status badge - Online state (matches app's "• Online" format) */}
          <div className="absolute top-2.5 right-2.5 px-[7px] pt-[3px] pb-[4px] bg-[#9A1B1B] rounded-full">
            <span className="text-[0.45rem] font-medium text-white leading-none block">• Online</span>
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="font-headline text-white text-[0.95rem] sm:text-[1rem] font-bold tracking-tight">
              {name}, {age}
            </div>
            <div className="text-white/90 text-[0.5rem] font-medium mt-0.5">{location}</div>
          </div>
        </div>
      </div>

      {/* Content section - Style Expertise */}
      <div className="px-3 pt-2.5">
        <div className="text-[0.45rem] font-normal text-[#999999] uppercase tracking-wide mb-1.5">
          Style Expertise
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#2a2a2a] rounded-full text-[0.45rem] text-white/90 whitespace-nowrap flex-shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Fashion Expertise Section - matches app's FashionExpertiseSection */}
      {(specialty || approach) && (
        <div className="px-3 pt-2">
          {/* Divider */}
          <div className="h-px bg-white/[0.08] mb-2.5" />

          {/* My Speciality */}
          {specialty && (
            <div className="mb-2.5">
              <div className="text-[0.4rem] font-semibold text-white/35 uppercase tracking-[0.5px] mb-1">
                My Speciality
              </div>
              {specialty.dropdown && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  {/* Gradient accent bar */}
                  <div className="w-[2px] h-[10px] rounded-sm bg-gradient-to-b from-[#9A1B1B] to-[#7B2D9E]" />
                  <span className="text-[0.5rem] font-semibold text-white">{specialty.dropdown}</span>
                </div>
              )}
              <p className="text-[0.42rem] text-white/55 leading-[1.4] pl-[10px]">{specialty.details}</p>
            </div>
          )}

          {/* My Approach */}
          {approach && (
            <div className="mb-2">
              <div className="text-[0.4rem] font-semibold text-white/35 uppercase tracking-[0.5px] mb-1">
                My Approach
              </div>
              {approach.dropdown && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  {/* Gradient accent bar */}
                  <div className="w-[2px] h-[10px] rounded-sm bg-gradient-to-b from-[#9A1B1B] to-[#7B2D9E]" />
                  <span className="text-[0.5rem] font-semibold text-white">{approach.dropdown}</span>
                </div>
              )}
              <p className="text-[0.42rem] text-white/55 leading-[1.4] pl-[10px]">{approach.details}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Session Detail Card - matches app screenshot
function SessionDetailCard({ name, image, specialty }: {
  name: string;
  image: string;
  specialty: string;
}) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[200px] md:w-[220px] h-[420px] sm:h-[420px] md:h-[460px] bg-black rounded-[20px] overflow-hidden shadow-none pointer-events-none">
      {/* Header bar */}
      <div className="h-[40px] sm:h-[44px] bg-black flex items-center justify-between px-3">
        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="font-headline text-[0.5rem] sm:text-[0.55rem] font-medium text-[#A3A3A3] uppercase tracking-[1px]">Session Details</span>
        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 flex flex-col items-center">
        {/* Profile with red ring (Ready to Join state) - matches AnimatedProfileRing */}
        <div className="relative mb-2">
          {/* Outer red ring */}
          <div className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-full border-2 border-[#9A1B1B] flex items-center justify-center">
            {/* Inner photo wrapper with subtle white border */}
            <div className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full border border-white/10 overflow-hidden bg-[#1A1A1A]">
              <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name with chevron */}
        <div className="flex items-center gap-0.5 mb-0">
          <span className="font-headline font-bold text-[0.9rem] sm:text-[0.95rem] text-white tracking-negative uppercase">{name}</span>
          <svg className="w-2.5 h-2.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>

        {/* Tagline */}
        <div className="text-[0.45rem] sm:text-[0.5rem] text-[#737373] mb-1.5">{specialty}</div>

        {/* Ready to Join badge (filled red, matches StatusBadge.js) */}
        <span className="inline-block px-2.5 py-1 bg-[#9A1B1B] rounded-full mb-3 text-[0.4rem] sm:text-[0.45rem] font-semibold text-white uppercase tracking-[1.5px]">Ready to Join</span>

        {/* Session info card (matches SessionInfoCard.js) */}
        <div className="w-full bg-[rgba(23,23,23,0.6)] rounded-[12px] p-2.5 border border-white/5">
          {/* Date row */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/5 rounded-[8px] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#A3A3A3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <div className="text-[0.4rem] text-[#737373] uppercase tracking-wide font-medium">Date</div>
              <div className="text-[0.55rem] text-white font-medium">Friday, Dec 19</div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-white/5 my-2" />
          {/* Time row */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/5 rounded-[8px] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#A3A3A3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <div className="text-[0.4rem] text-[#737373] uppercase tracking-wide font-medium">Start Time</div>
              <div className="text-[0.55rem] text-white font-medium">6:30 PM</div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-white/5 my-2" />
          {/* Session type row with price */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/5 rounded-[8px] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#A3A3A3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="6" width="13" height="11" rx="2" />
                <path d="M20 8l-5 3.5 5 3.5V8z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.4rem] text-[#737373] uppercase tracking-wide font-medium">Session Type</div>
              <div className="text-[0.55rem] text-white font-medium">Video • 30 min</div>
            </div>
            <div className="text-right">
              <div className="text-[0.4rem] text-[#737373] uppercase tracking-wide font-medium">Paid</div>
              <div className="text-[0.6rem] text-[#9A1B1B] font-bold">$39</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chat Session Card
function ChatSessionCard({ name, image }: {
  name: string;
  image: string;
}) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[200px] md:w-[220px] bg-gradient-brand rounded-[24px] overflow-hidden shadow-none pointer-events-none">
      <div className="p-4 sm:p-4 flex flex-col h-[380px] sm:h-[380px] md:h-[420px]">
        {/* Header - centered layout */}
        <div className="flex items-start justify-between">
          {/* Back button */}
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          {/* Centered profile and name */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-headline text-[0.7rem] font-semibold text-white leading-none mt-1.5">{name}</span>
            <span className="text-[0.5rem] text-white/60 leading-none mt-0.5">Style Pro</span>
          </div>

          {/* Video button */}
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="13" height="12" rx="2" />
              <path d="M20 8l-5 4 5 4V8z" />
            </svg>
          </div>
        </div>

        {/* Session badge */}
        <div className="text-center pt-0 pb-3">
          <span className="inline-block px-2.5 py-[4px] bg-black/25 rounded-full text-[0.45rem] font-medium tracking-wide">
            Third Date · His Place
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
          <div className="self-end max-w-[90%] px-3 py-2 bg-white/95 rounded-[14px] rounded-br-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-black leading-snug">He&apos;s cooking for me. I want to look effortless?</p>
          </div>
          <div className="self-start max-w-[90%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-white leading-snug">You&apos;re not trying to impress anymore.</p>
          </div>
          <div className="self-start max-w-[70%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-white leading-snug">You&apos;re just you.</p>
          </div>
          <div className="self-end max-w-[50%] px-3 py-2 bg-white/95 rounded-[14px] rounded-br-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-black leading-snug">So... jeans?</p>
          </div>
          <div className="self-start max-w-[90%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-white leading-snug">The good jeans. Soft tee. Hair down.</p>
          </div>
          <div className="self-start max-w-[55%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="text-[0.55rem] sm:text-[0.6rem] text-white leading-snug">You&apos;ve got this.</p>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex gap-2 items-center mt-3">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[0.8rem] text-white">+</div>
          <div className="flex-1 bg-black/20 border border-white/20 rounded-full px-3 py-2 text-[0.55rem] text-white/60">
            Message
          </div>
          <div className="w-7 h-7 flex items-center justify-center">
            <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Static cards for desktop, animated for mobile
const staticCards = [
  {
    type: 'discovery',
    name: 'Alexa',
    age: 25,
    location: 'New York, NY',
    image: '/stylists/style-pro-alexa.jpeg',
    tags: ['vintage', 'jewelry maximalist', 'knee high boots'],
    fashionSpecialty: { dropdown: 'Elevated Basics', details: 'Quality pieces that work harder and feel luxe.' },
    fashionApproach: { dropdown: 'Curated Capsules', details: 'Less items, more outfits, zero decision fatigue.' },
  },
  { type: 'session', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg', sessionSpecialty: 'Style Pro' },
  { type: 'chat', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg' },
];

// More cards for mobile carousel
const mobileCards = [
  ...staticCards,
  {
    type: 'discovery',
    name: 'Alexa',
    age: 25,
    location: 'New York, NY',
    image: '/stylists/style-pro-alexa.jpeg',
    tags: ['vintage', 'jewelry maximalist', 'knee high boots'],
    fashionSpecialty: { dropdown: 'Elevated Basics', details: 'Quality pieces that work harder and feel luxe.' },
    fashionApproach: { dropdown: 'Curated Capsules', details: 'Less items, more outfits, zero decision fatigue.' },
  },
  { type: 'session', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg', sessionSpecialty: 'Style Pro' },
  { type: 'chat', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg' },
];

function renderCard(card: typeof staticCards[0], index: number, keyPrefix = '') {
  const keyId = `${keyPrefix}${card.name}-${index}`;
  if (card.type === 'discovery') {
    return (
      <DiscoveryCard
        key={keyId}
        name={card.name}
        age={card.age!}
        location={card.location!}
        image={card.image}
        tags={card.tags!}
        specialty={card.fashionSpecialty}
        approach={card.fashionApproach}
      />
    );
  } else if (card.type === 'session') {
    return (
      <SessionDetailCard
        key={keyId}
        name={card.name}
        image={card.image}
        specialty={card.sessionSpecialty!}
      />
    );
  } else {
    return (
      <ChatSessionCard
        key={keyId}
        name={card.name}
        image={card.image}
      />
    );
  }
}

export function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Measure the width of one set of cards
  useEffect(() => {
    const measureWidth = () => {
      if (trackRef.current) {
        // Get the first set container (first child)
        const firstSet = trackRef.current.children[0] as HTMLElement;
        if (firstSet) {
          // Width of cards + gap (16px = gap-4)
          setScrollWidth(firstSet.scrollWidth + 16);
        }
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 w-screen overflow-hidden h-[380px] sm:h-[340px] md:h-[340px]">
      {/* Desktop: Static 3 cards centered, cropped at ~50% */}
      <div className="hidden md:flex justify-center gap-6 px-8 pt-4">
        {staticCards.map((card, index) => renderCard(card, index))}
      </div>

      {/* Mobile: Animated carousel - seamless infinite scroll */}
      <div
        className="md:hidden h-full w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex pt-4"
          style={{
            animation: scrollWidth ? `carousel-scroll-px 20s linear infinite` : 'none',
            willChange: 'transform',
            // CSS custom property for exact pixel-based animation
            ['--scroll-width' as string]: `${scrollWidth}px`,
          }}
        >
          {/* First set of cards */}
          <div className="flex flex-shrink-0 gap-4">
            {staticCards.map((card, index) => renderCard(card, index))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex flex-shrink-0 gap-4 pl-4" aria-hidden="true">
            {staticCards.map((card, index) => renderCard(card, index, 'dup-'))}
          </div>
        </div>
      </div>
    </div>
  );
}
