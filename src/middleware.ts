import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// list of protected routes
const protectedRoutes = ["/favorites", "/country"];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const isAuthenticated = authCookie?.value === "true";
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // if the user is not authenticated and the route is protected, redirect to login
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // if the user is authenticated and tries to access login page, redirect to dashboard
  if (isAuthenticated && pathname === "/login") {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites", "/country/:path*", "/login"],
};
