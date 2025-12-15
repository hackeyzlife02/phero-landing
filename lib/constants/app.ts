/**
 * App Constants
 *
 * Centralized application branding and configuration.
 * Update APP_NAME here to change branding throughout the application.
 */

export const APP_NAME = 'PHERO';

export const APP_TAGLINE = 'Get dressed like it\'s foreplay.';

export const APP_DESCRIPTION = `Complete your stylist profile to join ${APP_NAME}`;

export const APP_PROGRAM_NAME = `${APP_NAME} Founding Stylist`;

/**
 * Email-related constants
 */
export const EMAIL_FROM_NAME = APP_NAME;
export const EMAIL_FROM_DEFAULT = `${APP_NAME} <noreply@mail.stylistonstandby.com>`;

/**
 * Portal URLs (with fallbacks)
 */
export const STYLIST_PORTAL_URL = process.env.NEXT_PUBLIC_STYLIST_PORTAL_URL || `https://stylist.${APP_NAME.toLowerCase()}.com`;
