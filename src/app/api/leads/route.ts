import { NextResponse } from "next/server";

// Stub: validates and logs a lead. Swap for real persistence (Postgres/
// Supabase) plus email notification once the leads table exists — see
// spec §34.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  console.log("New lead:", body);

  return NextResponse.json({ ok: true });
}
