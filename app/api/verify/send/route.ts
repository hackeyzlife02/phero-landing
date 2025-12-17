import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { APP_NAME } from '@/lib/constants/app';

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create a signed token containing the code and expiry
// This allows stateless verification without needing KV storage
async function createVerificationToken(email: string, code: string): Promise<string> {
  const secret = process.env.VERIFICATION_SECRET || 'phero-verification-secret-change-me';
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  const data = JSON.stringify({ email: email.toLowerCase(), code, expiresAt });

  // Simple HMAC-based signing using Web Crypto API
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Return base64 encoded token
  return btoa(JSON.stringify({ data, signature: signatureHex }));
}

export { createVerificationToken };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate 6-digit code
    const code = generateCode();

    // Create a signed verification token
    const token = await createVerificationToken(email, code);

    // Send email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || `${APP_NAME} <noreply@mail.stylistonstandby.com>`;
    const resend = getResend();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Your ${APP_NAME} Verification Code`,
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
                          Email Verification
                        </p>

                        <p style="color: #374151; line-height: 1.6; margin: 0 0 16px;">
                          Your verification code is:
                        </p>

                        <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                          <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #111827;">
                            ${code}
                          </span>
                        </div>

                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                          This code will expire in 10 minutes. If you didn't request this code, you can safely ignore this email.
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

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    // Return success with the token (client stores this for verification)
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
