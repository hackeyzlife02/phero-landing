'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MessageSquare, Check } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { STYLE_QUESTIONS, QUESTION_CONSTRAINTS } from '@/lib/shared';
import { APP_NAME } from '@/lib/constants/app';

export default function QuestionsSelectPage() {
  const router = useRouter();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('onboarding_selected_questions');
    if (saved) {
      try {
        setSelectedQuestions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved questions:', e);
      }
    }
  }, []);

  const toggleQuestion = (questionId: string) => {
    setError('');
    setSelectedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((q) => q !== questionId);
      }
      if (prev.length >= QUESTION_CONSTRAINTS.REQUIRED_COUNT) {
        return prev;
      }
      return [...prev, questionId];
    });
  };

  const handleContinue = () => {
    if (selectedQuestions.length !== QUESTION_CONSTRAINTS.REQUIRED_COUNT) {
      setError(`Please select exactly ${QUESTION_CONSTRAINTS.REQUIRED_COUNT} questions to answer`);
      return;
    }

    localStorage.setItem('onboarding_selected_questions', JSON.stringify(selectedQuestions));
    router.push('/onboarding/questions/answer/0');
  };

  const handleBack = () => {
    router.push('/onboarding/themes');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col min-h-screen lg:min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
          <span className="font-body text-[13px] text-[#6E6E73]">Step 5 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={5} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Choose your questions
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Select {QUESTION_CONSTRAINTS.REQUIRED_COUNT} questions that you&apos;d like to answer
              for your profile
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3 mb-6">
            {STYLE_QUESTIONS.map((question) => {
              const isSelected = selectedQuestions.includes(question.id);
              const isDisabled =
                !isSelected && selectedQuestions.length >= QUESTION_CONSTRAINTS.REQUIRED_COUNT;

              return (
                <button
                  key={question.id}
                  onClick={() => toggleQuestion(question.id)}
                  disabled={isDisabled}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-brand border-transparent text-white'
                      : isDisabled
                        ? 'bg-[#F5F5F7] border-transparent text-[#C7C7C7] cursor-not-allowed'
                        : 'bg-[#F5F5F7] border-transparent text-[#1D1D1F] hover:bg-[#E5E5E7]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-white bg-white'
                          : isDisabled
                            ? 'border-[#D1D1D6]'
                            : 'border-[#C7C7C7]'
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
                      )}
                    </div>
                    <span className="font-medium text-[15px]">{question.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-[#6E6E73] text-center mb-8">
            {selectedQuestions.length}/{QUESTION_CONSTRAINTS.REQUIRED_COUNT} selected
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <MessageSquare className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Share your story
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Your answers help clients get to know you better before booking.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 5 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
