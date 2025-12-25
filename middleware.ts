import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Intercept ALL registry requests (.json files)
  // Rewrite them to the dynamic route handler by removing the .json extension
  // This ensures that:
  // 1. We bypass the default static file serving for public/r/*.json
  // 2. We hit app/r/[name]/route.ts where we can apply security logic
  // 3. Free blocks are still served (logic is in the route handler), but now we have control.
  
  if (pathname.startsWith("/r/") && pathname.endsWith(".json")) {
    const name = pathname.replace(/^\/r\//, "").replace(/\.json$/, "");
    return NextResponse.rewrite(new URL(`/r/${name}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/r/:path*",
};
