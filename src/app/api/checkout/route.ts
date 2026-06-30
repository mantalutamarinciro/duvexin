import { NextRequest, NextResponse } from "next/server";
import { getQuoteById, updateQuoteStatus } from "@/services/quoteService";
import { createBookingFromQuote } from "@/services/bookingService";
import { createInvoice } from "@/services/invoiceService";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" as any }) : null;

export async function POST(req: NextRequest) {
  try {
    const { quoteId } = await req.json();
    
    if (!quoteId) {
      return NextResponse.json({ error: "Missing quoteId" }, { status: 400 });
    }

    const quote = await getQuoteById(quoteId);
    
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const depositAmount = Math.round(quote.quote * 0.3 * 100); // 30% en centimes d'euros

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

    // Si Stripe n'est pas configuré (Mode Démo)
    if (!stripe) {
      console.log("Stripe non configuré, simulation du paiement réussie pour le devis", quoteId);
      
      // Simulation directe de la validation (normalement fait par le Webhook)
      await updateQuoteStatus(quoteId, "Accepté");
      
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      
      await createInvoice({
          quoteId: quote.id,
          clientName: quote.clientName,
          amountTTC: quote.quote,
          dueDate: dueDate.toISOString(),
          amountPaid: quote.quote * 0.3 // Acompte payé
      });

      await createBookingFromQuote(quote);

      // On renvoie directement l'URL de succès
      return NextResponse.json({ url: `${baseUrl}/quote/${quoteId}/success` });
    }

    // Vraie intégration Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Acompte Déménagement (30%) - Réf: ${quoteId.substring(0, 8).toUpperCase()}`,
              description: `Réservation pour le déménagement de ${quote.originAddress} vers ${quote.destinationAddress}`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/quote/${quoteId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/quote/${quoteId}`,
      client_reference_id: quoteId,
      customer_email: quote.clientEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
