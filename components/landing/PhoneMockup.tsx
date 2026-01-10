'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Message {
  type: 'pro' | 'user';
  text: string;
}

interface Conversation {
  badge: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    badge: 'First Date · Wine Bar',
    messages: [
      { type: 'pro', text: 'Tell me about her!' },
      { type: 'user', text: "She's into art, works at a gallery in Chelsea. Kind of intimidating." },
      { type: 'pro', text: 'So you need to look like you have taste, without trying too hard.' },
      { type: 'pro', text: 'Love the shirt. Lose the jacket. White sneakers, not boots.' },
      { type: 'user', text: 'Done!' },
      { type: 'pro', text: 'Now you look like you belong there. Go.' },
    ],
  },
  {
    badge: 'Second Date · Dinner',
    messages: [
      { type: 'pro', text: "How'd the first one go?" },
      { type: 'user', text: 'Really good actually. We talked for like 3 hours.' },
      { type: 'pro', text: 'Love that. Ok so a little more effort this time.' },
      { type: 'pro', text: "What's the vibe?" },
      { type: 'user', text: 'Nice Italian place in the village.' },
      { type: 'pro', text: 'Perfect. The navy blazer. Trust me.' },
    ],
  },
  {
    badge: 'Third Date · His Place',
    messages: [
      { type: 'user', text: "He's cooking for me. I want to look effortless?" },
      { type: 'pro', text: "You're not trying to impress anymore." },
      { type: 'pro', text: "You're just you." },
      { type: 'user', text: 'So... jeans?' },
      { type: 'pro', text: 'The good jeans. Soft tee. Hair down.' },
      { type: 'pro', text: "You've got this." },
    ],
  },
];

const MESSAGE_DELAY = 400;
const CONVERSATION_PAUSE = 3000;

