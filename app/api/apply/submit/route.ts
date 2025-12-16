import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME, APP_PROGRAM_NAME } from '@/lib/constants/app';


const resend = new Resend(process.env.RESEND_API_KEY);

// Verify a signed token and code
async function verifyToken(token: string, providedCode: string, email: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const secret = process.env.VERIFICATION_SECRET || 'phero-verification-secret-change-me';

    // Decode the token
    const decoded = JSON.parse(atob(token));
    const { data, signature } = decoded;
    const parsed = JSON.parse(data);

    // Verify the signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Convert hex signature back to bytes
    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16))
    );

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(data));

    if (!isValid) {
      return { valid: false, error: 'Invalid token signature' };
    }

    // Check email matches
    if (parsed.email !== email.toLowerCase()) {
      return { valid: false, error: 'Email mismatch' };
    }

    // Check expiry
    if (Date.now() > parsed.expiresAt) {
      return { valid: false, error: 'CODE_EXPIRED' };
    }

    // Check code matches
    if (parsed.code !== providedCode) {
      return { valid: false, error: 'INVALID_CODE' };
    }

    return { valid: true };
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false, error: 'Invalid token format' };
  }
}

interface ApplicationData {
  first_name: string;
  last_name: string;
  email: string;
  instagram_handle: string;
  tiktok_handle?: string;
  other_socials: {
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  bio: string;
  location_city: string;
  location_state: string;
  location_country: string;
  phone?: string;
  age_confirmed_18plus: boolean;
  terms_agreed: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verificationCode, verificationToken, formData } = body as {
      verificationCode: string;
      verificationToken: string;
      formData: ApplicationData;
    };

    if (!verificationCode || !verificationToken || !formData) {
      return NextResponse.json(
        { error: 'Verification code, token, and form data are required' },
        { status: 400 }
      );
    }

    // Verify the code
    const verifyResult = await verifyToken(verificationToken, verificationCode, formData.email);

    if (!verifyResult.valid) {
      return NextResponse.json(
        { error: verifyResult.error || 'Invalid verification' },
        { status: 400 }
      );
    }

    // In a full implementation, you would:
    // 1. Create the user in Firebase Auth (via REST API or a cloud function)
    // 2. Create the stylist document in Firestore
    //
    // For now, we'll send a notification email to admin and confirmation to applicant
    // The admin can then manually process the application

    const fromEmail = process.env.RESEND_FROM_EMAIL || `${APP_NAME} <noreply@mail.stylistonstandby.com>`;
    const adminEmail = process.env.ADMIN_EMAIL || 'george@lbksf.com';

    // Send notification to admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New ${APP_PROGRAM_NAME} Application: ${formData.first_name} ${formData.last_name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <h1>New Stylist Application</h1>
            <p><strong>Name:</strong> ${formData.first_name} ${formData.last_name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Location:</strong> ${formData.location_city}, ${formData.location_state}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Instagram:</strong> @${formData.instagram_handle}</p>
            ${formData.tiktok_handle ? `<p><strong>TikTok:</strong> @${formData.tiktok_handle}</p>` : ''}
            ${formData.other_socials.facebook ? `<p><strong>Facebook:</strong> ${formData.other_socials.facebook}</p>` : ''}
            ${formData.other_socials.linkedin ? `<p><strong>LinkedIn:</strong> ${formData.other_socials.linkedin}</p>` : ''}
            ${formData.other_socials.website ? `<p><strong>Website:</strong> ${formData.other_socials.website}</p>` : ''}
            <h3>About</h3>
            <p>${formData.bio}</p>
          </body>
        </html>
      `,
    });

    // Send confirmation to applicant
    await resend.emails.send({
      from: fromEmail,
      to: formData.email,
      subject: `Your ${APP_PROGRAM_NAME} Application Received`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    <tr>
                      <td style="padding: 40px;">
                        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 8px; text-align: center;">
                          ${APP_NAME}
                        </h1>
                        <p style="color: #6b7280; font-size: 14px; margin: 0 0 32px; text-align: center;">
                          Application Received
                        </p>

                        <p style="color: #374151; line-height: 1.6; margin: 0 0 16px;">
                          Hi ${formData.first_name},
                        </p>

                        <p style="color: #374151; line-height: 1.6; margin: 0 0 24px;">
                          Thank you for applying to be a ${APP_PROGRAM_NAME}! We've received your application and our team will review it within 24-48 hours.
                        </p>

                        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                          <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 12px;">
                            What's Next?
                          </h3>
                          <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                            <li>Our team will review your profile and social media presence</li>
                            <li>We'll reach out via email with our decision</li>
                            <li>If approved, you'll receive setup instructions</li>
                          </ul>
                        </div>

                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                          Questions? Reply to this email and we'll get back to you.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
