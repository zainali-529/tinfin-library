import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Light routing only: rewrite Pro block requests to secure route
  if (pathname === "/r/auth-3.json") {
    return NextResponse.rewrite(new URL("/secure-r/auth-3.json", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/r/:path*",
};
