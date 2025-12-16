import { NextRequest, NextResponse } from 'next/server';


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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, token } = body;

    if (!email || !code || !token) {
      return NextResponse.json(
        { error: 'Email, code, and token are required' },
        { status: 400 }
      );
    }

    const result = await verifyToken(token, code, email);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Verify check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
