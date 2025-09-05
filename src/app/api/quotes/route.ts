
import { saveQuote } from "@/services/quoteService";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the incoming quote request from the external site
const apiQuoteSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  originAddress: z.string().min(5),
  destinationAddress: z.string().min(5),
  moveDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Invalid date format" }),
  volume: z.coerce.number().positive(),
});

// This is your secret API key. It should be stored in your environment variables.
const API_KEY = process.env.WORDPRESS_API_KEY;
const WORDPRESS_URL = process.env.WORDPRESS_SITE_URL;

export async function POST(request: Request) {
  try {
    // 1. Check for API Key
    const requestApiKey = request.headers.get('x-api-key');
    if (!API_KEY || requestApiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse and validate the incoming data
    const body = await request.json();
    const parsedData = apiQuoteSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Invalid input data', details: parsedData.error.errors }, { status: 400 });
    }

    // 3. Create a placeholder quote. 
    // We set a default distance and a quote of 0, as this will need to be calculated later in the dashboard.
    const quoteData = {
        ...parsedData.data,
        distance: 1, // Placeholder distance
        serviceType: 'basic' as const, // Default service type
        quote: 0, // Placeholder quote, to be calculated in the dashboard
        status: 'pending' as const,
    };

    // 4. Save the quote using the existing service
    const result = await saveQuote(quoteData);

    console.log(`Successfully received and saved quote from external site. Quote ID: ${result.id}`);

    // 5. Return a success response
    return NextResponse.json(
        { message: 'Quote request received successfully', quoteId: result.id },
        { 
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': WORDPRESS_URL || '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            }
        }
    );

  } catch (error) {
    console.error('API Error - /api/quotes:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': WORDPRESS_URL || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        }
    });
}
