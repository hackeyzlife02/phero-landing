import Image from 'next/image';

// Discovery Card - Style Pro browsing
function DiscoveryCard({ name, age, location, image, tags }: {
  name: string;
  age: number;
  location: string;
  image: string;
  tags: string[];
}) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[200px] md:w-[220px] bg-black rounded-[20px] overflow-hidden shadow-none pointer-events-none">
      {/* Photo section */}
      <div className="relative h-[240px] sm:h-[240px] md:h-[260px] overflow-hidden rounded-[20px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="220px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Photo dots - near top */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-[6px] h-[6px] bg-white rounded-full" />
          <div className="w-[6px] h-[6px] bg-white/40 rounded-full" />
          <div className="w-[6px] h-[6px] bg-white/40 rounded-full" />
          <div className="w-[6px] h-[6px] bg-white/40 rounded-full" />
        </div>

        {/* Status badge - red bg */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#8B2332] rounded-full">
          <span className="w-[6px] h-[6px] bg-[#34C759] rounded-full" />
          <span className="font-headline text-[0.6rem] font-medium text-white">Online</span>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-headline text-white text-[1.25rem] font-bold">
            {name}, {age}
          </div>
          <div className="font-headline text-white/80 text-[0.8rem]">{location}</div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 pt-3">
        <div className="font-headline text-[0.6rem] font-semibold text-[#737373] uppercase tracking-wider mb-2">
          Expertise
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-headline px-3 py-1.5 bg-[#2a2a2a] rounded-full text-[0.6rem] text-white/90 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
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
    <div className="flex-shrink-0 w-[200px] sm:w-[200px] md:w-[220px] bg-black rounded-[20px] overflow-hidden shadow-none pointer-events-none">
      {/* Header bar */}
      <div className="h-[45px] sm:h-[50px] bg-black flex items-center justify-between px-4">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="font-headline text-[0.55rem] sm:text-[0.6rem] font-medium text-white/80 uppercase tracking-[2px]">Session Details</span>
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 flex flex-col items-center">
        {/* Profile with gradient ring */}
        <div className="relative mb-3">
          <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-full p-[2px] bg-gradient-to-br from-[#9A1B1B] to-[#7B2D9E]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src={image}
                alt={name}
                width={90}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name - uppercase */}
        <div className="font-headline font-bold text-[1rem] sm:text-[1.1rem] text-white mb-0.5 uppercase tracking-wide">{name}</div>

        {/* Tagline */}
        <div className="font-headline text-[0.65rem] sm:text-[0.7rem] text-[#737373] mb-3">{specialty}</div>

        {/* Ready to Join button */}
        <span className="inline-block px-3 py-[3px] bg-[#9A1B1B] rounded-full mb-4 font-headline text-[0.4rem] sm:text-[0.45rem] font-medium text-white uppercase tracking-[0.1em] leading-none">Ready to Join</span>

        {/* Session info card */}
        <div className="w-full bg-[#1a1a1a] rounded-xl p-3 space-y-2">
          {/* Date row */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#737373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <div className="font-headline text-[0.5rem] text-[#737373] uppercase tracking-wide">Date</div>
              <div className="font-headline text-[0.65rem] text-white font-medium">Wednesday, Dec 31</div>
            </div>
          </div>
          {/* Time row */}
          <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#737373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <div className="font-headline text-[0.5rem] text-[#737373] uppercase tracking-wide">Start Time</div>
              <div className="font-headline text-[0.65rem] text-white font-medium">4:55 PM</div>
            </div>
          </div>
          {/* Session type row */}
          <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#737373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="6" width="13" height="11" rx="2" />
                <path d="M20 8l-5 3.5 5 3.5V8z" />
              </svg>
            </div>
            <div>
              <div className="font-headline text-[0.5rem] text-[#737373] uppercase tracking-wide">Session Type</div>
              <div className="font-headline text-[0.65rem] text-white font-medium">Video • 30 min</div>
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
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 mb-1">
              <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-headline text-[0.7rem] font-semibold text-white">{name}</span>
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
        <div className="text-center mb-2 -mt-1">
          <span className="font-headline inline-block px-2 py-[3px] bg-black/25 rounded-full text-[0.4rem] font-medium tracking-wide uppercase">
            Date Night Session
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="self-start max-w-[85%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="font-headline text-[0.6rem] sm:text-[0.65rem] text-white leading-snug">What&apos;s the vibe tonight?</p>
          </div>
          <div className="self-end max-w-[85%] px-3 py-2 bg-white/95 rounded-[14px] rounded-br-[4px]">
            <p className="font-headline text-[0.6rem] sm:text-[0.65rem] text-black leading-snug">Rooftop bar, first date. Want to look effortless but put-together</p>
          </div>
          <div className="self-start max-w-[85%] px-3 py-2 bg-black/30 rounded-[14px] rounded-bl-[4px]">
            <p className="font-headline text-[0.6rem] sm:text-[0.65rem] text-white leading-snug">Love that. Show me what you&apos;re working with!</p>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex gap-2 items-center mt-3">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[0.8rem] text-white">+</div>
          <div className="font-headline flex-1 bg-black/20 border border-white/20 rounded-full px-3 py-2 text-[0.55rem] text-white/60">
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
  { type: 'discovery', name: 'Alexa', age: 26, location: 'LA', image: '/stylists/style-pro-alexa.jpeg', tags: ['vintage', 'jewelry maximalist', 'knee high boots'] },
  { type: 'session', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg', specialty: 'Let\'s make you unforgettable' },
  { type: 'chat', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg' },
];

// More cards for mobile carousel
const mobileCards = [
  ...staticCards,
  { type: 'discovery', name: 'Alexa', age: 26, location: 'LA', image: '/stylists/style-pro-alexa.jpeg', tags: ['vintage', 'jewelry maximalist', 'knee high boots'] },
  { type: 'session', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg', specialty: 'Let\'s make you unforgettable' },
  { type: 'chat', name: 'Alexa', image: '/stylists/style-pro-alexa.jpeg' },
];

function renderCard(card: typeof staticCards[0], index: number) {
  if (card.type === 'discovery') {
    return (
      <DiscoveryCard
        key={`${card.name}-${index}`}
        name={card.name}
        age={card.age!}
        location={card.location!}
        image={card.image}
        tags={card.tags!}
      />
    );
  } else if (card.type === 'session') {
    return (
      <SessionDetailCard
        key={`${card.name}-${index}`}
        name={card.name}
        image={card.image}
        specialty={card.specialty!}
      />
    );
  } else {
    return (
      <ChatSessionCard
        key={`${card.name}-${index}`}
        name={card.name}
        image={card.image}
      />
    );
  }
}

export function HeroCarousel() {
  const duplicatedMobileCards = [...mobileCards, ...mobileCards];

  return (
    <div className="absolute bottom-0 left-0 right-0 w-screen overflow-hidden h-[320px] sm:h-[280px] md:h-[280px]">
      {/* Desktop: Static 3 cards centered, cropped at ~50% */}
      <div className="hidden md:flex justify-center gap-6 px-8 pt-4">
        {staticCards.map((card, index) => renderCard(card, index))}
      </div>

      {/* Mobile: Animated carousel */}
      <div
        className="md:hidden h-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        <div className="flex gap-4 animate-carousel-scroll pt-4">
          {duplicatedMobileCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </div>
  );
}
