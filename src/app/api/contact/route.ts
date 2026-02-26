import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: "Form submission failed" }, { status: 400 });
      }
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ error: "Form submission failed" }, { status: 500 });
    }
  }

  // Development fallback: log and return success
  console.log("Contact form submission:", { name, email, message });
  return NextResponse.json({ ok: true });
}
