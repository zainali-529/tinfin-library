import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase-admin";

type TokenPayload = {
  sub: string;
  plan: "pro" | "free";
  exp: number;
  jti: string;
  scope?: "registry";
};

function base64urlEncode(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlDecode(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64");
}

function getSecret() {
  return process.env.TINFIN_REGISTRY_SECRET || "tinfin-dev-secret";
}

function verifyTokenCompact(compact: string): { valid: boolean; payload?: TokenPayload; error?: string } {
  const [payloadB64, sigB64] = compact.split(".");
  if (!payloadB64 || !sigB64) {
    return { valid: false, error: "Malformed token" };
  }
  const payloadBuf = base64urlDecode(payloadB64);
  let payload: TokenPayload;
  try {
    payload = JSON.parse(payloadBuf.toString("utf-8"));
  } catch {
    return { valid: false, error: "Invalid payload" };
  }

  const expectedSig = createHmac("sha256", getSecret()).update(payloadB64).digest();
  const providedSig = base64urlDecode(sigB64);

  if (expectedSig.length !== providedSig.length || !timingSafeEqual(expectedSig, providedSig)) {
    return { valid: false, error: "Bad signature" };
  }

  if (typeof payload.exp !== "number" || Date.now() / 1000 >= payload.exp) {
    return { valid: false, error: "Expired token" };
  }

  if (payload.scope && payload.scope !== "registry") {
    return { valid: false, error: "Invalid scope" };
  }

  return { valid: true, payload };
}

import { blocks } from "@/registry/blocks/index";

function isProBlock(name: string) {
  // Remove .json extension if present to match block keys
  const blockName = name.replace(/\.json$/, "");
  const block = blocks[blockName];
  return !!(block && block.isPro);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;
    
    // If the request came via rewrite, 'name' might lack .json if we rewrote to /r/[name] without ext
    // But if middleware rewrites /r/auth-3.json -> /r/auth-3.json (loop?)
    // Actually, middleware should rewrite to a different path if we want to bypass static file serving?
    // OR, if we use /r/[name]/route.ts, it maps to /r/[name].
    // If we request /r/auth-3.json, static file is served.
    // If we want dynamic check, we MUST rewrite to something that is NOT the static file path.
    // So let's handle `name` assuming it might or might not have extension.
    
    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const filePath = path.join(process.cwd(), "public", "r", filename);

    let content: string;
    try {
      content = await fs.readFile(filePath, "utf-8");
    } catch {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // Auth check for pro blocks
    if (isProBlock(filename)) {
      const authHeader = req.headers.get("authorization");
      const customHeader = req.headers.get("tinfin_registry_token") || req.headers.get("TINFIN_REGISTRY_TOKEN");
      let token: string | null = null;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice("Bearer ".length).trim();
      } else if (customHeader) {
        token = customHeader.trim();
      }

      if (!token) {
        return NextResponse.json(
          {
            error: "Unauthorized",
            message:
              "Hold your horses, partner! To unlock this Pro Block, we need your TINFIN_REGISTRY_TOKEN. Check the /docs page if you've purchased pro and it's playing hide-and-seek!",
          },
          { status: 401 }
        );
      }

      const verification = verifyTokenCompact(token);
      if (!verification.valid || !verification.payload) {
        return NextResponse.json(
          { error: "Forbidden", message: verification.error || "Invalid token" },
          { status: 403 }
        );
      }

      // Check against database for revocation
      const { jti } = verification.payload;
      if (jti) {
        const { data, error } = await supabaseAdmin
          .from("tokens")
          .select("revoked")
          .eq("jti", jti)
          .single();

        if (error || !data) {
           return NextResponse.json(
              { error: "Forbidden", message: "Token not found in registry records." },
              { status: 403 }
           );
        }

        if (data.revoked) {
          return NextResponse.json(
            { error: "Forbidden", message: "This token has been revoked." },
            { status: 403 }
          );
        }
      } else {
          return NextResponse.json(
              { error: "Forbidden", message: "Token missing JTI." },
              { status: 403 }
          );
      }
    }

    return new NextResponse(content, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registry error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
