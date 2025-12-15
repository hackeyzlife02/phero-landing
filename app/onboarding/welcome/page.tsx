'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Star, Zap, MessageCircle, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/lib/auth/hooks';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { APP_NAME } from '@/lib/constants/app';

const perks = [
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be first to access new features and updates',
  },
  {
    icon: Star,
    title: 'Founding Badge',
    description: 'Exclusive badge displayed on your profile',
  },
  {
    icon: MessageCircle,
    title: 'Priority Support',
    description: 'Direct line to our team whenever you need help',
  },
  {
    icon: Target,
    title: 'Platform Input',
    description: 'Shape the future with your feedback',
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (authLoading) return;

    const fetchFirstName = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      if (!db) return;

      try {
        await user.getIdToken();
        const stylistRef = doc(db, 'stylists', user.uid);
        const stylistSnap = await getDoc(stylistRef);

        if (stylistSnap.exists()) {
          const data = stylistSnap.data();
          const fullName = data.name || '';
          const firstName = fullName.split(' ')[0];
          setFirstName(firstName);
        }
      } catch (error) {
        console.error('Error fetching stylist name:', error);
      }
    };

    fetchFirstName();
    setIsVisible(true);

    // Confetti with brand colors
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors: ['#9A1B1B', '#7B2D9E', '#FFFFFF'],
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [user, authLoading, router]);

  const handleGetStarted = () => {
    router.push('/onboarding/name');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Content */}
      <div className="bg-white px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center min-h-screen lg:min-h-0">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Header */}
          <Link
            href="/"
            className="inline-block font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent mb-8"
          >
            {APP_NAME}
          </Link>

          {/* Founding Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-brand rounded-full mb-8">
            <Star className="w-4 h-4 text-white" fill="white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Founding Member
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1D1D1F] mb-4">
            Congratulations{firstName ? `, ${firstName}` : ''}!
          </h1>

          <p className="font-body text-lg text-[#6E6E73] mb-10 max-w-lg">
            Welcome to{' '}
            <span className="bg-gradient-brand-text bg-clip-text text-transparent font-semibold">
              {APP_NAME}
            </span>
            . You&apos;re officially part of the founding stylist team.
          </p>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="bg-[#F5F5F7] rounded-2xl p-5 flex items-start gap-4 hover:bg-[#EBEBED] transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-headline text-[15px] font-semibold text-[#1D1D1F] mb-0.5">
                      {perk.title}
                    </h3>
                    <p className="font-body text-[13px] text-[#6E6E73]">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-black text-white font-headline text-sm font-semibold rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-[32px] flex items-center justify-center mx-auto mb-8">
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="font-headline text-3xl font-semibold text-white mb-4">
            Let&apos;s build your profile
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[300px] mx-auto">
            Complete your profile to start connecting with clients who need your expertise.
          </p>
        </div>
      </div>
    </div>
  );
}
