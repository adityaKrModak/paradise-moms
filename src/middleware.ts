import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the user is trying to access a protected path
  const isProtectedPath = path.startsWith("/protected-page");

  const token = request.cookies.get("accessToken")?.value || "";

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/protected-page/:path*", "/signin"],
};