export function PhoneMockup() {
  const [currentConvo, setCurrentConvo] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);

  const showConversation = useCallback((index: number) => {
    setCurrentConvo(index);
    setVisibleBubbles([]);

    const messages = conversations[index].messages;

    // Animate messages in one by one
    messages.forEach((_, i) => {
      setTimeout(() => {
        setVisibleBubbles((prev) => [...prev, i]);
      }, i * MESSAGE_DELAY);
    });

    // Schedule next conversation
    const totalTime = messages.length * MESSAGE_DELAY + CONVERSATION_PAUSE;
    setTimeout(() => {
      const nextIndex = (index + 1) % conversations.length;
      showConversation(nextIndex);
    }, totalTime);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => showConversation(0), 500);
    return () => clearTimeout(timeout);
  }, [showConversation]);

  const currentMessages = conversations[currentConvo].messages;

  return (
    <div className="w-[200px] h-[380px] sm:w-[280px] sm:h-[520px] md:w-[340px] md:h-[640px] bg-black rounded-[28px] sm:rounded-[36px] md:rounded-[44px] p-1.5 sm:p-2 relative shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-2 border-[#333]">
      <div className="bg-gradient-brand rounded-[20px] sm:rounded-[28px] md:rounded-[34px] h-full overflow-hidden flex flex-col relative">
        {/* Dynamic Island */}
        <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-[50px] sm:w-[70px] md:w-[80px] h-[14px] sm:h-[20px] md:h-[24px] bg-black rounded-[8px] sm:rounded-[12px] md:rounded-[14px] z-20" />

        {/* Status Bar */}
        <div className="flex justify-between items-center px-2.5 sm:px-4 md:px-5 pt-1 sm:pt-2 text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] font-semibold relative z-10">
          <span>6:42</span>
          <div className="flex gap-1 items-center">
            {/* Signal bars */}
            <div className="flex gap-[1px] items-end h-[6px] sm:h-[8px] md:h-[9px]">
              <div className="w-[2px] h-[2px] sm:h-[3px] bg-white rounded-[1px]" />
              <div className="w-[2px] h-[3px] sm:h-[5px] bg-white rounded-[1px]" />
              <div className="w-[2px] h-[4px] sm:h-[7px] bg-white rounded-[1px]" />
              <div className="w-[2px] h-[5px] sm:h-[9px] bg-white rounded-[1px]" />
            </div>
            {/* Wifi */}
            <svg className="w-2 sm:w-3 h-2 sm:h-3" viewBox="0 0 24 24" fill="white">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            {/* Battery */}
            <div className="w-[14px] sm:w-[18px] md:w-[20px] h-[6px] sm:h-[8px] md:h-[9px] border border-white rounded-[2px] relative flex items-center p-[1px]">
              <div className="w-[65%] h-full bg-white rounded-[1px]" />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[1px] h-[3px] sm:h-[4px] bg-white rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="flex items-center justify-between px-1.5 sm:px-3 pt-4 sm:pt-7 md:pt-8 pb-1 relative">
          {/* Back button */}
          <div className="w-[18px] h-[18px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center bg-white/[0.18] rounded-full">
            <svg className="w-2.5 sm:w-3 md:w-3.5 h-2.5 sm:h-3 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          {/* Center - Avatar + Name */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-[22px] h-[22px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
              <Image
                src="/stylists/style-pro-alexa.jpeg"
                alt="Alexa"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-[0.5rem] sm:text-[0.65rem] md:text-[0.72rem] leading-none mt-[3px] sm:mt-1.5 md:mt-2">Alexa</span>
            <span className="text-[0.35rem] sm:text-[0.45rem] md:text-[0.5rem] text-white/60 leading-none mt-[1px] sm:mt-0.5">Style Pro</span>
          </div>

          {/* Video button */}
          <div className="w-[18px] h-[18px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center bg-white/[0.18] rounded-full">
            <svg className="w-2.5 sm:w-3 md:w-3.5 h-2.5 sm:h-3 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="2" y="6" width="13" height="12" rx="2" />
              <path d="M20 8l-5 4 5 4V8z" />
            </svg>
          </div>
        </div>

        {/* Session Badge */}
        <div className="text-center pt-[6px] sm:pt-3 md:pt-4 pb-1 sm:pb-2">
          <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/25 rounded-full text-[0.4rem] sm:text-[0.5rem] md:text-[0.55rem] font-semibold tracking-[0.05em]">
            {conversations[currentConvo].badge}
          </span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 flex flex-col gap-[3px] sm:gap-1.5 overflow-hidden">
          {currentMessages.map((message, index) => (
            <div
              key={`${currentConvo}-${index}`}
              className={`
                max-w-[88%] px-1.5 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2
                text-[0.45rem] sm:text-[0.6rem] md:text-[0.68rem] leading-[1.3]
                transition-all duration-300
                ${visibleBubbles.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
                ${message.type === 'pro'
                  ? 'self-start bg-black/30 rounded-[8px] sm:rounded-[12px] md:rounded-[14px] rounded-bl-[2px] sm:rounded-bl-[4px]'
                  : 'self-end bg-white/95 text-[#1a1a1a] rounded-[8px] sm:rounded-[12px] md:rounded-[14px] rounded-br-[2px] sm:rounded-br-[4px]'
                }
              `}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 sm:gap-1.5 py-0.5 sm:py-1">
          {conversations.map((_, index) => (
            <div
              key={index}
              className={`
                w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300
                ${index === currentConvo ? 'bg-white scale-125' : 'bg-white/30'}
              `}
            />
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-1 sm:gap-1.5 items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1">
          <div className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] bg-white/20 rounded-full flex items-center justify-center text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] font-light">
            +
          </div>
          <div className="flex-1 bg-black/20 border border-white/20 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between">
            <span className="text-[0.45rem] sm:text-[0.55rem] md:text-[0.65rem] text-white/60">Message</span>
            <svg className="w-2 sm:w-3 md:w-3.5 h-2 sm:h-3 md:h-3.5 text-white/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="w-[50px] sm:w-[80px] md:w-[100px] h-[2px] sm:h-[3px] md:h-[4px] bg-white/30 rounded-full mx-auto mb-1 sm:mb-1.5 md:mb-2" />
      </div>
    </div>
  );
}
