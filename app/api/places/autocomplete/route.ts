import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  if (!GOOGLE_PLACES_API_KEY) {
    // Return mock data if no API key configured
    return NextResponse.json({
      predictions: [
        {
          place_id: 'mock-1',
          structured_formatting: {
            main_text: 'New York',
            secondary_text: 'NY, USA',
          },
        },
        {
          place_id: 'mock-2',
          structured_formatting: {
            main_text: 'Los Angeles',
            secondary_text: 'CA, USA',
          },
        },
      ],
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&components=country:us&key=${GOOGLE_PLACES_API_KEY}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json({ predictions: [] });
  }
}
