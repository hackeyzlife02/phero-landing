'use client';

import { PhoneMockup } from './PhoneMockup';

const steps = [
  {
    time: '6:30 PM',
    title: 'You open PHERO',
    description: 'Find someone who gets your vibe.',
    active: false,
    dotPosition: 'top-5 sm:top-7 md:top-9',
  },
  {
    time: '6:42 PM',
    title: '"Tell me about her."',
    description: 'They ask the right questions. You get the right answers.',
    active: true,
    dotPosition: 'top-1/2 -translate-y-1/2',
  },
  {
    time: '7:15 PM',
    title: 'You walk out the door',
    description: 'Not hoping you look good. Knowing.',
    active: false,
    dotPosition: 'bottom-5 sm:bottom-7 md:bottom-9',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="flex-1 pt-4 sm:pt-6 md:pt-8 pb-10 px-4 sm:px-7 relative overflow-hidden flex items-start"
      style={{
        background: 'linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)',
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(154,27,27,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-2 gap-5 sm:gap-10 md:gap-20 items-center relative z-10">
        {/* Timeline Steps */}
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-[70px]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative py-4 sm:py-6 md:py-8 pl-5 sm:pl-7 md:pl-10
                border-l sm:border-l-2 transition-all duration-400
                ${step.active ? 'border-white/40' : 'border-white/10'}
              `}
            >
              {/* Timeline dot */}
              <div
                className={`
                  absolute -left-[4px] sm:-left-[5px] md:-left-[6px] ${step.dotPosition}
                  w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-400
                  ${step.active
                    ? 'bg-gradient-brand shadow-[0_0_20px_rgba(154,27,27,0.5)]'
                    : 'bg-white/20'
                  }
                `}
              />

              <div className="font-serif italic text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] opacity-50 mb-1.5 sm:mb-2">
                {step.time}
              </div>
              <h3 className="font-headline text-[1.1rem] sm:text-xl md:text-3xl font-bold leading-tight mb-1.5 sm:mb-2 md:mb-3">
                {step.title}
              </h3>
              <p className="text-[0.85rem] sm:text-[0.95rem] md:text-[1.1rem] leading-snug opacity-60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
