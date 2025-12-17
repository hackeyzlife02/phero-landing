'use client';

import { useEffect, useRef, useState } from 'react';

function useReveal() {
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

  return { ref, isVisible };
}

type Message = {
  type: 'pro' | 'user';
  text: string;
};

function GalleryHero() {
  const reveal = useReveal();

  const messages: Message[] = [
    { type: 'pro', text: 'Tell me about her.' },
    { type: 'user', text: "She's into art, works at a gallery in Chelsea. Kind of intimidating." },
    { type: 'pro', text: 'So you need to look like you have taste, without trying too hard.' },
    { type: 'pro', text: 'Love the shirt. Lose the jacket. White sneakers, not boots.' },
    { type: 'user', text: 'Done.' },
    { type: 'pro', text: 'Now you look like you belong there. Go.' },
  ];

  return (
    <div
      ref={reveal.ref}
      className={`col-span-12 lg:col-span-8 row-span-1 lg:row-span-2 bg-gradient-brand rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 flex flex-col relative transition-all duration-500 ${
        reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:-translate-y-1 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)_inset]`}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="font-headline text-[10px] font-semibold tracking-[0.15em] uppercase text-white/50">
            Text Session
          </span>
          <span className="font-headline text-[13px] text-white/60">
            First date · Wine bar in Chelsea
          </span>
        </div>
        <span className="font-headline text-xs text-white/40 tabular-nums">
          6:42 PM
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5 flex-1 relative z-10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-[18px] py-3.5 rounded-[18px] font-headline text-sm leading-[1.5] max-w-[85%] ${
              msg.type === 'pro'
                ? 'bg-black/20 text-white self-start rounded-bl-[6px]'
                : 'bg-white text-black self-end rounded-br-[6px]'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryMoment({ context, messages, delay = 0 }: { context: string; messages: Message[]; delay?: number }) {
  const reveal = useReveal();

  return (
    <div
      ref={reveal.ref}
      className={`col-span-12 lg:col-span-4 bg-gradient-brand rounded-2xl sm:rounded-[20px] p-5 sm:p-6 md:p-7 transition-all duration-500 hover:-translate-y-0.5 ${
        reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-headline text-[10px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-4">
        {context}
      </div>
      <div className="flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-3.5 py-3 rounded-[18px] font-headline text-[13px] leading-[1.5] max-w-[85%] ${
              msg.type === 'pro'
                ? 'bg-black/20 text-white self-start'
                : 'bg-white text-black self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="px-4 sm:px-6 md:px-12 pt-10 pb-20 md:pb-[120px]">
      <div className="grid grid-cols-12 gap-3 sm:gap-3 max-w-[1100px] mx-auto">
        <GalleryHero />

        <GalleryMoment
          context="Second date · Dinner"
          messages={[
            { type: 'pro', text: "How'd the first one go?" },
            { type: 'user', text: 'Really good actually. We talked for like 3 hours.' },
            { type: 'pro', text: 'Love that. Ok so a little more effort this time.' },
          ]}
          delay={100}
        />

        <GalleryMoment
          context="Third date · His apartment"
          messages={[
            { type: 'user', text: "He's cooking for me. I want to look effortless?" },
            { type: 'pro', text: "You're not trying to impress anymore. You're just you." },
          ]}
          delay={200}
        />
      </div>
    </section>
  );
}
