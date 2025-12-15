// Onboarding constants
export const ONBOARDING_STATUS = {
  DRAFT: 'draft',
  IN_REVIEW: 'in_review',
  CHANGES_REQUESTED: 'changes_requested',
  APPROVED: 'approved',
} as const;

export const FEEDBACK_STATUS = {
  OK: 'ok',
  NEEDS_CHANGES: 'needs_changes',
} as const;

// Photo constraints
export const PHOTO_CONSTRAINTS = {
  REQUIRED_COUNT: 3,
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png'],
} as const;

// Style themes
export const STYLE_THEME_CONSTRAINTS = {
  REQUIRED_COUNT: 5,
} as const;

// Questions
export const QUESTION_CONSTRAINTS = {
  TOTAL_AVAILABLE: 10,
  REQUIRED_COUNT: 6,
  ANSWER_MIN_LENGTH: 50,
  ANSWER_MAX_LENGTH: 150,
} as const;

export const STYLE_QUESTIONS = [
  { id: 'solve_25', text: 'What do you solve in 25 minutes?' },
  { id: 'walk_away', text: 'What do clients walk away feeling?' },
  { id: 'getting_dressed', text: 'What do you believe about getting dressed?' },
  { id: 'work_session', text: 'How do you work in a session?' },
  { id: 'personal_taste', text: 'Personal Taste' },
  { id: 'style_pov', text: 'Style POV' },
  { id: 'confidence', text: 'Confidence & Rituals' },
  { id: 'lifestyle', text: 'Lifestyle & Everyday' },
  { id: 'zodiac', text: 'Zodiac Sign' },
  { id: 'hometown', text: 'Hometown' },
] as const;

// Name constraints
export const NAME_CONSTRAINTS = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50,
} as const;

// US States
export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
] as const;
