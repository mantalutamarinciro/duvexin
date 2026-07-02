import { NextResponse } from 'next/server';
import { getMoveDetails } from '@/ai/flows/move-details';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { originAddress, destinationAddress } = body;

    if (!originAddress || !destinationAddress) {
      return NextResponse.json(
        { error: 'originAddress and destinationAddress are required' },
        { status: 400 }
      );
    }

    const result = await getMoveDetails({ originAddress, destinationAddress });
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error - /api/move-details:', error);
    return NextResponse.json(
      { error: 'Failed to compute move details' },
      { status: 500 }
    );
  }
}
