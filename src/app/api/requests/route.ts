import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { admin, db } from "@/lib/firebase";

export const runtime = "nodejs";

const publicRequestSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  originAddress: z.string().min(5),
  destinationAddress: z.string().min(5),
  moveDate: z.string().optional(),
  volume: z.coerce.number().min(0).optional().default(0),
  details: z.string().optional(),
});

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey.startsWith("re_") ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "contact@demenagementduvexin.fr";
const adminEmail = process.env.ADMIN_RECIPIENT_EMAIL || "contact@demenagementduvexin.fr";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Demenagement du Vexin";

type PublicRequest = z.infer<typeof publicRequestSchema>;

function escapeHtml(value?: string | number) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function removeUndefinedValues<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)
  ) as Partial<T>;
}

function buildNotificationHtml(data: PublicRequest, requestId: string, audience: "admin" | "client") {
  const title = audience === "admin" ? "Nouvelle demande de devis" : "Votre demande de devis est bien recue";
  const intro = audience === "admin"
    ? "Une nouvelle demande vient d etre enregistree."
    : `Bonjour ${escapeHtml(data.clientName)}, nous avons bien recu votre demande.`;
  const rows = [
    ["Reference", requestId.slice(0, 8).toUpperCase()],
    ["Client", data.clientName],
    ["Email", data.clientEmail],
    ["Telephone", data.clientPhone || "Non renseigne"],
    ["Depart", data.originAddress],
    ["Arrivee", data.destinationAddress],
    ["Date souhaitee", data.moveDate || "Non precisee"],
    ["Volume estime", `${data.volume || 0} m3`],
    ["Details", data.details || "Non renseignes"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
      <div style="background:#0f172a;color:#fff;padding:24px;border-radius:14px 14px 0 0;">
        <strong style="font-size:20px;">${escapeHtml(siteName)}</strong>
        <div style="margin-top:8px;color:#cbd5e1;">${escapeHtml(title)}</div>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:0;padding:24px;border-radius:0 0 14px 14px;">
        <p>${intro}</p>
        <table style="width:100%;border-collapse:collapse;">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:8px 0;color:#64748b;">${escapeHtml(label)}</td>
                  <td style="padding:8px 0;text-align:right;font-weight:700;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
    </div>
  `;
}

async function sendNotifications(data: PublicRequest, requestId: string) {
  if (!resend) {
    console.warn("Resend is not configured. Quote request emails were not sent.");
    return;
  }

  const from = `${siteName} <${fromEmail}>`;
  const shortRef = requestId.slice(0, 8).toUpperCase();

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [adminEmail],
      replyTo: data.clientEmail,
      subject: `Nouvelle demande de devis - ${data.clientName} - ${shortRef}`,
      html: buildNotificationHtml(data, requestId, "admin"),
    }),
    resend.emails.send({
      from,
      to: [data.clientEmail],
      replyTo: adminEmail,
      subject: `Votre demande de devis ${siteName} - ${shortRef}`,
      html: buildNotificationHtml(data, requestId, "client"),
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(index === 0 ? "Admin email failed:" : "Client email failed:", result.reason);
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = publicRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.errors },
        { status: 400 }
      );
    }

    if (!db) {
      throw new Error("Database not initialized");
    }

    const requestRef = db.collection("requests").doc();
    const requestData = {
      clientName: parsed.data.clientName,
      clientEmail: parsed.data.clientEmail,
      clientPhone: parsed.data.clientPhone,
      originAddress: parsed.data.originAddress,
      destinationAddress: parsed.data.destinationAddress,
      moveDate: parsed.data.moveDate,
      volume: parsed.data.volume,
      details: parsed.data.details,
    };

    await requestRef.set({
      ...removeUndefinedValues(requestData),
      status: "A traiter",
      createdAt: admin.firestore.Timestamp.now(),
    });

    try {
      await sendNotifications(parsed.data, requestRef.id);
    } catch (notificationError) {
      console.error("Quote request saved but notification emails failed:", notificationError);
    }

    return NextResponse.json({ id: requestRef.id, requestId: requestRef.id }, { status: 201 });
  } catch (error) {
    console.error("API Error - /api/requests:", error);
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: "Internal Server Error", details: message }, { status: 500 });
  }
}
