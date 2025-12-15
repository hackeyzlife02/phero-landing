'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Pencil } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { STYLE_QUESTIONS, QUESTION_CONSTRAINTS, getQuestionText } from '@/lib/shared';
import type { QuestionId } from '@/lib/shared';
import { APP_NAME } from '@/lib/constants/app';

export default function QuestionAnswerPage() {
  const router = useRouter();
  const params = useParams();
  const index = parseInt(params.index as string, 10);

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedQuestions = localStorage.getItem('onboarding_selected_questions');
    if (savedQuestions) {
      try {
        setSelectedQuestions(JSON.parse(savedQuestions));
      } catch (e) {
        console.error('Failed to parse saved questions:', e);
        router.push('/onboarding/questions/select');
      }
    } else {
      router.push('/onboarding/questions/select');
    }

    const savedAnswers = localStorage.getItem('onboarding_answers');
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        setAnswers(parsed);
      } catch (e) {
        console.error('Failed to parse saved answers:', e);
      }
    }
  }, [router]);

  useEffect(() => {
    if (selectedQuestions.length > 0 && selectedQuestions[index]) {
      const currentAnswer = answers[selectedQuestions[index]] || '';
      setAnswer(currentAnswer);
    }
  }, [selectedQuestions, index, answers]);

  const currentQuestionId = selectedQuestions[index];
  const currentQuestion = STYLE_QUESTIONS.find((q) => q.id === currentQuestionId);

  const handleContinue = () => {
    setError('');

    if (answer.length < QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH) {
      setError(`Answer must be at least ${QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH} characters`);
      return;
    }

    if (answer.length > QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH) {
      setError(`Answer must be at most ${QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH} characters`);
      return;
    }

    const newAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(newAnswers);
    localStorage.setItem('onboarding_answers', JSON.stringify(newAnswers));

    if (index < selectedQuestions.length - 1) {
      router.push(`/onboarding/questions/answer/${index + 1}`);
    } else {
      router.push('/onboarding/review');
    }
  };

  const handleBack = () => {
    if (index > 0) {
      router.push(`/onboarding/questions/answer/${index - 1}`);
    } else {
      router.push('/onboarding/questions/select');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  const progressValue = 5 + ((index + 1) / selectedQuestions.length);

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
          <span className="font-body text-[13px] text-[#6E6E73]">Step 6 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={progressValue} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-brand rounded-full mb-4">
              <span className="text-white text-xs font-semibold">
                Question {index + 1} of {selectedQuestions.length}
              </span>
            </div>
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              {getQuestionText(currentQuestionId as QuestionId)}
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Write {QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH}-{QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH}{' '}
              characters about this topic
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all h-40 resize-none"
              maxLength={QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH}
            />
            <div className="flex justify-between mt-2 text-sm text-[#6E6E73]">
              <span>
                {answer.length < QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH && (
                  <span className="text-yellow-600">
                    {QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH - answer.length} more characters needed
                  </span>
                )}
              </span>
              <span
                className={
                  answer.length > QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH ? 'text-brand-red' : ''
                }
              >
                {answer.length}/{QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH}
              </span>
            </div>
          </div>

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
              {index < selectedQuestions.length - 1 ? 'Next Question' : 'Review Profile'}
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
            <Pencil className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Your unique perspective
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            These answers help clients understand who you are beyond your portfolio.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 6 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
