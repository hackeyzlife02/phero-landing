// Re-export types from schemas
export type {
  Photo,
  FieldFeedback,
  PhotoFeedback,
  AdminFeedback,
  StylistOnboarding,
  PartialOnboarding,
  SubmitOnboarding,
  AdminReview,
  QuestionId,
} from './schemas';

// Additional utility types
export type OnboardingStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved';
export type FeedbackStatus = 'ok' | 'needs_changes';
