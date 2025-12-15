'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Feedback {
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

interface OnboardingContextValue {
  feedback: Feedback | null;
  setFeedback: (feedback: Feedback | null) => void;
  modifiedFields: Set<string>;
  markFieldAsModified: (fieldId: string) => void;
  isFieldModified: (fieldId: string) => boolean;
  hasFieldFeedback: (fieldId: string) => boolean;
  getFieldFeedback: (fieldId: string) => string | undefined;
  clearModifications: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  // Load feedback from localStorage on mount
  useEffect(() => {
    const storedFeedback = localStorage.getItem('onboarding_feedback');
    if (storedFeedback) {
      try {
        setFeedback(JSON.parse(storedFeedback));
      } catch (error) {
        console.error('Failed to parse feedback:', error);
      }
    }

    const storedModifications = localStorage.getItem('onboarding_modifications');
    if (storedModifications) {
      try {
        setModifiedFields(new Set(JSON.parse(storedModifications)));
      } catch (error) {
        console.error('Failed to parse modifications:', error);
      }
    }
  }, []);

  // Persist feedback to localStorage
  useEffect(() => {
    if (feedback) {
      localStorage.setItem('onboarding_feedback', JSON.stringify(feedback));
    }
  }, [feedback]);

  // Persist modifications to localStorage
  useEffect(() => {
    localStorage.setItem('onboarding_modifications', JSON.stringify(Array.from(modifiedFields)));
  }, [modifiedFields]);

  const markFieldAsModified = (fieldId: string) => {
    setModifiedFields((prev) => new Set(prev).add(fieldId));
  };

  const isFieldModified = (fieldId: string): boolean => {
    return modifiedFields.has(fieldId);
  };

  const hasFieldFeedback = (fieldId: string): boolean => {
    if (!feedback?.fields) return false;

    switch (fieldId) {
      case 'preferred_name':
        return !!feedback.fields.preferred_name;
      case 'photos':
        return !!feedback.fields.photos;
      case 'style_themes':
        return !!feedback.fields.style_themes;
      case 'question_answers':
        return !!feedback.fields.question_answers && Object.keys(feedback.fields.question_answers).length > 0;
      default:
        return false;
    }
  };

  const getFieldFeedback = (fieldId: string): string | undefined => {
    if (!feedback?.fields) return undefined;

    switch (fieldId) {
      case 'preferred_name':
        return feedback.fields.preferred_name;
      case 'photos':
        return feedback.fields.photos?.general;
      case 'style_themes':
        return feedback.fields.style_themes;
      default:
        return undefined;
    }
  };

  const clearModifications = () => {
    setModifiedFields(new Set());
    localStorage.removeItem('onboarding_modifications');
  };

  return (
    <OnboardingContext.Provider
      value={{
        feedback,
        setFeedback,
        modifiedFields,
        markFieldAsModified,
        isFieldModified,
        hasFieldFeedback,
        getFieldFeedback,
        clearModifications,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider');
  }
  return context;
}
