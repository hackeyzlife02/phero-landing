'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, User, Camera, Palette, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth/hooks';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { useOnboardingContext } from '@/lib/context/OnboardingContext';
import { APP_NAME } from '@/lib/constants/app';

interface AdminFeedback {
  general_notes?: string;
  fields?: {
    preferred_name?: string;
    photos?: {
      general?: string;
      [key: string]: string | undefined;
    };
    style_themes?: string;
    question_answers?: Record<string, string>;
  };
}

export default function ChangesRequestedPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { setFeedback, clearModifications } = useOnboardingContext();
  const [feedback, setLocalFeedback] = useState<AdminFeedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const fetchFeedback = async () => {
      if (!user || !db) {
        router.push('/auth/login');
        return;
      }

      try {
        const stylistRef = doc(db, 'stylists', user.uid);
        const stylistSnap = await getDoc(stylistRef);

        if (stylistSnap.exists()) {
          const data = stylistSnap.data();
          const adminFeedback = data.admin_feedback as AdminFeedback | undefined;

          if (adminFeedback) {
            setLocalFeedback(adminFeedback);
            setFeedback(adminFeedback);
          }
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [user, authLoading, router, setFeedback]);

  const handleStartEditing = () => {
    clearModifications();
    router.push('/onboarding/name');
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Content */}
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col min-h-screen lg:min-h-0 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-yellow-600" />
            </div>

            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Changes Requested
            </h1>

            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Our team has reviewed your profile and has some feedback. Please make the following
              changes and resubmit.
            </p>
          </div>

          {feedback?.general_notes && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6">
              <p className="text-sm font-semibold text-yellow-700 mb-2">General Notes</p>
              <p className="text-[#1D1D1F]">{feedback.general_notes}</p>
            </div>
          )}

          {feedback?.fields && (
            <div className="space-y-4 mb-8">
              {feedback.fields.preferred_name && (
                <div className="bg-[#F5F5F7] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-yellow-700" />
                    </div>
                    <p className="text-sm font-medium text-[#6E6E73]">Name</p>
                  </div>
                  <p className="text-[#1D1D1F] pl-11">{feedback.fields.preferred_name}</p>
                </div>
              )}

              {feedback.fields.photos?.general && (
                <div className="bg-[#F5F5F7] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-yellow-700" />
                    </div>
                    <p className="text-sm font-medium text-[#6E6E73]">Photos</p>
                  </div>
                  <p className="text-[#1D1D1F] pl-11">{feedback.fields.photos.general}</p>
                </div>
              )}

              {feedback.fields.style_themes && (
                <div className="bg-[#F5F5F7] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Palette className="w-4 h-4 text-yellow-700" />
                    </div>
                    <p className="text-sm font-medium text-[#6E6E73]">Style Themes</p>
                  </div>
                  <p className="text-[#1D1D1F] pl-11">{feedback.fields.style_themes}</p>
                </div>
              )}

              {feedback.fields.question_answers &&
                Object.entries(feedback.fields.question_answers).map(([questionId, fb]) => (
                  <div key={questionId} className="bg-[#F5F5F7] rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-yellow-700" />
                      </div>
                      <p className="text-sm font-medium text-[#6E6E73]">Q&A: {questionId}</p>
                    </div>
                    <p className="text-[#1D1D1F] pl-11">{fb}</p>
                  </div>
                ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleStartEditing}
            className="w-full py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
          >
            Make Changes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Almost there!
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            A few small changes and you&apos;ll be ready to start connecting with clients.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
