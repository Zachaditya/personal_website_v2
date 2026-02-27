import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  if (name.length > 100) {
    return NextResponse.json(
      { error: "Name must be 100 characters or fewer" },
      { status: 400 }
    );
  }
  if (!email.includes("@") || email.length > 254) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message must be 5000 characters or fewer" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (apiKey && toEmail) {
    try {
      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `Contact form: ${name}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; font-family: inherit; background: #f4f4f4; padding: 1rem; border-radius: 0.5rem;">${escapeHtml(message)}</pre>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Form submission failed" },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (err) {
      console.error("Contact form error:", err);
      return NextResponse.json(
        { error: "Form submission failed" },
        { status: 500 }
      );
    }
  }

  
  return NextResponse.json({ ok: true });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
