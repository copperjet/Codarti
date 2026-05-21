import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional(),
  budget: z.string().min(1).max(80),
  message: z.string().min(8).max(4000),
});

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO ?? "support@codarti.com";
  const from = process.env.INQUIRY_FROM ?? "Codarti Inquiries <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Inquiry service not configured (missing RESEND_API_KEY)" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: d.email,
      subject: `New enquiry — ${d.name}`,
      text: `From: ${d.name} <${d.email}>
Company: ${d.company ?? "—"}
Budget: ${d.budget}

${d.message}`,
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: result.error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Send failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
