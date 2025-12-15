'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle, User, MapPin, Camera, Palette, MessageSquare } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { getQuestionText } from '@/lib/shared';
import type { QuestionId } from '@/lib/shared';
import { useAuth } from '@/lib/auth/hooks';
import { db } from '@/lib/firebase/client';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { APP_NAME } from '@/lib/constants/app';

export default function ReviewPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load all data from localStorage
    setName(localStorage.getItem('onboarding_name') || '');
    setCity(localStorage.getItem('onboarding_city') || '');
    setState(localStorage.getItem('onboarding_state') || '');

    try {
      setPhotos(JSON.parse(localStorage.getItem('onboarding_photos') || '[]'));
      setThemes(JSON.parse(localStorage.getItem('onboarding_themes') || '[]'));
      setQuestions(JSON.parse(localStorage.getItem('onboarding_selected_questions') || '[]'));
      setAnswers(JSON.parse(localStorage.getItem('onboarding_answers') || '{}'));
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    }
  }, []);

  const handleSubmit = async () => {
    if (!user || !db) {
      setError('Please sign in to submit your profile');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare data for Firestore
      const profileData = {
        preferred_name: name,
        location_city: city,
        location_state: state,
        photos: photos.filter(Boolean).map((url, i) => ({
          url,
          storage_path: `onboarding/${user.uid}/photo_${i}`,
          order: i,
          uploaded_at: new Date().toISOString(),
        })),
        style_themes: themes,
        selected_questions: questions,
        question_answers: answers,
        onboarding_status: 'in_review',
        onboarding_submitted_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };

      // Save to Firestore
      const stylistRef = doc(db, 'stylists', user.uid);
      await setDoc(stylistRef, profileData, { merge: true });

      // Clear localStorage
      localStorage.removeItem('onboarding_name');
      localStorage.removeItem('onboarding_city');
      localStorage.removeItem('onboarding_state');
      localStorage.removeItem('onboarding_photos');
      localStorage.removeItem('onboarding_themes');
      localStorage.removeItem('onboarding_selected_questions');
      localStorage.removeItem('onboarding_answers');

      // Navigate to pending page
      router.push('/onboarding/pending');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/onboarding/questions/answer/${questions.length - 1}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col min-h-screen lg:min-h-0 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
          <span className="font-body text-[13px] text-[#6E6E73]">Step 7 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={7} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Review your profile
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Make sure everything looks good before submitting for approval
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            {/* Name */}
            <div className="bg-[#F5F5F7] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-[#6E6E73]">Preferred Name</p>
              </div>
              <p className="text-[#1D1D1F] font-medium pl-11">{name || 'Not set'}</p>
            </div>

            {/* Location */}
            <div className="bg-[#F5F5F7] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-[#6E6E73]">Location</p>
              </div>
              <p className="text-[#1D1D1F] font-medium pl-11">
                {city && state ? `${city}, ${state}` : 'Not set'}
              </p>
            </div>

            {/* Photos */}
            <div className="bg-[#F5F5F7] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-[#6E6E73]">Photos</p>
              </div>
              <div className="flex gap-2 pl-11">
                {photos.filter(Boolean).map((photo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Style Themes */}
            <div className="bg-[#F5F5F7] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-[#6E6E73]">Style Themes</p>
              </div>
              <div className="flex flex-wrap gap-2 pl-11">
                {themes.map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1.5 bg-gradient-brand text-white rounded-full text-sm font-medium"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Q&A */}
            <div className="bg-[#F5F5F7] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-[#6E6E73]">Q&A</p>
              </div>
              <div className="space-y-4 pl-11">
                {questions.map((qId) => (
                  <div key={qId}>
                    <p className="text-sm text-[#6E6E73] mb-1">
                      {getQuestionText(qId as QuestionId)}
                    </p>
                    <p className="text-[#1D1D1F]">{answers[qId] || 'No answer'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Edit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  Submit for Review
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Almost there!
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Review your details and submit your profile for approval.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all duration-500 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
