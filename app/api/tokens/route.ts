import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server"; // User session client
import { supabaseAdmin } from "@/lib/supabase-admin"; // Admin client for DB writes
import { createHmac, randomUUID } from "crypto";

// Helper to sign tokens
function signRegistryToken(payload: any, secret: string) {
  const base64url = (input: string) =>
    Buffer.from(input)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

  const payloadB64 = base64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret).update(payloadB64).digest();
  const sigB64 = base64url(sig.toString("binary")); // Using binary to match typical raw output, or just hex/base64 directly
  // Actually, let's use the exact logic I gave the user before to be consistent
  // But standard JWT libraries use base64url of the raw buffer.
  const sigB64Url = base64url(sig.toString("binary")); // Wait, buffer to string binary is weird in Node.
  
  // Let's stick to a robust implementation
  const signature = createHmac("sha256", secret).update(payloadB64).digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
    
  return `${payloadB64}.${signature}`;
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data: tokens, error } = await supabaseAdmin
    .from("tokens")
    .select("*")
    .eq("user_id", user.id)
    .eq("revoked", false)
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(tokens);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Verify Payment Status
  const { data: payments } = await supabaseAdmin
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "paid") // Adjust based on your payment status logic (e.g. 'active', 'paid')
    .limit(1);

  const hasPayment = payments && payments.length > 0;

  if (!hasPayment) {
    return new NextResponse("Payment required", { status: 403 });
  }

  // Check for existing active tokens
  const { data: activeTokens } = await supabaseAdmin
    .from("tokens")
    .select("id")
    .eq("user_id", user.id)
    .eq("revoked", false)
    .gt("expires_at", new Date().toISOString());

  if (activeTokens && activeTokens.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: "Active token exists",
        message: "You already have an active token. Please revoke it before generating a new one.",
      }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch (error) {
    // Body is likely empty, proceed with defaults
  }
  
  const name = body.name || "CLI Token";

  const jti = randomUUID();
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days expiry

  const payload = {
    sub: user.email,
    plan: "pro",
    exp,
    jti,
    scope: "registry",
  };

  const secret = process.env.TINFIN_REGISTRY_SECRET || "tinfin-dev-secret";
  const token = signRegistryToken(payload, secret);

  // Store in DB
  const { error } = await supabaseAdmin.from("tokens").insert({
    user_id: user.id,
    name,
    token_hash: "hashed-view-only", // We don't strictly need to hash if we rely on JTI verification, but good practice. For now, we trust JTI.
    jti,
    expires_at: new Date(exp * 1000).toISOString(),
    revoked: false,
  });

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json({ token, ...payload });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let jti: string | undefined;
  try {
    const body = await req.json();
    jti = body.jti;
  } catch {
    // Ignore JSON parse error, maybe using query params
  }

  if (jti) {
    const { error } = await supabaseAdmin
      .from("tokens")
      .update({ revoked: true })
      .eq("jti", jti)
      .eq("user_id", user.id);

    if (error) return new NextResponse(error.message, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const { error } = await supabaseAdmin
      .from("tokens")
      .update({ revoked: true })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return new NextResponse(error.message, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return new NextResponse("Missing jti or id", { status: 400 });
}
