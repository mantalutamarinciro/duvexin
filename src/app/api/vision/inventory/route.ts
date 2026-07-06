import { NextResponse } from "next/server";
import { analyzeRoomPhoto } from "@/ai/flows/inventory-from-photo";

export async function POST(request: Request) {
  try {
    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: "Image base64 ou type mime manquant" }, { status: 400 });
    }

    const result = await analyzeRoomPhoto({ imageBase64, mimeType });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Vision API Error:", error);
    return NextResponse.json({ error: "L'analyse d'image par l'IA a échoué", details: error.message }, { status: 500 });
  }
}
