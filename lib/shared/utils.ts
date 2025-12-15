import { STYLE_QUESTIONS } from './constants';
import type { QuestionId } from './schemas';

/**
 * Get question text by ID
 */
export function getQuestionText(id: QuestionId): string {
  const question = STYLE_QUESTIONS.find((q) => q.id === id);
  return question?.text || id;
}

/**
 * Validate file size
 */
export function isValidFileSize(fileSizeBytes: number, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSizeBytes <= maxSizeBytes;
}

/**
 * Validate file type
 */
export function isValidImageType(fileType: string): boolean {
  return ['image/jpeg', 'image/png'].includes(fileType);
}

/**
 * Check if all required fields are filled
 */
export function isOnboardingComplete(data: Partial<{
  preferred_name?: string;
  location_city?: string;
  location_state?: string;
  photos?: unknown[];
  style_themes?: unknown[];
  selected_questions?: unknown[];
  question_answers?: Record<string, string>;
}>): boolean {
  return Boolean(
    data.preferred_name &&
    data.location_city &&
    data.location_state &&
    data.photos?.length === 3 &&
    data.style_themes?.length === 5 &&
    data.selected_questions?.length === 6 &&
    data.question_answers &&
    Object.keys(data.question_answers).length === 6
  );
}

/**
 * Calculate onboarding progress percentage
 */
export function calculateProgress(data: Partial<{
  preferred_name?: string;
  location_city?: string;
  location_state?: string;
  photos?: unknown[];
  style_themes?: unknown[];
  selected_questions?: unknown[];
  question_answers?: Record<string, string>;
}>): number {
  const totalSteps = 7;
  let completed = 0;

  if (data.preferred_name) completed++;
  if (data.location_city && data.location_state) completed++;
  if (data.photos?.length === 3) completed++;
  if (data.style_themes?.length === 5) completed++;
  if (data.selected_questions?.length === 6) completed++;
  if (data.question_answers && Object.keys(data.question_answers).length === 6) completed++;

  return Math.round((completed / totalSteps) * 100);
}
