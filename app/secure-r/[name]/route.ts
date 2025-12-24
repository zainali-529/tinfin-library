import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

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

function getRevokedList() {
  const raw = process.env.TINFIN_REVOKED_JTIS || "";
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
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

  const revoked = getRevokedList();
  if (payload.jti && revoked.includes(payload.jti)) {
    return { valid: false, error: "Revoked token" };
  }

  if (payload.scope && payload.scope !== "registry") {
    return { valid: false, error: "Invalid scope" };
  }

  return { valid: true, payload };
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;
    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const filePath = path.join(process.cwd(), "public", "r", filename);

    let content: string;
    try {
      content = await fs.readFile(filePath, "utf-8");
    } catch {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

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

    const result = verifyTokenCompact(token);
    if (!result.valid || !result.payload || result.payload.plan !== "pro") {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message:
            "Hold your horses, partner! To unlock this Pro Block, we need your TINFIN_REGISTRY_TOKEN. Check the /docs page if you've purchased pro and it's playing hide-and-seek!",
        },
        { status: 401 }
      );
    }

    const res = new NextResponse(content, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=0",
      },
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
