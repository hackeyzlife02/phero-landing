import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // For now, just log the submission
    // Later, you can connect this to a database or email service
    console.log('Waitlist submission:', data);

    // Simulate a small delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
