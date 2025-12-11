import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json({ error: 'place_id required' }, { status: 400 });
  }

  if (!GOOGLE_PLACES_API_KEY) {
    // Return mock data if no API key
    return NextResponse.json({
      city: 'New York',
      state: 'NY',
      formatted: 'New York, NY, USA',
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components&key=${GOOGLE_PLACES_API_KEY}`
    );
    const data = await response.json();

    if (data.result?.address_components) {
      let city = '';
      let state = '';

      for (const component of data.result.address_components) {
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          state = component.short_name;
        }
      }

      return NextResponse.json({
        city,
        state,
        formatted: `${city}, ${state}, USA`,
      });
    }

    return NextResponse.json({ error: 'Could not parse address' }, { status: 400 });
  } catch (error) {
    console.error('Place details error:', error);
    return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
  }
}
