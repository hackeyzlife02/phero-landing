import { z } from 'zod';
import {
  NAME_CONSTRAINTS,
  PHOTO_CONSTRAINTS,
  STYLE_THEME_CONSTRAINTS,
  QUESTION_CONSTRAINTS,
  STYLE_QUESTIONS,
  ONBOARDING_STATUS,
  FEEDBACK_STATUS,
  US_STATES,
} from './constants';

// Photo schema
export const PhotoSchema = z.object({
  url: z.string().url(),
  storage_path: z.string(),
  order: z.number().int().min(0).max(2), // 0 = profile pic, 1-2 = additional
  uploaded_at: z.date().or(z.string()), // Allow Firestore Timestamp or ISO string
});

// Feedback schema
export const FieldFeedbackSchema = z.object({
  status: z.enum([FEEDBACK_STATUS.OK, FEEDBACK_STATUS.NEEDS_CHANGES]),
  message: z.string().optional(),
});

export const PhotoFeedbackSchema = z.object({
  index: z.number().int().min(0).max(2),
  status: z.enum([FEEDBACK_STATUS.OK, FEEDBACK_STATUS.NEEDS_CHANGES]),
  message: z.string().optional(),
});

export const AdminFeedbackSchema = z.object({
  preferred_name: FieldFeedbackSchema.optional(),
  location: FieldFeedbackSchema.optional(),
  photos: z.array(PhotoFeedbackSchema).optional(),
  style_themes: FieldFeedbackSchema.optional(),
  answers: z.record(z.string(), FieldFeedbackSchema).optional(),
});

// Question IDs
const questionIds = STYLE_QUESTIONS.map((q) => q.id);
export const QuestionIdSchema = z.enum(questionIds as [string, ...string[]]);

// Main onboarding schema
export const StylistOnboardingSchema = z.object({
  // Basic info
  preferred_name: z
    .string()
    .min(NAME_CONSTRAINTS.MIN_LENGTH, `Name must be at least ${NAME_CONSTRAINTS.MIN_LENGTH} characters`)
    .max(NAME_CONSTRAINTS.MAX_LENGTH, `Name must be at most ${NAME_CONSTRAINTS.MAX_LENGTH} characters`)
    .trim(),

  // Location
  location_city: z.string().min(1, 'City is required').trim(),
  location_state: z.enum(US_STATES.map((s) => s.code) as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid US state' }),
  }),

  // Photos (exactly 3)
  photos: z
    .array(PhotoSchema)
    .length(PHOTO_CONSTRAINTS.REQUIRED_COUNT, `Exactly ${PHOTO_CONSTRAINTS.REQUIRED_COUNT} photos required`),

  // Style themes (exactly 5)
  style_themes: z
    .array(z.string())
    .length(STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT, `Select exactly ${STYLE_THEME_CONSTRAINTS.REQUIRED_COUNT} themes`),

  // Questions (exactly 6 unique)
  selected_questions: z
    .array(QuestionIdSchema)
    .length(QUESTION_CONSTRAINTS.REQUIRED_COUNT, `Select exactly ${QUESTION_CONSTRAINTS.REQUIRED_COUNT} questions`)
    .refine((ids) => new Set(ids).size === ids.length, {
      message: 'Questions must be unique',
    }),

  // Answers (50-150 chars each)
  question_answers: z.record(
    QuestionIdSchema,
    z
      .string()
      .min(QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH, `Answer must be at least ${QUESTION_CONSTRAINTS.ANSWER_MIN_LENGTH} characters`)
      .max(QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH, `Answer must be at most ${QUESTION_CONSTRAINTS.ANSWER_MAX_LENGTH} characters`)
      .trim()
  ),

  // Status
  onboarding_status: z.enum([
    ONBOARDING_STATUS.DRAFT,
    ONBOARDING_STATUS.IN_REVIEW,
    ONBOARDING_STATUS.CHANGES_REQUESTED,
    ONBOARDING_STATUS.APPROVED,
  ]),

  // Feedback (optional, only when changes_requested)
  admin_feedback: AdminFeedbackSchema.optional(),

  // Metadata
  onboarding_submitted_at: z.date().or(z.string()).optional(),
  onboarding_approved_at: z.date().or(z.string()).optional(),
});

// Partial schema for progressive form saving
export const PartialOnboardingSchema = StylistOnboardingSchema.partial();

// Submit schema (requires all fields except feedback)
export const SubmitOnboardingSchema = StylistOnboardingSchema.omit({
  admin_feedback: true,
  onboarding_submitted_at: true,
  onboarding_approved_at: true,
});

// Admin review schema
export const AdminReviewSchema = z.object({
  stylist_uid: z.string(),
  feedback: AdminFeedbackSchema,
  approve_all: z.boolean(),
  reviewer_uid: z.string(),
});

// Types
export type Photo = z.infer<typeof PhotoSchema>;
export type FieldFeedback = z.infer<typeof FieldFeedbackSchema>;
export type PhotoFeedback = z.infer<typeof PhotoFeedbackSchema>;
export type AdminFeedback = z.infer<typeof AdminFeedbackSchema>;
export type StylistOnboarding = z.infer<typeof StylistOnboardingSchema>;
export type PartialOnboarding = z.infer<typeof PartialOnboardingSchema>;
export type SubmitOnboarding = z.infer<typeof SubmitOnboardingSchema>;
export type AdminReview = z.infer<typeof AdminReviewSchema>;
export type QuestionId = z.infer<typeof QuestionIdSchema>;
