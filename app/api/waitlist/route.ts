import { NextRequest, NextResponse } from 'next/server';
import { firestore, emailToDocId, serverTimestamp } from '@/lib/firebase/server';
import { getResend } from '@/lib/resend';
import { getWaitlistConfirmationEmail } from '@/lib/emails/waitlist-confirmation';
import { getWaitlistAdminNotificationEmail } from '@/lib/emails/waitlist-admin-notification';

// Cloudflare Workers compatible
export const runtime = 'edge';

const ADMIN_EMAILS = ['sali@pheroapp.com', 'stylistonstandby@gmail.com'];
const FROM_EMAIL = 'PHERO <no-reply@mail.pheroapp.com>';

interface WaitlistSubmission {
  name: string;
  email: string;
  age: string;
  city: string;
  state: string;
  relationshipStatus?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name = '',
      email = '',
      age = '',
      city = '',
      state = '',
      relationshipStatus = '',
    } = body as WaitlistSubmission;

    // Validate required fields
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!trimmedName) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!age) {
      return NextResponse.json(
        { error: 'Age range is required' },
        { status: 400 }
      );
    }

    if (!city || !state) {
      return NextResponse.json(
        { error: 'City is required' },
        { status: 400 }
      );
    }

    // Normalize email for document ID
    const normalizedEmail = trimmedEmail.toLowerCase();
    const docId = emailToDocId(normalizedEmail);

    // Check if already exists
    const existingDoc = await firestore.getDoc('waitlist', docId);
    const isResubmission = existingDoc.exists;

    // Prepare document data
    const now = serverTimestamp();
    const userAgent = request.headers.get('user-agent') || null;

    const documentData: Record<string, unknown> = {
      email: normalizedEmail,
      name: trimmedName,
      age,
      city,
      state,
      relationshipStatus: relationshipStatus || null,
      updatedAt: now,
      source: 'landing_page',
      userAgent,
    };

    // Only set status and createdAt on new documents
    if (!isResubmission) {
      documentData.status = 'pending';
      documentData.createdAt = now;
    } else if (existingDoc.data?.createdAt) {
      // Preserve original createdAt
      documentData.createdAt = existingDoc.data.createdAt;
    }

    // Save to Firestore
    const saved = await firestore.setDoc('waitlist', docId, documentData);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save to database. Please try again.' },
        { status: 500 }
      );
    }

    // Send emails (fire and forget, but await for debugging)
    const resend = getResend();

    const emailPromises = [
      // Confirmation email to user
      resend.emails.send({
        from: FROM_EMAIL,
        to: normalizedEmail,
        subject: isResubmission
          ? "You're already on the PHERO waitlist"
          : "You're on the PHERO waitlist!",
        html: getWaitlistConfirmationEmail({
          name: trimmedName,
          isResubmission,
        }),
      }),
      // Notification email to admins
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAILS,
        subject: isResubmission
          ? `Waitlist re-submission: ${trimmedName}`
          : `New waitlist signup: ${trimmedName}`,
        html: getWaitlistAdminNotificationEmail({
          name: trimmedName,
          email: normalizedEmail,
          age,
          city,
          state,
          relationshipStatus,
          isResubmission,
        }),
      }),
    ];

    // Wait for emails but don't fail the request if they fail
    const emailResults = await Promise.allSettled(emailPromises);

    // Log any email failures
    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to send ${index === 0 ? 'confirmation' : 'admin'} email:`,
          result.reason
        );
      }
    });

    return NextResponse.json({
      success: true,
      alreadyJoined: isResubmission,
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}
