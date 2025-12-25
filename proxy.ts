import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/r/") && pathname.endsWith(".json")) {
    const name = pathname.replace(/^\/r\//, "").replace(/\.json$/, "");
    return NextResponse.rewrite(new URL(`/r/${name}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/r/:path*",
};
