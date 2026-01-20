import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // If NOT logged in and trying to access protected pages → go to Login
  if (!token && pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  // If logged in and trying to access public pages → go to dashboard
  if (
    token &&
    (pathname === "/" || pathname === "/Login" || pathname === "/Signup")
  ) {
    return NextResponse.redirect(new URL("/protected/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/Login", "/Signup", "/protected/:path*"],
};
