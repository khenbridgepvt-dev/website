import { NextResponse } from "next/server";
import { z } from "zod";

const intakeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  enquiry: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.enum(["queries-intake", "homepage"]).default("queries-intake"),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const webhookUrl = process.env.INTAKE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Intake is not configured yet. Please try again later or call us." },
      { status: 503 },
    );
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    firstName: data.firstName,
    email: data.email,
    phone: data.phone ?? "",
    enquiry: data.enquiry ?? "",
    source: data.source,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await postToGoogleAppsScript(
      webhookUrl,
      payload,
      controller.signal,
    );

    clearTimeout(timeout);

    const responseBody = await response.text().catch(() => "");
    const gasOk = response.ok || responseBody.includes('"ok":true');

    if (!gasOk) {
      return NextResponse.json(
        { error: "Could not save your enquiry. Please try again or call us." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Google Apps Script: follow redirects on one POST (re-POSTing the echo URL returns 405). */
async function postToGoogleAppsScript(
  url: string,
  payload: Record<string, string>,
  signal: AbortSignal,
) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
    redirect: "follow",
  });
}
